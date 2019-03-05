import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { Field, reduxForm } from 'redux-form/immutable';
import { dataSelect } from 'constantsApp';
import { RenderSelectField, RenderDatePickerField } from '../form';
import { ButtonCustom } from '../commons';

export class SearchFilterBill extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const { type, status, startDate, endDate } = result;
    const filter = {
      type: type ? type.value : null,
      status: status ? status.value : null,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
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
                  name="type"
                  component={RenderSelectField}
                  options={dataSelect.billType}
                  placeholder="Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={RenderSelectField}
                  options={dataSelect.billStatus}
                  placeholder="Status"
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
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="endDate"
                  component={RenderDatePickerField}
                  placeholder="End Date"
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

SearchFilterBill.propTypes = {
  handleSubmit: PropTypes.func,
  onHandleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
};

export default reduxForm({
  form: 'searchFilterBill',
})(SearchFilterBill);
