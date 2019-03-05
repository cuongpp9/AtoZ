import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { Field, reduxForm } from 'redux-form/immutable';
import { invoiceSelect } from 'constantsApp';
import { RenderSelectField, RenderField, RenderDatePickerField } from '../form';
import { ButtonCustom } from '../commons';

class SearchFilter extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const { invoiceDate, dueDate, type, due, status } = result;
    const filter = {
      invoiceDate: invoiceDate
        ? moment(invoiceDate).format('YYYY-MM-DD')
        : null,
      dueDate: dueDate ? moment(dueDate).format('YYYY-MM-DD') : null,
      type: type ? type.value : null,
      due: due || null,
      status: status ? status.value : null,
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
                  name="invoiceDate"
                  component={RenderDatePickerField}
                  placeholder="Invoice Date"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="dueDate"
                  component={RenderDatePickerField}
                  placeholder="Due Date"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="due"
                  component={RenderField}
                  type="number"
                  min={0}
                  placeholder="Due"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="type"
                  component={RenderSelectField}
                  options={invoiceSelect.type}
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
                  options={invoiceSelect.status}
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
  form: 'searchFilterInvoiceUnits', // a unique identifier for this form
})(SearchFilter);
