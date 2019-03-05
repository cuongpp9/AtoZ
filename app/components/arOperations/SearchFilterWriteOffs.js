import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { arOpsSelect } from 'constantsApp';
import { RenderSelectField, RenderField } from '../form';
import { ButtonCustom } from '../commons';
class SearchFilter extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const { accountId, userId, itemId, type, arType, reason, source } = result;
    const filter = {
      accountId: accountId || null,
      userId: userId || null,
      itemId: itemId || null,
      type: type ? type.value : null,
      arType: arType ? arType.value : null,
      reason: reason ? reason.value : null,
      source: source ? source.value : null,
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
                  name="itemId"
                  component={RenderField}
                  placeholder="Item Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="type"
                  component={RenderSelectField}
                  options={arOpsSelect.type}
                  type="text"
                  placeholder="Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="arType"
                  component={RenderSelectField}
                  options={arOpsSelect.arType}
                  type="text"
                  placeholder="AR Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="reason"
                  component={RenderSelectField}
                  options={arOpsSelect.reason}
                  placeholder="reason"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="source"
                  component={RenderSelectField}
                  options={arOpsSelect.source}
                  placeholder="Source"
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
  form: 'searchFilterAdjustments', // a unique identifier for this form
})(SearchFilter);
