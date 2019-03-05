import React from 'react';
import { NavTitle } from 'constantsApp';
import PropTypes from 'prop-types';
import { SideBarAbstract, LinkCustom, NavBar } from '../commons';

const SideBar1 = ({ routeActive }) => (
  <SideBarAbstract>
    <nav id="navbar" className="navbar navbar-light navbar-sidebar">
      <div className="navbar-wrapper">
        <nav className="nav nav-pills flex-column">
          {NavTitle.collections.itemNav.map(item => (
            <NavBar key={item.label} to={item.route} lable={item.label}>
              {item.childNav.map(child => (
                <li key={child.label}>
                  <LinkCustom
                    to={child.route}
                    isActive={child.route === routeActive}
                    style={
                      child.route ===
                      '/collections/collection-agent/invoice-units'
                        ? { pointerEvents: 'none' }
                        : {}
                    }
                  >
                    {child.label}
                  </LinkCustom>
                </li>
              ))}
            </NavBar>
          ))}
        </nav>
      </div>
    </nav>
  </SideBarAbstract>
);

SideBar1.propTypes = {
  routeActive: PropTypes.string,
};

export default SideBar1;
