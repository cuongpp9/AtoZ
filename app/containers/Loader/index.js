import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import makeLoaderState from './selector';
import './styles.scss';

class Loader extends Component {
  componentDidMount() {}

  render() {
    const { isConnecting } = this.props;
    if (!isConnecting) {
      return <div />;
    }

    return (
      <div>
        <div className="nav-absolute-background" />
        <div className="absolute-background" />
      </div>
    );
  }
}

Loader.propTypes = {
  isConnecting: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isConnecting: makeLoaderState() || false,
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'loaderReducer', reducer });

export default compose(
  withReducer,
  withConnect,
)(Loader);
