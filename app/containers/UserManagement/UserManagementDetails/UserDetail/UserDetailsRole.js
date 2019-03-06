import React from 'react';
// import { Field } from 'redux-form/immutable';
// import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { ButtonToolbar } from 'reactstrap';
import { ButtonCustom } from 'components/commons';

// import listCurrency from '../../../constantsApp/currency.json';
// import {
//   FormGroup,
//   RenderSelectField,
//   RenderField,
//   RenderDatePickerField,
// } from '../../../components/form';
import { FormPanel } from '../../../../components/form';
// import { required } from './validate/validate';

const heads = [
  {
    key: 'Role',
    name: 'Role',
  },

  {
    key: 'Remove',
    name: 'Remove',
  },
];

export class UserDetailsRole extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderHeader = header => (
    <th key={header.key} scope="col" className="w-25 p-3">
      {header.name}
    </th>
  );

  renderBody() {
    const { roles = [] } = this.props;
    if (!roles || (roles && !roles.length)) {
      return (
        <tbody>
          <tr>
            <td colSpan={12}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{roles.map(this.renderRow)}</tbody>;
  }

  renderSectionForm() {
    return (
      <form className="form-detail-user-role" onSubmit={() => {}}>
        <FormPanel title="Roles" className="form-panel-user">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>{heads.map(item => this.renderHeader(item))}</tr>
            </thead>
            {this.renderBody()}
          </table>
        </FormPanel>
        <ButtonToolbar className="form-create__btn">
          <div className="ml-5 center-box border-gray px-5 btn-role-name">
            Role Name
          </div>
          <ButtonCustom
            loading={false}
            className=" btn btn-primary ml-5 px-5 mb-2"
            type="submit"
            title="Add New Role(‘s) To User"
            titleloading=" Add New Role(‘s) To User"
          />
        </ButtonToolbar>
      </form>
    );
  }
  render() {
    const { roles = [] } = this.props;
    if (!roles) {
      return this.renderSectionForm();
    }
    return map(roles, (data, key) => (
      <div key={key} className="form-section">
        {this.renderSectionForm()}
      </div>
    ));
  }
}

UserDetailsRole.propTypes = {
  roles: PropTypes.array,
};

export default UserDetailsRole;
