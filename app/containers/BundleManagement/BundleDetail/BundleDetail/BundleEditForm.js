import React from 'react';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { ButtonToolbar, Col, Button } from 'reactstrap';
import shortid from 'shortid';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormPanel, FormGroup, FormAbstract } from 'components/form';
import {
  ButtonCustom,
  InputValidate,
  TextareaValidate,
  ErrorDetail,
} from 'components/commons';
import {
  calculateValCallback,
  checkChangeSelectValue,
  checkChangeSelectField,
  checkChangeValue,
  checkChangeDate,
} from 'utils/utils';
import { dataSelect } from 'constantsApp';
import { countryList } from 'constantsApp/countryList';
import listCurrency from 'constantsApp/currency.json';
import { selectBundleId, selectPriceOfferId } from 'containers/App/actions';
import { makeGetBundleDetail, makeErrorMessage } from '../../selectors';
import { modifyBundle, updateBundleStatus } from '../../actions';
import BundleComponentForm from './BundleComponentForm';
import ModalAddComponent from './components/ModalAddComponent';

class BundleEditForm extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isPosting: false,
      id: '',
      name: '',
      description: '',
      minimumQuantity: '',
      maximumQuantity: '',
      salesChannel: null,
      marketSegment: null,
      accountType: null,
      accountSubType: null,
      country: null,
      currency: null,
      startDate: null,
      endDate: null,
      status: null,
      components: {},
      bundles: [],
      priceOffers: [],
      isOpenModal: false,
      isDelete: false,
      indexDelete: '',
      isAdd: false,
    };
    this.componentsOrigin = {};
  }

  componentDidMount() {
    this.props.selectBundleId({ page: 1, size: 20 }, data => {
      const bundles = calculateValCallback(data);
      this.setState({ bundles });
    });

    this.props.selectPriceOfferId({ page: 1, size: 20 }, data => {
      const priceOffers = calculateValCallback(data);
      this.setState({ priceOffers });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.bundleInfo &&
      this.props.bundleInfo !== nextProps.bundleInfo &&
      nextProps.bundleInfo.id
    ) {
      this.initValue(nextProps.bundleInfo);
      this.setState({ isDelete: false, indexDelete: '' });
    }
  }

  formatValueCurrency = value => {
    const cur = listCurrency.currencies.find(el => el.code === value);
    return { label: `${cur.name} (${cur.code})`, value: cur.code };
  };

  formatValueCountry = value => {
    const cur = countryList.find(el => el.value === value);
    return { label: `${cur.label} (${cur.value})`, value: cur.value };
  };

  initValueComponent = components => {
    const result = {};
    this.componentsOrigin = {};
    components.forEach(item => {
      const sId = shortid();
      const val = {
        index: item.index,
        serviceType: dataSelect.serviceType.find(
          el => el.value === item.serviceType,
        ),
        serviceAddOn: item.serviceAddOn || '',
        priceOfferId: item.priceOfferId || '',
        discountOfferId: item.discountOfferId || '',
        bundleId: item.bundleId || '',
        validityDuration: item.validityDuration || 0,
        validityUnit: item.validityUnit
          ? dataSelect.unit.find(el => el.value === item.validityUnit)
          : null,
      };
      result[sId] = _.cloneDeep(val);
      this.componentsOrigin[sId] = _.cloneDeep(val);
    });
    return result;
  };

  initValue = bundleInfo => {
    this.setState({
      id: bundleInfo.id,
      name: bundleInfo.name || '',
      description: bundleInfo.description || '',
      status: dataSelect.statusPricing.find(
        el => el.value === bundleInfo.status,
      ),
      startDate: bundleInfo.startDate ? moment(bundleInfo.startDate) : null,
      endDate: bundleInfo.endDate ? moment(bundleInfo.endDate) : null,
      minimumQuantity: bundleInfo.minimumQuantity || 0,
      maximumQuantity: bundleInfo.maximumQuantity || 0,
      salesChannel: dataSelect.salesChannel.find(
        el => el.value === bundleInfo.salesChannel,
      ),
      marketSegment: dataSelect.marketSegment.find(
        el => el.value === bundleInfo.marketSegment,
      ),
      accountType: dataSelect.accountType.find(
        el => el.value === bundleInfo.accountType,
      ),
      accountSubType: dataSelect.accountSubType.find(
        el => el.value === bundleInfo.accountSubType,
      ),
      country: bundleInfo.country
        ? this.formatValueCountry(bundleInfo.country)
        : null,
      currency: bundleInfo.currency
        ? this.formatValueCurrency(bundleInfo.currency)
        : null,
      components: bundleInfo.components
        ? this.initValueComponent(bundleInfo.components)
        : null,
    });
  };

  handleButtonCancel = () => {
    this.initValue(this.props.bundleInfo);
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

  onChangeComponents = (id, name, val) => {
    const { components } = this.state;
    components[id][name] = val;

    this.setState({ components: _.cloneDeep(components) });
  };

  unSelectedComponent = (id, name) => {
    const { components } = this.state;
    components[id][name] = this.componentsOrigin[id][name];

    this.setState({ components: _.cloneDeep(components) });
  };

  checkChangeStatus = () => {
    const { status } = this.state;
    const { bundleInfo } = this.props;

    if (!bundleInfo || !bundleInfo.id) return false;

    return bundleInfo.id && status && bundleInfo.status !== status.value;
  };

  checkChangeValueComponent = components => {
    return _.some(this.componentsOrigin, (val, key) => {
      return (
        checkChangeValue(
          val.serviceType.value,
          components[key].serviceType.value,
        ) ||
        checkChangeValue(val.serviceAddOn, components[key].serviceAddOn) ||
        checkChangeValue(val.priceOfferId, components[key].priceOfferId) ||
        checkChangeValue(
          val.discountOfferId,
          components[key].discountOfferId,
        ) ||
        checkChangeValue(val.bundleId, components[key].bundleId) ||
        checkChangeValue(
          val.validityDuration,
          components[key].validityDuration,
        ) ||
        checkChangeSelectField(val.validityUnit, components[key].validityUnit)
      );
    });
  };

  checkChangeInfo = () => {
    const { bundleInfo } = this.props;
    if (!bundleInfo || !bundleInfo.id) return false;
    const {
      name,
      description,
      minimumQuantity,
      maximumQuantity,
      salesChannel,
      marketSegment,
      accountType,
      accountSubType,
      country,
      currency,
      startDate,
      endDate,
      components,
    } = this.state;
    return (
      checkChangeValue(name, bundleInfo.name) ||
      checkChangeValue(description, bundleInfo.description) ||
      checkChangeValue(minimumQuantity, bundleInfo.minimumQuantity) ||
      checkChangeValue(maximumQuantity, bundleInfo.maximumQuantity) ||
      checkChangeSelectValue(bundleInfo.salesChannel, salesChannel) ||
      checkChangeSelectValue(bundleInfo.marketSegment, marketSegment) ||
      checkChangeSelectValue(bundleInfo.accountType, accountType) ||
      checkChangeSelectValue(bundleInfo.accountSubType, accountSubType) ||
      checkChangeDate(startDate, bundleInfo.startDate) ||
      checkChangeDate(endDate, bundleInfo.endDate) ||
      checkChangeSelectValue(bundleInfo.country, country) ||
      checkChangeSelectValue(bundleInfo.currency, currency) ||
      this.checkChangeValueComponent(components)
    );
  };

  parseComponent(components, componentAdd) {
    const { isDelete, indexDelete } = this.state;
    const dataComponents = _.map(components, item => ({
      index: item.index || null,
      serviceType: item.serviceType ? item.serviceType.value : null,
      serviceAddOn: item.serviceAddOn || null,
      priceOfferId: item.priceOfferId || null,
      discountOfferId: item.discountOfferId || null,
      bundleId: item.bundleId || null,
      validityDuration: item.validityDuration || null,
      validityUnit: item.validityUnit ? item.validityUnit.value : null,
    }));
    if (isDelete) {
      dataComponents.push({
        index: indexDelete,
      });
    }
    if (componentAdd) {
      dataComponents.push(componentAdd);
    }
    return dataComponents;
  }

  checkDelete = indexDelete => {
    this.setState({ isDelete: true, indexDelete });
  };

  onHandleUpdateBundle = (evt, componentAdd) => {
    evt.preventDefault();
    const {
      id,
      name,
      description,
      minimumQuantity,
      maximumQuantity,
      salesChannel,
      marketSegment,
      accountType,
      accountSubType,
      country,
      currency,
      startDate,
      endDate,
      status,
      components,
    } = this.state;
    this.setState({ isPosting: true });

    if (this.checkChangeStatus() && !this.checkChangeInfo()) {
      this.props.updateBundleStatus({ id, status: status.value }, () => {
        this.setState({ isPosting: false });
      });
      return;
    }

    const dataBundle = {
      id,
      name,
      description,
      minimumQuantity,
      maximumQuantity,
      salesChannel: salesChannel ? salesChannel.value : null,
      marketSegment: marketSegment ? marketSegment.value : null,
      accountType: accountType ? accountType.value : null,
      accountSubType: accountSubType ? accountSubType.value : null,
      country: country ? country.value : null,
      currency: currency ? currency.value : null,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      components: components
        ? this.parseComponent(components, componentAdd)
        : null,
    };
    if (!this.checkChangeStatus()) {
      if (this.checkChangeInfo() || this.state.isDelete || this.state.isAdd) {
        this.props.modifyBundle(dataBundle, () => {
          this.setState({ isPosting: false, isOpenModal: false });
        });
      }
    } else {
      this.props.modifyBundle(dataBundle, ({ success }) => {
        if (success) {
          this.props.updateBundleStatus({ id, status: status.value }, () => {
            this.setState({ isPosting: false });
          });
        } else {
          this.setState({ isPosting: false });
        }
      });
    }
  };

  toggleModalAdd = () => {
    this.setState(preState => ({
      isOpenModal: !preState.isOpenModal,
      isAdd: !preState.isAdd,
    }));
  };

  render() {
    const {
      isPosting,
      id,
      name,
      description,
      minimumQuantity,
      maximumQuantity,
      salesChannel,
      marketSegment,
      accountType,
      accountSubType,
      country,
      currency,
      startDate,
      endDate,
      status,
      components,
      bundles,
      priceOffers,
      isOpenModal,
    } = this.state;
    const enableBtn = this.checkChangeInfo() || this.checkChangeStatus();
    const { bundleInfo, errorMessage } = this.props;
    if (errorMessage) {
      return <ErrorDetail msg={errorMessage} />;
    }
    return (
      <FormPanel title="Bundle">
        <FormAbstract onSubmit={this.onHandleUpdateBundle}>
          <div className="form__half">
            <FormGroup title="Id">
              <InputValidate
                name="id"
                type="text"
                placeholder="Id"
                value={id}
                onChange={this.onChangeText}
                disabled
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
                placeholder="Description"
                value={description}
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
            <FormGroup title="Country">
              <Select
                name="country"
                options={countryList.map(item => ({
                  label: `${item.label} (${item.value})`,
                  value: item.value,
                }))}
                type="text"
                placeholder="Country"
                className="form__form-group-select"
                value={country}
                onChange={val => this.onChangeSelect('country', val)}
                isClearable
              />
            </FormGroup>
            <FormGroup title="Currency">
              <Select
                name="currency"
                options={listCurrency.currencies.map(item => ({
                  label: `${item.name} (${item.code})`,
                  value: item.code,
                }))}
                placeholder="Currency"
                className="form__form-group-select"
                value={currency}
                onChange={val => this.onChangeSelect('currency', val)}
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
                className="form__form-group-select"
                value={status}
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
          {components && (
            <div className="bundle-content">
              <div className="label-content">Components</div>
              {_.map(components, (item, key) => (
                <BundleComponentForm
                  key={key}
                  data={item}
                  id={key}
                  onChangeComponents={this.onChangeComponents}
                  bundles={bundles}
                  priceOffers={priceOffers}
                  unSelectedComponent={this.unSelectedComponent}
                  checkDelete={this.checkDelete}
                  isPosting={isPosting}
                  onSubmit={this.onHandleUpdateBundle}
                />
              ))}
            </div>
          )}
          <ButtonToolbar className="form-create__btn">
            <Button
              className="add-component"
              color="success"
              onClick={() => this.toggleModalAdd()}
            >
              Add New Component
            </Button>
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
        <ModalAddComponent
          modalTitle="Add New Component"
          isPosting={isPosting}
          openModal={isOpenModal}
          toggleModal={this.toggleModalAdd}
          onSubmitAdd={this.onHandleUpdateBundle}
          onSubmit={this.onHandleUpdateBundle}
          bundles={bundles}
          priceOffers={priceOffers}
          // index={bundleInfo.components ? bundleInfo.components.length + 1 : 1}
        />
      </FormPanel>
    );
  }
}

BundleEditForm.propTypes = {
  bundleInfo: PropTypes.object,
  modifyBundle: PropTypes.func,
  updateBundleStatus: PropTypes.func,
  selectBundleId: PropTypes.func,
  selectPriceOfferId: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  bundleInfo: makeGetBundleDetail() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  {
    modifyBundle,
    updateBundleStatus,
    selectBundleId,
    selectPriceOfferId,
  },
)(BundleEditForm);
