import React from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-smooth-scrollbar';

const SideBarAbstract = ({ children }) => (
  <div className="sidebar">
    <Scrollbar className="sidebar__scroll scroll">
      <div className="sidebar__wrapper sidebar__wrapper--desktop">
        {children}
      </div>
    </Scrollbar>
  </div>
);

SideBarAbstract.propTypes = {
  children: PropTypes.any,
};

export default SideBarAbstract;
