import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import {
  makeGetSubscription,
  makeGetServiceUnits,
  makeGetErrorSubscription,
  makeGetErrorServiceUnits,
} from '../selectors';
import { createOrder, getSubscriptionByAccountId } from '../actions';
import { OrderCreateAbstract } from '../components';

class OrderCreateDifferent extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    this.state = {
      initRoute: childRoute || 'suspend',
      aSelectedId: '',
      isPosting: false,
      // suspend, cancel
      subscriptionReason: null,
      // resume
      subscriptionStatus: null,
      // renew
      renewalTermUnit: null,
      renewalTerm: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match !== nextProps.match) {
      const {
        match: {
          params: { childRoute },
        },
      } = nextProps;
      this.setState({
        initRoute: childRoute,
        subscriptionReason: null,
        subscriptionStatus: null,
        renewalTermUnit: null,
        renewalTerm: '',
      });
    }
  }

  selectAccount = aSelectedId => {
    this.setState({ aSelectedId });
    if (aSelectedId) {
      this.props.getSubscriptionByAccountId(aSelectedId);
    }
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onHandleCreateOrderSuspend = evt => {
    evt.preventDefault();
    this.setState({ isPosting: true });
    const { aSelectedId, subscriptionReason } = this.state;
    const dataSuspend = {
      type: 'SUSPEND',
      accountId: aSelectedId,
      subscriptionReason: subscriptionReason
        ? subscriptionReason.value
        : 'NONE',
      userId: 'USR-0001',
      status: 'CREATED',
    };
    this.props.createOrder(dataSuspend, () => {
      this.setState({ isPosting: false });
    });
  };

  onHandleCreateOrderResume = evt => {
    evt.preventDefault();
    this.setState({ isPosting: true });
    const { aSelectedId } = this.state;
    const dataResume = {
      type: 'RESUME',
      accountId: aSelectedId,
      userId: 'USR-0001',
      // status: subscriptionStatus ? subscriptionStatus.value : null,
    };
    this.props.createOrder(dataResume, () => {
      this.setState({ isPosting: false });
    });
  };

  onHandleCreateOrderCancel = evt => {
    evt.preventDefault();
    const { aSelectedId, subscriptionReason } = this.state;
    this.setState({ isPosting: true });
    const dataCancel = {
      type: 'CANCEL',
      accountId: aSelectedId,
      subscriptionReason: subscriptionReason
        ? subscriptionReason.value
        : 'NONE',
      userId: 'USR-0001',
      status: 'CREATED',
    };
    this.props.createOrder(dataCancel, () => {
      this.setState({ isPosting: false });
    });
  };

  onHandleCreateOrderRenew = evt => {
    evt.preventDefault();
    this.setState({ isPosting: true });
    const { aSelectedId, renewalTermUnit, renewalTerm } = this.state;
    const dataRenew = {
      type: 'RENEW',
      accountId: aSelectedId,
      renewalTermUnit: renewalTermUnit ? renewalTermUnit.value : 'MONTHS',
      renewalTerm: renewalTerm || 0,
      userId: 'USR-0001',
      status: 'CREATED',
    };
    this.props.createOrder(dataRenew, () => {
      this.setState({ isPosting: false });
    });
  };

  renderContent = () => {
    const {
      initRoute,
      isPosting,
      aSelectedId,
      subscriptionReason,
      subscriptionStatus,
      renewalTermUnit,
      renewalTerm,
    } = this.state;
    const {
      subscription,
      serviceUnits,
      errorSubscription,
      errorServiceUnits,
    } = this.props;
    switch (initRoute) {
      case 'suspend':
        return (
          <OrderCreateAbstract
            onSubmit={this.onHandleCreateOrderSuspend}
            aSelectedId={aSelectedId}
            selectAccount={this.selectAccount}
            subscription={subscription}
            serviceUnits={serviceUnits}
            errorSubscription={errorSubscription}
            errorServiceUnits={errorServiceUnits}
            onChangeSelect={this.onChangeSelect}
            subscriptionReason={subscriptionReason}
            isPosting={isPosting}
            isSuspend
          />
        );
      case 'resume':
        return (
          <OrderCreateAbstract
            onSubmit={this.onHandleCreateOrderResume}
            aSelectedId={aSelectedId}
            selectAccount={this.selectAccount}
            subscription={subscription}
            serviceUnits={serviceUnits}
            errorSubscription={errorSubscription}
            errorServiceUnits={errorServiceUnits}
            onChangeSelect={this.onChangeSelect}
            subscriptionStatus={subscriptionStatus}
            isPosting={isPosting}
            isResume
          />
        );
      case 'cancel':
        return (
          <OrderCreateAbstract
            onSubmit={this.onHandleCreateOrderCancel}
            aSelectedId={aSelectedId}
            selectAccount={this.selectAccount}
            subscription={subscription}
            serviceUnits={serviceUnits}
            errorSubscription={errorSubscription}
            errorServiceUnits={errorServiceUnits}
            onChangeSelect={this.onChangeSelect}
            subscriptionReason={subscriptionReason}
            isPosting={isPosting}
            isCancel
          />
        );
      case 'renew':
        return (
          <OrderCreateAbstract
            onSubmit={this.onHandleCreateOrderRenew}
            aSelectedId={aSelectedId}
            selectAccount={this.selectAccount}
            subscription={subscription}
            serviceUnits={serviceUnits}
            errorSubscription={errorSubscription}
            errorServiceUnits={errorServiceUnits}
            onChangeText={this.onChangeText}
            onChangeSelect={this.onChangeSelect}
            renewalTermUnit={renewalTermUnit}
            renewalTerm={renewalTerm}
            isPosting={isPosting}
            isRenew
          />
        );
      default:
        return (
          <OrderCreateAbstract
            onSubmit={this.onHandleCreateOrderSuspend}
            aSelectedId={aSelectedId}
            selectAccount={this.selectAccount}
            subscription={subscription}
            serviceUnits={serviceUnits}
            errorSubscription={errorSubscription}
            errorServiceUnits={errorServiceUnits}
            onChangeSelect={this.onChangeSelect}
            subscriptionReason={subscriptionReason}
            isPosting={isPosting}
            isSuspend
          />
        );
    }
  };

  render() {
    return <div className="order-create-sub">{this.renderContent()}</div>;
  }
}

OrderCreateDifferent.propTypes = {
  match: PropTypes.object,
  getSubscriptionByAccountId: PropTypes.func,
  subscription: PropTypes.object,
  serviceUnits: PropTypes.any,
  errorSubscription: PropTypes.string,
  errorServiceUnits: PropTypes.string,
  createOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  subscription: makeGetSubscription() || {},
  serviceUnits: makeGetServiceUnits() || [],
  errorSubscription: makeGetErrorSubscription() || '',
  errorServiceUnits: makeGetErrorServiceUnits() || '',
});

export default connect(
  mapStateToProps,
  {
    getSubscriptionByAccountId,
    createOrder,
  },
)(OrderCreateDifferent);
