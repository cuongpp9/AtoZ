import React, { PureComponent } from 'react';
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';

export default class CollapseComponent extends PureComponent {
  static propTypes = {
    button: PropTypes.any,
    className: PropTypes.string,
    isActive: PropTypes.bool,
    onToggleTab: PropTypes.func,
    state: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.state = {
      // collapse: false,
      classStatus: 'closed',
    };
  }

  toggle() {
    this.props.onToggleTab(this.props.state);
  }

  onEntering() {
    this.setState({ classStatus: 'opening' });
  }

  onEntered() {
    this.setState({ classStatus: 'opened' });
  }

  onExiting() {
    this.setState({ classStatus: 'closing' });
  }

  onExited() {
    this.setState({ classStatus: 'closed' });
  }

  render() {
    const { title, className, isActive } = this.props;
    const { classStatus, icon } = this.state;
    let Class = className ? className : '';
    return (
      <div
        className={`collapse__wrapper ${classStatus} ${Class} ${
          isActive ? 'active' : ''
        }`}
      >
        <div onClick={this.toggle} className="collapse__title">
          {icon}
          <div className="panel__heading panel__heading--btn">
            {isActive ? (
              <i className="fa fa-minus" />
            ) : (
              <i className="fa fa-plus" />
            )}
            &nbsp;
            <span className="panel__title">{title}</span>
          </div>
        </div>
        <Collapse
          isOpen={isActive}
          className="collapse__content"
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <div>{this.props.children}</div>
        </Collapse>
      </div>
    );
  }
}
