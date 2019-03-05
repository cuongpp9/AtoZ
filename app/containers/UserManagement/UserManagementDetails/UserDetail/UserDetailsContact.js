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
import { FormGroup, FormPanel } from '../../../../components/form';
// import { required } from './validate/validate';
export class UserDetailsContact extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderSectionForm() {
    const isNonPaying = true;
    return (
      <form
        className="form form--horizontal form-detail-user-contact"
        onSubmit={() => {}}
      >
        <div className="user-contact-left">
          <FormGroup title="Salutation" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
          <FormGroup title="First Name" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
          <FormGroup title="Middle Name" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
          <FormGroup title="Last Name" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
          <FormGroup title="Position" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
          <FormGroup title="Organization" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
          <FormGroup title="Email" className="font-weight-bold">
            <input
              name="id"
              type="text"
              placeholder="Id"
              value="asdasd"
              onChange={this.onChangeText}
            />
          </FormGroup>
        </div>
        <div className="user-contact-right">
          <FormPanel title="Phones" className="form-panel-user">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Number</th>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td>abc</td>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td>abc</td>
                </tr>
              </thead>
            </table>
          </FormPanel>
        </div>
      </form>
    );
  }
  render() {
    return <div className="form-section">{this.renderSectionForm()}</div>;
  }
}

UserDetailsContact.propTypes = {};

export default UserDetailsContact;
