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
    // const cur = listCurrency.currencies.find(
    //   el => el.code === account.currency,
    // );
    this.setState({
      // customerSegment: account.customerSegment
      //   ? dataSelect.customerSegment.find(
      //       el => el.value === account.customerSegment,
      //     )
      //   : null,
      // accountType: account.type
      //   ? dataSelect.accountType.find(el => el.value === account.type)
      //   : null,
      // accountSubType: account.subType
      //   ? dataSelect.accountSubType.find(el => el.value === account.subType)
      //   : null,
      // salesChannel: account.salesChannel
      //   ? dataSelect.salesChannel.find(el => el.value === account.salesChannel)
      //   : null,
      // marketSegment: account.marketSegment
      //   ? dataSelect.marketSegment.find(
      //       el => el.value === account.marketSegment,
      //     )
      //   : null,
      // sellingCompany: account.sellingCompany || '',
      // lineOfBusiness: account.lineOfBusiness || '',
      // legalEntity: account.legalEntity || '',
      // reason: account.reason
      //   ? dataSelect.accountReason.find(el => el.value === account.reason)
      //   : null,
      // currency: { label: `${cur.name} (${cur.code})`, value: cur.code },
      status: dataSelect.accountStatus.find(el => el.value === data.status),
      password: data.password || '',
      userType: data.type || '',
      category: data.category || '',
      // effectiveDate: account.effectiveDate
      //   ? moment(account.effectiveDate)
      //   : null,
    });
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { isShowPass } = this.state;
    // const { data } = this.props;

    const { status, password, userType, category } = this.state;
    // console.log('data', data);
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
              onChange={this.onChangeText}
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
            <input type="text" placeholder="User Type" value={userType} />
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
};

export default UserDetailForm;
