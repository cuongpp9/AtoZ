import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonToolbar } from 'reactstrap';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { FormGroup, FormPanel, FormAbstract } from 'components/form';
import { dataSelect } from 'constantsApp';
import listCurrency from 'constantsApp/currency.json';
import {
  ButtonCustom,
  InputValidate,
  TextareaValidate,
  CheckBox,
} from 'components/commons';
import {
  checkChangeValue,
  checkChangeDate,
  checkChangeSelectValue,
} from 'utils/utils';

class AccountInfoForm extends Component {
  constructor() {
    super();
    this.state = {
      isUpdating: false,
      customerSegment: null,
      accountType: null,
      accountSubType: null,
      salesChannel: null,
      marketSegment: null,
      sellingCompany: '',
      lineOfBusiness: '',
      legalEntity: '',
      reason: null,
      currency: null,
      status: null,
      effectiveDate: null,
    };
  }

  componentDidMount() {
    if (this.props.account.id) {
      this.initValue(this.props.account);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.account !== nextProps.account && nextProps.account.id) {
      this.initValue(nextProps.account);
    }
  }

  initValue = account => {
    const cur = listCurrency.currencies.find(
      el => el.code === account.currency,
    );
    this.setState({
      customerSegment: account.customerSegment
        ? dataSelect.customerSegment.find(
            el => el.value === account.customerSegment,
          )
        : null,
      accountType: account.type
        ? dataSelect.accountType.find(el => el.value === account.type)
        : null,
      accountSubType: account.subType
        ? dataSelect.accountSubType.find(el => el.value === account.subType)
        : null,
      salesChannel: account.salesChannel
        ? dataSelect.salesChannel.find(el => el.value === account.salesChannel)
        : null,
      marketSegment: account.marketSegment
        ? dataSelect.marketSegment.find(
            el => el.value === account.marketSegment,
          )
        : null,
      sellingCompany: account.sellingCompany || '',
      lineOfBusiness: account.lineOfBusiness || '',
      legalEntity: account.legalEntity || '',
      reason: account.reason
        ? dataSelect.accountReason.find(el => el.value === account.reason)
        : null,
      currency: { label: `${cur.name} (${cur.code})`, value: cur.code },
      status: dataSelect.accountStatus.find(el => el.value === account.status),
      effectiveDate: account.effectiveDate
        ? moment(account.effectiveDate)
        : null,
    });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeDate = (name, date) => {
    this.setState({
      [name]: date,
    });
  };

  onClickCancelBtn = () => {
    this.initValue(this.props.account);
  };

  checkChangeStatus = () => {
    const { status } = this.state;
    const { account } = this.props;

    if (!account.id) return false;

    return status && account.status !== status.value;
  };

  checkChangeInfo = () => {
    const { account } = this.props;
    if (!account.id) return false;

    const {
      customerSegment,
      accountType,
      accountSubType,
      salesChannel,
      marketSegment,
      sellingCompany,
      lineOfBusiness,
      legalEntity,
      currency,
      effectiveDate,
    } = this.state;

    return (
      checkChangeSelectValue(account.customerSegment, customerSegment) ||
      checkChangeSelectValue(account.type, accountType) ||
      checkChangeSelectValue(account.subType, accountSubType) ||
      checkChangeSelectValue(account.salesChannel, salesChannel) ||
      checkChangeSelectValue(account.marketSegment, marketSegment) ||
      checkChangeValue(account.sellingCompany, sellingCompany) ||
      checkChangeValue(account.lineOfBusiness, lineOfBusiness) ||
      checkChangeValue(account.legalEntity, legalEntity) ||
      checkChangeSelectValue(account.currency, currency) ||
      checkChangeDate(effectiveDate, account.effectiveDate)
    );
  };

  onHandleUpdateAccount = evt => {
    evt.preventDefault();

    const {
      customerSegment,
      accountType,
      accountSubType,
      salesChannel,
      marketSegment,
      sellingCompany,
      lineOfBusiness,
      legalEntity,
      currency,
      status,
      reason,
      effectiveDate,
    } = this.state;
    this.setState({ isUpdating: true });

    if (this.checkChangeStatus() && !this.checkChangeInfo()) {
      this.props.updateAccountStatus(
        {
          id: this.props.account.id,
          status: status.value,
          reason: reason.value,
        },
        () => {
          this.setState({ isUpdating: false });
        },
      );

      return;
    }

    const dataAccountPost = {
      id: this.props.account.id,
      customerSegment: customerSegment ? customerSegment.value : null,
      type: accountType ? accountType.value : null,
      subType: accountSubType ? accountSubType.value : null,
      salesChannel: salesChannel ? salesChannel.value : null,
      marketSegment: marketSegment ? marketSegment.value : null,
      sellingCompany,
      lineOfBusiness,
      legalEntity,
      currency: currency.value,
      effectiveDate: effectiveDate
        ? moment(effectiveDate).format('YYYY-MM-DD')
        : null,
    };

    if (!this.checkChangeStatus() && this.checkChangeInfo()) {
      this.props.modifyAccount(dataAccountPost, () => {
        this.setState({ isUpdating: false });
      });
    } else {
      this.props.modifyAccount(dataAccountPost, ({ success }) => {
        if (success) {
          this.props.updateAccountStatus(
            {
              id: this.props.account.id,
              status: status.value,
              reason: reason.value,
            },
            () => {
              this.setState({ isUpdating: false });
            },
          );
        } else {
          this.setState({ isUpdating: false });
        }
      });
    }
  };

  render() {
    const {
      isUpdating,
      customerSegment,
      accountType,
      accountSubType,
      salesChannel,
      marketSegment,
      sellingCompany,
      lineOfBusiness,
      legalEntity,
      currency,
      status,
      reason,
      effectiveDate,
    } = this.state;
    const { account } = this.props;
    const enableBtn = this.checkChangeStatus() || this.checkChangeInfo();

    return (
      <FormPanel title="" className="customer-field">
        <FormAbstract onSubmit={this.onHandleUpdateAccount}>
          <div className="form-inner">
            <div className="form__half">
              <FormGroup title="Customer Segment">
                <Select
                  value={customerSegment}
                  options={dataSelect.customerSegment}
                  onChange={val => this.onChangeSelect('customerSegment', val)}
                  className="form__form-group-select"
                  placeholder="Customer Segment"
                  isClearable
                />
              </FormGroup>
              <FormGroup title="Account Type">
                <Select
                  value={accountType}
                  options={dataSelect.accountType}
                  onChange={val => this.onChangeSelect('accountType', val)}
                  className="form__form-group-select"
                  placeholder="Account Type"
                  isClearable
                />
              </FormGroup>
              <FormGroup title="Account SubType">
                <Select
                  value={accountSubType}
                  options={dataSelect.accountSubType}
                  onChange={val => this.onChangeSelect('accountSubType', val)}
                  className="form__form-group-select"
                  placeholder="Account SubType"
                  isClearable
                />
              </FormGroup>
              <FormGroup title="Sales Channel">
                <Select
                  value={salesChannel}
                  options={dataSelect.salesChannel}
                  onChange={val => this.onChangeSelect('salesChannel', val)}
                  className="form__form-group-select"
                  placeholder="Sales Channel"
                  isClearable
                />
              </FormGroup>
              <FormGroup title="Market Segment">
                <Select
                  value={marketSegment}
                  options={dataSelect.marketSegment}
                  onChange={val => this.onChangeSelect('marketSegment', val)}
                  className="form__form-group-select"
                  placeholder="Market Segment"
                  isClearable
                />
              </FormGroup>
              <FormGroup title="Selling Company">
                <input
                  type="text"
                  placeholder="Selling Company"
                  name="sellingCompany"
                  value={sellingCompany}
                  onChange={this.onChangeText}
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Line of Business">
                <input
                  type="text"
                  placeholder="Line of Business"
                  name="lineOfBusiness"
                  value={lineOfBusiness}
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Legal Entity">
                <input
                  type="text"
                  placeholder="Legal Entity"
                  name="legalEntity"
                  value={legalEntity}
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Currency">
                <Select
                  value={currency}
                  options={listCurrency.currencies.map(item => ({
                    label: `${item.name} (${item.code})`,
                    value: item.code,
                  }))}
                  onChange={val => this.onChangeSelect('currency', val)}
                  className="form__form-group-select"
                />
              </FormGroup>
              <FormGroup title="Status">
                <Select
                  value={status}
                  options={dataSelect.accountStatus}
                  onChange={val => this.onChangeSelect('status', val)}
                  className="form__form-group-select"
                />
              </FormGroup>
              <FormGroup title="Reason">
                <Select
                  value={reason}
                  options={dataSelect.accountReason}
                  onChange={val => this.onChangeSelect('reason', val)}
                  className="form__form-group-select"
                  placeholder="Reason"
                />
              </FormGroup>
              <FormGroup title="Effective Date">
                <div className="date-picker">
                  <DatePicker
                    className="form__form-group-datepicker"
                    selected={effectiveDate}
                    onChange={date => this.onChangeDate('effectiveDate', date)}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
                    popperPlacement="bottom-start"
                    popperModifiers={{
                      flip: {
                        enabled: false,
                      },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                      },
                    }}
                    autoComplete="off"
                    isClearable
                  />
                </div>
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
            </div>
            <ButtonToolbar className="form-create__btn">
              <Link
                to={{
                  pathname: '/orders/new',
                  state: { accountId: account.id },
                }}
                className="btn btn-primary"
              >
                Create New Order
              </Link>
              <ButtonCustom
                loading={false}
                className="btn btn-default m-l"
                type="button"
                title="Cancel"
                onClick={this.onClickCancelBtn}
                disabled={!enableBtn}
              />
              <ButtonCustom
                loading={isUpdating}
                className="btn btn-primary"
                type="submit"
                title="Modify"
                titleloading="Modifying"
                disabled={!enableBtn}
              />
            </ButtonToolbar>
          </div>
        </FormAbstract>
      </FormPanel>
    );
  }
}

AccountInfoForm.propTypes = {
  account: PropTypes.object,
  modifyAccount: PropTypes.func,
  updateAccountStatus: PropTypes.func,
};

export default AccountInfoForm;
