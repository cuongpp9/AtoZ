import React from 'react';
import { NavLink } from '../commons';
import { nav } from '../../constantsApp/nav';
import './styles.scss';

class HeaderTab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="header-tab">
          <ul className="nav nav-pills">
            {nav.map(item => (
              <li key={item.label} className="nav-item">
                <NavLink to={item.route}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default HeaderTab;
