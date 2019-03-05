import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { dataSelect } from 'constantsApp';
import { SLIDE_UP } from 'react-ladda';
import { RenderSelectField, RenderField } from '../form';
import { ButtonCustom } from '../commons';
export class SearchFilter extends React.PureComponent {
  onHandleSearch = values => {
    const result = values.toJS();
    const { id, name, status } = result;
    const filter = {
      id: id || null,
      name: name || null,
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
                titleloading=""
                datastyle={SLIDE_UP}
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
  form: 'searchFilterPackageId', // a unique identifier for this form
  destroyOnUnmount: false,
})(SearchFilter);
