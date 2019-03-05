import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import shortid from 'shortid';
import moment from 'moment';
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import { SideBar } from 'components/orders';
import { PageAbstract, ButtonCustom } from 'components/commons';
import { FormAbstract } from 'components/form';
import { ModalValidate } from 'components/modals';
import { createOrderValidateMsg, orderEnum } from 'constantsApp';
import { createOrder } from '../actions';
import OrderInfo from './OrderInfo';
import {
  OrderSelectAccount,
  OrderSelectPackage,
  OrderSelectBundle,
  OrderSelectPriceOffer,
  OrderService,
} from '../components';
import { 
  ModalChoosePackage,
  ModalChooseBundle,
  ModalChoosePriceOffer,
} from './components';
import ModalMode from '../ModalAddRemoveMode';
import {
  addServicesPackage,
  addLinesPackage,
  parseLines,
  createServicePriceOffer,
} from '../utilities';

class OrderCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.location.state && props.location.state.accountId ? 2 : 1,
      tab: 0,
      aSelectedId: props.location.state ? props.location.state.accountId : '',
      poSelected: [],
      packageInfo: null,
      bundleInfo: [],
      priceOfferInfo: null,
      showModalValidate: false,
      showModalAddNewService: false,
      msgValidate: '',
      isPosting: false,
      //info account
      pageAccount: 1,
      sizeAccount: 20,
      filterAccount: {},
      // for order info
      id: '',
      type: orderEnum.type.new,
      status: {
        value: orderEnum.status.create,
        label: orderEnum.status.create,
      },
      reason: '',
      userId: 'TestUserId',
      effectiveDate: moment(new Date()),
      submittedDate: moment(new Date()),
      initialTerm: '1',
      initialTermUnit: {
        value: orderEnum.initialTermUnit.months,
        label: orderEnum.initialTermUnit.months,
      },
      renewalTerm: '1',
      renewalTermUnit: {
        value: orderEnum.renewalTermUnit.months,
        label: orderEnum.renewalTermUnit.months,
      },
      trialTerm: '',
      trialTermUnit: null,
      isPartialFulfillmentAllowed: false,
      servicePackage: [],
      serviceBundle: [],
      serviceAlaCarte: [],
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.originPackage = {};
    this.originBundles = [];
    this.originPOs = [];
  }
  getInfoAccount = (name, val) => {
    this.setState({ [name]: val });
  };

  openModalAddNewService = () => {
    this.setState({
      showModalAddNewService: !this.state.showModalAddNewService,
    });
  };

  handleDismissModal = () => {
    this.setState({ showModalValidate: false });
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

  nextPage() {
    // this.setState({ page: this.state.page + 1 });
    const {
      page,
      aSelectedId,
      tab,
      packageInfo,
      bundleInfo,
      poSelected,
      // id,
    } = this.state;
    if (page === 1 && !aSelectedId) {
      this.setState({
        msgValidate: createOrderValidateMsg.selectAccount,
        showModalValidate: true,
      });
      return;
    }

    if (page === 2 && !tab) {
      this.setState({
        msgValidate: createOrderValidateMsg.selectOptionPurchase,
        showModalValidate: true,
      });
      return;
    }

    if (page === 2 && tab === 1 && !packageInfo) {
      this.setState({
        msgValidate: createOrderValidateMsg.selectPackage,
        showModalValidate: true,
      });
      return;
    }

    if (page === 2 && tab === 2 && !bundleInfo.length) {
      this.setState({
        msgValidate: createOrderValidateMsg.selectBundle,
        showModalValidate: true,
      });
      return;
    }

    if (page === 2 && tab === 3 && !poSelected.length) {
      this.setState({
        msgValidate: createOrderValidateMsg.selectPriceOffer,
        showModalValidate: true,
      });
      return;
    }

    // if (page === 3 && !id) {
    //   this.setState({
    //     msgValidate: createOrderValidateMsg.fillId,
    //     showModalValidate: true,
    //   });
    //   return;
    // }

    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  activeTab = tab => {
    this.setState({ tab });
  };

  parseService(services) {
    const dataServices = services.map((item, index) => ({
      index: index + 1,
      serviceType: item.serviceType,
      provisioningId: item.provisioningId || null,
      action: item.action,
      reason: item.reason || null,
      status: item.status,
      bundleId: item.bundleId || null,
      packageId: item.packageId || null,
      lines: item.lines ? parseLines(item.lines) : null,
    }));
    return dataServices;
  }

  onHandleCreateOrder = evt => {
    evt.preventDefault();
    this.setState({ isPosting: true });
    const {
      // id,
      type,
      status,
      tab,
      aSelectedId,
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
      servicePackage,
      serviceBundle,
      serviceAlaCarte,
    } = this.state;
    const services = () => {
      if (tab === 1) {
        // Purchase Package
        return this.parseService(servicePackage);
      } else if (tab === 2) {
        return this.parseService(serviceBundle);
      }

      return this.parseService(serviceAlaCarte);
    };

    const dataCreate = {
      // id: id || null,
      type: type,
      status: status.value,
      reason: reason || null,
      accountId: aSelectedId,
      userId,
      isPartialFulfillmentAllowed: isPartialFulfillmentAllowed || false,
      effectiveDate: effectiveDate
        ? moment(effectiveDate).format('YYYY-MM-DD')
        : null,
      submittedDate: submittedDate
        ? moment(effectiveDate).format('YYYY-MM-DD')
        : null,
      initialTerm: initialTerm || null,
      initialTermUnit: initialTermUnit ? initialTermUnit.value : null,
      renewalTerm: renewalTerm || null,
      renewalTermUnit: renewalTermUnit ? renewalTermUnit.value : null,
      trialTerm: trialTerm || null,
      trialTermUnit: trialTermUnit ? trialTermUnit.value : null,
      services: services(),
    };
    console.log('data create: ', dataCreate),
      this.props.createOrder(dataCreate, () => {
        this.setState({ isPosting: false });
      });
  };

  selectAccount = aSelectedId => {
    this.setState({ aSelectedId });
  };

  selectPackage = packageInfo => {
    const servicePackage = addServicesPackage(packageInfo);
    this.setState({ packageInfo, servicePackage });
    this.originPackage = _.cloneDeep(packageInfo);
  };

  addLinesPackage = (bundleComponent, id) => {
    const { servicePackage } = this.state;
    this.setState({ servicePackage: addLinesPackage(bundleComponent, id, servicePackage) });
  };

  onSelectPackageModal = packageInfo => {
    this.setState({ packageInfo });
  }

  onChoosePkg = () => {
    const { packageInfo } = this.state;
    const servicePackage = this.addServicesPackage(packageInfo);
    this.setState({ servicePackage, showModalAddNewService: false });
    this.originPackage = _.cloneDeep(packageInfo);
  }

  onCancelChoosePkg = () => {
    const packageInfo = _.cloneDeep(this.originPackage);

    this.setState({ packageInfo, showModalAddNewService: false });
  }

  changeLines = (parentName, serviceId, lineId, name, value) => {
    const listServices = this.state[parentName];
    const service = listServices.find(el => el.id === serviceId);
    const line = service.lines.find(line => line.id === lineId);
    line[name] = value;
    // console.log('changeLines', listServices);
  };

  tranformArrayNotNull = value => {
    const result = [];
    value.forEach(item => {
      if (item) {
        result.push(item);
      }
    });
    return result;
  };

  selectBundle = bundle => {
    const { bundleInfo, serviceBundle } = this.state;
    const index = serviceBundle.findIndex(el => el && el.id === bundle.id);
    const lines = [];
    bundle.components.forEach(el =>
      lines.push({
        id: shortid(),
        action: orderEnum.action.add,
        status: orderEnum.status.create,
        priceOfferId: el.priceOfferId,
      }),
    );
    if (index >= 0) {
      bundleInfo[index] = null;
      serviceBundle[index] = null;
    } else {
      serviceBundle.push({
        id: bundle.id,
        action: orderEnum.action.add,
        status: orderEnum.status.create,
        bundleName: bundle.name,
        bundleId: bundle.id,
        serviceType: bundle.components[0].serviceType,
        lines: lines,
      });
      bundleInfo.push(bundle);
    }
    this.setState({
      serviceBundle: this.tranformArrayNotNull(serviceBundle),
      bundleInfo: this.tranformArrayNotNull(_.cloneDeep(bundleInfo)),
    });

    this.originBundles = this.tranformArrayNotNull(_.cloneDeep(bundleInfo));
  };

  selectBundleModal = (bundle) => {
    let { bundleInfo } = this.state;
    const bundleTmp = bundleInfo.find(el => el.id === bundle.id);
    if (bundleTmp) {
      bundleInfo = bundleInfo.filter(el => el.id !== bundle.id);
    } else {
      bundleInfo.push(bundle);
    }

    this.setState({ bundleInfo: _.cloneDeep(bundleInfo) });
  }

  onCancelChooseBundle = () => {
    this.setState({
      bundleInfo: _.cloneDeep(this.originBundles),
      showModalAddNewService: false,
    });
  }

  onChooseBundle = () => {
    const { bundleInfo, serviceBundle } = this.state;
    let newServiceBundle = serviceBundle.filter(el => bundleInfo.some(subEl => subEl.id === el.id));
    const newArr = bundleInfo.filter(el => !serviceBundle.some(subEl => subEl.id === el.id)) || [];
    newArr.forEach(bundle => {
      const lines = [];
      bundle.components.forEach(el =>
        lines.push({
          id: shortid(),
          action: orderEnum.action.add,
          status: orderEnum.status.create,
          priceOfferId: el.priceOfferId,
        }),
      );
      newServiceBundle.push({
        id: bundle.id,
        action: orderEnum.action.add,
        status: orderEnum.status.create,
        bundleName: bundle.name,
        bundleId: bundle.id,
        serviceType: bundle.components[0].serviceType,
        lines: lines,
      });
    });

    this.setState({
      serviceBundle: _.cloneDeep(newServiceBundle),
      showModalAddNewService: false,
    });
  }

  //select price offer
  updatePriceOffer = priceOffer => {
    const poSelected = this.updateArrPO(priceOffer)
    this.setState({
      poSelected,
      serviceAlaCarte: createServicePriceOffer(poSelected),
    });
    this.originPOs = _.cloneDeep(poSelected);
  };

  selectPOModal = (priceOffer) => {
    this.setState({ poSelected: this.updateArrPO(priceOffer) });
  }

  updateArrPO(priceOffer) {
    let { poSelected } = this.state;
    const priceOfferTmp = poSelected.find(el => el.id === priceOffer.id);
    if (priceOfferTmp) {
      poSelected = poSelected.filter(el => el.id !== priceOffer.id);
    } else {
      poSelected.push(priceOffer);
    }

    return _.cloneDeep(poSelected);
  }

  onCancelChoosePO = () => {
    this.setState({
      poSelected: _.cloneDeep(this.originPOs),
      showModalAddNewService: false,
    });
  }

  onChoosePO = () => {
    const { poSelected } = this.state;
    this.setState({
      serviceAlaCarte: createServicePriceOffer(poSelected),
      showModalAddNewService: false,
    }); 
    this.originPOs = _.cloneDeep(poSelected);
  }

  renderModalAR() {
    const {
      tab,
      packageInfo,
      bundleInfo,
      showModalAddNewService,
      poSelected,
    } = this.state;

    if (tab === 1) {
      return (
        <ModalChoosePackage
          openModal={showModalAddNewService}
          pSelected={packageInfo}
          onSelectPackage={this.onSelectPackageModal}
          onSubmit={this.onChoosePkg}
          onCancel={this.onCancelChoosePkg}
        />
      )
    } else if (tab === 2) {
      return (
        <ModalChooseBundle
          openModal={showModalAddNewService}
          bSelected={bundleInfo}
          onSelectBundle={this.selectBundleModal}
          onSubmit={this.onChooseBundle}
          onCancel={this.onCancelChooseBundle}
        />
      )
    } else if (tab === 3) {
      return (
        <ModalChoosePriceOffer
          openModal={showModalAddNewService}
          poSelected={poSelected}
          onSelectPriceOffer={this.selectPOModal}
          onSubmit={this.onChoosePO}
          onCancel={this.onCancelChoosePO}
        />
      )
    }

    return null;
  }

  render() {
    const {
      page,
      tab,
      isPosting,
      aSelectedId,
      poSelected,
      packageInfo,
      bundleInfo,
      showModalValidate,
      showModalAddNewService,
      msgValidate,
      // id,
      type,
      status,
      reason,
      userId,
      effectiveDate,
      submittedDate,
      initialTerm,
      initialTermUnit,
      renewalTerm,
      renewalTermUnit,
      trialTerm,
      trialTermUnit,
      isPartialFulfillmentAllowed,
      servicePackage,
      serviceBundle,
      serviceAlaCarte,
      pageAccount,
      sizeAccount,
      filterAccount,
    } = this.state;

    const addRemoveMode = () => {
      if (tab === 1) {
        return {
          btnTitle: 'Choose Package',
          mode: ModalMode.purchasePackage,
        };
      } else if (tab === 2) {
        return {
          btnTitle: 'Add or Remove Bundles',
          mode: ModalMode.purchaseBundle,
        };
      }

      return {
        btnTitle: 'Add or Remove Price Offers',
        mode: ModalMode.purchaseAlaCarte,
      }
    };

    return (
      <div className="order-create">
        <SideBar isShowSidebarItem={false} />
        <PageAbstract>
          {page === 1 && (
            <OrderSelectAccount
              aSelectedId={aSelectedId}
              onSelectAccount={this.selectAccount}
              page={pageAccount}
              size={sizeAccount}
              filter={filterAccount}
              getInfoAccount={this.getInfoAccount}
            />
          )}

          {page === 2 && (
            <div className="order-select-item">
              <div className="table-title table-title-form ">
                <Row>
                  <Col md={12}>
                    <h3 className="bold-text">
                      Order &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="account-detail">
                        Account Number:
                      </span>&nbsp;&nbsp;
                      <span className="account-detail">{aSelectedId}</span>
                    </h3>
                  </Col>
                </Row>
              </div>
              <div className="order-select-content">
                <Row>
                  <ButtonToolbar className="btn-select">
                    <div className="btn-select-tab">
                      <Button
                        color={`${tab === 1 ? 'primary' : 'success'}`}
                        type="button"
                        onClick={() => this.activeTab(1)}
                      >
                        Purchase Package
                      </Button>
                      <Button
                        color={`${tab === 2 ? 'primary' : 'success'}`}
                        type="button"
                        onClick={() => this.activeTab(2)}
                      >
                        Purchase Bundle
                      </Button>
                      <Button
                        color={`${tab === 3 ? 'primary' : 'success'}`}
                        type="button"
                        onClick={() => this.activeTab(3)}
                      >
                        Purchase ala-carte
                      </Button>
                    </div>
                  </ButtonToolbar>
                </Row>
                {tab === 1 && (
                  <OrderSelectPackage
                    pSelectedId={packageInfo}
                    onSelectPackage={this.selectPackage}
                  />
                )}
                {tab === 2 && (
                  <OrderSelectBundle
                    bSelectedId={bundleInfo}
                    onSelectBundle={this.selectBundle}
                  />
                )}
                {tab === 3 && (
                  <OrderSelectPriceOffer
                    poSelected={poSelected}
                    updatePriceOffer={this.updatePriceOffer}
                  />
                )}
              </div>
            </div>
          )}
          <FormAbstract onSubmit={this.onHandleCreateOrder}>
            {page === 3 && (
              <OrderInfo
                aSelectedId={aSelectedId}
                // id={id}
                type={type}
                status={status}
                reason={reason}
                userId={userId}
                effectiveDate={effectiveDate}
                submittedDate={submittedDate}
                initialTerm={initialTerm}
                initialTermUnit={initialTermUnit}
                renewalTerm={renewalTerm}
                renewalTermUnit={renewalTermUnit}
                trialTerm={trialTerm}
                trialTermUnit={trialTermUnit}
                isPartialFulfillmentAllowed={isPartialFulfillmentAllowed}
                onChangeText={this.onChangeText}
                onChangeSelect={this.onChangeSelect}
                onChangeDate={this.onChangeDate}
              />
            )}
            {page === 4 &&
              tab === 1 &&
              servicePackage.map((item, index) => (
                <OrderService
                  key={item.id}
                  index={index}
                  aSelectedId={aSelectedId}
                  addLinesPackage={this.addLinesPackage}
                  changeLines={this.changeLines}
                  parentName="servicePackage"
                  service={item}
                  hasFetchBundle
                />
              ))}
            {page === 4 &&
              tab === 2 &&
              serviceBundle.map((item, index) => (
                <OrderService
                  key={item.id}
                  index={index}
                  aSelectedId={aSelectedId}
                  changeLines={this.changeLines}
                  parentName="serviceBundle"
                  service={item}
                />
              ))}
            {page === 4 &&
              (tab === 3 &&
                serviceAlaCarte.map((item, index) => (
                  <OrderService
                    key={item.id}
                    index={index}
                    aSelectedId={aSelectedId}
                    changeLines={this.changeLines}
                    parentName="serviceAlaCarte"
                    service={item}
                  />
                )))}
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
                  disabled={page === 4}
                  className={`next ${page === 4 ? 'btn-none' : ''}`}
                  onClick={this.nextPage}
                >
                  Next
                </Button>
                {page === 4 && (
                  <ButtonCustom
                    loading={isPosting}
                    className="btn btn-primary"
                    type="submit"
                    title="Create"
                    titleloading="Creating"
                  />
                )}
                {page === 4 && tab && (
                  <Button
                    color="success"
                    type="button"
                    onClick={() => this.openModalAddNewService()}
                  >
                    {addRemoveMode().btnTitle}
                  </Button>
                )}
              </div>
            </ButtonToolbar>
          </FormAbstract>
        </PageAbstract>
        <ModalValidate
          visible={showModalValidate}
          handleDismissModal={this.handleDismissModal}
          msg={msgValidate}
        />
        {this.renderModalAR()}
      </div>
    );
  }
}
OrderCreate.propTypes = {
  createOrder: PropTypes.func,
  getServiceByPackageId: PropTypes.func,
  getServiceByPriceOfferId: PropTypes.func,
  location: PropTypes.object,
};

export default connect(
  null,
  {
    createOrder,
  },
)(withRouter(OrderCreate));
