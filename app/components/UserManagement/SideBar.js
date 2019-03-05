import React from 'react';
import { NavTitle } from 'constantsApp';
import { SideBarAbstract, NavLink, NavBar } from '../commons';

export default () => (
  <SideBarAbstract>
    <nav id="navbar" className="navbar navbar-light navbar-sidebar">
      <div className="navbar-wrapper">
        <nav className="nav nav-pills flex-column">
          {
            <NavBar
              key={NavTitle.UserManagement.label}
              to={NavTitle.UserManagement.route}
              lable={NavTitle.UserManagement.label}
            >
              {NavTitle.UserManagement.childNav.map(child => (
                <li key={child.label}>
                  <NavLink to={child.route}>{child.label}</NavLink>
                </li>
              ))}
            </NavBar>
          }
        </nav>
      </div>
    </nav>
  </SideBarAbstract>
);
