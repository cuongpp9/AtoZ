import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CreateNew = ({ router, title }) => (
  <div className="panel-fix panel--default">
    <div className="panel__heading">
      <Link to={router} className="btn btn-success btn-addon">
        <i className="fa fa-plus" />&nbsp;
        {title}
      </Link>
    </div>
  </div>
);

CreateNew.propTypes = {
  router: PropTypes.string,
  title: PropTypes.string,
};

export default CreateNew;
