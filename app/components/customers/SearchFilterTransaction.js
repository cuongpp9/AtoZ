import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { Field, reduxForm } from 'redux-form/immutable';
import { dataSelect } from 'constantsApp';
import { RenderSelectField, RenderField, RenderDatePickerField } from '../form';
import { ButtonCustom } from '../commons';

export class SearchFilterTransaction extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const {
      billUnitId,
      type,
      serviceType,
      itemId,
      startDate,
      endDate,
    } = result;
    const filter = {
      billUnitId: billUnitId || null,
      type: type ? type.value : null,
      serviceType: serviceType ? serviceType.value : null,
      itemId: itemId || null,
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
                  name="billUnitId"
                  component={RenderField}
                  type="text"
                  placeholder="Bill Unit Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="type"
                  component={RenderSelectField}
                  options={dataSelect.transactionType}
                  placeholder="Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="serviceType"
                  component={RenderSelectField}
                  options={dataSelect.serviceType}
                  placeholder="Service Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="itemId"
                  component={RenderField}
                  type="text"
                  placeholder="Item Id"
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

SearchFilterTransaction.propTypes = {
  handleSubmit: PropTypes.func,
  onHandleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
};

export default reduxForm({
  form: 'searchFilterTransaction',
})(SearchFilterTransaction);
