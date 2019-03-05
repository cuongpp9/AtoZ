import React from 'react';
// import { Field } from 'redux-form/immutable';
// import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
// import listCurrency from '../../../constantsApp/currency.json';
// import {
//   FormGroup,
//   RenderSelectField,
//   RenderField,
//   RenderDatePickerField,
// } from '../../../components/form';
import { FormGroup } from '../../../../components/form';
// import { required } from './validate/validate';
export class UserDetailsAddress extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderSectionForm() {
    const isNonPaying = true;
    return (
      <form
        className="form form--horizontal form-detail-user"
        onSubmit={() => {}}
      >
        <div className="form__half">
          <FormGroup title="Numer" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="State" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Street" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup
            title="Postal Code"
            className="user_details_address font-weight-bold"
          >
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="City" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup
            title="Country"
            className="user_details_address font-weight-bold"
          >
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
        </div>
      </form>
    );
  }
  render() {
    return <div className="form-section">{this.renderSectionForm()}</div>;
  }
}

UserDetailsAddress.propTypes = {};

export default UserDetailsAddress;
