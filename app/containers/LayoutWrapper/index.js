import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import Sidebar from '../SideBar';

class LayoutWrapper extends React.PureComponent {
  render() {
    return (
      <Fragment>
        {/* <Sidebar /> */}
      </Fragment>
    );
  }
}

LayoutWrapper.PropsType = {
  children: PropTypes.element.isRequired,
};

export default LayoutWrapper;
