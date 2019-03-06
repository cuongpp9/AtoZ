import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { ButtonToolbar } from 'reactstrap';
import { ButtonCustom } from 'components/commons';
import { FormPanel } from '../../../../components/form';

const heads = [
  {
    key: 'Role Group Id',
    name: 'Role Group Id',
  },
  {
    key: 'Remove',
    name: 'Remove',
  },
];

export class UserDetailRoleGroup extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderHeader = header => (
    <th key={header.key} scope="col" className="w-25 p-3">
      {header.name}
    </th>
  );

  renderRow = row => (
    <tr key={row.index}>
      <td>{row.roleGroupId}</td>
      <td
        style={{ cursor: 'pointer' }}
        onClick={() => this.handleRemoveButton(row.roleId)}
      >
        <i className="fa fa-times font-size-25" />
      </td>
    </tr>
  );

  renderBody() {
    const { roleGroups = [] } = this.props;
    if (!roleGroups || (roleGroups && !roleGroups.length)) {
      return (
        <tbody>
          <tr>
            <td colSpan={12}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{roleGroups.map(this.renderRow)}</tbody>;
  }

  renderSectionForm() {
    return (
      <form className="form-detail-user-role-group" onSubmit={() => {}}>
        <FormPanel title="Phones" className="form-panel-user">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>{heads.map(item => this.renderHeader(item))}</tr>
            </thead>
            {this.renderBody()}
          </table>
        </FormPanel>
        <ButtonToolbar className="form-create__btn">
          <div className="ml-5 center-box border-gray px-5 btn-role-group-name">
            Role Group Name
          </div>
          <ButtonCustom
            loading={false}
            className=" btn btn-primary ml-5 px-5 mb-2"
            type="submit"
            title="Add New Role Group(‘s) To User"
            titleloading=" Add New Role Group(‘s) To User"
          />
        </ButtonToolbar>
      </form>
    );
  }
  render() {
    const { roleGroups = {} } = this.props;
    if (!roleGroups) {
      return this.renderSectionForm();
    }
    return map(roleGroups, (data, key) => (
      <div key={key} className="form-section">
        {this.renderSectionForm()}
      </div>
    ));
  }
}

UserDetailRoleGroup.propTypes = {
  roleGroups: PropTypes.array,
};

export default UserDetailRoleGroup;
