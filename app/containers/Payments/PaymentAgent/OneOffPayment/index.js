import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  OneOffSelect,
  InvoicePayment,
  CreditCardPayment,
} from 'components/payments';
import { getAccountId } from 'asynStorage/accountStorage';
import { PageAbstract } from 'components/commons';
import { paymentEnum } from 'constantsApp';
import {} from '../../selectors';
import { applyPayment } from '../../actions';

class OneOffPayment extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      paymentType: '',
      accountId: getAccountId(),
    };
  }

  componentDidMount() {
    if (!getAccountId()) {
      alert('You need to select account first');
      this.props.history.push('/payments/payment-agent/search-account');
    }
  }

  onHandleSelectPaymentType = value => {
    this.setState({
      paymentType: value,
    });
  };

  setAccountId = id => {
    if (id) {
      this.setState({ accountId: id });
    } else {
      this.setState({ accountId: getAccountId() });
    }
  };

  renderBody = () => {
    const { paymentType, accountId } = this.state;
    if (paymentType === paymentEnum.paymentType.creditCard) {
      return (
        <CreditCardPayment
          applyPayment={this.props.applyPayment}
          accountId={accountId}
        />
      );
    }
    return (
      <InvoicePayment
        applyPayment={this.props.applyPayment}
        accountId={accountId}
      />
    );
  };

  render() {
    return (
      <PageAbstract>
        <div className="form-content">
          <div className="form-header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">
                  Apply a one-off
                  Payment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="account-detail">Account Number:</span>
                  <span className="account-detail">
                    {this.state.accountId}
                  </span>&nbsp;&nbsp;
                </h3>
              </Col>
            </Row>
          </div>
          <div className="ml-5 mb-3">
            <OneOffSelect
              onHandleSelectPaymentType={this.onHandleSelectPaymentType}
              setAccountId={this.setAccountId}
              accountId={this.state.accountId}
            />
          </div>
          {this.renderBody()}
        </div>
      </PageAbstract>
    );
  }
}

OneOffPayment.propTypes = {
  applyPayment: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});

export default connect(
  mapStateToProps,
  { applyPayment },
)(OneOffPayment);
