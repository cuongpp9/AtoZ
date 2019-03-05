import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavTitle } from 'constantsApp';
import { formatStringUrl } from 'utils/utils';
import { SideBarAbstract, NavLink } from '../commons';

const SideBarCustomer = ({ isShowSidebarItem, id }) => {
  const routeItem = route => {
    if (id) {
      return formatStringUrl(route, id);
    }

    return formatStringUrl(route, 'create');
  };
  return (
    <SideBarAbstract>
      <nav id="navbar" className="navbar navbar-light navbar-sidebar">
        <div className="navbar-wrapper">
          <Link className="navbar-brand" to="/customers">
            {NavTitle.accounts.label}
          </Link>
          {isShowSidebarItem && (
            <nav className="nav nav-pills flex-column">
              {NavTitle.accounts.itemNav.map(item => (
                <NavLink key={item.label} to={routeItem(item.route)}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}
        </div>
      </nav>
    </SideBarAbstract>
  );
};

SideBarCustomer.propTypes = {
  isShowSidebarItem: PropTypes.bool,
  id: PropTypes.string,
};

export default SideBarCustomer;
