import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { paymentSelect } from 'constantsApp';
import moment from 'moment';
import { RenderSelectField, RenderField } from '../form';

import { ButtonCustom } from '../commons';

class SearchFilter extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const { firstName, lastName, city, state, organization, status } = result;

    const filter = {
      firstName: firstName || null,
      lastName: lastName || null,
      city: city || null,
      state: state || null,
      organization: organization || null,
      status: (status && status.value) || null,
    };
    this.props.onHandleSearch(filter);
  };

  render() {
    const { handleSubmit, isSearching } = this.props;
    return (
      <div className="search-filter">
        <Col md={12} lg={12} xl={12}>
          <form className="form" onSubmit={handleSubmit(this.onHandleSearch)}>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="firstName"
                  component={RenderField}
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="lastName"
                  component={RenderField}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field name="city" component={RenderField} placeholder="City" />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="state"
                  component={RenderField}
                  placeholder="State"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="organization"
                  component={RenderField}
                  placeholder="Organization"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={RenderSelectField}
                  options={paymentSelect.accountStatus}
                  type="text"
                  placeholder="Status"
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
  form: 'searchAccounts', // a unique identifier for this form
})(SearchFilter);
