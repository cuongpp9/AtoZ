import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import ProfileMenu from './components/ProfileMenu';
import NotificationMenu from './components/NotificationMenu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg fixed-top header-container">
          <div className="header__user">
            <ul className="header__action">
              <NotificationMenu />
              <li>
                <i className="fa fa-globe" />
                <Badge className="label-badge">
                  <span>89</span>
                </Badge>
              </li>
              <li>
                <i className="fa fa-user" />
                <Badge className="label-badge">
                  <span>999+</span>
                </Badge>
              </li>
            </ul>
            <ProfileMenu />
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
