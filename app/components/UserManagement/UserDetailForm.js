import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

import Select from 'react-select';
import { dataSelect } from 'constantsApp';

export class UserDetailForm extends React.PureComponent {
  state = {
    isShowPass: false,
    userType: '',
    password: '',
    status: '',
    category: '',
  };
  handerShowHidePass = () => {
    this.setState(pre => ({
      isShowPass: !pre.isShowPass,
    }));
  };

  componentDidMount() {
    if (this.props.data.id) {
      this.initValue(this.props.data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.id !== nextProps.data && nextProps.data.id) {
      this.initValue(nextProps.data);
    }
  }

  initValue = data => {
    this.setState({
      status: dataSelect.accountStatus.find(el => el.value === data.status),
      password: data.password || '',
      userType: data.type || '',
      category: data.category || '',
    });
  };

  onChangeValueForm = (fieldName, value) => {
    this.props.onChangeValueForm(fieldName, value);
  };

  render() {
    const { status, password, userType, category, isShowPass } = this.state;
    return (
      <div className="form mt-4 mb-3">
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <span style={{ width: 200, marginTop: 10 }}> User Status </span>
            <Select
              value={status}
              options={dataSelect.accountStatus}
              placeholder="User Status"
              className="form__form-group-select"
              onChange={evt => this.onChangeValueForm('status', evt.value)}
            />
          </div>
        </Col>
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <label style={{ width: 170, marginTop: 10 }}> User Password </label>
            <input
              style={{ flex: 1 }}
              value={password}
              name="password"
              type={isShowPass ? 'text' : 'password'}
              placeholder="User Password"
              onChange={evt =>
                this.onChangeValueForm('password', evt.target.value)
              }
            />
            <button
              style={{ width: 130 }}
              className="btn-primary ml-2 cursor-pointer"
              onClick={this.handerShowHidePass}
            >
              {isShowPass ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
        </Col>
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <label style={{ width: 200, marginTop: 10 }}> User Type</label>
            <input
              type="text"
              name="userType"
              placeholder="User Type"
              value={userType}
              onChange={evt => this.onChangeValueForm('type', evt.target.value)}
            />
          </div>
        </Col>
        <Col md={6} lg={6} xl={6} className=" form__form-group pl-0 pr-3">
          <div className="form__form-group-field">
            <label style={{ width: 170, marginTop: 10 }}>User Catagory</label>
            <span className="account-detail" style={{ flex: 1 }}>
              {category}
            </span>
            {/* <input
              style={{ flex: 1 }}
              type="text"
              placeholder="Customer Care Read Only Role"
              value={category}
            /> */}
          </div>
        </Col>
      </div>
    );
  }
}

UserDetailForm.propTypes = {
  data: PropTypes.object,
  onChangeValueForm: PropTypes.func,
};

export default UserDetailForm;
