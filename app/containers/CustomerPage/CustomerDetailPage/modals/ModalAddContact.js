import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import shortid from 'shortid';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormAbstract, FormGroup } from 'components/form';
import { dataSelect } from 'constantsApp';
import { ButtonCustom, InputValidate, CheckBox } from 'components/commons';
class ModalAddContact extends React.Component {
  constructor(props) {
    super(props);
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
    };
  }

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

  onChangeCheckBox = name => {
    this.setState(preState => ({
      [name]: !preState[name],
    }));
  };

  onChangePhoneNumber = (evt, id) => {
    const { phones } = this.state;
    phones[id].number = evt.target.value;

    this.setState({ phones });
  };

  onChangePhoneType = (val, id) => {
    const { phones } = this.state;
    phones[id].type = val.value;

    this.setState({ phones });
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

  onHandleAddContact = evt => {
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
    const dataContact = {
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
    };
    console.log('onHandleAddContact: ', dataContact);
  };

  toggleModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({
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
    });
  };

  render() {
    const { openModal, modalTitle } = this.props;
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
    return (
      <Modal
        isOpen={openModal}
        toggle={() => this.toggleModal()}
        size="lg"
        className={classNames('modal-custom')}
      >
        <ModalHeader toggle={() => this.toggleModal()}>
          {modalTitle}
        </ModalHeader>
        <ModalBody>
          <FormAbstract onSubmit={this.onHandleAddContact}>
            <div className="form-section">
              <section className="section">
                <div className="form-content body-modal-add-component">
                  <div className="form__half">
                    <FormGroup title="Id">
                      <InputValidate
                        name="id"
                        type="text"
                        placeholder="Id can not be blank!"
                        value={id}
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
                      />
                    </FormGroup>
                    <FormGroup title="First Name">
                      <InputValidate
                        name="firstName"
                        type="text"
                        placeholder="First Name can not be blank!"
                        value={firstName}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Middle Name">
                      <input
                        type="text"
                        placeholder="Middle Name"
                        name="middleName"
                        value={middleName}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Last Name">
                      <InputValidate
                        name="lastName"
                        type="text"
                        placeholder="Last Name can not be blank!"
                        value={lastName}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Position">
                      <input
                        type="text"
                        placeholder="Position"
                        name="position"
                        value={position}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                  </div>
                  <div className="form__half">
                    <FormGroup title="Organization">
                      <InputValidate
                        name="organization"
                        type="text"
                        placeholder="Organization can not be blank!"
                        value={organization}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Email">
                      <InputValidate
                        name="email"
                        type="text"
                        placeholder="Email can not be blank!"
                        value={email}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Created Date">
                      <div className="date-picker">
                        <DatePicker
                          className="form__form-group-datepicker"
                          selected={createdDate}
                          onChange={date =>
                            this.onChangeDate('createdDate', date)
                          }
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
                            onChange={evt => this.onChangePhoneNumber(evt, key)}
                          />
                        </div>
                        <div className="form__form-group-phone-right m-b">
                          <Select
                            name="phone_type"
                            type="text"
                            options={dataSelect.phoneType}
                            className="form__form-group-select"
                            placeholder="Phone Type"
                            onChange={value =>
                              this.onChangePhoneType(value, key)
                            }
                          />
                        </div>
                        <button
                          type="button"
                          title="Remove phone"
                          className="form-section__icon-trash"
                          onClick={() => this.removePhone(key)}
                        >
                          <i className="fa fa-trash" />
                        </button>
                      </FormGroup>
                    ))}
                    <button
                      type="button"
                      className="btn btn-success form-section__btn-add form-section__btn-add-input"
                      onClick={() => this.addPhone()}
                    >
                      Add Phone
                    </button>
                  </div>

                  <FormGroup
                    title="Roles"
                    className="m-t form-group-contact-checkbox"
                  >
                    <CheckBox
                      name="contactBilling"
                      label="Use As Billing"
                      onChange={() => this.onChangeCheckBox('asBilling')}
                    />
                    <CheckBox
                      name="contactSoldTo"
                      label="Use As Ship To"
                      onChange={() => this.onChangeCheckBox('asShipTo')}
                    />
                    <CheckBox
                      name="contactPayment"
                      label="Use As Payment"
                      onChange={() => this.onChangeCheckBox('asPayment')}
                    />
                    <CheckBox
                      name="contactService"
                      label="Use As Service"
                      onChange={() => this.onChangeCheckBox('asService')}
                    />
                  </FormGroup>
                </div>
              </section>
            </div>
          </FormAbstract>
        </ModalBody>
        <ModalFooter>
          <ButtonCustom
            // loading={isPosting}
            className="btn btn-primary"
            type="submit"
            title="Add New"
            titleloading="Modifying"
            onClick={evt => this.onHandleAddContact(evt)}
          />
          <Button color="secondary" onClick={() => this.toggleModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalAddContact.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default ModalAddContact;
