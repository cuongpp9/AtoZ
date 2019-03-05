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
      company,
      revenueType,
      productFamily,
      productLine,
      productType,
      productSubType,
      status,
    } = result;
    const filter = {
      id: id || null,
      name: name || null,
      company: company || null,
      revenueType: revenueType ? revenueType.value : null,
      productFamily: productFamily || null,
      productLine: productLine || null,
      productType: productType || null,
      productSubType: productSubType || null,
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
                  name="company"
                  component={RenderField}
                  type="text"
                  placeholder="Company"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="revenueType"
                  component={RenderSelectField}
                  options={dataSelect.revenueType.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Revenue Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="productFamily"
                  component={RenderField}
                  type="text"
                  placeholder="Product Family"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="productLine"
                  component={RenderField}
                  type="text"
                  placeholder="Product Line"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="productType"
                  component={RenderField}
                  type="text"
                  placeholder="Product Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="productSubType"
                  component={RenderField}
                  type="text"
                  placeholder="Product Sub Type"
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
  form: 'searchFilterItems', // a unique identifier for this form
})(SearchFilter);
