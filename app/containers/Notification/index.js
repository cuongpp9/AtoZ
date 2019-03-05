import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NotificationTypes } from 'constantsApp';
import NotificationSystem from 'react-notification-system';
import { makeSelectNotification } from './selectors';
import reducer from './reducer';

class Notification extends React.Component {
  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification.type !== NotificationTypes.none) {
      this.notificationSystem.addNotification({
        title: `${_.capitalize(nextProps.notification.type)}!`,
        level: nextProps.notification.type,
        autoDismiss: 4,
        position: 'tc',
        children: (
          <div>
            <p dangerouslySetInnerHTML={{__html: nextProps.notification.message }} />
          </div>
        )
      });
    }
  }

  render() {
    return <div><NotificationSystem ref="notificationSystem" /></div>;
  }
}

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification() || {},
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'notificationReducer', reducer });

export default compose(withReducer, withConnect)(Notification);
