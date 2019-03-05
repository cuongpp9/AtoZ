import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormAbstract, FormGroup, SelectField } from 'components/form';
import { ButtonCustom } from 'components/commons';
import { paymentEnum } from 'constantsApp';
import {
  getPaymentConfigByType,
  createPaymentConfigMerchant,
  modifyPaymentConfigMerchant,
} from '../../actions';
class CollectionSchedule extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      paymentProvider: { value: 'BRAINTREE', label: 'BRAINTREE' },
      otherProvider: '',
      token: '',
      applying: false,
    };
    this.lastIndex = 0;
    this.isEmptyListServer = true;
  }
  componentDidMount = () => {
    this.props.getPaymentConfigByType(
      paymentEnum.paymentConfig.PAYMENT_MERCHANTS,
      ({ response }) => {
        this.convertResponsePaymentConfig(response);
      },
    );
  };
  convertResponsePaymentConfig = response => {
    if (
      response &&
      response.paymentMerchants &&
      response.paymentMerchants.length > 0
    ) {
      this.isEmptyListServer = false;
      this.getLastIndex(response.paymentMerchants);
    }
  };
  getLastIndex = array => {
    array.forEach(item => {
      if (item && item.index > this.lastIndex) {
        this.lastIndex = item.index;
      }
    });
  };
  changeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  changeProvider = val => {
    this.setState({ paymentProvider: val });
  };
  handleApplyBtn = () => {
    this.setState({ applying: true });

    const dataMerchant = {
      paymentConfigType: paymentEnum.paymentConfig.PAYMENT_MERCHANTS,
      paymentMerchants: [
        {
          index: this.lastIndex + 1,
          provider: 'BRAINTREE',
          token: this.state.token,
        },
      ],
    };
    if (this.isEmptyListServer) {
      this.props.createPaymentConfigMerchant(dataMerchant, ({ success }) => {
        if (success) {
          this.isEmptyListServer = false;
        }
        this.setState({
          applying: false,
        });
      });
    } else {
      this.props.modifyPaymentConfigMerchant(dataMerchant, () => {
        this.setState({
          applying: false,
        });
      });
    }
  };
  render() {
    const { paymentProvider, otherProvider, token, applying } = this.state;

    return (
      <div className="form-apply">
        <div className="form-apply__body">
          <FormAbstract onSubmit={this.onHandleProcess}>
            <div className="ml-5 mr-5">
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <span className="bold-text" style={{ minWidth: '150px' }}>
                      Payment Provider
                    </span>
                    <SelectField
                      name="provider"
                      options={[{ value: 'BRAINTREE', label: 'BRAINTREE' }]}
                      className="form__form-group-select"
                      valueSelected={paymentProvider}
                      isClearable={false}
                      onChange={this.changeProvider}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <input
                      name="otherProvider"
                      value={otherProvider}
                      placeholder="OTHER PROVIDER (will require integration)"
                      onChange={this.changeText}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <input
                      name="token"
                      value={token}
                      placeholder="Merchant Token"
                      onChange={this.changeText}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </FormAbstract>
          <div className="pull-right  mb-4">
            <ButtonCustom
              loading={applying}
              className="btn btn-primary"
              type="button"
              title="Apply"
              titleloading="Applying"
              onClick={this.handleApplyBtn}
            />
          </div>
        </div>
      </div>
    );
  }
}
CollectionSchedule.propTypes = {
  getPaymentConfigByType: PropTypes.func,
  createPaymentConfigMerchant: PropTypes.func,
  modifyPaymentConfigMerchant: PropTypes.func,
};

export default connect(
  null,
  {
    getPaymentConfigByType,
    createPaymentConfigMerchant,
    modifyPaymentConfigMerchant,
  },
)(CollectionSchedule);
