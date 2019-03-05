import React from 'react';
import { NavTitle, RouteManager } from 'constantsApp';
import PropTypes from 'prop-types';
import { SideBarAbstract, LinkCustom } from '../commons';

const SideBar = ({ routeActive }) => (
  <SideBarAbstract>
    <nav id="navbar" className="navbar navbar-light navbar-sidebar">
      <div className="navbar-wrapper">
        <nav className="nav nav-pills flex-column">
          {NavTitle.arOperations.itemNav.map(item => (
            <LinkCustom
              key={item.label}
              to={item.route}
              isActive={item.route === routeActive}
              disabled={
                item.route === RouteManager.arOperations.bulkAdjustments.route
              }
            >
              {item.label}
            </LinkCustom>
          ))}
        </nav>
      </div>
    </nav>
  </SideBarAbstract>
);

SideBar.propTypes = {
  routeActive: PropTypes.string,
};

export default SideBar;
