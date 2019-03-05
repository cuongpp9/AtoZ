import React from 'react';
import { NavTitle } from 'constantsApp';
import { SideBarAbstract, NavLink } from '../commons';

const arrDisabled = [
  '/orders/upgrade',
  '/orders/downgrade',
  '/orders/trial-subscription',
  '/orders/opt-in',
  '/orders/opt-out',
];

const SideBarOrder = () => (
  <SideBarAbstract>
    <nav id="navbar" className="navbar navbar-light navbar-sidebar">
      <div className="navbar-wrapper">
        <nav className="nav nav-pills flex-column">
          {NavTitle.orderManagement.itemNav.map(item => (
            <NavLink
              key={item.label}
              to={item.route}
              disabled={arrDisabled.some(el => el === item.route)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </nav>
  </SideBarAbstract>
);

export default SideBarOrder;
