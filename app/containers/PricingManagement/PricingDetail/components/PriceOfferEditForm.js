import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import shortid from 'shortid';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { ButtonToolbar, Button } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormPanel, FormAbstract, FormGroup } from 'components/form';
import {
  ButtonCustom,
  InputValidate,
  TextareaValidate,
  ErrorDetail,
} from 'components/commons';
import {
  calculateValCallback,
  checkChangeSelectValue,
  checkChangeValue,
  checkChangeDate,
  checkChangeSelectField,
  formatStringUrl,
} from 'utils/utils';
import { ModalSelectItem } from 'components/modals';
import { selectItemsId } from 'containers/App/actions';
import { dataSelect, Messages } from 'constantsApp';
import listCurrency from 'constantsApp/currency.json';
import { makeGetPriceOfferDetail, makeErrorMessage } from '../../selectors';
import { CustomerPricing, FlatPricing, RecurringPricing } from './priceOffer';
import { modifyPriceOffer, updatePriceOfferStatus } from '../../actions';
import ModalAddCustomerPricing from './modals/ModalAddCustomerPricing';
class PriceOfferDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      openModal: false,
      page: 1,
      size: 20,
      isSearching: false,
      isPosting: false,
      id: '',
      name: '',
      description: '',
      itemId: '',
      status: null,
      startDate: null,
      endDate: null,
      startDuration: '',
      startUnit: null,
      endDuration: '',
      endUnit: null,
      pricingModel: null,
      transactionType: null,
      minimumQuantity: '',
      maximumQuantity: '',
      salesChannel: null,
      marketSegment: null,
      accountType: null,
      accountSubType: null,
      serviceType: null,
      serviceAddOn: '',
      customerPricing: {},
      recurringPricing: {},
      flatPricing: {},
      isOpenModal: false,
      isDelCusPricing: false,
      indexDelete: '',
      isAddCusPricing: false,
    };
    this.flatPricingOr = {};
    this.recurringPricingOr = {};
    this.customerPricingOr = {};
  }

  componentDidMount() {
    this.props.selectItemsId({ page: 1, size: 20 }, data => {
      const items = calculateValCallback(data);
      this.setState({ items });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.priceOfferInfo &&
      this.props.priceOfferInfo !== nextProps.priceOfferInfo &&
      nextProps.priceOfferInfo.id
    ) {
      this.initValue(nextProps.priceOfferInfo);
      this.setState({ isDelCusPricing: false, indexDelete: '' });
    }
  }

  formatValueCurrency = value => {
    const cur = listCurrency.currencies.find(el => el.code === value);
    return { label: `${cur.name} (${cur.code})`, value: cur.code };
  };

  initValuePrice = prices => {
    const result = {};
    prices.forEach(item => {
      const sId = shortid();
      const val = {
        index: item.index || '',
        refIndex: item.refIndex || 0,
        currencyId: item.currencyId
          ? this.formatValueCurrency(item.currencyId)
          : null,
        amount: item.amount || 0,
        isQuantityScalable: item.isQuantityScalable || false,
      };
      result[sId] = val;
    });
    return result;
  };

  initValueCustomerPricing = customerPricing => {
    const result = {};
    customerPricing.forEach(item => {
      const val = {
        index: item.index || '',
        salesChannel: item.salesChannel
          ? dataSelect.salesChannel.find(el => el.value === item.salesChannel)
          : null,
        marketSegment: item.marketSegment
          ? dataSelect.marketSegment.find(el => el.value === item.marketSegment)
          : null,
        accountType: item.accountType
          ? dataSelect.accountType.find(el => el.value === item.accountType)
          : null,
        accountSubType: item.accountSubType
          ? dataSelect.accountSubType.find(
              el => el.value === item.accountSubType,
            )
          : null,
        prices: item.prices ? this.initValuePrice(item.prices) : null,
      };
      const sId = shortid();
      result[sId] = _.cloneDeep(val);
      this.customerPricingOr[sId] = _.cloneDeep(val);
    });

    return result;
  };

  initValueFlatPricing = flatPricing => {
    const result = {};
    flatPricing.forEach(item => {
      const sId = shortid();
      const val = {
        prices: item.prices ? this.initValuePrice(item.prices) : null,
      };
      result[sId] = _.cloneDeep(val);
      this.flatPricingOr[sId] = _.cloneDeep(val);
    });
    return result;
  };

  initValueRecurringPricing = recurringPricing => {
    const result = {};
    recurringPricing.forEach(item => {
      const val = {
        purchaseProration: item.purchaseProration
          ? dataSelect.proration.find(el => el.value === item.purchaseProration)
          : null,
        cancelProration: item.cancelProration
          ? dataSelect.proration.find(el => el.value === item.cancelProration)
          : null,
        upgradeProration: item.upgradeProration
          ? dataSelect.proration.find(el => el.value === item.upgradeProration)
          : null,
        downgradeProration: item.downgradeProration
          ? dataSelect.proration.find(
              el => el.value === item.downgradeProration,
            )
          : null,
        prices: item.prices ? this.initValuePrice(item.prices) : null,
      };
      const sId = shortid();
      result[sId] = _.cloneDeep(val);
      this.recurringPricingOr[sId] = _.cloneDeep(val);
    });
    return result;
  };

  initValue = priceOfferInfo => {
    this.setState({
      id: priceOfferInfo.id,
      name: priceOfferInfo.name,
      description: priceOfferInfo.description,
      itemId: priceOfferInfo.itemId || '',
      status: dataSelect.statusPricing.find(
        el => el.value === priceOfferInfo.status,
      ),
      startDate: priceOfferInfo.startDate
        ? moment(priceOfferInfo.startDate)
        : null,
      endDate: priceOfferInfo.endDate ? moment(priceOfferInfo.endDate) : null,
      startDuration: priceOfferInfo.startDuration || 0,
      startUnit: dataSelect.unit.find(
        el => el.value === priceOfferInfo.startUnit,
      ),
      endDuration: priceOfferInfo.endDuration || 0,
      endUnit: dataSelect.unit.find(el => el.value === priceOfferInfo.endUnit),
      pricingModel: dataSelect.pricingModel.find(
        el => el.value === priceOfferInfo.pricingModel,
      ),
      transactionType: dataSelect.transactionType.find(
        el => el.value === priceOfferInfo.transactionType,
      ),
      minimumQuantity: priceOfferInfo.minimumQuantity || 0,
      maximumQuantity: priceOfferInfo.maximumQuantity || 0,
      salesChannel: dataSelect.salesChannel.find(
        el => el.value === priceOfferInfo.salesChannel,
      ),
      marketSegment: dataSelect.marketSegment.find(
        el => el.value === priceOfferInfo.marketSegment,
      ),
      accountType: dataSelect.accountType.find(
        el => el.value === priceOfferInfo.accountType,
      ),
      accountSubType: dataSelect.accountSubType.find(
        el => el.value === priceOfferInfo.accountSubType,
      ),
      serviceType: dataSelect.serviceType.find(
        el => el.value === priceOfferInfo.serviceType,
      ),
      serviceAddOn: priceOfferInfo.serviceAddOn || '',
      customerPricing:
        priceOfferInfo.customerPricing && priceOfferInfo.customerPricing.length
          ? this.initValueCustomerPricing(priceOfferInfo.customerPricing)
          : null,
      recurringPricing:
        priceOfferInfo.recurringPricing &&
        priceOfferInfo.recurringPricing.length
          ? this.initValueRecurringPricing(priceOfferInfo.recurringPricing)
          : null,
      flatPricing:
        priceOfferInfo.flatPricing && priceOfferInfo.flatPricing.length
          ? this.initValueFlatPricing(priceOfferInfo.flatPricing)
          : null,
    });
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onChangeDate = (name, date) => {
    this.setState({
      [name]: date,
    });
  };

  onChangeCheckBox = name => {
    this.setState(preState => ({
      [name]: !preState[name],
    }));
  };

  onToggleModal = () => {
    this.setState(preState => ({ openModal: !preState.openModal }));
  };

  onSelectItemId = itemId => {
    this.setState({ itemId });
  };

  unSelectItemId = () => {
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
      data => {
        const items = calculateValCallback(data);
        this.setState({ isSearching: false, page: 1, size: 20, items });
      },
    );
    this.filter = filter;
  };

  onChangePrices = (parentName, parentId, Id, name, val) => {
    const f = this.state[parentName];
    f[parentId].prices[Id][name] = val;

    this.setState({ [parentName]: _.cloneDeep(f) });
  };

  onChangeFieldArr = (parentName, id, name, val) => {
    const f = this.state[parentName];
    f[id][name] = val;

    this.setState({ [parentName]: _.cloneDeep(f) });
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
      data => {
        const items = calculateValCallback(data);
        this.setState({ items });
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
        const items = calculateValCallback(data);
        this.setState({ items });
      },
    );
  };

  checkChangeStatus = () => {
    const { status } = this.state;
    const { priceOfferInfo } = this.props;

    if (!priceOfferInfo || !priceOfferInfo.id) return false;

    return (
      priceOfferInfo.id && status && priceOfferInfo.status !== status.value
    );
  };

  checkChangePrice = (prices, oPrices) => {
    return _.some(prices, (val, key) => {
      return (
        checkChangeValue(val.index, oPrices[key].index) ||
        checkChangeValue(val.refIndex, oPrices[key].refIndex) ||
        checkChangeSelectField(val.currencyId, oPrices[key].currencyId) ||
        checkChangeValue(val.amount, oPrices[key].amount) ||
        checkChangeValue(
          val.isQuantityScalable,
          oPrices[key].isQuantityScalable,
        )
      );
    });
  };

  checkChangeInfoCustomerPricing = customerPricing => {
    return _.some(customerPricing, (val, key) => {
      return (
        checkChangeValue(val.index, this.customerPricingOr[key].index) ||
          checkChangeSelectField(
            val.salesChannel,
            this.customerPricingOr[key].salesChannel,
          ) ||
          checkChangeSelectField(
            val.marketSegment,
            this.customerPricingOr[key].marketSegment,
          ) ||
          checkChangeSelectField(val.accountType),
        this.customerPricingOr[key].accountType ||
          checkChangeSelectField(
            val.accountSubType,
            this.customerPricingOr[key].accountSubType,
          ) ||
          this.checkChangePrice(val.prices, this.customerPricingOr[key].prices)
      );
    });
  };

  checkChangeInfoFlatPricing = flatPricing => {
    return _.some(flatPricing, (val, key) => {
      return this.checkChangePrice(val.prices, this.flatPricingOr[key].prices);
    });
  };

  checkChangeInfoRecurringPricing = recurringPricing => {
    return _.some(recurringPricing, (val, key) => {
      return (
        checkChangeSelectField(
          val.purchaseProration,
          this.recurringPricingOr[key].purchaseProration,
        ) ||
        checkChangeSelectField(
          val.cancelProration,
          this.recurringPricingOr[key].cancelProration,
        ) ||
        checkChangeSelectField(
          val.upgradeProration,
          this.recurringPricingOr[key].upgradeProration,
        ) ||
        checkChangeSelectField(
          val.downgradeProration,
          this.recurringPricingOr[key].downgradeProration,
        ) ||
        this.checkChangePrice(val.prices, this.recurringPricingOr[key].prices)
      );
    });
  };

  checkChangeInfo = () => {
    const { priceOfferInfo } = this.props;
    if (!priceOfferInfo || !priceOfferInfo.id) return false;
    const {
      name,
      description,
      itemId,
      startDate,
      endDate,
      startDuration,
      startUnit,
      endDuration,
      endUnit,
      // pricingModel,
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
    } = this.state;

    return (
      checkChangeValue(name, priceOfferInfo.name) ||
      checkChangeValue(description, priceOfferInfo.description) ||
      checkChangeValue(itemId, priceOfferInfo.itemId) ||
      checkChangeDate(startDate, priceOfferInfo.startDate) ||
      checkChangeDate(endDate, priceOfferInfo.endDate) ||
      checkChangeValue(startDuration, priceOfferInfo.startDuration) ||
      checkChangeSelectValue(priceOfferInfo.startUnit, startUnit) ||
      checkChangeValue(endDuration, priceOfferInfo.endDuration) ||
      checkChangeSelectValue(priceOfferInfo.endUnit, endUnit) ||
      checkChangeSelectValue(priceOfferInfo.transactionType, transactionType) ||
      checkChangeValue(minimumQuantity, priceOfferInfo.minimumQuantity) ||
      checkChangeValue(maximumQuantity, priceOfferInfo.maximumQuantity) ||
      checkChangeSelectValue(priceOfferInfo.salesChannel, salesChannel) ||
      checkChangeSelectValue(priceOfferInfo.marketSegment, marketSegment) ||
      checkChangeSelectValue(priceOfferInfo.accountType, accountType) ||
      checkChangeSelectValue(priceOfferInfo.accountSubType, accountSubType) ||
      checkChangeSelectValue(priceOfferInfo.serviceType, serviceType) ||
      checkChangeValue(serviceAddOn, priceOfferInfo.serviceAddOn) ||
      this.checkChangeInfoFlatPricing(flatPricing) ||
      this.checkChangeInfoCustomerPricing(customerPricing) ||
      this.checkChangeInfoRecurringPricing(recurringPricing)
    );
  };

  parsePrices(prices) {
    const dataPrices = _.map(prices, item => ({
      index: item.index || 0,
      refIndex: item.refIndex || 0,
      currencyId: item.currencyId ? item.currencyId.value : null,
      amount: item.amount || null,
      isQuantityScalable: item.isQuantityScalable || false,
    }));
    return dataPrices;
  }

  parseCustomerPricing(customerPricing, dataCusAdd) {
    const { isDelCusPricing, indexDelete } = this.state;
    const dataCustomerPricing = _.map(customerPricing, item => ({
      index: item.index || '1',
      salesChannel: item.salesChannel ? item.salesChannel.value : null,
      marketSegment: item.marketSegment ? item.marketSegment.value : null,
      accountType: item.accountType ? item.accountType.value : null,
      accountSubType: item.accountSubType ? item.accountSubType.value : null,
      prices: item.prices ? this.parsePrices(item.prices) : null,
      // grants: item.grants ? this.parseGrants(item.grants) : null,
    }));
    if (isDelCusPricing) {
      dataCustomerPricing.push({
        index: indexDelete,
      });
    }
    if (dataCusAdd) {
      dataCustomerPricing.push(dataCusAdd);
    }
    return dataCustomerPricing;
  }

  parseRecurringPricing(recurringPricing) {
    const dataRecurringPricing = _.map(recurringPricing, item => ({
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
    const dataFlatPricing = _.map(flatPricing, item => ({
      prices: item.prices ? this.parsePrices(item.prices) : null,
      // grants: item.grants ? this.parseGrants(item.grants) : null,
    }));
    return dataFlatPricing;
  }

  checkDelete = indexDelete => {
    this.setState({ isDelCusPricing: true, indexDelete });
  };

  onHandleUpdatePriceOffer = (evt, dataCusAdd) => {
    evt.preventDefault();
    const {
      id,
      name,
      description,
      itemId,
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
    } = this.state;
    this.setState({ isPosting: true });

    if (this.checkChangeStatus() && !this.checkChangeInfo()) {
      this.props.updatePriceOfferStatus({ id, status: status.value }, () => {
        this.setState({ isPosting: false });
      });
      return;
    }

    const dataPriceOffer = {
      id,
      name,
      description,
      itemId,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      startDuration,
      startUnit: startUnit ? startUnit.value : null,
      endDuration,
      endUnit: endUnit ? endUnit.value : null,
      // pricingModel,
      transactionType: transactionType ? transactionType.value : null,
      minimumQuantity,
      maximumQuantity,
      salesChannel: salesChannel ? salesChannel.value : null,
      marketSegment: marketSegment ? marketSegment.value : null,
      accountType: accountType ? accountType.value : null,
      accountSubType: accountSubType ? accountSubType.value : null,
      serviceType: serviceType ? serviceType.value : null,
      serviceAddOn,
      customerPricing: customerPricing
        ? this.parseCustomerPricing(customerPricing, dataCusAdd)
        : null,
      recurringPricing: recurringPricing
        ? this.parseRecurringPricing(recurringPricing)
        : null,
      flatPricing: flatPricing ? this.parseFlatPricing(flatPricing) : null,
    };
    if (!this.checkChangeStatus()) {
      if (
        this.checkChangeInfo() ||
        this.state.isDelCusPricing ||
        this.state.isAddCusPricing
      ) {
        this.props.modifyPriceOffer(dataPriceOffer, () => {
          this.setState({ isPosting: false });
        });
      }
    } else {
      this.props.modifyPriceOffer(dataPriceOffer, ({ success }) => {
        if (success) {
          this.props.updatePriceOfferStatus(
            { id, status: status.value },
            () => {
              this.setState({ isPosting: false });
            },
          );
        } else {
          this.setState({ isPosting: false });
        }
      });
    }
  };

  handleButtonCancel = () => {
    this.initValue(this.props.priceOfferInfo);
  };

  toggleModalAdd = () => {
    this.setState(preState => ({
      isOpenModal: !preState.isOpenModal,
      isAdd: !preState.isAdd,
    }));
  };

  render() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <FormPanel title="Item">
          <div className="form-inner">
            <p className="txt-error">{errorMessage}</p>
          </div>
        </FormPanel>
      );
    }

    const {
      openModal,
      items,
      page,
      size,
      isSearching,
      isPosting,
      id,
      name,
      description,
      itemId,
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
      isOpenModal,
    } = this.state;
    const { priceOfferInfo } = this.props;
    const enableBtn = this.checkChangeInfo() || this.checkChangeStatus();
    return (
      <FormPanel title="Price Offer">
        <FormAbstract onSubmit={this.onHandleUpdatePriceOffer}>
          <div className="form__half">
            <FormGroup title="Id">
              <InputValidate
                name="id"
                type="text"
                placeholder="Id"
                value={id}
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Name">
              <InputValidate
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Description">
              <TextareaValidate
                name="description"
                type="text"
                value={description}
                placeholder="Description"
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Item Id">
              <div className="form__form-group-input-wrap">
                <InputValidate
                  placeholder="Field can not be empty!"
                  type="text"
                  value={itemId}
                  onClick={() => this.onToggleModal()}
                  onChange={this.onChangeText}
                />
              </div>
            </FormGroup>
            <FormGroup title="Transaction Type">
              <Select
                name="transactionType"
                type="text"
                options={dataSelect.transactionType}
                placeholder="Transaction Type"
                value={transactionType}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('transactionType', val)}
                isClearable
              />
            </FormGroup>
            <FormGroup title="Pricing Model">
              {/* <Select
                name="pricingModel"
                type="text"
                options={dataSelect.pricingModel}
                placeholder="Pricing Model"
                value={pricingModel}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('pricingModel', val)}
                isDisabled
              /> */}
              <input
                name="index"
                type="text"
                placeholder="Index"
                value={pricingModel ? pricingModel.value : ''}
                onChange={() => {}}
                disabled
              />
            </FormGroup>
            <FormGroup title="Service Type">
              <Select
                name="serviceType"
                options={dataSelect.serviceType}
                placeholder="Service Type"
                value={serviceType}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('serviceType', val)}
                isClearable
              />
            </FormGroup>
            <FormGroup title="Service Add On">
              <input
                name="serviceAddOn"
                type="text"
                value={serviceAddOn}
                placeholder="Service Add On"
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Sales Channel">
              <Select
                name="salesChannel"
                type="text"
                options={dataSelect.salesChannel}
                placeholder="Sales Channel"
                value={salesChannel}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('salesChannel', val)}
                isClearable
              />
            </FormGroup>
            <FormGroup title="Market Segment">
              <Select
                name="marketSegment"
                type="text"
                options={dataSelect.marketSegment}
                placeholder="Market Segment"
                value={marketSegment}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('marketSegment', val)}
                isClearable
              />
            </FormGroup>
          </div>
          <div className="form__half">
            <FormGroup title="Account Type">
              <Select
                name="accountType"
                type="text"
                options={dataSelect.accountType}
                placeholder="Account Type"
                value={accountType}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('accountType', val)}
                isClearable
              />
            </FormGroup>
            <FormGroup title="Account Sub Type">
              <Select
                name="accountSubType"
                type="text"
                options={dataSelect.accountSubType}
                placeholder="Account Sub Type"
                value={accountSubType}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('accountSubType', val)}
                isClearable
              />
            </FormGroup>
            <FormGroup title="Status">
              <Select
                name="status"
                type="text"
                options={dataSelect.statusPricing}
                placeholder="Status"
                value={status}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('status', val)}
                isClearable
              />
            </FormGroup>
            <FormGroup title="Start Date">
              <div className="date-picker">
                <DatePicker
                  name="startDate"
                  placeholderText="YYYY-MM-DD"
                  dateFormat="YYYY-MM-DD"
                  popperPlacement="bottom-start"
                  popperModifiers={{
                    flip: {
                      enabled: false,
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  selected={startDate}
                  className="form__form-group-datepicker"
                  onChange={date => this.onChangeDate('startDate', date)}
                  autoComplete="off"
                  isClearable
                />
              </div>
              <div className="form__form-group-icon">
                <CalendarBlankIcon />
              </div>
            </FormGroup>
            <FormGroup title="End Date">
              <div className="date-picker">
                <DatePicker
                  name="endDate"
                  placeholderText="YYYY-MM-DD"
                  dateFormat="YYYY-MM-DD"
                  popperPlacement="bottom-start"
                  popperModifiers={{
                    flip: {
                      enabled: false,
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  selected={endDate}
                  className="form__form-group-datepicker"
                  onChange={date => this.onChangeDate('endDate', date)}
                  autoComplete="off"
                  isClearable
                />
              </div>
              <div className="form__form-group-icon">
                <CalendarBlankIcon />
              </div>
            </FormGroup>
            <FormGroup title="Start Unit">
              <Select
                name="startUnit"
                type="text"
                options={dataSelect.unit}
                placeholder="Start Unit"
                value={startUnit}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('startUnit', val)}
                isClearable
              />
            </FormGroup>
            <FormGroup title="Start Duration">
              <input
                name="startDuration"
                type="number"
                value={startDuration}
                placeholder="Start Duration"
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="End Unit">
              <Select
                name="endUnit"
                type="text"
                options={dataSelect.unit}
                placeholder="End Unit"
                value={endUnit}
                className="form__form-group-select"
                onChange={val => this.onChangeSelect('endUnit', val)}
                isClearable
              />
            </FormGroup>
            <FormGroup title="End Duration">
              <input
                name="endDuration"
                type="number"
                value={endDuration}
                placeholder="End Duration"
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Minimum Quantity">
              <input
                name="minimumQuantity"
                type="number"
                value={minimumQuantity}
                placeholder="Minimum Quantity"
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Maximum Quantity">
              <input
                name="maximumQuantity"
                type="number"
                value={maximumQuantity}
                placeholder="Maximum Quantity"
                onChange={this.onChangeText}
              />
            </FormGroup>
          </div>
          {_.map(customerPricing, (cus, id) => (
            <div key={id} className="customer-pricing-content">
              <div className="label-content">Customer Pricing</div>
              <CustomerPricing
                data={cus}
                id={id}
                onChangePrices={this.onChangePrices}
                onChangeFieldArr={this.onChangeFieldArr}
                checkDelete={this.checkDelete}
                isPosting={isPosting}
                onSubmit={this.onHandleUpdatePriceOffer}
              />
            </div>
          ))}
          {_.map(flatPricing, (flat, id) => (
            <div key={id} className="flat-pricing-content">
              <div className="label-content">Flat Pricing</div>
              <FlatPricing
                data={flat}
                id={id}
                onChangePrices={this.onChangePrices}
              />
            </div>
          ))}
          {_.map(recurringPricing, (rec, id) => (
            <div key={id} className="flat-pricing-content">
              <div className="label-content">Recurring Pricing</div>
              <RecurringPricing
                data={rec}
                id={id}
                onChangePrices={this.onChangePrices}
                onChangeFieldArr={this.onChangeFieldArr}
              />
            </div>
          ))}
          <ButtonToolbar className="form-create__btn">
            {priceOfferInfo.pricingModel === 'CUSTOMER_ATTRIBUTE_BASED' ? (
              <Button
                className="add-component"
                color="success"
                onClick={() => this.toggleModalAdd()}
              >
                Add New Customer Pricing
              </Button>
            ) : null}
            <ButtonCustom
              loading={isPosting}
              className="btn btn-default m-l"
              type="button"
              title="Cancel"
              onClick={this.handleButtonCancel}
              disabled={!enableBtn}
            />
            <ButtonCustom
              loading={isPosting}
              className="btn btn-primary"
              type="submit"
              title="Modify"
              titleloading="Modifying"
              disabled={!enableBtn}
            />
          </ButtonToolbar>
        </FormAbstract>
        <ModalSelectItem
          openModal={openModal}
          toggleModal={this.onToggleModal}
          items={items}
          onSelectItem={this.onSelectItemId}
          idSelected={itemId}
          itemId={this.props.id}
          unSelectItem={this.unSelectItemId}
          page={page}
          size={size}
          isSearching={isSearching}
          handlePage={this.handlePage}
          handleSize={this.handleSize}
          onHandleSearch={this.onHandleSearch}
          modalTitle="Choose Item"
        />
        <ModalAddCustomerPricing
          modalTitle="Add New Customer Pricing"
          isPosting={isPosting}
          openModal={isOpenModal}
          toggleModal={this.toggleModalAdd}
          onSubmitAdd={this.onHandleUpdatePriceOffer}
          // index={
          //   _.findLast(customerPricing)
          //     ? _.findLast(customerPricing).index + 1
          //     : 1
          // }
        />
      </FormPanel>
    );
  }
}

PriceOfferDetail.propTypes = {
  selectItemsId: PropTypes.func,
  priceOfferInfo: PropTypes.object,
  updatePriceOfferStatus: PropTypes.func,
  modifyPriceOffer: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  priceOfferInfo: makeGetPriceOfferDetail() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  {
    selectItemsId,
    updatePriceOfferStatus,
    modifyPriceOffer,
  },
)(PriceOfferDetail);
