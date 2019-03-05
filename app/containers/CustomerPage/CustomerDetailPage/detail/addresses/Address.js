import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import {
  FormGroup,
  FormAbstract,
  FormPanel,
  SelectField,
} from 'components/form';
import { dataSelect } from 'constantsApp';
import { countryList, stateUSData } from 'constantsApp/countryList';
import { ButtonCustom, InputValidate, CheckBox } from 'components/commons';
import { getCities, getZips } from 'utils/utils';
import { ModalNotificationDelete } from 'components/modals';

class Address extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      street: '',
      extraLine: '',
      landmark: '',
      createdDate: null,
      country: '',
      state: '',
      city: '',
      postalCode: '',
      code: '',
      asBilling: false,
      asShipTo: false,
      asPayment: false,
      asService: false,
      isOpenModalDel: false,
    };
  }

  componentDidMount() {
    if (this.props.address) {
      this.initVal(this.props.address);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.address !== nextProps.address) {
      this.initVal(nextProps.address);
    }
  }

  onChangeCheckBox = name => {
    this.setState(preState => ({
      [name]: !preState[name],
    }));
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeDate = (name, date) => {
    this.setState({
      [name]: date,
    });
  };

  onChangeCountry = countryVal => {
    const { country } = this.state;
    if (
      (country && country !== countryVal) ||
      (!country && countryVal === 'USA')
    ) {
      this.setState({
        state: '',
        city: '',
        postalCode: '',
        code: '',
        country: countryVal,
      });
    } else {
      this.setState({ country: countryVal });
    }
  };

  onChangeState = stateVal => {
    const { state } = this.state;
    if (state && state !== stateVal) {
      this.setState({
        state: stateVal,
        city: '',
        postalCode: '',
        code: '',
      });
    } else {
      this.setState({ state: stateVal });
    }
  };

  onChangeCity = cityVal => {
    const { city } = this.state;
    if (city && city !== cityVal) {
      this.setState({
        city: cityVal,
        postalCode: '',
        code: '',
      });
    } else {
      this.setState({ city: cityVal });
    }
  };

  onChangePostalCode = postalCodeVal => {
    const { postalCode } = this.state;
    if (postalCode && postalCode !== postalCodeVal) {
      this.setState({
        postalCode: postalCodeVal,
        code: '',
      });
    } else {
      this.setState({ postalCode: postalCodeVal });
    }
  };

  initVal = address => {
    const asBilling = address.roles.some(el => el === 'BILLING');
    const asShipTo = address.roles.some(el => el === 'SOLD_TO');
    const asPayment = address.roles.some(el => el === 'PAYMENT');
    const asService = address.roles.some(el => el === 'SERVICE');

    this.setState({
      id: address.id,
      street: address.street || '',
      extraLine: address.extraLine || '',
      landmark: address.landmark || '',
      createdDate: address.createdDate ? moment(address.createdDate) : null,
      country: address.country || '',
      state: address.state || '',
      city: address.city || '',
      postalCode: address.postalCode || '',
      code: address.code || '',
      asBilling,
      asShipTo,
      asPayment,
      asService,
    });
  };

  onHandleUpdateAccount = evt => {
    evt.preventDefault();

    const {
      id,
      street,
      extraLine,
      landmark,
      country,
      state,
      city,
      postalCode,
      code,
      createdDate,
    } = this.state;

    const accountDataPost = {
      id: this.props.accountId,
      addresses: [
        {
          id,
          street,
          extraLine,
          landmark,
          country,
          state,
          city,
          postalCode,
          code,
          createdDate: createdDate
            ? moment(createdDate).format('YYYY-MM-DD')
            : null,
          roles: this.parseRoles(),
        },
      ],
    };

    this.props.modifyAccount(accountDataPost, ({ success }) => {
      console.log('modify address', success);
    });
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

  onToggleModal = () => {
    this.setState(preState => ({ isOpenModalDel: !preState.isOpenModalDel }));
  };

  render() {
    const {
      id,
      street,
      extraLine,
      landmark,
      createdDate,
      country,
      state,
      city,
      postalCode,
      code,
      asBilling,
      asShipTo,
      asService,
      asPayment,
      isOpenModalDel,
    } = this.state;
    const { disableModify } = this.props;

    let countrySelected = null;
    let stateSelected = null;
    let citySelected = null;
    let postalCodeSelected = null;

    if (country) {
      const ctr = countryList.find(el => el.value === country);
      countrySelected = {
        label: `${ctr.label} (${ctr.value})`,
        value: ctr.value,
      };
    }

    if (country === 'USA' && state) {
      const st = stateUSData.find(el => el.value === state);
      stateSelected = st
        ? { label: `${st.label} (${st.value})`, value: st.value }
        : null;
    }

    if (country === 'USA' && state && city) {
      const ct = getCities(state).find(el => el.city === city);
      citySelected = ct ? { label: ct.city, value: ct.city } : null;
    }

    if (country === 'USA' && state && city && postalCode) {
      const pc = getZips(city, state).find(el => el.zipcode === postalCode);
      postalCodeSelected = pc ? { label: pc.zipcode, value: pc.zipcode } : null;
    }

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
              <FormGroup title="Street">
                <InputValidate
                  name="street"
                  type="text"
                  placeholder="Street can not be blank!"
                  value={street}
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Extra Line">
                <InputValidate
                  name="extraLine"
                  type="text"
                  placeholder="Extra Line can not be blank!"
                  value={extraLine}
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Landmark">
                <input
                  type="text"
                  placeholder="Landmark"
                  name="landmark"
                  value={landmark}
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
            </div>
            <div className="form__half">
              <FormGroup title="Country">
                <Select
                  value={countrySelected}
                  options={countryList.map(item => ({
                    label: `${item.label} (${item.value})`,
                    value: item.value,
                  }))}
                  placeholder="Country"
                  onChange={val => this.onChangeCountry(val.value)}
                  className="form__form-group-select"
                  inputProps={{
                    autoComplete: 'off',
                    autoCorrect: 'off',
                    spellCheck: 'off',
                  }}
                  isClearable
                  isDisabled={disableModify}
                />
              </FormGroup>
              {country === 'USA' ? (
                <div>
                  <FormGroup title="State">
                    <SelectField
                      name="address_state"
                      placeholder="Field State can not be blank"
                      valueSelected={stateSelected}
                      options={stateUSData.map(item => ({
                        label: `${item.label} (${item.value})`,
                        value: item.value,
                      }))}
                      getValue={this.onChangeState}
                      required
                      isDisabled={disableModify}
                    />
                  </FormGroup>
                  <FormGroup title="City">
                    <SelectField
                      name="address_city"
                      placeholder="City"
                      options={
                        state
                          ? getCities(state).map(item => ({
                              label: item.city,
                              value: item.city,
                            }))
                          : [
                              {
                                label: 'Please select State before',
                                value: null,
                                isDisabled: true,
                              },
                            ]
                      }
                      getValue={this.onChangeCity}
                      valueSelected={citySelected}
                      isResetVal={!state}
                      isDisabled={disableModify}
                    />
                  </FormGroup>
                  <FormGroup title="Postal Code">
                    <SelectField
                      name="address_postalCode"
                      placeholder="Field Postal Code can not be blank"
                      valueSelected={postalCodeSelected}
                      state={state}
                      options={
                        state && city
                          ? getZips(city, state).map(item => ({
                              label: item.zipcode,
                              value: item.zipcode,
                            }))
                          : [
                              {
                                label: 'Please select City before',
                                value: null,
                                isDisabled: true,
                              },
                            ]
                      }
                      getValue={this.onChangePostalCode}
                      required
                      isResetVal={!state || !city}
                      isDisabled={disableModify}
                    />
                  </FormGroup>
                  <FormGroup title="Code">
                    <input
                      type="text"
                      placeholder="Code"
                      name="code"
                      value={code}
                      onChange={this.onChangeText}
                      disabled={disableModify}
                    />
                  </FormGroup>
                </div>
              ) : (
                <div>
                  <FormGroup title="State">
                    <InputValidate
                      name="state"
                      value={state}
                      type="text"
                      placeholder="Field State can not be blank"
                      onChange={this.onChangeText}
                      disabled={disableModify}
                    />
                  </FormGroup>
                  <FormGroup title="City">
                    <InputValidate
                      name="city"
                      value={city}
                      type="text"
                      placeholder="City"
                      onChange={this.onChangeText}
                      disabled={disableModify}
                    />
                  </FormGroup>
                  <FormGroup title="Postal Code">
                    <InputValidate
                      name="postalCode"
                      value={postalCode}
                      type="text"
                      placeholder="Field Postal Code can not be blank"
                      onChange={this.onChangeText}
                      disabled={disableModify}
                    />
                  </FormGroup>
                  <FormGroup title="Code">
                    <input
                      type="text"
                      placeholder="Code"
                      name="code"
                      value={code}
                      onChange={this.onChangeText}
                      disabled={disableModify}
                    />
                  </FormGroup>
                </div>
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
          {!disableModify && (<ButtonToolbar className="form-create__btn">
            <Button color="danger" onClick={() => this.onToggleModal()}>
              Delete
            </Button>
            <ButtonCustom
              loading={false}
              className="btn btn-default m-l"
              type="button"
              title="Cancel"
              onClick={this.handleButtonCancel}
              // disabled={isUpdating}
            />
            <ButtonCustom
              loading={false}
              className="btn btn-primary"
              type="submit"
              title="Modify"
              titleloading="Modifying"
            />
          </ButtonToolbar>)}
        </FormAbstract>
        <ModalNotificationDelete
          modalTitle="Address"
          openModal={isOpenModalDel}
          toggleModal={this.onToggleModal}
        />
      </FormPanel>
    );
  }
}

Address.propTypes = {
  address: PropTypes.object,
  modifyAccount: PropTypes.func,
  accountId: PropTypes.string,
  disableModify: PropTypes.bool,
};

export default Address;
