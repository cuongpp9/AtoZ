import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from 'react-select';
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
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
  
  }

  componentWillReceiveProps(nextProps) {
   
  }

  onChangeCheckBox = name => {
    this.props.setValue(preState => ({
      [name]: !preState[name],
    }));
  };

  onChangeText = evt => {
    this.props.setValue({ [evt.target.name]: evt.target.value });
  };

  onChangeDate = (name, date) => {
    this.props.setValue({
      [name]: date,
    });
  };

  onChangeCountry = countryVal => {
    const { country } = this.props.address;
    if (
      (country && country !== countryVal) ||
      (!country && countryVal === 'USA')
    ) {
      this.props.setValue({
        state: '',
        city: '',
        postalCode: '',
        code: '',
        country: countryVal,
      });
    } else {
      this.props.setValue({ country: countryVal });
    }
  };

  onChangeState = stateVal => {
    const { state } = this.props.address;
    if (state && state !== stateVal) {
      this.props.setValue({
        state: stateVal,
        city: '',
        postalCode: '',
        code: '',
      });
    } else {
      this.props.setValue({ state: stateVal });
    }
  };

  onChangeCity = cityVal => {
    const { city } = this.props.address;
    if (city && city !== cityVal) {
      this.props.setValue({
        city: cityVal,
        postalCode: '',
        code: '',
      });
    } else {
      this.props.setValue({ city: cityVal });
    }
  };

  onChangePostalCode = postalCodeVal => {
    const { postalCode } = this.props.address;
    if (postalCode && postalCode !== postalCodeVal) {
      this.props.setValue({
        postalCode: postalCodeVal,
        code: '',
      });
    } else {
      this.props.setValue({ postalCode: postalCodeVal });
    }
  };

  render() {
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
    } = this.props.address;

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
      <div>
        <div className="form-inner border p-4 mt-2" style={{ borderRadius: 10 }}>
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
                />
              </FormGroup>
            <FormGroup title="Street">
              <InputValidate
                name="street"
                type="text"
                placeholder="Street can not be blank!"
                value={street}
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Extra Line">
              <InputValidate
                name="extraLine"
                type="text"
                placeholder="Extra Line can not be blank!"
                value={extraLine}
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Landmark">
              <input
                type="text"
                placeholder="Landmark"
                name="landmark"
                value={landmark}
                onChange={this.onChangeText}
              />
            </FormGroup>
        
          </div>
          <div className="form__half">
            
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
                    required
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
                  />
                </FormGroup>
                <FormGroup title="Code">
                  <input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={code}
                    onChange={this.onChangeText}
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
                  />
                </FormGroup>
                <FormGroup title="City">
                  <InputValidate
                    name="city"
                    value={city}
                    type="text"
                    placeholder="City"
                    onChange={this.onChangeText}
                  />
                </FormGroup>
                <FormGroup title="Postal Code">
                  <InputValidate
                    name="postalCode"
                    value={postalCode}
                    type="text"
                    placeholder="Field Postal Code can not be blank"
                    onChange={this.onChangeText}
                  />
                </FormGroup>
                <FormGroup title="Code">
                  <input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={code}
                    onChange={this.onChangeText}
                  />
                </FormGroup>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
Address.propTypes = {
  address: PropTypes.object,
  setValue: PropTypes.func,

};

export default Address;
