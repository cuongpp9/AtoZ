import React from 'react';
import { Col } from 'reactstrap';

import Select from 'react-select';

export class CreateRoleForm extends React.PureComponent {
  state = {};
  render() {
    return (
      <div className="form">
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <label style={{ width: 150, marginTop: 10 }}> Role Name </label>
            <input type="text" placeholder="Care Read Only" />
          </div>
        </Col>
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <span style={{ width: 200, marginTop: 10 }}> Role Status </span>
            <Select
              placeholder="Role Status"
              className="form__form-group-select"
            />
          </div>
        </Col>
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <label style={{ width: 150, marginTop: 10 }}> Role Type</label>
            <input type="text" placeholder="Role Type" />
          </div>
        </Col>
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <label style={{ width: 200, marginTop: 10 }}>
              Role Description
            </label>
            <input type="text" placeholder="Customer Care Read Only Role" />
          </div>
        </Col>
      </div>
    );
  }
}

CreateRoleForm.propTypes = {};

export default CreateRoleForm;
