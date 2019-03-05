import React from 'react';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, ButtonToolbar } from 'reactstrap';
import { FormAbstract, FormPanel } from 'components/form';
import BundleInfo from './BundleInfo';
import { createBundle } from '../../actions';
import BundleComponents from './BundleComponents';

class CreateBundle extends React.PureComponent {
  constructor() {
    super();
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      isPosting: false,
    };

    this.bundles = {};
    this.priceOffers = {};
  }

  onSelectBundle = (id, value) => {
    this.bundles[id] = value;
  };

  onSelectPriceOffer = (id, value) => {
    this.priceOffers[id] = value;
  };

  unSelectBundle = id => {
    delete this.bundles[id];
  };

  unSelectPriceOffer = id => {
    delete this.priceOffers[id];
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
      priceOfferId: this.priceOffers[idx] || null,
      discountOfferId: item.discountOfferId || null,
      bundleId: this.bundles[idx] || null,
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
    this.props.createBundle(dataCreate, () => {
      this.setState({ isPosting: false });
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const { page } = this.state;
    return (
      <FormAbstract onSubmit={handleSubmit(this.onhandleCreateBundle)}>
        {page === 1 && (
          <FormPanel title="Bundle">
            <BundleInfo />
          </FormPanel>
        )}
        {page === 2 && (
          <FormPanel title="Components">
            <BundleComponents
              onSelectBundle={this.onSelectBundle}
              onSelectPriceOffer={this.onSelectPriceOffer}
              unSelectBundle={this.unSelectBundle}
              unSelectPriceOffer={this.unSelectPriceOffer}
            />
          </FormPanel>
        )}

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
              <Button color="primary" type="submit">
                Create
              </Button>
            )}
          </div>
        </ButtonToolbar>
      </FormAbstract>
    );
  }
}

CreateBundle.propTypes = {
  handleSubmit: PropTypes.func,
  createBundle: PropTypes.func,
};

const withConnect = connect(
  null,
  {
    createBundle,
  },
);

const withReduxForm = reduxForm({
  form: 'form_create_bundle',
  forceUnregisterOnUnmount: true,
});

export default compose(
  withReduxForm,
  withConnect,
)(CreateBundle);
