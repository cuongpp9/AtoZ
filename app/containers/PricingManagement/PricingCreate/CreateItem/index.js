import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ButtonToolbar } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  FormAbstract,
  FormPanel,
  FormGroup,
  RenderField,
  RenderSelectField,
  RenderCheckBoxField,
  RenderDatePickerField,
  ValidateSingleField,
} from 'components/form';
import { ButtonCustom } from 'components/commons';
import { ModalSelectItem } from 'components/modals';
import { dataSelect } from 'constantsApp';
import { selectItemsId } from 'containers/App/actions';
import { calculateValCallback } from 'utils/utils';
import { createItem } from '../../actions';

class PricingItemsCreate extends React.PureComponent {
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
    };
  }

  componentDidMount() {
    this.props.selectItemsId({ page: 1, size: 20 }, data => {
      const items = calculateValCallback(data);
      this.setState({ items });
    });
  }

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

  unSelectParentItem = () => {
    this.setState({ parentItemId: '', openModal: false });
  };

  onHandleCreateItem = value => {
    const result = value.toJS();
    this.setState({ isPosting: true });
    const {
      id,
      name,
      description,
      company,
      revenueType,
      productFamily,
      productLine,
      productType,
      productSubType,
      // parentItemId,
      isBundled,
      externalId,
      externalName,
      glAccount,
      taxCode,
      isDiscountable,
      startDate,
      endDate,
      status,
    } = result;
    const { parentItemId } = this.state;
    const dataCreate = {
      id: id || null,
      name: name || null,
      description: description || null,
      company: company || null,
      revenueType: revenueType ? revenueType.value : null,
      productFamily: productFamily || null,
      productLine: productLine || null,
      productType: productType || null,
      productSubType: productSubType || null,
      parentItemId,
      isBundled: isBundled || false,
      externalId: externalId || null,
      externalName: externalName || null,
      glAccount: glAccount || null,
      taxCode: taxCode || null,
      isDiscountable: isDiscountable || false,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      status: status ? status.value : null,
    };
    this.props.createItem(dataCreate, () => {
      this.setState({ isPosting: false });
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const {
      isPosting,
      openModal,
      items,
      parentItemId,
      page,
      size,
      isSearching,
    } = this.state;

    return (
      <FormPanel title="Item">
        <FormAbstract onSubmit={handleSubmit(this.onHandleCreateItem)}>
          <div className="form-inner">
            <div className="form__half">
              <FormGroup title="Id">
                <Field
                  name="id"
                  component={RenderField}
                  type="text"
                  placeholder="Id"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title="Name">
                <Field
                  name="name"
                  component={RenderField}
                  type="text"
                  placeholder="Name"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title="Description">
                <Field
                  name="description"
                  component={RenderField}
                  textarea
                  type="text"
                  placeholder="Description"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title="Company">
                <Field
                  name="company"
                  component={RenderField}
                  type="text"
                  placeholder="Company"
                />
              </FormGroup>
              <FormGroup title="Revenue Type">
                <Field
                  name="revenueType"
                  component={RenderSelectField}
                  type="text"
                  options={dataSelect.revenueType.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Revenue Type"
                />
              </FormGroup>
              <FormGroup title="Product Family">
                <Field
                  name="productFamily"
                  component={RenderField}
                  type="text"
                  placeholder="Product Family"
                />
              </FormGroup>
              <FormGroup title="Product Line">
                <Field
                  name="productLine"
                  component={RenderField}
                  type="text"
                  placeholder="Product Line"
                />
              </FormGroup>
              <FormGroup title="Product Type">
                <Field
                  name="productType"
                  component={RenderField}
                  type="text"
                  placeholder="Product Type"
                />
              </FormGroup>
              <FormGroup title="Product Sub-Type">
                <Field
                  name="productSubType"
                  component={RenderField}
                  type="text"
                  placeholder="Product Sub-Type"
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="GL Account">
                <Field
                  name="glAccount"
                  component={RenderField}
                  type="text"
                  placeholder="GL Account"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title="Tax Code">
                <Field
                  name="taxCode"
                  component={RenderField}
                  type="text"
                  placeholder="Tax Code"
                  validate={ValidateSingleField}
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
                <Field
                  name="status"
                  component={RenderSelectField}
                  type="text"
                  options={dataSelect.statusPricing.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Status"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title="External Id">
                <Field
                  name="externalId"
                  component={RenderField}
                  type="text"
                  placeholder="External Id"
                />
              </FormGroup>
              <FormGroup title="External Name">
                <Field
                  name="externalName"
                  component={RenderField}
                  type="text"
                  placeholder="External Name"
                />
              </FormGroup>
              <FormGroup title=" ">
                <Field
                  name="isBundled"
                  component={RenderCheckBoxField}
                  label="Is Bundled"
                />
              </FormGroup>
              <FormGroup title=" ">
                <Field
                  name="isDiscountable"
                  component={RenderCheckBoxField}
                  label="Is Discountable"
                />
              </FormGroup>
              <FormGroup title="Start Date">
                <Field
                  name="startDate"
                  component={RenderDatePickerField}
                  placeholder="YYYY-MM-DD"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
              <FormGroup title="End Date">
                <Field
                  name="endDate"
                  component={RenderDatePickerField}
                  placeholder="YYYY-MM-DD"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
            </div>
            <ButtonToolbar className="form-create__btn">
              <ButtonCustom
                loading={isPosting}
                className="btn btn-primary"
                type="submit"
                title="Create"
                titleloading="Creating"
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

PricingItemsCreate.propTypes = {
  handleSubmit: PropTypes.func,
  createItem: PropTypes.func,
  selectItemsId: PropTypes.func,
};

const withConnect = connect(
  null,
  {
    createItem,
    selectItemsId,
  },
);

const withReduxForm = reduxForm({
  form: 'form_create_item',
});

export default compose(
  withReduxForm,
  withConnect,
)(PricingItemsCreate);
