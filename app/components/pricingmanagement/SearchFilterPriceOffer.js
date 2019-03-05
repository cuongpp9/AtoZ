import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { dataSelect } from 'constantsApp';
import { RenderSelectField, RenderField } from '../form';
import { ButtonCustom } from '../commons';

export class SearchFilter extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const {
      id,
      name,
      salesChannel,
      marketSegment,
      accountType,
      accountSubType,
      serviceType,
      pricingModel,
      transactionType,
      serviceAddOn,
      itemId,
      status,
    } = result;
    const filter = {
      id: id || null,
      name: name || null,
      salesChannel: salesChannel ? salesChannel.value : null,
      marketSegment: marketSegment ? marketSegment.value : null,
      accountType: accountType ? accountType.value : null,
      accountSubType: accountSubType ? accountSubType.value : null,
      serviceType: serviceType ? serviceType.value : null,
      pricingModel: pricingModel ? pricingModel.value : null,
      transactionType: transactionType ? transactionType.value : null,
      serviceAddOn: serviceAddOn || null,
      itemId: itemId || null,
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
                  name="id"
                  component={RenderField}
                  type="text"
                  placeholder="ID"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="name"
                  component={RenderField}
                  type="text"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="salesChannel"
                  component={RenderSelectField}
                  options={dataSelect.salesChannel.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Sales Channel"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="marketSegment"
                  component={RenderSelectField}
                  options={dataSelect.marketSegment.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Market Segment"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="accountType"
                  component={RenderSelectField}
                  options={dataSelect.accountType.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Account Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="accountSubType"
                  component={RenderSelectField}
                  options={dataSelect.accountSubType.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Ac Sub Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="serviceType"
                  component={RenderSelectField}
                  options={dataSelect.serviceType.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Service Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="pricingModel"
                  component={RenderSelectField}
                  options={dataSelect.pricingModel.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Pricing Model"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="transactionType"
                  component={RenderSelectField}
                  options={dataSelect.transactionType.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Transaction Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="serviceAddOn"
                  component={RenderField}
                  type="text"
                  placeholder="Service AddOn"
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
                  name="status"
                  component={RenderSelectField}
                  options={dataSelect.statusPricing.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
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
  form: 'searchFilterPriceOffer', // a unique identifier for this form
})(SearchFilter);
