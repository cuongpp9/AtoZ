import React from 'react';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { ButtonToolbar } from 'reactstrap';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { FormAbstract, FormPanel, FormGroup } from 'components/form';
import {
  ButtonCustom,
  InputValidate,
  TextareaValidate,
  CheckBox,
} from 'components/commons';
import { ModalSelectItem } from 'components/modals';
import { dataSelect } from 'constantsApp';
import { selectItemsId } from 'containers/App/actions';
import {
  calculateValCallback,
  checkChangeSelectValue,
  checkChangeValue,
  checkChangeDate,
} from 'utils/utils';
import Select from 'react-select';
import { makeGetItemDetail, makeErrorMessage } from '../../selectors';
import { modifyItem, updateItemStatus } from '../../actions';

class PricingItemDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isPosting: false,
      items: [],
      parentItemId: '',
      openModal: false,
      page: 1,
      size: 20,
      isSearching: false,
      id: '',
      name: '',
      description: '',
      company: '',
      productFamily: '',
      productLine: '',
      productType: '',
      productSubType: '',
      revenueType: null,
      glAccount: '',
      taxCode: '',
      status: null,
      externalId: '',
      externalName: '',
      startDate: null,
      endDate: null,
      isBundled: false,
      isDiscountable: false,
    };
  }

  componentDidMount() {
    this.props.selectItemsId({ page: 1, size: 20 }, data => {
      const items = calculateValCallback(data);
      this.setState({ items });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.itemInfo &&
      this.props.itemInfo !== nextProps.itemInfo &&
      nextProps.itemInfo.id
    ) {
      this.initValue(nextProps.itemInfo);
    }
  }

  initValue = itemInfo => {
    this.setState({
      id: itemInfo.id,
      name: itemInfo.name,
      description: itemInfo.description,
      company: itemInfo.company || '',
      revenueType: itemInfo.revenueType
        ? dataSelect.revenueType.find(el => el.value === itemInfo.revenueType)
        : null,
      productFamily: itemInfo.productFamily || '',
      productLine: itemInfo.productLine || '',
      productType: itemInfo.productType || '',
      productSubType: itemInfo.productSubType || '',
      glAccount: itemInfo.glAccount,
      taxCode: itemInfo.taxCode,
      parentItemId: itemInfo.parentItemId || '',
      status: dataSelect.statusPricing.find(el => el.value === itemInfo.status),
      externalId: itemInfo.externalId || '',
      externalName: itemInfo.externalName || '',
      isBundled: itemInfo.isBundled || false,
      isDiscountable: itemInfo.isDiscountable || false,
      startDate: itemInfo.startDate ? moment(itemInfo.startDate) : null,
      endDate: itemInfo.endDate ? moment(itemInfo.endDate) : null,
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

  onSelectParentItem = parentItemId => {
    this.setState({ parentItemId });
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

  handleButtonCancel = () => {
    this.initValue(this.props.itemInfo);
  };

  unSelectParentItem = () => {
    this.setState({ parentItemId: '', openModal: false });
  };

  onHandleUpdateItem = evt => {
    evt.preventDefault();
    const {
      id,
      parentItemId,
      name,
      description,
      company,
      productFamily,
      productLine,
      productType,
      productSubType,
      revenueType,
      glAccount,
      taxCode,
      externalId,
      externalName,
      startDate,
      endDate,
      isBundled,
      isDiscountable,
      status,
    } = this.state;
    this.setState({ isPosting: true });

    if (this.checkChangeStatus() && !this.checkChangeInfo()) {
      this.props.updateItemStatus({ id, status: status.value }, () => {
        this.setState({ isPosting: false });
      });
      return;
    }

    const dataItem = {
      id,
      parentItemId,
      name,
      description,
      company,
      productFamily,
      productLine,
      productType,
      productSubType,
      revenueType: revenueType ? revenueType.value : null,
      glAccount,
      taxCode,
      externalId,
      externalName,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      isBundled,
      isDiscountable,
    };

    if (!this.checkChangeStatus() && this.checkChangeInfo()) {
      this.props.modifyItem(dataItem, () => {
        this.setState({ isPosting: false });
      });
    } else {
      this.props.modifyItem(dataItem, ({ success }) => {
        if (success) {
          this.props.updateItemStatus({ id, status: status.value }, () => {
            this.setState({ isPosting: false });
          });
        } else {
          this.setState({ isPosting: false });
        }
      });
    }
  };

  checkChangeStatus = () => {
    const { status } = this.state;
    const { itemInfo } = this.props;

    if (!itemInfo || !itemInfo.id) return false;

    return itemInfo.id && status && itemInfo.status !== status.value;
  };

  checkChangeInfo = () => {
    const { itemInfo } = this.props;
    if (!itemInfo || !itemInfo.id) return false;
    const {
      parentItemId,
      name,
      description,
      company,
      productFamily,
      productLine,
      productType,
      productSubType,
      revenueType,
      glAccount,
      taxCode,
      externalId,
      externalName,
      startDate,
      endDate,
      isBundled,
      isDiscountable,
    } = this.state;

    return (
      checkChangeValue(parentItemId, itemInfo.parentItemId) ||
      checkChangeValue(name, itemInfo.name) ||
      checkChangeValue(description, itemInfo.description) ||
      checkChangeValue(company, itemInfo.company) ||
      checkChangeValue(productFamily, itemInfo.productFamily) ||
      checkChangeValue(productLine, itemInfo.productLine) ||
      checkChangeValue(productType, itemInfo.productType) ||
      checkChangeValue(productSubType, itemInfo.productSubType) ||
      checkChangeValue(glAccount, itemInfo.glAccount) ||
      checkChangeValue(taxCode, itemInfo.taxCode) ||
      checkChangeValue(externalId, itemInfo.externalId) ||
      checkChangeValue(externalName, itemInfo.externalName) ||
      checkChangeValue(isBundled, itemInfo.isBundled) ||
      checkChangeValue(isDiscountable, itemInfo.isDiscountable) ||
      checkChangeDate(startDate, itemInfo.startDate) ||
      checkChangeDate(endDate, itemInfo.endDate) ||
      checkChangeSelectValue(itemInfo.revenueType, revenueType)
    );
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
      isPosting,
      openModal,
      items,
      parentItemId,
      page,
      size,
      isSearching,
      id,
      name,
      description,
      company,
      productFamily,
      productLine,
      productType,
      productSubType,
      revenueType,
      glAccount,
      taxCode,
      status,
      externalId,
      externalName,
      startDate,
      endDate,
      isBundled,
      isDiscountable,
    } = this.state;
    const { idx } = this.props;
    const enableBtn = this.checkChangeInfo() || this.checkChangeStatus();

    return (
      <FormPanel title="Item">
        <FormAbstract onSubmit={this.onHandleUpdateItem}>
          <div className="form-inner">
            <div className="form__half">
              <FormGroup title="Id">
                <InputValidate
                  name="id"
                  type="text"
                  value={id}
                  disabled
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Name">
                <InputValidate
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name can not be blank!"
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Description">
                <TextareaValidate
                  name="description"
                  value={description}
                  type="text"
                  placeholder="Description can not be blank!"
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Company">
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Revenue Type">
                <Select
                  value={revenueType}
                  options={dataSelect.revenueType}
                  onChange={val => this.onChangeSelect('revenueType', val)}
                  className="form__form-group-select"
                  placeholder="Revenue Type"
                  isClearable
                />
              </FormGroup>
              <FormGroup title="Product Family">
                <input
                  type="text"
                  name="productFamily"
                  placeholder="Product Family"
                  value={productFamily}
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Product Line">
                <input
                  type="text"
                  name="productLine"
                  placeholder="Product Line"
                  value={productLine}
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Product Type">
                <input
                  type="text"
                  name="productType"
                  placeholder="Product Type"
                  value={productType}
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Product Sub-Type">
                <input
                  type="text"
                  name="productSubType"
                  placeholder="Product Sub-Type"
                  value={productSubType}
                  onChange={this.onChangeText}
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="GL Account">
                <InputValidate
                  type="text"
                  name="glAccount"
                  value={glAccount}
                  placeholder="GL Account can not be blank!"
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Tax Code">
                <InputValidate
                  type="text"
                  name="taxCode"
                  value={taxCode}
                  placeholder="Tax Code can not be blank!"
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Parent Item Id">
                <input
                  onClick={() => this.onToggleModal()}
                  type="text"
                  placeholder="Select Parent Item"
                  value={parentItemId}
                />
              </FormGroup>
              <FormGroup title="Status">
                <Select
                  value={status}
                  options={dataSelect.statusPricing}
                  onChange={val => this.onChangeSelect('status', val)}
                  className="form__form-group-select"
                />
              </FormGroup>
              <FormGroup title="External Id">
                <input
                  type="text"
                  name="externalId"
                  placeholder="External Id"
                  value={externalId}
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="External Name">
                <input
                  type="text"
                  name="externalName"
                  placeholder="External Name"
                  value={externalName}
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title=" ">
                <CheckBox
                  name="isBundled"
                  label="Is Bundled"
                  checked={isBundled}
                  onChange={() => this.onChangeCheckBox('isBundled')}
                />
              </FormGroup>
              <FormGroup title=" ">
                <CheckBox
                  name="isDiscountable"
                  checked={isDiscountable}
                  onChange={() => this.onChangeCheckBox('isDiscountable')}
                  label="Is Discountable"
                />
              </FormGroup>
              <FormGroup title="Start Date">
                <div className="date-picker">
                  <DatePicker
                    className="form__form-group-datepicker"
                    selected={startDate}
                    onChange={date => this.onChangeDate('startDate', date)}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
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
                    className="form__form-group-datepicker"
                    selected={endDate}
                    onChange={date => this.onChangeDate('endDate', date)}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
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
                    autoComplete="off"
                    isClearable
                  />
                </div>
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
            </div>
            <ButtonToolbar className="form-create__btn">
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
          </div>
        </FormAbstract>
        <ModalSelectItem
          openModal={openModal}
          toggleModal={this.onToggleModal}
          items={items}
          onSelectItem={this.onSelectParentItem}
          idSelected={parentItemId}
          itemId={idx}
          unSelectItem={this.unSelectParentItem}
          page={page}
          size={size}
          isSearching={isSearching}
          handlePage={this.handlePage}
          handleSize={this.handleSize}
          onHandleSearch={this.onHandleSearch}
          modalTitle="Choose Parent Item"
        />
      </FormPanel>
    );
  }
}

PricingItemDetail.propTypes = {
  selectItemsId: PropTypes.func,
  itemInfo: PropTypes.object,
  idx: PropTypes.string,
  modifyItem: PropTypes.func,
  updateItemStatus: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  itemInfo: makeGetItemDetail() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  {
    selectItemsId,
    modifyItem,
    updateItemStatus,
  },
)(PricingItemDetail);
