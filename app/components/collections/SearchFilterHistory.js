import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { collectionsSelect } from 'constantsApp';
import moment from 'moment';
import { RenderSelectField, RenderField, RenderDatePickerField } from '../form';

import { ButtonCustom } from '../commons';

class SearchFilterHistory extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const { startDate, userId, status, accountId } = result;
    const filter = {
      accountId: accountId || null,
      userId: userId || null,
      status: (status && status.value) || null,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
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
                  name="accountId"
                  component={RenderField}
                  placeholder="Account Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="userId"
                  component={RenderField}
                  placeholder="User Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="startDate"
                  component={RenderDatePickerField}
                  placeholder="Start Date"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={RenderSelectField}
                  options={collectionsSelect.status}
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

SearchFilterHistory.propTypes = {
  handleSubmit: PropTypes.func,
  onHandleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
};

export default reduxForm({
  form: 'SearchFilterHistory', // a unique identifier for this form
})(SearchFilterHistory);
