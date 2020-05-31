import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExprience } from '../../actions/profile';

const Exprience = ({ experience, deleteExprience }) => {
  const expriences = experience.map((exp) => {
    return (
      <tr key={exp.id}>
        <td>{exp.company}</td>

        <td className="hie-sm">{exp.title}</td>

        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
          {exp.to === null ? (
            'Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>

        <td>
          <button
            onClick={() => deleteExprience(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className="my-2">Exprience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{expriences}</tbody>
      </table>
    </Fragment>
  );
};

Exprience.propTypes = {
  expriences: PropTypes.array.isRequired,
  deleteExprience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExprience })(Exprience);
