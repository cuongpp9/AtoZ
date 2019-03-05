import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { Field, reduxForm } from 'redux-form/immutable';
import { RenderSelectField, RenderField, RenderDatePickerField } from '../form';
import { ButtonCustom } from '../commons';
import { orderSelect } from '../../constantsApp';

export class SearchFilter extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const {
      accountId,
      userId,
      type,
      status,
      effectiveDate,
      submittedDate,
    } = result;
    const filter = {
      accountId: accountId || null,
      userId: userId || null,
      type: type ? type.value : null,
      status: status ? status.value : null,
      effectiveDate: effectiveDate
        ? moment(effectiveDate).format('YYYY-MM-DD')
        : null,
      submittedDate: submittedDate
        ? moment(submittedDate).format('YYYY-MM-DD')
        : null,
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
                  type="text"
                  placeholder="Account Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="User Id"
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
                  component={RenderSelectField}
                  options={orderSelect.type.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={RenderSelectField}
                  options={orderSelect.status.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Status"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="effectiveDate"
                  component={RenderDatePickerField}
                  placeholder="Effective Date"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="submittedDate"
                  component={RenderDatePickerField}
                  placeholder="Submitted Date"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
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
