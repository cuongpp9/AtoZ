import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { userManagementSelect } from 'constantsApp';
import { RenderField, RenderSelectField } from '../form';
import { ButtonCustom } from '../commons';

export class SearchFilter extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const {
      userId,
      type,
      status,
      category,
      firstName,
      lastName,
      city,
      stateUser,
    } = result;
    const filter = {
      userId: userId || null,
      type: type || null,
      status: (status && status.value) || null,
      category: (category && category.value) || null,
      firstName: firstName || null,
      lastName: lastName || null,
      city: city || null,
      stateUser: stateUser || null,
    };
    this.props.onHandleSearch(filter);
  };

  render() {
    const { handleSubmit, isSearching } = this.props;
    return (
      <div className="user-search-filter">
        <Col md={12} lg={12} xl={12} className="mx-0 mt-3 px-0">
          <form className="form" onSubmit={handleSubmit(this.onHandleSearch)}>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="userId"
                  component={RenderField}
                  type="text"
                  placeholder="User Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="type"
                  component={RenderField}
                  type="text"
                  placeholder="Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={RenderSelectField}
                  options={userManagementSelect.accountStatus}
                  placeholder="Status"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="category"
                  component={RenderSelectField}
                  options={userManagementSelect.userCategory}
                  placeholder="Category"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="firstName"
                  component={RenderField}
                  type="text"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="lastName"
                  component={RenderField}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="city"
                  component={RenderField}
                  type="text"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="state"
                  component={RenderField}
                  type="text"
                  placeholder="State"
                />
              </div>
            </div>
            <ButtonToolbar className="form__button-toolbar">
              <ButtonCustom
                loading={isSearching}
                className="btn btn-primary"
                type="submit"
                title="Search"
                titleloading="Searching"
              />
            </ButtonToolbar>
          </form>
        </Col>
      </div>
    );
  }
}

SearchFilter.propTypes = {
  handleSubmit: PropTypes.func,
  onHandleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
};

export default reduxForm({
  form: 'searchFilter', // a unique identifier for this form
})(SearchFilter);
