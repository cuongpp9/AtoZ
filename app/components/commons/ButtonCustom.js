import React from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';

const ButtonCustom = props => (
  <LaddaButton
    {...props}
    data-spinner-color="#fff"
    data-spinner-lines={12}
    data-style={props.datastyle}
  >
    {props.loading ? props.titleloading : props.label || props.title}
  </LaddaButton>
);

ButtonCustom.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.any,
  title: PropTypes.string,
  titleloading: PropTypes.string,
  datastyle: PropTypes.any,
};

ButtonCustom.defaultProps = {
  datastyle: EXPAND_LEFT,
  loading: false,
};

export default ButtonCustom;
