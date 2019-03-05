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
    const { id, bundleId, packageId, type } = result;
    const filter = {
      id: id || null,
      bundleId: bundleId || null,
      packageId: packageId || null,
      type: type ? type.value : null,
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
                  name="bundleId"
                  component={RenderField}
                  type="text"
                  placeholder="Bundle Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="packageId"
                  component={RenderField}
                  type="text"
                  placeholder="Package Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="type"
                  component={RenderSelectField}
                  options={dataSelect.dependencyType.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Type"
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
  form: 'searchFilterDpendencies', // a unique identifier for this form
})(SearchFilter);
