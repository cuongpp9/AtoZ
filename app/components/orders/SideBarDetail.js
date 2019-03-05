import React from 'react';
import PropTypes from 'prop-types';
import { NavTitle } from 'constantsApp';
import { formatStringUrl } from 'utils/utils';
import { SideBarAbstract, NavLink } from '../commons';

const SideBarDetail = ({ id }) => {
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
          <nav className="nav nav-pills flex-column">
            {NavTitle.orderManagement.itemDetail.map(item => (
              <NavLink key={item.label} to={routeItem(item.route)}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </nav>
    </SideBarAbstract>
  );
};

SideBarDetail.propTypes = {
  id: PropTypes.string,
};

export default SideBarDetail;
