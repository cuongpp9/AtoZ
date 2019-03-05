import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'components/commons';

const FormPanel = ({ children, title, className }) => (
  <div className={`form-panel ${className || ''}`}>
    <Panel xs={12} md={12} lg={12} color="primary" title={title} button={false}>
      {children}
    </Panel>
  </div>
);

FormPanel.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
};
export default FormPanel;
