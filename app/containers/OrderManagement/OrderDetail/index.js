import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, ButtonToolbar, Button } from 'reactstrap';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { createStructuredSelector } from 'reselect';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';
import { FormAbstract, FormGroup } from 'components/form';
import {
  ErrorDetail,
  CheckBox,
  PageAbstract,
  ButtonCustom,
} from 'components/commons';
import { formatStringUrl, checkExistElInArr } from 'utils/utils';
import { SideBar } from 'components/orders';
import { Messages, orderSelect, orderEnum } from 'constantsApp';
import {
  // ModalAction,
  ModalChoosePackage,
  ServiceEditForm,
  ModalChooseBundle,
  ModalChoosePriceOffer,
} from './components';
import { getOrderDetail, updateOrderStatus, modifyOrder } from '../actions';
import { makeGetOrderDetail, makeErrorMessage } from '../selectors';
import ModalMode from '../ModalAddRemoveMode';
import ModalActions from '../modalActions';
import { OrderService } from '../components';
// import ModalChoosePackage from '../components/ModalChoosePackage';
import {
  addServicesPackage,
  addLinesPackage,
  parseLines,
  createServicePriceOffer,
} from '../utilities';

class OrderDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: '',
      type: '',
      status: '',
      reason: '',
      userId: '',
      isPartialFulfillmentAllowed: false,
      effectiveDate: null,
      submittedDate: null,
      initialTerm: '',
      initialTermUnit: null,
      renewalTerm: '',
      renewalTermUnit: null,
      trialTerm: '',
      trialTermUnit: '',
      mode: '',
      isUpdating: false,
      // openModalAction: false,
      // modalTitleAction: '',
      // isUpdatingStatus: false,
      // typeModalAction: '',
      openModalAR: false,
      pSelected: {},
      originP: {},
      bSelected: [],
      bOrigin: [],
      poSelected: [],
      poOrigin: [],
      isARServices: false,
      services: [],
      newServicePackage: [],
      isSubmitting: false,
      isCancelling: false,
      isApproving: false,
    };
    this.reason = '';
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.props.getOrderDetail(id);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.orderDetail !== nextProps.orderDetail &&
      nextProps.orderDetail.id
    ) {
      this.initValue(nextProps.orderDetail);
      this.getTypePurchase(nextProps.orderDetail.services);
    }
  }

  initValueLines = lines => {
    const result = [];
    lines.forEach(item => {
      const val = {
        id: `${item.index}`,
        index: item.index,
        action: item.action,
        status: item.status,
        reason: item.reason || null,
        quantity: item.quantity || null,
        priceOverride: item.priceOverride || null,
        priceOffset: item.priceOffset || null,
        discountPercent: item.discountPercent || null,
        startDate: item.startDate ? moment(item.startDate) : null,
        endDate: item.endDate ? moment(item.endDate) : null,
        relativeStart: item.relativeStart || null,
        relativeEnd: item.relativeEnd || null,
        relativeStartUnit: item.relativeStartUnit || null,
        relativeEndUnit: item.relativeEndUnit || null,
        priceOfferId: item.priceOfferId || null,
        discountOfferId: item.discountOfferId || null,
      };
      result.push(val);
    });
    return result;
  };

  initValueService = services => {
    const result = [];
    services.forEach(item => {
      const val = {
        id: `${item.index}`,
        index: item.index,
        serviceType: item.serviceType,
        provisioningId: item.provisioningId || '',
        action: item.action,
        reason: item.reason || '',
        status: item.status,
        bundleId: item.bundleId || '',
        packageId: item.packageId || '',
        lines: item.lines ? this.initValueLines(item.lines) : null,
      };
      result.push(val);
    });
    return result;
  };

  initValue = orderDetail => {
    this.setState({
      type: orderDetail.type,
      status: orderDetail.status,
      reason: orderDetail.reason || '',
      accountId: orderDetail.accountId,
      userId: orderDetail.userId || '',
      isPartialFulfillmentAllowed:
        orderDetail.isPartialFulfillmentAllowed || false,
      effectiveDate: orderDetail.effectiveDate
        ? moment(orderDetail.effectiveDate)
        : null,
      submittedDate: orderDetail.submittedDate
        ? moment(orderDetail.submittedDate)
        : null,
      initialTerm: orderDetail.initialTerm || '',
      initialTermUnit: orderSelect.initialTermUnit.find(
        el => el.value === orderDetail.initialTermUnit,
      ),
      renewalTerm: orderDetail.renewalTerm || '',
      renewalTermUnit: orderSelect.renewalTermUnit.find(
        el => el.value === orderDetail.renewalTermUnit,
      ),
      trialTerm: orderDetail.trialTerm || '',
      trialTermUnit: orderDetail.trialTermUnit || '',
      services: this.initValueService(orderDetail.services),
    });
  };

  getTypePurchase = data => {
    const bSelected = [];
    const poSelected = [];
    if (!data.length) {
      this.setState({ mode: ModalMode.none });
    } else if (data[0].packageId) {
      this.setState({
        mode: ModalMode.purchasePackage,
        pSelected: { id: data[0].packageId },
        originP: { id: data[0].packageId },
      });
    } else if (data[0].bundleId) {
      data.forEach(el => {
        bSelected.push({
          id: el.bundleId,
        });
      });
      this.setState({
        mode: ModalMode.purchaseBundle,
        bSelected,
        bOrigin: _.cloneDeep(bSelected),
      });
    } else {
      data.forEach(el => {
        el.lines.forEach(elm => {
          poSelected.push({
            id: elm.priceOfferId,
            serviceType: el.serviceType,
          });
        });
      });
      this.setState({
        mode: ModalMode.purchaseAlaCarte,
        poSelected,
        poOrigin: _.cloneDeep(poSelected),
      });
    }
  };

  // dismissModalAction = () => {
  //   this.setState({ openModalAction: false });
  // };

  // onChangeReason = value => {
  //   this.reason = value;
  // };

  onChangeDate = (name, date) => {
    this.setState({
      [name]: date,
    });
  };

  onToggleModal = () => {
    this.setState(preState => ({ openModalAR: !preState.openModalAR }));
  };

  onSelectPackage = pSelected => {
    const { originP } = this.state;
    let newServicePackage = [];
    if (originP.id !== pSelected.id) {
      newServicePackage = addServicesPackage(pSelected);
    }
    this.setState({ pSelected, newServicePackage });
  };

  addLinesPackage = (bundleComponent, id) => {
    const { newServicePackage } = this.state;
    this.setState({
      newServicePackage: addLinesPackage(
        bundleComponent,
        id,
        newServicePackage,
      ),
    });
  };

  onCancelChoosePackage = () => {
    const { originP } = this.state;

    this.setState({
      pSelected: _.cloneDeep(originP),
      newServicePackage: [],
      openModalAR: false,
    });
  };

  // handleModalAction = typeModalAction => {
  //   let modalTitleAction = '';
  //   if (typeModalAction === ModalActions.submit) {
  //     modalTitleAction = 'Submit Order';
  //   } else if (typeModalAction === ModalActions.approve) {
  //     modalTitleAction = 'Approve Order';
  //   } else {
  //     modalTitleAction = 'Cancel Order';
  //   }
  //   this.setState({
  //     typeModalAction,
  //     modalTitleAction,
  //     openModalAction: true,
  //   });
  //   this.reason = '';
  // };

  handleAction = (typeAction) => {
    // const { typeModalAction } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = {};
    data.id = id;
    // data.reason = this.reason;
    if (typeAction === ModalActions.submit) {
      data.status = orderEnum.status.submitted;
      this.setState({ isSubmitting: true });
    } else if (typeAction === ModalActions.approve) {
      data.status = orderEnum.status.approved;
      this.setState({ isApproving: true });
    } else {
      data.status = orderEnum.status.cancelled;
      this.setState({ isCancelling: true });
    }

    this.props.updateOrderStatus(data, ({ success }) => {
      console.log('update status', success)
      if (typeAction === ModalActions.submit) {
        this.setState({ isSubmitting: false });
      } else if (typeAction === ModalActions.approve) {
        this.setState({ isApproving: false });
      } else {
        this.setState({ isCancelling: false });
      }
    });
  };

  getDataOrderInfo() {
    const {
      effectiveDate,
      initialTermUnit,
      initialTerm,
      renewalTermUnit,
      renewalTerm,
      userId,
    } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const dataOrderInfo = {
      id,
      userId,
      type: orderEnum.type.modify,
      effectiveDate: effectiveDate
        ? moment(effectiveDate).format('YYYY-MM-DD') : null,
      initialTerm: initialTerm || null,
      initialTermUnit: initialTermUnit ? initialTermUnit.value : null,
      renewalTerm: renewalTerm || null,
      renewalTermUnit: renewalTermUnit ? renewalTermUnit.value : null,
    };

    return dataOrderInfo;
  }

  handleUpdateOrder = () => {
    const { services } = this.state;
    const newServices = _.cloneDeep(services);
    const dataOrder = this.getDataOrderInfo();
    newServices.forEach(service => {
      delete service.id;

      service.lines.forEach(line => {
        delete line.id;
        line.startDate = line.startDate ? moment(line.startDate).format('YYYY-MM-DD') : null;
        line.endDate = line.endDate ? moment(line.endDate).format('YYYY-MM-DD') : null;
      });
    });

    dataOrder.services = newServices;
    this.setState({ isUpdating: true });
    this.props.modifyOrder(dataOrder, () => {
      this.setState({ isUpdating: false });
    });
  };

  handleUpdatePackage = () => {
    const { newServicePackage, services, pSelected } = this.state;

    const newServices = newServicePackage.map((el, index) => ({
      index: index + 1,
      action: orderEnum.action.add,
      status: orderEnum.status.create,
      packageId: pSelected.id,
      bundleId: el.bundleId,
      serviceType: el.serviceType,
      lines: parseLines(el.lines),
    }));

    const removeOldServices = services.map(el => ({
      index: el.index,
    }));

    const dataOrder = this.getDataOrderInfo();
    dataOrder.services = removeOldServices;

    this.setState({ isARServices: true });
    this.props.modifyOrder(dataOrder, () => {
      dataOrder.services = newServices;
      this.props.modifyOrder(dataOrder, () => {
        this.setState({
          isARServices: false,
          openModalAR: false,
        });
      });
    });
  };

  onSelectBundle = (bundle) => {
    let { bSelected } = this.state;
    const bundleTmp = bSelected.find(el => el.id === bundle.id);
    if (bundleTmp) {
      bSelected = bSelected.filter(el => el.id !== bundle.id);
    } else {
      bSelected.push(bundle);
    }

    this.setState({ bSelected: _.cloneDeep(bSelected) });
  }

  onCancelChooseBundle = () => {
    const { bOrigin } = this.state;
    this.setState({ bSelected: _.cloneDeep(bOrigin), openModalAR: false });
  }

  handleUpdateBundle = () => {
    const { services, bSelected } = this.state;
    const removeServices = services.map(el => ({ index: el.index }));

    const keepServices = services.filter(el => checkExistElInArr(el, 'bundleId', bSelected, 'id'));
    let newServices = bSelected.filter(el => !checkExistElInArr(el, 'id', services, 'bundleId'));
    newServices = newServices.map(bundle => {
      const lines = [];
      bundle.components.forEach((el, index) =>
        lines.push({
          index: index + 1,
          action: orderEnum.action.add,
          status: orderEnum.status.create,
          priceOfferId: el.priceOfferId,
        }),
      );

      return {
        action: orderEnum.action.add,
        status: orderEnum.status.create,
        bundleId: bundle.id,
        serviceType: bundle.components[0].serviceType,
        lines: lines,
      }
    });
    const dataServices = keepServices.concat(newServices);

    const dataOrder = this.getDataOrderInfo();

    dataServices.forEach((service, index) => {
      delete service.id;
      service.index = index + 1;
      service.lines.forEach(line => {
        delete line.id;
        line.startDate = line.startDate ? moment(line.startDate).format('YYYY-MM-DD') : null;
        line.endDate = line.endDate ? moment(line.endDate).format('YYYY-MM-DD') : null;
      });
    });

    dataOrder.services = removeServices;

    this.props.modifyOrder(dataOrder, () => {
      const newData = _.cloneDeep(dataOrder)
      newData.services = dataServices;
      this.props.modifyOrder(newData, () => {
        this.setState({
          isARServices: false,
          openModalAR: false,
        });
      });
    });
  }

  onSelectPriceOffer = (priceOffer) => {
    let { poSelected } = this.state;
    const poTmp = poSelected.find(el => el.id === priceOffer.id);
    if (poTmp) {
      poSelected = poSelected.filter(el => el.id !== priceOffer.id);
    } else {
      poSelected.push(priceOffer);
    }

    this.setState({ poSelected: _.cloneDeep(poSelected) });
  }

  onCancelChoosePO = () => {
    const { poOrigin } = this.state;
    this.setState({ poSelected: _.cloneDeep(poOrigin), openModalAR: false });
  }

  handleUpdatePO = () => {
    const { services, poSelected } = this.state;
    const services1 = _.cloneDeep(services);
    const resultChanged = createServicePriceOffer(poSelected)
    const newServices = resultChanged.filter(el => !checkExistElInArr(el, 'serviceType', services1, 'serviceType'));
    const keepServices = services1.filter(el => checkExistElInArr(el, 'serviceType', resultChanged, 'serviceType'));

    keepServices.forEach(service => {
      const removeLines = [];
      service.lines.forEach(line => {
        if (!checkExistElInArr(line, 'priceOfferId', poSelected, 'id')) {
          removeLines.push(line);
        }
      });
      service.lines = service.lines.filter(line => !checkExistElInArr(line, 'priceOfferId', removeLines, 'priceOfferId'));

      const oldServiceTmp = resultChanged.find(item => item.serviceType === service.serviceType);
      if (oldServiceTmp) {
        oldServiceTmp.lines.forEach(line => {
          if(!checkExistElInArr(line, 'priceOfferId', service.lines, 'priceOfferId')) {
            service.lines.push(line);
          }
        });
      }
    });
    const dataServices = keepServices.concat(newServices);
    dataServices.forEach((service, index) => {
      delete service.id;
      service.index = index + 1;
      service.lines.forEach((line, idx) => {
        delete line.id;
        line.index = idx + 1;
        line.startDate = line.startDate ? moment(line.startDate).format('YYYY-MM-DD') : null;
        line.endDate = line.endDate ? moment(line.endDate).format('YYYY-MM-DD') : null;
      });
    });

    const dataOrder = this.getDataOrderInfo();
    const removeServices = services.map(el => ({ index: el.index }));
    dataOrder.services = removeServices;

    this.setState({ isARServices: true })
    this.props.modifyOrder(dataOrder, () => {
      const newData = _.cloneDeep(dataOrder)
      newData.services = dataServices;
      this.props.modifyOrder(newData, () => {
        this.setState({
          isARServices: false,
          openModalAR: false,
        });
      });
    });
  }

  changeLines = (parentName, serviceId, lineId, name, value) => {
    const { services } = this.state;
    const service = services.find(el => el.id === serviceId);
    const line = service.lines.find(line => line.id === lineId);
    line[name] = value;
  }

  disabledBtn() {
    const { orderDetail = {} } = this.props;
    return orderDetail.status === orderEnum.status.submitted;
  }

  renderButtonGroup() {
    const { mode, isUpdating, isApproving, isCancelling, isSubmitting } = this.state;
   
    return (
      <ButtonToolbar className="form-create__btn">
        {mode !== ModalMode.none ? (
          <Button
            className="add-component"
            color="success"
            onClick={() => this.onToggleModal()}
            disabled={this.disabledBtn()}
          >
            {`${
              mode === ModalMode.purchaseBundle
                ? 'Add or Remove Bundle'
                : mode === ModalMode.purchaseAlaCarte
                  ? 'Add or Remove Price Offer'
                  : 'Add and Remove Package'
            } `}
          </Button>
        ) : null}
        <ButtonCustom
          loading={isApproving}
          className="btn btn-primary"
          type="button"
          onClick={() => this.handleAction(ModalActions.approve)}
          disabled={this.disabledBtn()}
          title="Approve Order"
          titleloading="Approving"
        />
        <ButtonCustom
          loading={isCancelling}
          className="btn btn-primary"
          type="button"
          onClick={() => this.handleAction(ModalActions.cancel)}
          disabled={this.disabledBtn()}
          title="Cancel Order"
          titleloading="Cancelling"
        />
        <ButtonCustom
          loading={isSubmitting}
          className="btn btn-primary m-l"
          type="button"
          onClick={() => this.handleAction(ModalActions.submit)}
          disabled={this.disabledBtn()}
          title="Submit Order"
          titleloading="Submitting"
        />
        <ButtonCustom
          loading={isUpdating}
          className="btn btn-primary m-r"
          type="button"
          title="Update Order"
          titleloading="Updating"
          onClick={this.handleUpdateOrder}
          disabled={this.disabledBtn()}
        />
      </ButtonToolbar>
    );
  }

  renderSelectModal() {
    const {
      mode,
      openModalAR,
      pSelected,
      isARServices,
      originP,
      bSelected,
      bOrigin,
      poSelected,
      poOrigin,
    } = this.state;

    if (mode === ModalMode.purchasePackage) {
      return (
        <ModalChoosePackage
          openModal={openModalAR}
          isUpdating={isARServices}
          originP={originP}
          pSelected={pSelected}
          onSelectPackage={this.onSelectPackage}
          onSubmit={this.handleUpdatePackage}
          onCancel={this.onCancelChoosePackage}
        />
      );
    } else if (mode === ModalMode.purchaseBundle) {
      return (
        <ModalChooseBundle
          openModal={openModalAR}
          isUpdating={isARServices}
          bSelected={bSelected}
          bOrigin={bOrigin}
          onSelectBundle={this.onSelectBundle}
          onSubmit={this.handleUpdateBundle}
          onCancel={this.onCancelChooseBundle}
        />
      )
    } else if (mode === ModalMode.purchaseAlaCarte) {
      return (
        <ModalChoosePriceOffer
          openModal={openModalAR}
          isUpdating={isARServices}
          poSelected={poSelected}
          poOrigin={poOrigin}
          onSelectPriceOffer={this.onSelectPriceOffer}
          onSubmit={this.handleUpdatePO}
          onCancel={this.onCancelChoosePO}
        />
      )
    }
    return null;
  }

  renderNewServicePackage() {
    const { newServicePackage, accountId } = this.state;

    return (
      <div className="field-none">
        {newServicePackage.map((item, index) => (
          <OrderService
            key={item.id}
            index={index}
            aSelectedId={accountId}
            service={item}
            addLinesPackage={this.addLinesPackage}
            changeLines={this.changeLines}
            parentName="none"
            hasFetchBundle
          />
        ))}
      </div>
    );
  }

  renderContent() {
    const {
      orderDetail,
      match: {
        params: { id },
      },
      errorMessage
    } = this.props;

    if (errorMessage) {
      return <ErrorDetail msg={errorMessage} />;
    }

    const {
      accountId,
      type,
      status,
      reason,
      userId,
      isPartialFulfillmentAllowed,
      effectiveDate,
      submittedDate,
      initialTerm,
      initialTermUnit,
      renewalTerm,
      renewalTermUnit,
      trialTerm,
      trialTermUnit,
      services,
      openModalAction,
      isUpdatingStatus,
      modalTitleAction,
      typeModalAction,
    } = this.state;

    return (
      <div className="order-edit-form">
        <div className="order-edit-form__header">
          <Row>
            <Col md={12}>
              <h3 className="bold-text">
                Order &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="account-detail">Order Id:</span>&nbsp;&nbsp;
                <span className="account-detail">{id}</span>
              </h3>
            </Col>
          </Row>
        </div>
        <div className="order-edit-form__body">
          <FormAbstract onSubmit={() => {}}>
            <div className="form__half">
              <FormGroup title="Account Id">
                <input
                  name="accountId"
                  type="text"
                  placeholder="Account Id"
                  value={accountId}
                  onChange={() => {}}
                  disabled
                />
              </FormGroup>
              <FormGroup title="Type">
                <input
                  name="type"
                  type="text"
                  value={type}
                  onChange={() => {}}
                  disabled
                />
              </FormGroup>
              <FormGroup title="Status">
                <input
                  name="status"
                  type="text"
                  value={status}
                  onChange={() => {}}
                  disabled
                />
              </FormGroup>
              <FormGroup title="Reason">
                <input
                  name="reason"
                  type="text"
                  value={reason}
                  onChange={() => {}}
                  disabled
                />
              </FormGroup>
              <FormGroup title="User Id">
                <input
                  name="userId"
                  type="text"
                  placeholder="User Id"
                  value={userId}
                  onChange={() => {}}
                  disabled
                />
              </FormGroup>
              <FormGroup title="Effective Date">
                <div className="date-picker">
                  <DatePicker
                    name="effectiveDate"
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
                    selected={effectiveDate}
                    onChange={date => this.onChangeDate('effectiveDate', date)}
                    className="form__form-group-datepicker"
                    autoComplete="off"
                    isClearable
                    disabled={this.disabledBtn()}
                  />
                </div>
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
              <FormGroup title="Submitted Date">
                <div className="date-picker">
                  <DatePicker
                    name="submittedDate"
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
                    selected={submittedDate}
                    onChange={() => {}}
                    className="form__form-group-datepicker"
                    isClearable
                    autoComplete="off"
                    disabled
                  />
                </div>
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Initial Term">
                <input
                  name="initialTerm"
                  type="number"
                  placeholder="Initial Term"
                  value={initialTerm}
                  onChange={this.onChangeText}
                  disabled={this.disabledBtn()}
                />
              </FormGroup>
              <FormGroup title="Initial Term Unit">
                <Select
                  name="initialTermUnit"
                  options={orderSelect.initialTermUnit}
                  placeholder="Initial Term Unit"
                  className="form__form-group-select"
                  value={initialTermUnit}
                  onChange={val => this.onChangeSelect('initialTermUnit', val)}
                  isDisabled={this.disabledBtn()}
                />
              </FormGroup>
              <FormGroup title="Renewal Term">
                <input
                  name="renewalTerm"
                  type="number"
                  placeholder="Renewal Term"
                  value={renewalTerm}
                  onChange={this.onChangeText}
                  disabled={this.disabledBtn()}
                />
              </FormGroup>
              <FormGroup title="Renewal Term Unit">
                <Select
                  name="renewalTermUnit"
                  options={orderSelect.renewalTermUnit}
                  placeholder="Renewal Term Unit"
                  className="form__form-group-select"
                  value={renewalTermUnit}
                  onChange={val => this.onChangeSelect('renewalTermUnit', val)}
                  isDisabled={this.disabledBtn()}
                />
              </FormGroup>
              <FormGroup title="Trial Term">
                <input
                  name="trialTerm"
                  type="number"
                  placeholder="Trial Term"
                  value={trialTerm}
                  onChange={() => {}}
                  disabled
                />
              </FormGroup>
              <FormGroup title="Trial Term Unit">
                <input
                  name="trialTermUnit"
                  type="text"
                  placeholder="Trial Term Unit"
                  value={trialTermUnit}
                  onChange={() => {}}
                  disabled
                />
              </FormGroup>
              <FormGroup title=" ">
                <CheckBox
                  name="isPartialFulfillmentAllowed"
                  label="Is Partial Fulfillment Allowed"
                  checked={isPartialFulfillmentAllowed}
                  onChange={() => {}}
                />
              </FormGroup>
            </div>
            <div className="order-content">
              {services.map(item => (
                <ServiceEditForm
                  key={item.id}
                  service={item}
                  parentName="services"
                  changeLines={this.changeLines}
                  disabledBtnOverrideLine={this.disabledBtn()}
                />
              ))}
            </div>
            {this.renderButtonGroup()}
            {this.renderNewServicePackage()}
          </FormAbstract>
        </div>
        {/* <ModalAction
          openModal={openModalAction}
          dismissModal={this.dismissModalAction}
          modalTitle={modalTitleAction}
          typeModal={typeModalAction}
          isUpdating={isUpdatingStatus}
          onChangeReason={this.onChangeReason}
          handleAction={this.handleAction}
        /> */}
        {this.renderSelectModal()}
      </div>
    );
  }

  render() {
    return (
      <div className="global-page order-page">
        <SideBar isShowSidebarItem={false} />
        <PageAbstract>
          <Row>
            <Col md={12}>{this.renderContent()}</Col>
          </Row>
        </PageAbstract>
      </div>
    );
  }
}

OrderDetailPage.propTypes = {
  match: PropTypes.object,
  getOrderDetail: PropTypes.func,
  orderDetail: PropTypes.object,
  updateOrderStatus: PropTypes.func,
  modifyOrder: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  orderDetail: makeGetOrderDetail() || {},
  errorMessage: makeErrorMessage() || {},
});

export default connect(
  mapStateToProps,
  {
    getOrderDetail,
    updateOrderStatus,
    modifyOrder,
  },
)(OrderDetailPage);
