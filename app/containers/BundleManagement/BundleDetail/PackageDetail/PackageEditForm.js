import React from 'react';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import shortid from 'shortid';
import _ from 'lodash';
import { ButtonToolbar, Col, Button } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormPanel, FormGroup, FormAbstract } from 'components/form';
import { dataSelect } from 'constantsApp';
import { countryList } from 'constantsApp/countryList';
import listCurrency from 'constantsApp/currency.json';
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
import { selectBundleId } from 'containers/App/actions';
import PackageComponentForm from './PackageComponentForm';
import { makeGetPackageDetail, makeErrorMessage } from '../../selectors';
import { modifyPackage, updatePackageStatus } from '../../actions';
import ModalAddComponent from './components/ModalAddComponent';

class PackageEditForm extends React.PureComponent {
  constructor(props) {
    super(props);
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
      components: null,
      bundles: [],
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
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.packageInfo &&
      this.props.packageInfo !== nextProps.packageInfo &&
      nextProps.packageInfo.id
    ) {
      this.initValue(nextProps.packageInfo);
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
        index: item.index || '',
        serviceType: dataSelect.serviceType.find(
          el => el.value === item.serviceType,
        ),
        serviceAddOn: item.serviceAddOn || '',
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

  initValue = packageInfo => {
    this.setState({
      id: packageInfo.id,
      name: packageInfo.name,
      description: packageInfo.description,
      minimumQuantity: packageInfo.minimumQuantity || 0,
      maximumQuantity: packageInfo.maximumQuantity || 0,
      salesChannel: dataSelect.salesChannel.find(
        el => el.value === packageInfo.salesChannel,
      ),
      marketSegment: dataSelect.marketSegment.find(
        el => el.value === packageInfo.marketSegment,
      ),
      accountType: dataSelect.accountType.find(
        el => el.value === packageInfo.accountType,
      ),
      accountSubType: dataSelect.accountSubType.find(
        el => el.value === packageInfo.accountSubType,
      ),
      country: packageInfo.country
        ? this.formatValueCountry(packageInfo.country)
        : null,
      currency: packageInfo.currency
        ? this.formatValueCurrency(packageInfo.currency)
        : null,
      startDate: packageInfo.startDate ? moment(packageInfo.startDate) : null,
      endDate: packageInfo.endDate ? moment(packageInfo.endDate) : null,
      status: dataSelect.statusPricing.find(
        el => el.value === packageInfo.status,
      ),
      components: packageInfo.components
        ? this.initValueComponent(packageInfo.components)
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

  handleButtonCancel = () => {
    this.initValue(this.props.packageInfo);
  };

  checkChangeStatus = () => {
    const { status } = this.state;
    const { packageInfo } = this.props;

    if (!packageInfo || !packageInfo.id) return false;

    return packageInfo.id && status && packageInfo.status !== status.value;
  };

  checkChangeValueComponent = components => {
    return _.some(this.componentsOrigin, (val, key) => {
      if (!value) return false
      return (
        checkChangeValue(
          val.serviceType.value,
          components[key].serviceType.value,
        ) ||
        checkChangeValue(val.serviceAddOn, components[key].serviceAddOn) ||
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
    const { packageInfo } = this.props;
    if (!packageInfo || !packageInfo.id) return false;
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
      components,
    } = this.state;
    return (
      checkChangeValue(name, packageInfo.name) ||
      checkChangeValue(description, packageInfo.description) ||
      checkChangeValue(minimumQuantity, packageInfo.minimumQuantity) ||
      checkChangeValue(maximumQuantity, packageInfo.maximumQuantity) ||
      checkChangeSelectValue(packageInfo.salesChannel, salesChannel) ||
      checkChangeSelectValue(packageInfo.marketSegment, marketSegment) ||
      checkChangeSelectValue(packageInfo.accountType, accountType) ||
      checkChangeSelectValue(packageInfo.accountSubType, accountSubType) ||
      checkChangeDate(startDate, packageInfo.startDate) ||
      checkChangeDate(endDate, packageInfo.endDate) ||
      checkChangeSelectValue(packageInfo.country, country) ||
      checkChangeSelectValue(packageInfo.currency, currency)
      // this.checkChangeValueComponent(components)
    );
  };

  parseComponent(components, componentAdd) {
    const { isDelete, indexDelete } = this.state;
    const dataComponents = _.map(components, item => ({
      index: item.index || null,
      serviceType: item.serviceType ? item.serviceType.value : null,
      serviceAddOn: item.serviceAddOn || null,
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

  onHandleUpdatePackage = (evt, componentAdd) => {
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
      this.props.updatePackageStatus({ id, status: status.value }, () => {
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
        this.props.modifyPackage(dataBundle, () => {
          this.setState({ isPosting: false });
        });
      }
    } else {
      this.props.modifyPackage(dataBundle, ({ success }) => {
        if (success) {
          this.props.updatePackageStatus({ id, status: status.value }, () => {
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
      isOpenModal,
    } = this.state;
    const { packageInfo, errorMessage } = this.props;
    const enableBtn = this.checkChangeInfo() || this.checkChangeStatus();
    if (errorMessage) {
      return <ErrorDetail msg={errorMessage} />;
    }
    return (
      <FormPanel title="Package">
        <FormAbstract onSubmit={this.onHandleUpdatePackage}>
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
                className="form__form-group-select"
                placeholder="Sales Channel"
                value={salesChannel}
                onChange={val => this.onChangeSelect('salesChannel', val)}
              />
            </FormGroup>
            <FormGroup title="Market Segment">
              <Select
                name="marketSegment"
                options={dataSelect.marketSegment}
                className="form__form-group-select"
                placeholder="Market Segment"
                value={marketSegment}
                onChange={val => this.onChangeSelect('marketSegment', val)}
              />
            </FormGroup>
            <FormGroup title="Country">
              <Select
                name="country"
                options={countryList.map(item => ({
                  label: `${item.label} (${item.value})`,
                  value: item.value,
                }))}
                className="form__form-group-select"
                placeholder="Country"
                onChange={val => this.onChangeSelect('country', val)}
                value={country}
              />
            </FormGroup>
            <FormGroup title="Currency">
              <Select
                name="currency"
                options={listCurrency.currencies.map(item => ({
                  label: `${item.name} (${item.code})`,
                  value: item.code,
                }))}
                className="form__form-group-select"
                placeholder="Currency"
                value={currency}
                onChange={val => this.onChangeSelect('currency', val)}
              />
            </FormGroup>
          </div>
          <div className="form__half">
            <FormGroup title="Account Type">
              <Select
                name="accountType"
                options={dataSelect.accountType}
                className="form__form-group-select"
                placeholder="Account Type"
                value={accountType}
                onChange={val => this.onChangeSelect('accountType', val)}
              />
            </FormGroup>
            <FormGroup title="Account Sub Type">
              <Select
                name="accountSubType"
                options={dataSelect.accountSubType}
                className="form__form-group-select"
                placeholder="Account Sub Type"
                value={accountSubType}
                onChange={val => this.onChangeSelect('accountSubType', val)}
              />
            </FormGroup>
            <FormGroup title="Status">
              <Select
                name="status"
                options={dataSelect.statusPricing}
                className="form__form-group-select"
                placeholder="Status"
                onChange={val => this.onChangeSelect('status', val)}
                value={status}
                onChange={val => this.onChangeSelect('status', val)}
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
                  className="form__form-group-datepicker"
                  onChange={date => this.onChangeDate('startDate', date)}
                  selected={startDate}
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
                  className="form__form-group-datepicker"
                  onChange={date => this.onChangeDate('endDate', date)}
                  selected={endDate}
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
                placeholder="Minimum Quantity"
                value={minimumQuantity}
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Maximum Quantity">
              <input
                name="maximumQuantity"
                type="number"
                placeholder="Maximum Quantity"
                value={maximumQuantity}
                onChange={this.onChangeText}
              />
            </FormGroup>
          </div>
          {components && (
            <div className="bundle-content">
              <div className="label-content">Components</div>
              {_.map(components, (item, id) => (
                <PackageComponentForm
                  key={id}
                  data={item}
                  id={id}
                  bundles={bundles}
                  onChangeComponents={this.onChangeComponents}
                  unSelectedComponent={this.unSelectedComponent}
                  checkDelete={this.checkDelete}
                  isPosting={isPosting}
                  onSubmit={this.onHandleUpdatePackage}
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
          onSubmitAdd={this.onHandleUpdatePackage}
          bundles={bundles}
          // index={packageInfo.components ? packageInfo.components.length + 1 : 1}
        />
      </FormPanel>
    );
  }
}
PackageEditForm.propTypes = {
  packageInfo: PropTypes.object,
  modifyPackage: PropTypes.func,
  updatePackageStatus: PropTypes.func,
  selectBundleId: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  packageInfo: makeGetPackageDetail() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  {
    modifyPackage,
    updatePackageStatus,
    selectBundleId,
  },
)(PackageEditForm);
