import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import shortid from 'shortid';
import moment from 'moment';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { FormGroup, FormAbstract, FormPanel } from 'components/form';
import { dataSelect } from 'constantsApp';
import { ButtonCustom, InputValidate, CheckBox } from 'components/commons';
import { ModalNotificationDelete } from 'components/modals';
class Contact extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      salutation: '',
      firstName: '',
      middleName: '',
      lastName: '',
      position: '',
      organization: '',
      email: '',
      phones: {},
      createdDate: null,
      asBilling: false,
      asShipTo: false,
      asPayment: false,
      asService: false,
      isOpenModalDel: false,
    };
    this.originPhones = {};
  }

  onToggleModal = () => {
    this.setState(preState => ({ isOpenModalDel: !preState.isOpenModalDel }));
  };

  componentDidMount() {
    if (this.props.contact) {
      this.initVal(this.props.contact);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.contact !== nextProps.contact) {
      this.initVal(nextProps.contact);
    }
  }

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

  onClickCancel = () => {
    this.initVal(this.props.contact);
  };

  initVal = contact => {
    const phones = {};
    if (contact.phones) {
      contact.phones.forEach(phone => {
        const id = shortid();
        phones[id] = { number: phone.number, type: phone.type };
        this.originPhones[id] = { number: phone.number, type: phone.type };
      });
    }

    const asBilling = contact.roles.some(el => el === 'BILLING');
    const asShipTo = contact.roles.some(el => el === 'SOLD_TO');
    const asPayment = contact.roles.some(el => el === 'PAYMENT');
    const asService = contact.roles.some(el => el === 'SERVICE');

    this.setState({
      id: contact.id,
      salutation: contact.salutation || '',
      firstName: contact.firstName || '',
      middleName: contact.middleName || '',
      lastName: contact.lastName || '',
      organization: contact.organization || '',
      position: contact.position || '',
      email: contact.email || '',
      asBilling,
      asShipTo,
      asPayment,
      asService,
      phones,
      createdDate: contact.createdDate ? moment(contact.createdDate) : null,
    });
  };

  onHandleUpdateAccount = evt => {
    evt.preventDefault();

    const {
      id,
      salutation,
      firstName,
      middleName,
      lastName,
      position,
      organization,
      email,
      createdDate,
      phones,
    } = this.state;
    const accountDataPost = {
      id: this.props.accountId,
      contacts: [
        {
          id,
          salutation,
          firstName,
          middleName,
          lastName,
          position,
          organization,
          email,
          createdDate: createdDate
            ? moment(createdDate).format('YYYY-MM-DD')
            : null,
          phones: _.values(phones),
          roles: this.parseRoles(),
        },
      ],
    };
    this.props.modifyAccount(accountDataPost, ({ success }) => {
      console.log('update contacts', success);
    });
  };

  onChangePhoneNumber = (evt, id) => {
    const { phones } = this.state;
    phones[id].number = evt.target.value;

    this.setState({ phones });
  };

  onChangePhoneType = (seleted, id) => {
    const { phones } = this.state;
    phones[id].type = seleted.value;

    this.setState({ phones });
  };

  onChangeCheckBox = name => {
    this.setState(preState => ({
      [name]: !preState[name],
    }));
  };

  addPhone = () => {
    const { phones } = this.state;
    phones[shortid()] = {
      number: '',
      type: 'WORK',
    };

    this.setState({ phones });
  };

  removePhone = id => {
    const { phones } = this.state;
    delete phones[id];

    this.setState({ phones });
  };

  parseRoles() {
    const roles = [];
    const { asBilling, asPayment, asShipTo, asService } = this.state;
    if (asBilling) {
      roles.push('BILLING');
    }
    if (asShipTo) {
      roles.push('SOLD_TO');
    }
    if (asPayment) {
      roles.push('PAYMENT');
    }
    if (asService) {
      roles.push('SERVICE');
    }
    return roles;
  }

  render() {
    const {
      id,
      salutation,
      firstName,
      middleName,
      lastName,
      position,
      organization,
      email,
      phones,
      createdDate,
      asBilling,
      asShipTo,
      asService,
      asPayment,
      isOpenModalDel,
    } = this.state;
    const { disableModify } = this.props;

    return (
      <FormPanel title="" className="customer-field">
        <FormAbstract onSubmit={this.onHandleUpdateAccount}>
          <div className="form-inner">
            <div className="form__half">
              <FormGroup title="Id">
                <InputValidate
                  name="id"
                  type="text"
                  value={id}
                  disabled
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Salutation">
                <input
                  type="text"
                  placeholder="Salutation"
                  name="salutation"
                  value={salutation}
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="First Name">
                <InputValidate
                  name="firstName"
                  type="text"
                  value={firstName}
                  placeholder="First Name can not be blank!"
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Middle Name">
                <input
                  type="text"
                  placeholder="Middle Name"
                  name="middleName"
                  value={middleName}
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Last Name">
                <InputValidate
                  name="lastName"
                  type="text"
                  value={lastName}
                  placeholder="Last Name can not be blank!"
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Position">
                <input
                  type="text"
                  placeholder="Position"
                  name="position"
                  value={position}
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Organization">
                <InputValidate
                  name="organization"
                  type="text"
                  value={organization}
                  placeholder="Organization can not be blank!"
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Email">
                <InputValidate
                  name="email"
                  type="text"
                  value={email}
                  placeholder="Email can not be blank!"
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Created Date">
                <div className="date-picker">
                  <DatePicker
                    className="form__form-group-datepicker"
                    selected={createdDate}
                    onChange={date => this.onChangeDate('createdDate', date)}
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
                    disabled={disableModify}
                  />
                </div>
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
              {_.map(phones, (val, key) => (
                <FormGroup
                  key={key}
                  title="Phone"
                  className="form__form-group-phone"
                >
                  <div className="form__form-group-phone-left">
                    <InputValidate
                      name="phone_number"
                      type="text"
                      placeholder="Phone Number"
                      value={val.number}
                      mask={[
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      onChange={evt => this.onChangePhoneNumber(evt, key)}
                      disabled={disableModify}
                    />
                  </div>
                  <div className="form__form-group-phone-right m-b">
                    <Select
                      name="phone_type"
                      type="text"
                      value={{ value: val.type, label: val.type }}
                      options={dataSelect.phoneType}
                      className="form__form-group-select"
                      placeholder="Phone Type"
                      onChange={seleted => this.onChangePhoneType(seleted, key)}
                      isDisabled={disableModify}
                    />
                  </div>
                  {!disableModify && (
                    <button
                      type="button"
                      title="Remove phone"
                      className="form-section__icon-trash"
                      onClick={() => this.removePhone(key)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  )}
                </FormGroup>
              ))}
              {!disableModify && (
                <button
                  type="button"
                  className="btn btn-success form-section__btn-add form-section__btn-add-input"
                  onClick={this.addPhone}
                >
                  Add Phone
                </button>
              )}
            </div>
          </div>
          <FormGroup title="Roles" className="m-t form-group-contact-checkbox">
            <CheckBox
              name="contactBilling"
              label="Use As Billing"
              checked={asBilling}
              onChange={() => this.onChangeCheckBox('asBilling')}
              disabled={disableModify}
            />
            <CheckBox
              name="contactSoldTo"
              label="Use As Ship To"
              checked={asShipTo}
              onChange={() => this.onChangeCheckBox('asShipTo')}
              disabled={disableModify}
            />
            <CheckBox
              name="contactPayment"
              label="Use As Payment"
              checked={asPayment}
              onChange={() => this.onChangeCheckBox('asPayment')}
              disabled={disableModify}
            />
            <CheckBox
              name="contactService"
              label="Use As Service"
              checked={asService}
              onChange={() => this.onChangeCheckBox('asService')}
              disabled={disableModify}
            />
          </FormGroup>
          {!disableModify && (
            <ButtonToolbar className="form-create__btn">
              <Button color="danger" onClick={() => this.onToggleModal()}>
                Delete
              </Button>
              <ButtonCustom
                loading={false}
                className="btn btn-default m-l"
                type="button"
                title="Cancel"
                onClick={this.onClickCancel}
                // disabled={isUpdating}
              />
              <ButtonCustom
                loading={false}
                className="btn btn-primary"
                type="submit"
                title="Modify"
                titleloading="Modifying"
              />
            </ButtonToolbar>
          )}
        </FormAbstract>
        <ModalNotificationDelete
          modalTitle="Contact"
          openModal={isOpenModalDel}
          toggleModal={this.onToggleModal}
        />
      </FormPanel>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object,
  modifyAccount: PropTypes.func,
  accountId: PropTypes.string,
  disableModify: PropTypes.bool,
};

export default Contact;
