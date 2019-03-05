import React from 'react';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { userManagementSelect } from 'constantsApp';

export class CreateRoleGroupsForm extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  onChangeValueForm = (fieldName, value) => {
    this.props.onChangeValueForm(fieldName, value);
  };
  render() {
    const { data } = this.props;

    return (
      <div className="form mt-3 mx-3 ">
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <label style={{ width: 150, marginTop: 10 }}>Role Group Name</label>
            <input
              type="text"
              value={data.name}
              onChange={evt => this.onChangeValueForm('name', evt.target.value)}
              placeholder="Care Read Only"
            />
          </div>
        </Col>
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <span style={{ width: 200, marginTop: 10 }}>Role Group Status</span>
            <Select
              placeholder="Role Status"
              className="form__form-group-select"
              options={userManagementSelect.permissionStatus}
              onChange={evt => this.onChangeValueForm('status', evt.value)}
              value={{ value: data.status, label: data.status }}
            />
          </div>
        </Col>
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <label style={{ width: 150, marginTop: 10 }}>Role Group Type</label>
            <input
              type="text"
              value={data.type}
              placeholder="Role Type"
              onChange={evt => this.onChangeValueForm('type', evt.target.value)}
            />
          </div>
        </Col>
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <label style={{ width: 200, marginTop: 10 }}>
              Role Group Description
            </label>
            <input
              type="text"
              value={data.description}
              placeholder="Customer Care Read Only Role"
              onChange={evt =>
                this.onChangeValueForm('description', evt.target.value)
              }
            />
          </div>
        </Col>
      </div>
    );
  }
}

CreateRoleGroupsForm.propTypes = {
  data: PropTypes.object,
  onChangeValueForm: PropTypes.func,
};
CreateRoleGroupsForm.defaultProps = {
  data: {},
  onChangeValueForm: () => {},
};
export default CreateRoleGroupsForm;
