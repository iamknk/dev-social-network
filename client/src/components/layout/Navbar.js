import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenicated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <span className="hide-sm">Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <span className="hide-sm">Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenicated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
