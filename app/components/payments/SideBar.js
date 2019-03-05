import React from 'react';
import { NavTitle } from 'constantsApp';
import { SideBarAbstract, NavLink, NavBar } from '../commons';

const arrDisabled = [
  '/payments/payment-agent/customer-refunds',
  '/payments/payment-agent/manual-chargebacks',
  '/payments/payment-agent/batch-payments',
  '/payments/payment-agent/batch-refunds',
  '/payments/payment-agent/batch-reversals',
];

export default () => (
  <SideBarAbstract>
    <nav id="navbar" className="navbar navbar-light navbar-sidebar">
      <div className="navbar-wrapper">
        <nav className="nav nav-pills flex-column">
          {NavTitle.payments.itemNav.map(item => (
            <NavBar key={item.label} to={item.route} lable={item.label}>
              {item.childNav.map(child => (
                <li key={child.label}>
                  <NavLink
                    to={child.route}
                    disabled={arrDisabled.some(el => el === child.route)}
                    style={
                      child.route ===
                      '/payments/payment-agent/payment-allocation'
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
