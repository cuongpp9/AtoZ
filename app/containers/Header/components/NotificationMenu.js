import React from 'react';
import { Collapse, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
class NotificationMenu extends React.Component {
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
      <li onClick={this.toggle}>
        <div className={`placeholder ${isOpen ? 'placeholder--open' : ''}`} />
        <i className="fa fa-user" />
        <Badge className="label-badge">
          <span>7</span>
        </Badge>
        <Collapse isOpen={isOpen} className="collapse-menu notification-menu">
          <ul className="collapse-menu__wrapper notification-menu__wrapper">
            <li>
              <Link to="/">First</Link>
              <Badge className="label-badge">
                <span>3</span>
              </Badge>
            </li>
            <li>
              <Link to="/">Second</Link>
              <Badge className="label-badge">
                <span>4</span>
              </Badge>
            </li>
          </ul>
        </Collapse>
      </li>
    );
  }
}
export default NotificationMenu;
