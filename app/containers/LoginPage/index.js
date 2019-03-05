import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ButtonCustom } from 'components/commons';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { ButtonToolbar } from 'reactstrap';
import { FormAbstract, FormGroup, RenderField } from 'components/form';
import { SLIDE_UP } from 'react-ladda';
// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
// import reducer from './reducer';
// import saga from './saga';

export class LoginPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { isLogin: false };
  }

  handleSubmit = () => {
    this.setState({ isLogin: true });
    setTimeout(() => {
      this.setState({ isLogin: false });
      this.props.history.push('/');
    }, 1000);
  };

  render() {
    const { handleSubmit } = this.props;
    const { isLogin } = this.state;
    return (
      <div className="login-page login-page--photo">
        <div className="login-page__form">
          <div className="form-wrapper">
            <div className="login-page__title">user login</div>
            <FormAbstract onSubmit={handleSubmit(this.handleSubmit)}>
              <FormGroup>
                <Field
                  name="userId"
                  component={RenderField}
                  type="text"
                  placeholder="User ID"
                />
                <i className="fa fa-user" />
              </FormGroup>
              <FormGroup>
                <Field
                  name="password"
                  component={RenderField}
                  type="password"
                  placeholder="Password"
                />
                <i className="fa fa-key" />
              </FormGroup>
              <ButtonToolbar className="page-login__btn">
                <ButtonCustom
                  loading={isLogin}
                  className="btn btn-primary"
                  type="submit"
                  title="Login"
                  titleloading=""
                  datastyle={SLIDE_UP}
                />
              </ButtonToolbar>
              <div className="login-page__forget-pass">
                Forgot <Link to="/">Password</Link> ?
              </div>
            </FormAbstract>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
};
export default reduxForm({
  form: 'login',
})(LoginPage);
// const withReducer = injectReducer({ key: 'login', reducer });
// const withSaga = injectSaga({ key: 'login', saga });

// export default compose(
//     withReducer,
//     withSaga,
// )(LoginPage);
