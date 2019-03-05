import React from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import A0 from 'images/a0.jpg';

class ProfileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div className="header__avatar" onClick={this.toggle}>
        <div className={`placeholder ${isOpen ? 'placeholder--open' : ''}`} />
        <img className="avatar" src={A0} />
        <i className="m-l-5 fa fa-angle-down" />
        <Collapse isOpen={isOpen} className="collapse-menu profile-menu">
          <ul className="collapse-menu__wrapper profile-menu__wrapper">
            <li>
              <Link to="/">Edit Profile</Link>
            </li>
            <li>
              <Link to="/">View Activity</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </Collapse>
      </div>
    );
  }
}
export default ProfileMenu;
