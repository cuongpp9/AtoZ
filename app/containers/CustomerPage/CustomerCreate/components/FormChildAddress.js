import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, SelectField, InputField } from 'components/form';
import { countryList, stateUSData } from 'constantsApp/countryList';
import { getCities, getZips } from 'utils/utils';

class FormChildAddress extends React.Component {
  constructor(props) {
    super(props);
    const { country, state, city, postalCode, code } = this.initValues(props);
    this.state = {
      country,
      state,
      city,
      postalCode,
      code,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.valuesInit !== nextProps.valuesInit) {
      const { country, state, city, postalCode, code } = this.initValues(nextProps);
      this.setState({
        country,
        city,
        state,
        postalCode,
        code,
      });
    }
  }

  initValues(props) {
    const { valuesInit, onSelectCountry, onSelectState, onSelectCity, onSelectPostalCode, onSelectCode, idx } = props;
    const { country = '', state = '', city = '', postalCode = '', code = '' } = valuesInit;
    onSelectCountry(idx, country);
    onSelectState(idx, state);
    onSelectCity(idx, city);
    onSelectPostalCode(idx, postalCode);
    onSelectCode(idx, code);
    return {
      country,
      state,
      city,
      postalCode,
      code
    }
  }

  getCountry = countryVal => {
    this.setState({ country: countryVal });
    const {
      idx,
      onSelectCountry,
      unSelectState,
      unSelectCity,
      unSelectPostalCode,
      unSelectCode,
    } = this.props;
    const { country } = this.state;
    onSelectCountry(idx, countryVal);
    if (
      (country && country !== countryVal) ||
      (!country && countryVal === 'USA')
    ) {
      this.setState({
        state: '',
        city: '',
        postalCode: '',
        code: '',
      });
      unSelectState(idx);
      unSelectCity(idx);
      unSelectPostalCode(idx);
      unSelectCode(idx);
    }
  };

  getState = stateVal => {
    this.setState({ state: stateVal });
    const {
      idx,
      onSelectState,
      unSelectState,
      unSelectCity,
      unSelectPostalCode,
      unSelectCode,
    } = this.props;
    const { state } = this.state;
    onSelectState(idx, stateVal);
    if (state && state !== stateVal) {
      this.setState({
        city: '',
        postalCode: '',
        code: '',
      });
      unSelectState(idx);
      unSelectCity(idx);
      unSelectPostalCode(idx);
      unSelectCode(idx);
    }
  };

  getCity = cityVal => {
    this.setState({ city: cityVal });
    const {
      idx,
      onSelectCity,
      unSelectCity,
      unSelectPostalCode,
      unSelectCode,
    } = this.props;
    const { city } = this.state;
    onSelectCity(idx, cityVal);
    if (city && city !== cityVal) {
      this.setState({
        postalCode: '',
        code: '',
      });
      unSelectCity(idx);
      unSelectPostalCode(idx);
      unSelectCode(idx);
    }
  };

  getPosttalCode = postalCodeVal => {
    this.setState({ postalCode: postalCodeVal });
    const {
      idx,
      onSelectPostalCode,
      unSelectPostalCode,
      unSelectCode,
    } = this.props;
    const { postalCode } = this.state;
    onSelectPostalCode(idx, postalCodeVal);
    if (postalCode && postalCode !== postalCodeVal) {
      this.setState({
        code: '',
      });
      unSelectPostalCode(idx);
      unSelectCode(idx);
    }
  };

  getCode = codeVal => {
    this.setState({ code: codeVal });
    const { idx, onSelectCode, unSelectCode } = this.props;
    const { code } = this.state;
    onSelectCode(idx, codeVal);
    if (code && code !== codeVal) {
      unSelectCode(idx);
    }
  };

  getStateInput = stateVal => {
    this.setState({ state: stateVal });
    const {
      idx,
      onSelectState,
      unSelectState,
      unSelectCity,
      unSelectPostalCode,
      unSelectCode,
    } = this.props;
    const { state } = this.state;
    onSelectState(idx, stateVal);
    if (state && state !== stateVal) {
      unSelectState(idx);
      unSelectCity(idx);
      unSelectPostalCode(idx);
      unSelectCode(idx);
    }
  };

  getCityInput = cityVal => {
    this.setState({ city: cityVal });
    const {
      idx,
      onSelectCity,
      unSelectCity,
      unSelectPostalCode,
      unSelectCode,
    } = this.props;
    const { city } = this.state;
    onSelectCity(idx, cityVal);
    if (city && city !== cityVal) {
      unSelectCity(idx);
      unSelectPostalCode(idx);
      unSelectCode(idx);
    }
  };

  getPosttalCodeInput = postalCodeVal => {
    this.setState({ postalCode: postalCodeVal });
    const {
      idx,
      onSelectPostalCode,
      unSelectPostalCode,
      unSelectCode,
    } = this.props;
    const { postalCode } = this.state;
    onSelectPostalCode(idx, postalCodeVal);
    if (postalCode && postalCode !== postalCodeVal) {
      unSelectPostalCode(idx);
      unSelectCode(idx);
    }
  };

  render() {
    const { address, disabled } = this.props;
    const { country, state, city, postalCode, code } = this.state;
    let countrySelected = null;
    let stateSelected = null;
    let citySelected = null;
    let postalCodeSelected = null;
    if (country) {
      const countryTmp = countryList.find(item => item.value === country);
      countrySelected = countryTmp ? { label: `${countryTmp.label} (${countryTmp.value})`, value: countryTmp.value } : null;
    }
    if (country === 'USA') {
      const stateTmp = stateUSData.find(st => st.value === state);
      stateSelected = stateTmp ? { label: `${stateTmp.label} (${stateTmp.value})`, value: stateTmp.value } : null;
    }
    if (country === 'USA' && state) {
      const cityTmp = getCities(state).find(ct => ct.city === city);
      citySelected = cityTmp ? { label: cityTmp.city, value: cityTmp.city } : null;
    }
    if (country === 'USA' && state && city) {
      const postalCodeTmp = getZips(city, state).find(item => item.zipcode === postalCode);
      postalCodeSelected = postalCodeTmp ? { label: postalCodeTmp.zipcode, value: postalCodeTmp.zipcode } : null
    }
 
    return (
      <div className="form__half">
        <FormGroup title="Country">
          <SelectField
            name={`${address}.country`}
            options={countryList.map(item => ({
              label: `${item.label} (${item.value})`,
              value: item.value,
            }))}
            valueSelected={countrySelected}
            placeholder="Country"
            getValue={this.getCountry}
            required
            isDisabled={disabled}
          />
        </FormGroup>
        {country === 'USA' ? (
          <div>
            <FormGroup title="State">
              <SelectField
                name={`${address}.state`}
                placeholder="Field State can not be blank"
                valueSelected={stateSelected}
                options={stateUSData.map(item => ({
                  label: `${item.label} (${item.value})`,
                  value: item.value,
                }))}
                getValue={this.getState}
                required
                isDisabled={disabled}
              />
            </FormGroup>
            <FormGroup title="City">
              <SelectField
                name={`${address}.city`}
                placeholder="City"
                valueSelected={citySelected}
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
                getValue={this.getCity}
                isResetVal={!state}
                required
                isDisabled={disabled}
              />
            </FormGroup>
            <FormGroup title="Postal Code">
              <SelectField
                name={`${address}.postalCode`}
                placeholder="Field Postal Code can not be blank"
                valueSelected={postalCodeSelected}
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
                getValue={this.getPosttalCode}
                required
                isResetVal={!state || !city}
                isDisabled={disabled}
              />
            </FormGroup>
            <FormGroup title="Code">
              <InputField
                name={`${address}.code`}
                value={code}
                type="text"
                placeholder="Code"
                getValue={this.getCode}
                disabled={disabled}
              />
            </FormGroup>
          </div>
        ) : (
          <div>
            <FormGroup title="State">
              <InputField
                name={`${address}.state`}
                value={state}
                type="text"
                placeholder="Field State can not be blank"
                getValue={this.getStateInput}
                required
                disabled={disabled}
              />
            </FormGroup>
            <FormGroup title="City">
              <InputField
                name={`${address}.city`}
                value={city}
                type="text"
                placeholder="City"
                getValue={this.getCityInput}
                disabled={disabled}
              />
            </FormGroup>
            <FormGroup title="Postal Code">
              <InputField
                name={`${address}.postalCode`}
                value={postalCode}
                type="text"
                placeholder="Field Postal Code can not be blank"
                getValue={this.getPosttalCodeInput}
                required
                disabled={disabled}
              />
            </FormGroup>
            <FormGroup title="Code">
              <InputField
                name={`${address}.code`}
                value={code}
                type="text"
                placeholder="Code"
                getValue={this.getCode}
                disabled={disabled}
              />
            </FormGroup>
          </div>
        )}
      </div>
    );
  }
}

FormChildAddress.propTypes = {
  address: PropTypes.any,
  onSelectCountry: PropTypes.func,
  unSelectCountry: PropTypes.func,
  onSelectState: PropTypes.func,
  unSelectState: PropTypes.func,
  onSelectCity: PropTypes.func,
  unSelectCity: PropTypes.func,
  onSelectPostalCode: PropTypes.func,
  unSelectPostalCode: PropTypes.func,
  onSelectCode: PropTypes.func,
  unSelectCode: PropTypes.func,
  state: PropTypes.string,
  city: PropTypes.string,
  postalCode: PropTypes.string,
  code: PropTypes.string,
  valuesInit: PropTypes.object,
  disabled: PropTypes.bool,
};

export default FormChildAddress;
