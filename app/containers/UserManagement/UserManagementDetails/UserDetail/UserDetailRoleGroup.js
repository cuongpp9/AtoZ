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
export class UserDetailRoleGroup extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderSectionForm() {
    const isNonPaying = true;
    return (
      <form
        className="form form--horizontal form-detail-user-role-group"
        onSubmit={() => {}}
      >
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
      </form>
    );
  }
  render() {
    return <div className="form-section">{this.renderSectionForm()}</div>;
  }
}

UserDetailRoleGroup.propTypes = {};

export default UserDetailRoleGroup;
