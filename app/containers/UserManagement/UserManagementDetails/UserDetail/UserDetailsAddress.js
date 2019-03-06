import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { FormGroup } from '../../../../components/form';
// import { required } from './validate/validate';
export class UserDetailsAddress extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  onChangeValueForm = (fieldName, value) => {
    const {
      data: { address = [] },
    } = this.props;
    address[0][fieldName] = value;
    this.props.onChangeValueForm(fieldName, address);
  };

  renderSectionForm(data) {
    // console.log('data', data);
    const {
      street = '',
      country = '',
      city = '',
      postalCode = '',
      state = '',
    } = data;
    // const isNonPaying = true;
    return (
      <form
        className="form form--horizontal form-detail-user-address"
        onSubmit={() => {}}
      >
        {/* <div className="form__half">
          <FormGroup title="Number" className="font-weight-bold">
            <input
              name="Number"
              type="text"
              placeholder="Number"
              value=""
              onChange={this.onChangeText}
            />
          </FormGroup>
        </div> */}
        <div className="form__half">
          <FormGroup title="State" className="font-weight-bold">
            <input
              name="state"
              type="text"
              placeholder="State"
              value={state}
              onChange={evt =>
                this.onChangeValueForm('state', evt.target.value)
              }
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Street" className="font-weight-bold">
            <input
              name="street"
              type="text"
              placeholder="Street"
              value={street}
              onChange={evt =>
                this.onChangeValueForm('street', evt.target.value)
              }
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Postal Code" className="font-weight-bold">
            <input
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={evt =>
                this.onChangeValueForm('postalCode', evt.target.value)
              }
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup
            title="City"
            className="user_details_address font-weight-bold"
          >
            <input
              name="city"
              type="text"
              placeholder="City"
              value={city}
              onChange={evt => this.onChangeValueForm('city', evt.target.value)}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Country" className="font-weight-bold">
            <input
              name="country"
              type="text"
              placeholder="Country"
              value={country}
              onChange={evt =>
                this.onChangeValueForm('country', evt.target.value)
              }
            />
          </FormGroup>
        </div>
      </form>
    );
  }
  render() {
    const {
      data: { address = [] },
    } = this.props;
    return map(address, (data, key) => (
      <div key={key} className="form-section">
        {this.renderSectionForm(data)}
      </div>
    ));
  }
}

UserDetailsAddress.propTypes = {
  data: PropTypes.object,
  onChangeValueForm: PropTypes.func,
};

export default UserDetailsAddress;
