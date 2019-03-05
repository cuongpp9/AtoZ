import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ButtonToolbar } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { paymentEnum } from 'constantsApp';
import { roundFloat, calculateValCallback } from 'utils/utils';
import { ModalSelectInvoiceUnit } from 'components/modals';
import {
  ButtonCustom,
  InputValidate,
  CheckBox,
  SelectButton,
} from 'components/commons';
import { FormAbstract, FormGroup } from 'components/form';
import { selectInvoiceId } from 'containers/App/actions';
import AddressForm from './AddressForm';

class InvoicePaymentTypeTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      openModalIV: false,
      pageIV: 1,
      sizeIV: 20,
      isSearchingIV: false,
      invoiceUnitId: '',
      amount: '',
      bank: '',
      routingNumber: '',
      checkNumber: '',
      isApplying: false,
      modeNewAddress: false, // false: Address on File, true: new address
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
      storeAsPrimary: false,
    };

    this.filterBU = props.accountId ? { accountId: props.accountId } : {};
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

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onBlurRoundFloat = evt => {
    if (evt.target.value) {
      this.setState({
        [evt.target.name]: roundFloat(evt.target.value, 2),
      });
    }
  };

  setValueAddress = value => {
    this.setState(pre => ({
      address: {
        ...pre.address,
        ...value,
      },
    }));
  };

  onClickAddressInFile = () => {
    this.setState({ modeNewAddress: false });
  };

  onClickNewAddress = () => {
    this.setState({ modeNewAddress: true });
  };

  onToggleModalIV = () => {
    this.setState(pre => ({ openModalIV: !pre.openModalIV }));
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

  onHandleProcess = evt => {
    evt.preventDefault();
    const {
      amount,
      bank,
      checkNumber,
      routingNumber,
      invoiceUnitId,
      storeAsPrimary,
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
      amount: amount || 0,
      accountId,
      invoiceUnitId: invoiceUnitId || null,
      method: paymentEnum.paymentMethod.CHECK,
      transactionId: 'TrID001', // hard code
      source: 'AGENT_CARE', // hard code
      userId: 'UserX002', // hard code
      paymentDate: moment().format('YYYY-MM-DD'),
      paymentInvoices: [
        {
          bank,
          checkNumber,
          routingNumber,
        },
      ],
    };

    if (modeNewAddress) {
      formData = { ...formData, storeAsPrimary, paymentAddresses };
    }

    this.setState({ isApplying: true });
    this.props.applyPayment(formData, success => {
      if (success) {
        this.setState({
          isApplying: false,
          bank: '',
          checkNumber: '',
          amount: '',
          routingNumber: '',
          invoiceUnitId: '',
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

  render() {
    const {
      bank,
      checkNumber,
      amount,
      routingNumber,
      isApplying,
      invoices,
      openModalIV,
      pageIV,
      sizeIV,
      isSearchingIV,
      invoiceUnitId,
      address,
      modeNewAddress,
    } = this.state;

    const { accountId } = this.props;
    let validAddress = true;

    if (modeNewAddress) {
      validAddress = !!(
        address &&
        address.street &&
        address.city &&
        address.extraLine &&
        address.state &&
        address.postalCode
      );
    }

    const enableBtnApply = !!(
      accountId &&
      amount &&
      bank &&
      routingNumber &&
      checkNumber &&
      validAddress
    );

    return (
      <div className="mt-2">
        <div className="form-apply">
          <div className="form-apply__header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">Invoice Payment Type</h3>
              </Col>
            </Row>
          </div>
          <div className="form-apply__body">
            <FormAbstract onSubmit={this.onHandleProcess}>
              <Row>
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
                      name="invoiceUnitId"
                      type="text"
                      placeholder="Invoice Unit Id"
                      value={invoiceUnitId}
                      onChange={() => {}}
                      onClick={this.onToggleModalIV}
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Bank">
                    <InputValidate
                      name="bank"
                      type="text"
                      placeholder="Bank"
                      value={bank}
                      onChange={this.onChangeText}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Check Number">
                    <InputValidate
                      name="checkNumber"
                      type="text"
                      placeholder="Check Number"
                      value={checkNumber}
                      onChange={this.onChangeText}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Routing Number">
                    <InputValidate
                      name="routingNumber"
                      type="text"
                      placeholder="Routing Number"
                      value={routingNumber}
                      onChange={this.onChangeText}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} />
              </Row>
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

InvoicePaymentTypeTable.propTypes = {
  applyPayment: PropTypes.func,
  accountId: PropTypes.string,
  selectInvoiceId: PropTypes.func,
};

export default connect(
  null,
  { selectInvoiceId },
)(InvoicePaymentTypeTable);
