import React from 'react';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { Button, ButtonToolbar } from 'reactstrap';
import { FormAbstract } from 'components/form';
import { ButtonCustom } from 'components/commons';
import PackageInfo from './PackageInfo';
import PackageComponents from './PackageComponents';
import { createPackage } from '../../actions';

class CreatePackage extends React.PureComponent {
  constructor() {
    super();
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      isPosting: false,
    };
    this.bundles = {};
  }

  onSelectBundle = (id, value) => {
    this.bundles[id] = value;
  };

  unSelectBundle = id => {
    delete this.bundles[id];
  };

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  parseComponent(components) {
    const dataComponents = components.map((item, idx) => ({
      index: item.index || null,
      serviceType: item.serviceType ? item.serviceType.value : null,
      serviceAddOn: item.serviceAddOn || null,
      discountOfferId: item.discountOfferId || null,
      bundleId: this.bundles[idx],
      validityDuration: item.validityDuration || null,
      validityUnit: item.validityUnit ? item.validityUnit.value : null,
    }));
    return dataComponents;
  }

  onhandleCreateBundle = value => {
    const result = value.toJS();
    const {
      id,
      name,
      description,
      status,
      startDate,
      endDate,
      minimumQty,
      maximumQty,
      salesChannel,
      marketSegment,
      accountType,
      accountSubType,
      country,
      currency,
      components,
    } = result;

    this.setState({ isPosting: true });

    const dataCreate = {
      id: id || null,
      name: name || null,
      description: description || null,
      status: status ? status.value : null,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      minimumQty: minimumQty || null,
      maximumQty: maximumQty || null,
      salesChannel: salesChannel ? salesChannel.value : null,
      marketSegment: marketSegment ? marketSegment.value : null,
      accountType: accountType ? accountType.value : null,
      accountSubType: accountSubType ? accountSubType.value : null,
      country: country ? country.value : null,
      currency: currency ? currency.value : null,
      components: components ? this.parseComponent(components) : null,
    };
    this.props.createPackage(dataCreate, () => {
      this.setState({ isPosting: false });
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const { page, isPosting } = this.state;
    return (
      <FormAbstract onSubmit={handleSubmit(this.onhandleCreateBundle)}>
        <PackageInfo className={page === 1 ? '' : 'field-none'} />
        <PackageComponents
          className={page === 2 ? '' : 'field-none'}
          onSelectBundle={this.onSelectBundle}
          unSelectBundle={this.unSelectBundle}
        />
        <ButtonToolbar className="form-create__btn">
          <div className="form-create__group-btn">
            <Button
              color="primary"
              type="button"
              disabled={page === 1}
              className="previous"
              onClick={this.previousPage}
            >
              Back
            </Button>

            <Button
              color="primary"
              type="button"
              disabled={page === 2}
              className={`next ${page === 2 ? 'btn-none' : ''}`}
              onClick={this.nextPage}
            >
              Next
            </Button>
            {page === 2 && (
              <ButtonCustom
                loading={isPosting}
                className="btn btn-primary"
                type="submit"
                title="Create"
                titleloading="Creating"
              />
            )}
          </div>
        </ButtonToolbar>
      </FormAbstract>
    );
  }
}

CreatePackage.propTypes = {
  handleSubmit: PropTypes.func,
};

const withConnect = connect(
  null,
  {
    createPackage,
  },
);

const withReduxForm = reduxForm({
  form: 'form_create_package',
  forceUnregisterOnUnmount: true,
});

export default compose(
  withReduxForm,
  withConnect,
)(CreatePackage);
