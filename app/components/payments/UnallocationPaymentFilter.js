import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form/immutable';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { selectItemsId } from 'containers/App/actions';
import { RenderField, RenderDatePickerField } from '../form';
import { ButtonCustom } from '../commons';

class UnallocationPaymentFilter extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  onHandleSearch = values => {
    const result = values.toJS();
    const { invoiceUnitId, paymentDate } = result;
    const filter = {
      invoiceUnitId: invoiceUnitId || null,
      paymentDate: paymentDate
        ? moment(paymentDate).format('YYYY-MM-DD')
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
                  name="paymentDate"
                  component={RenderDatePickerField}
                  placeholder="Payments After this date"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </div>
            </div>

            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="invoiceUnitId"
                  component={RenderField}
                  placeholder="Invoice Id"
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

UnallocationPaymentFilter.propTypes = {
  handleSubmit: PropTypes.func,
  onHandleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
};

const withConnect = connect(
  null,
  {
    selectItemsId,
  },
);

const withReduxForm = reduxForm({
  form: 'UnallocationPaymentFilters', // a unique identifier for this form
});

export default compose(
  withConnect,
  withReduxForm,
)(UnallocationPaymentFilter);
