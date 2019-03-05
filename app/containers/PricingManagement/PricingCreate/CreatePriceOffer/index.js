import React from 'react';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ButtonToolbar } from 'reactstrap';
import { FormAbstract } from 'components/form';
import { ButtonCustom } from 'components/commons';
import { ModalSelectItem } from 'components/modals';
import { selectItemsId } from 'containers/App/actions';
import { createPriceOffer } from '../../actions';
import PriceOfferInfo from './PriceOfferInfo';
import CustomerPricingCreate from './CustomerPricing';
import FlatPricingCreate from './FlatPricing';
import RecurringPricingCreate from './RecurringPricing';

class CreatePriceOffer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      page: 1,
      isPosting: false,
      items: [],
      itemId: '',
      openModal: false,
      size: 20,
      isSearching: false,
    };
  }

  componentDidMount() {
    this.props.selectItemsId({ page: 1, size: 20 }, ({ data }) => {
      this.setState({ items: data });
    });
  }

  onToggleModal = () => {
    this.setState(preState => ({ openModal: !preState.openModal }));
  };

  onSelectItem = itemId => {
    this.setState({ itemId });
  };

  unSelectItem = () => {
    this.setState({ itemId: '', openModal: false });
  };

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.selectItemsId(
      {
        page: 1,
        size: 20,
        filter,
      },
      ({ data }) => {
        this.setState({
          isSearching: false,
          page: 1,
          size: 20,
          items: data,
        });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const { page, size } = this.state;

    this.setState({ page: page + pageOffset });
    this.props.selectItemsId(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
      },
      ({ data }) => {
        this.setState({ items: data });
      },
    );
  };

  handleSize = size => {
    this.setState({ size, page: 1 });
    this.props.selectItemsId(
      {
        page: 1,
        size,
        filter: this.filter,
      },
      ({ data }) => {
        this.setState({ items: data });
      },
    );
  };

  parsePrices(prices) {
    const dataPrices = prices.map(item => ({
      index: item.index || null,
      refIndex: item.index || null,
      currencyId: item.currencyId ? item.currencyId.value : null,
      amount: item.amount || null,
      isQuantityScalable: item.isQuantityScalable || false,
    }));
    return dataPrices;
  }

  // parseGrants(grants) {
  //   const dataGrants = grants.map(item => ({
  //     index: item.index || null,
  //     resourceId: item.resourceId || null,
  //     amount: item.amount || null,
  //     grantDuration: item.grantDuration || null,
  //     grantUnit: item.grantUnit ? item.grantUnit.value : null,
  //     isQuantityScaleable: item.isQuantityScaleable || false,
  //   }));
  //   return dataGrants;
  // }

  parsecustomerPricing(customerPricing) {
    const dataCustomerPricing = customerPricing.map(item => ({
      index: item.index || null,
      salesChannel: item.salesChannel ? item.salesChannel.value : null,
      marketSegment: item.marketSegment ? item.marketSegment.value : null,
      accountType: item.accountType ? item.accountType.value : null,
      accountSubType: item.accountSubType ? item.accountSubType.value : null,
      prices: item.prices ? this.parsePrices(item.prices) : null,
      // grants: item.grants ? this.parseGrants(item.grants) : null,
    }));
    return dataCustomerPricing;
  }

  parserecurringPricing(recurringPricing) {
    const dataRecurringPricing = recurringPricing.map(item => ({
      purchaseProration: item.purchaseProration
        ? item.purchaseProration.value
        : null,
      cancelProration: item.cancelProration ? item.cancelProration.value : null,
      upgradeProration: item.upgradeProration
        ? item.upgradeProration.value
        : null,
      downgradeProration: item.downgradeProration
        ? item.downgradeProration.value
        : null,
      prices: item.prices ? this.parsePrices(item.prices) : null,
      // grants: item.grants ? this.parseGrants(item.grants) : null,
    }));
    return dataRecurringPricing;
  }

  parseFlatPricing(flatPricing) {
    const dataFlatPricing = flatPricing.map(item => ({
      prices: item.prices ? this.parsePrices(item.prices) : null,
      // grants: item.grants ? this.parseGrants(item.grants) : null,
    }));
    return dataFlatPricing;
  }

  onHandleCreatePriceOffer = value => {
    this.setState({ isPosting: true });
    const result = value.toJS();
    const {
      id,
      name,
      description,
      // itemId,
      status,
      startDate,
      endDate,
      startDuration,
      startUnit,
      endDuration,
      endUnit,
      pricingModel,
      transactionType,
      minimumQuantity,
      maximumQuantity,
      salesChannel,
      marketSegment,
      accountType,
      accountSubType,
      serviceType,
      serviceAddOn,
      customerPricing,
      recurringPricing,
      flatPricing,
    } = result;
    const { itemId } = this.state;
    const dataCreate = {
      id: id || null,
      name: name || null,
      description: description || null,
      itemId,
      status: status ? status.value : null,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      startDuration: startDuration || null,
      startUnit: startUnit ? startUnit.value : null,
      endDuration: endDuration || null,
      endUnit: endUnit ? endUnit.value : null,
      pricingModel: pricingModel ? pricingModel.value : null,
      transactionType: transactionType ? transactionType.value : null,
      minimumQuantity: minimumQuantity || null,
      maximumQuantity: maximumQuantity || null,
      salesChannel: salesChannel ? salesChannel.value : null,
      marketSegment: marketSegment ? marketSegment.value : null,
      accountType: accountType ? accountType.value : null,
      accountSubType: accountSubType ? accountSubType.value : null,
      serviceType: serviceType ? serviceType.value : null,
      serviceAddOn: serviceAddOn || null,
      customerPricing:
        pricingModel.value === 'CUSTOMER_ATTRIBUTE_BASED'
          ? this.parsecustomerPricing(customerPricing)
          : null,
      recurringPricing:
        pricingModel.value === 'RECURRING'
          ? this.parserecurringPricing(recurringPricing)
          : null,
      flatPricing:
        pricingModel.value === 'FLAT'
          ? this.parseFlatPricing(flatPricing)
          : null,
    };
    this.props.createPriceOffer(dataCreate, () => {
      this.setState({ isPosting: false });
    });
  };

  render() {
    let modleFlat;
    let modleCus;
    let modleRec;
    const { handleSubmit, pricingModel } = this.props;
    const {
      isPosting,
      itemId,
      openModal,
      page,
      items,
      size,
      isSearching,
    } = this.state;
    if (pricingModel) {
      switch (pricingModel.value) {
        case 'FLAT':
          modleFlat = true;
          break;
        case 'CUSTOMER_ATTRIBUTE_BASED':
          modleCus = true;
          break;
        case 'RECURRING':
          modleRec = true;
          break;
        default:
          break;
      }
    }

    return (
      <FormAbstract onSubmit={handleSubmit(this.onHandleCreatePriceOffer)}>
        <PriceOfferInfo onToggleModal={this.onToggleModal} itemId={itemId} />
        {modleCus && <CustomerPricingCreate />}
        {modleFlat && <FlatPricingCreate />}
        {modleRec && <RecurringPricingCreate />}
        <ButtonToolbar className="form-create__btn">
          <div className="form-create__group-btn">
            <ButtonCustom
              loading={isPosting}
              className="btn btn-primary"
              type="submit"
              title="Create"
              titleloading="Creating"
            />
          </div>
        </ButtonToolbar>
        <ModalSelectItem
          openModal={openModal}
          toggleModal={this.onToggleModal}
          items={items}
          onSelectItem={this.onSelectItem}
          idSelected={itemId}
          unSelectItem={this.unSelectItem}
          page={page}
          size={size}
          isSearching={isSearching}
          handlePage={this.handlePage}
          handleSize={this.handleSize}
          onHandleSearch={this.onHandleSearch}
          modalTitle="Choose Item"
        />
      </FormAbstract>
    );
  }
}

CreatePriceOffer.propTypes = {
  handleSubmit: PropTypes.func,
  createPriceOffer: PropTypes.func,
  pricingModel: PropTypes.object,
  selectItemsId: PropTypes.func,
};

const selector = formValueSelector('form_create_price-offer'); // <-- same as form name

const withConnect = connect(
  state => {
    const pricingModel = selector(state, 'pricingModel');
    return { pricingModel };
  },
  {
    createPriceOffer,
    selectItemsId,
  },
);

const withReduxForm = reduxForm({
  form: 'form_create_price-offer',
  initialized: true,
  initialValues: {
    flatPricing: [{ prices: [{ index: '1' }] }],
    recurringPricing: [{ prices: [{ index: '1' }] }],
    customerPricing: [{ index: '1', prices: [{ index: '1' }] }],
  },
});

export default compose(
  withReduxForm,
  withConnect,
)(CreatePriceOffer);
