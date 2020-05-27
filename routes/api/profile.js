const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@desc Get Current User Profile
//@access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for user' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@route POST api/profile
//@desc Create or Update Profile
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is Required').not().isEmpty(),
      check('skills', 'Skills are Required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    //Soical Profiles
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      } else {
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/profile
//@desc Get All Profile
//@access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profile/user/:user_id
//@desc Get Profile by User ID
//@access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      res.status(400).json({ msg: 'Profile Not Foundg' });
    }
    res.json(profile);
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      res.status(400).json({ msg: 'Profile Not Found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route DELETE api/profile
//@desc Delete Profile, Posts and User
//@access Private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User Removed' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
