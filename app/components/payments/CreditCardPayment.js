import React from 'react';
import { Row, Col, ButtonToolbar } from 'reactstrap';
import { connect } from 'react-redux';
import { roundFloat, calculateValCallback } from 'utils/utils';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ModalSelectInvoiceUnit } from 'components/modals';
import {
  ButtonCustom,
  InputValidate,
  SelectButton,
  CheckBox,
} from 'components/commons';
import { FormAbstract, FormGroup } from 'components/form';
import { selectInvoiceId } from 'containers/App/actions';
import { paymentEnum } from 'constantsApp';
import AddressForm from './AddressForm';

class CreditCardPayment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      openModalIV: false,
      pageIV: 1,
      sizeIV: 20,
      isSearchingIV: false,
      invoiceUnitId: '',
      isApplying: false,
      storeAsPrimary: false,
      last4CC: '',
      cardType: '',
      cardExp: '',
      modeNewCard: false,
      modeNewAddress: false,
      address: {
        street: '',
        extraLine: '',
        landmark: '',
        country: 'USA',
        state: '',
        city: '',
        postalCode: '',
        code: '',
      },
    };

    this.filterIV = props.accountId ? { accountId: props.accountId } : {};
  }

  componentDidMount() {
    if (this.props.accountId) {
      this.props.selectInvoiceId(
        {
          page: 1,
          size: 20,
          filter: { accountId: this.props.accountId },
        },
        data => {
          const invoices = calculateValCallback(data);
          this.setState({ invoices });
        },
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountId !== nextProps.accountId && nextProps.accountId) {
      this.props.selectInvoiceId(
        {
          page: 1,
          size: 20,
          filter: { accountId: nextProps.accountId },
        },
        data => {
          const invoices = calculateValCallback(data);
          this.setState({ invoices, pageIV: 1, sizeIV: 20, invoiceUnitId: '' });
        },
      );
      this.filterIV = { accountId: nextProps.accountId };
    }
  }

  onToggleModalIV = () => {
    this.setState(pre => ({ openModalIV: !pre.openModalIV }));
  };

  onClickAddressInFile = () => {
    this.setState({ modeNewAddress: false });
  };

  onClickNewAddress = () => {
    this.setState({ modeNewAddress: true });
  };

  setValueAddress = value => {
    this.setState(pre => ({
      address: {
        ...pre.address,
        ...value,
      },
    }));
  };

  handlePageIV = pageOffset => {
    const { pageIV, sizeIV } = this.state;

    this.setState({ pageIV: pageIV + pageOffset });
    this.props.selectInvoiceId(
      {
        page: pageIV + pageOffset,
        size: sizeIV,
        filter: this.filterIV,
      },
      data => {
        const invoices = calculateValCallback(data);
        this.setState({ invoices, invoiceUnitId: '' });
      },
    );
  };

  handleSizeIV = sizeIV => {
    this.setState({ sizeIV, pageIV: 1 });
    this.props.selectInvoiceId(
      {
        page: 1,
        size: sizeIV,
        filter: this.filterIV,
      },
      data => {
        const invoices = calculateValCallback(data);
        this.setState({ invoices, invoiceUnitId: '' });
      },
    );
  };

  onHandleSearchIV = (filter = {}) => {
    // eslint-disable-next-line no-param-reassign
    filter.accountId = this.props.accountId;
    this.setState({ isSearchingIV: true });
    this.props.selectInvoiceId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const invoices = calculateValCallback(data);
        this.setState({
          isSearchingIV: false,
          pageIV: 1,
          sizeIV: 20,
          invoices,
          invoiceUnitId: '',
        });
      },
    );
    this.filterIV = filter;
  };

  onSelectInvoice = invoiceUnitId => {
    this.setState({ invoiceUnitId });
  };

  unSelectInvoice = () => {
    this.setState({ openModalIV: false, invoiceUnitId: '' });
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onChangeDate = (name, date) => {
    this.setState({
      [name]: date,
    });
  };

  onBlurRoundFloat = evt => {
    if (evt.target.value) {
      this.setState({
        [evt.target.name]: roundFloat(evt.target.value, 2),
      });
    }
  };

  onClickCardInFile = () => {
    this.setState({ modeNewCard: false });
  };

  onClickNewCard = () => {
    this.setState({ modeNewCard: true });
  };

  onHandleProcess = evt => {
    evt.preventDefault();
    const {
      storeAsPrimary,
      amount,
      modeNewCard,
      invoiceUnitId,
      last4CC,
      cardExp,
      modeNewAddress,
    } = this.state;
    const {
      street,
      extraLine,
      landmark,
      country,
      state,
      city,
      postalCode,
      code,
    } =
      this.state && this.state.address;
    const paymentAddresses = [
      {
        street,
        extraLine,
        landmark,
        country,
        state,
        city,
        postalCode,
        code,
      },
    ];
    const { accountId } = this.props;
    let formData = {
      accountId,
      amount: amount || 0,
      cardOnFile: !modeNewCard ? true : null,
      invoiceUnitId: invoiceUnitId || null,
      method: paymentEnum.paymentMethod.CREDIT_CARD,
      transactionId: 'TrID001', // hard code
      source: 'AGENT_CARE', // hard code
      userId: 'UserX002', // hard code
      paymentDate: moment().format('YYYY-MM-DD'),
    };

    if (modeNewCard) {
      formData.paymentCreditCards = [
        {
          cardToken: 'TKTEST_0001',
          cardExpiry: cardExp,
          last4CC,
          merchant: 'Only test',
        },
      ];
    }

    if (modeNewAddress) {
      formData = { ...formData, storeAsPrimary, paymentAddresses };
    }

    this.setState({ isApplying: true });
    this.props.applyPayment(formData, success => {
      if (success) {
        this.setState({
          isApplying: false,
          last4CC: '',
          invoiceUnitId: '',
          cardType: '',
          cardExp: '',
          amount: '',
          storeAsPrimary: false,
          address: {
            street: '',
            extraLine: '',
            landmark: '',
            country: 'USA',
            state: '',
            city: '',
            postalCode: '',
            code: '',
          },
        });
      } else {
        this.setState({ isApplying: false });
      }
    });
  };

  renderAddress() {
    const { modeNewAddress } = this.state;
    if (!modeNewAddress) return <div />;

    const { address, storeAsPrimary } = this.state;
    const enableStoreAsPrimary = !!(
      address &&
      address.street &&
      address.city &&
      address.extraLine &&
      address.state &&
      address.postalCode
    );
    return (
      <div>
        <AddressForm address={address} setValue={this.setValueAddress} />
        <div className="mt-3 ml-3">
          <CheckBox
            name="storeAsPrimary"
            label="Store as Primary"
            checked={storeAsPrimary}
            disabled={!enableStoreAsPrimary}
            onChange={() => {
              this.setState(pre => ({
                storeAsPrimary: !pre.storeAsPrimary,
              }));
            }}
          />
        </div>
      </div>
    );
  }

  renderContent() {
    const {
      amount,
      invoiceUnitId,
      last4CC,
      cardType,
      cardExp,
      modeNewCard,
    } = this.state;
    if (modeNewCard) {
      return (
        <div>
          <Row className="mt-3">
            <Col md={6}>
              <div className="form-apply__header">
                <h3 className="bold-text">New Credit Card</h3>
              </div>
            </Col>
          </Row>
          <Row className="mt-3 mx-0">
            <Col md={6}>
              <FormGroup title="Last 4 of CC">
                <InputValidate
                  name="last4CC"
                  type="number"
                  placeholder="CC0101Card"
                  value={last4CC}
                  onChange={this.onChangeText}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mx-0">
            <Col md={6}>
              <FormGroup title="Card Type">
                <InputValidate
                  name="cardType"
                  type="text"
                  placeholder="Master Card"
                  value={cardType}
                  onChange={this.onChangeText}
                />
              </FormGroup>{' '}
            </Col>
            <Col md={6}>
              <FormGroup title="One-Off Amount">
                <InputValidate
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={this.onChangeText}
                  onBlur={this.onBlurRoundFloat}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className=" mx-0">
            <Col md={6}>
              <FormGroup title="Card Exp">
                <InputValidate
                  name="cardExp"
                  type="text"
                  placeholder="2023-10-18"
                  value={cardExp}
                  onChange={this.onChangeText}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Apply to">
                <input
                  name="InvoiceUnitId"
                  type="text"
                  placeholder="Invoice Unit Id"
                  value={invoiceUnitId}
                  onChange={() => {}}
                  onClick={this.onToggleModalIV}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="mt-3">
        <Row className="mx-0">
          <Col md={6}>
            <FormGroup title="One-Off Amount">
              <InputValidate
                name="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={this.onChangeText}
                onBlur={this.onBlurRoundFloat}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup title="Apply to">
              <input
                name="InvoiceUnitId"
                type="text"
                placeholder="Invoice Unit Id"
                value={invoiceUnitId}
                onChange={() => {}}
                onClick={this.onToggleModalIV}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const {
      openModalIV,
      pageIV,
      sizeIV,
      isSearchingIV,
      invoices,
      amount,
      invoiceUnitId,
      last4CC,
      cardType,
      cardExp,
      modeNewCard,
      modeNewAddress,
      isApplying,
      address,
    } = this.state;

    const { accountId } = this.props;
    const enableStoreAsPrimary = !!(
      address &&
      address.street &&
      address.city &&
      address.extraLine &&
      address.state &&
      address.postalCode
    );
    let enableBtnApply = false;

    if (!modeNewCard) {
      enableBtnApply = !!(this.props.accountId && amount);
    } else {
      enableBtnApply = !!(
        this.props.accountId &&
        last4CC &&
        cardType &&
        cardExp &&
        amount
      );
    }

    if (modeNewAddress) {
      enableBtnApply = enableBtnApply && enableStoreAsPrimary;
    }

    return (
      <div className="mt-2">
        <div className="form-apply">
          <div className="form-apply__header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">Credit Card Payment</h3>
              </Col>
            </Row>
          </div>
          <div className="form-apply__body">
            <FormAbstract onSubmit={this.onHandleProcess}>
              <Row>
                <Col md={4} className="justify-content-center row">
                  <SelectButton
                    title1="Card on File"
                    title2="New Card"
                    activePosition={modeNewCard ? 1 : 0}
                    onClickBtn2={this.onClickNewCard}
                    onClickBtn1={this.onClickCardInFile}
                  />
                </Col>
              </Row>
              {this.renderContent()}
              <Row>
                <Col md={4} className="justify-content-center row mt-3">
                  <SelectButton
                    title1="Address on File"
                    title2="New Address"
                    activePosition={modeNewAddress ? 1 : 0}
                    onClickBtn1={this.onClickAddressInFile}
                    onClickBtn2={this.onClickNewAddress}
                  />
                </Col>
              </Row>
              {this.renderAddress()}
              <ButtonToolbar className="form-create__btn">
                <ButtonCustom
                  loading={isApplying}
                  className="btn btn-primary m-r"
                  type="submit"
                  title="Apply"
                  titleloading="Applying"
                  disabled={!enableBtnApply}
                />
              </ButtonToolbar>
            </FormAbstract>
          </div>
        </div>
        <ModalSelectInvoiceUnit
          openModal={openModalIV}
          toggleModal={this.onToggleModalIV}
          items={invoices}
          onSelectItem={this.onSelectInvoice}
          itemSelected={invoiceUnitId}
          unSelectItem={this.unSelectInvoice}
          page={pageIV}
          size={sizeIV}
          isSearching={isSearchingIV}
          handlePage={this.handlePageIV}
          handleSize={this.handleSizeIV}
          onHandleSearch={this.onHandleSearchIV}
          accountId={accountId}
        />
      </div>
    );
  }
}

CreditCardPayment.propTypes = {
  applyPayment: PropTypes.func,
  selectInvoiceId: PropTypes.func,
  accountId: PropTypes.string,
};

export default connect(
  null,
  {
    selectInvoiceId,
  },
)(CreditCardPayment);
