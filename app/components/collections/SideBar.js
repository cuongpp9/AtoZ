import React from 'react';
import { NavTitle } from 'constantsApp';
import { SideBarAbstract, NavLink, NavBar } from '../commons';

export default () => (
  <SideBarAbstract>
    <nav id="navbar" className="navbar navbar-light navbar-sidebar">
      <div className="navbar-wrapper">
        <nav className="nav nav-pills flex-column">
          {NavTitle.collections.itemNav.map(item => (
            <NavBar key={item.label} to={item.route} lable={item.label}>
              {item.childNav.map(child => (
                <li key={child.label}>
                  <NavLink
                    to={child.route}
                    style={
                      child.route ===
                      '/collections/collection-agent/invoice-units'
                        ? { pointerEvents: 'none' }
                        : {}
                    }
                  >
                    {child.label}
                  </NavLink>
                </li>
              ))}
            </NavBar>
          ))}
        </nav>
      </div>
    </nav>
  </SideBarAbstract>
);
