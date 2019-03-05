import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonToolbar } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import shortid from 'shortid';
import _ from 'lodash';
import moment from 'moment';
import { SideBar } from 'components/orders';
import { PageAbstract, ButtonCustom } from 'components/commons';
import { FormAbstract } from 'components/form';
import { ModalValidate } from 'components/modals';
import { createOrderValidateMsg, orderEnum } from 'constantsApp';
import { formatStringUrl, checkExistElInArr } from 'utils/utils';
import ModalMode from '../ModalAddRemoveMode';
import {
  makeGetSubscription,
  makeGetServiceUnits,
  makeGetErrorSubscription,
  makeGetErrorServiceUnits,
} from '../selectors';
import { createOrder, getSubscriptionByAccountId } from '../actions';
import { OrderSelectAccount, OrderService } from '../components';
import {
  OrderModifyInfo,
  ModalChoosePackage,
  ModalChooseBundle,
  ModalChoosePriceOffer,
} from './components';
import {
  addServicesPackage,
  addLinesPackage,
  parseLines,
  createServicePriceOffer,
} from '../utilities';

const priceUnitsInit = [
  {
    priceOfferId: 'PO10000000001',
    action: 'ADD',
    status: 'CREATED',
    serviceType: 'VOIP',
    priceOverride: '',
    priceOffset: '2',
    discountPercent: '',
    quantity: 4,
    startDate: '2018-08-01',
    endDate: '2018-09-01',
  },
  {
    priceOfferId: 'PO10000000002',
    action: 'ADD',
    status: 'CREATED',
    serviceType: 'VOIP',
    priceOverride: '',
    priceOffset: '',
    discountPercent: '3',
    quantity: 4,
    startDate: '2018-08-01',
    endDate: '2018-09-01',
  },
  {
    priceOfferId: 'PO10000000003',
    action: 'ADD',
    status: 'CREATED',
    serviceType: 'VOIP',
    priceOverride: '1',
    priceOffset: '',
    discountPercent: '',
    quantity: 4,
    startDate: '2018-08-01',
    endDate: '2018-09-01',
  },
];

const serviceUnits = {
  data1: [
    {
      id: 'SV-UN-1',
      type: 'VOIP',
      parentId: '',
      provisioningId: '',
      status: 'CREATED',
      reason: '',
      packageId: 'P10000000003',
      bundleId: 'B10000000001',
    },
    {
      id: 'SV-UN-2',
      type: 'CABLE',
      parentId: '',
      provisioningId: '',
      status: 'CREATED',
      reason: '',
      packageId: 'P10000000003',
      bundleId: 'B10000000002',
    },
    {
      id: 'SV-UN-3',
      type: 'UTILITIES',
      parentId: '',
      provisioningId: '',
      status: 'CREATED',
      reason: '',
      packageId: 'P10000000003',
      bundleId: 'B10000000003',
    },
  ],
  data2: [
    {
      id: 'SV-UN-1',
      type: 'VOIP',
      parentId: '',
      provisioningId: '',
      status: 'CREATED',
      reason: '',
      packageId: null,
      bundleId: 'B10000000001',
    },
    {
      id: 'SV-UN-2',
      type: 'CABLE',
      parentId: '',
      provisioningId: '',
      status: 'CREATED',
      reason: '',
      packageId: null,
      bundleId: 'B10000000002',
    },
    {
      id: 'SV-UN-3',
      type: 'UTILITIES',
      parentId: '',
      provisioningId: '',
      status: 'CREATED',
      reason: '',
      packageId: null,
      bundleId: 'B10000000003',
    },
  ],
  data3: [
    {
      id: 'SV-UN-1',
      type: 'VOIP',
      parentId: '',
      provisioningId: '',
      status: 'CREATED',
      reason: '',
      packageId: null,
      bundleId: null,
    },
    {
      id: 'SV-UN-2',
      type: 'CABLE',
      parentId: '',
      provisioningId: '',
      status: 'CREATED',
      reason: '',
      packageId: null,
      bundleId: null,
    },
    {
      id: 'SV-UN-3',
      type: 'UTILITIES',
      parentId: '',
      provisioningId: '',
      status: 'CREATED',
      reason: '',
      packageId: null,
      bundleId: null,
    },
  ],
};

class OrderModify extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      mode: '',
      msgValidate: '',
      showModalValidate: false,
      isPosting: false,
      aSelectedId: '',
      pageAccount: 1,
      sizeAccount: 20,
      filterAccount: {},
      openModalAR: false,
      servicesOrigin: [],
      services: [],
      pSelected: {},
      originP: {},
      newServicePackage: [],
      bSelected: [],
      originB: [],
      poSelected: [],
      originPO: [],
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.priceUnits = {};
  }

  componentDidMount() {
    this.initValueServices(serviceUnits.data3);
    this.getTypePurchase(serviceUnits.data3);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.serviceUnits &&
      this.props.serviceUnits !== nextProps.serviceUnits
    ) {
      // this.initValueServices(nextProps.serviceUnits);
      // this.getTypePurchase(nextProps.serviceUnits);
    }
    this.initValueServices(serviceUnits.data3);
    this.getTypePurchase(serviceUnits.data3);
  }

  nextPage() {
    const { page, aSelectedId } = this.state;
    if (page === 1 && !aSelectedId) {
      this.setState({
        msgValidate: createOrderValidateMsg.selectAccount,
        showModalValidate: true,
      });
      return;
    }
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  getInfoAccount = (name, val) => {
    this.setState({ [name]: val });
  };

  getPriceUnits = (valPriceUnit, idServiceUnit) => {
    this.priceUnits[idServiceUnit] = valPriceUnit;
  };

  selectAccount = aSelectedId => {
    this.setState({ aSelectedId });
    if (aSelectedId) {
      this.props.getSubscriptionByAccountId(aSelectedId);
    }
  };

  getTypePurchase = data => {
    const bSelected = [];
    let poSelected = [];
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
        originB: _.cloneDeep(bSelected),
      });
    } else {
      // data.forEach(el => {
      //   priceUnitsInit.forEach(elm => {
      //     //hardcode
      //     poSelected.push({
      //       id: elm.priceOfferId,
      //       serviceType: el.type,
      //     });
      //   });
      // });
      poSelected = [
        { id: 'PO10000000001', serviceType: 'VOIP' },
        { id: 'PO10000000002', serviceType: 'CABLE' },
        { id: 'PO10000000003', serviceType: 'UTILITIES' },
      ];
      this.setState({
        mode: ModalMode.purchaseAlaCarte,
        poSelected: _.cloneDeep(poSelected),
        originPO: _.cloneDeep(poSelected),
      });
    }
  };

  handleDismissModal = () => {
    this.setState({ showModalValidate: false });
  };

  onToggleModal = () => {
    this.setState(preState => ({ openModalAR: !preState.openModalAR }));
  };

  initValueLines = priceUnits => {
    const values = priceUnits.map(item => ({
      id: shortid(),
      action: item.action,
      status: item.status,
      quatity: item.quatity || '',
      priceOverride: item.priceOverride || '',
      priceOffset: item.priceOffset || '',
      discountPercent: item.discountPercent || '',
      priceOfferId: item.priceOfferId || '',
      discountOfferId: item.discountOfferId || '',
      startDate: item.startDate ? moment(item.startDate) : null,
      endDate: item.endDate ? moment(item.endDate) : null,
    }));
    return values;
  };

  initValueServices = serviceUnits => {
    const values = [];
    serviceUnits.forEach((item, index) => {
      const val = {
        id: shortid(),
        serviceId: item.id || '',
        index: index + 1,
        serviceType: item.type,
        parentId: item.parentId || '',
        provisioningId: item.provisioningId || '',
        action: 'ADD',
        reason: item.reason || '',
        status: item.status,
        bundleId: item.bundleId || '',
        packageId: item.packageId || '',
        // lines: this.priceUnits[item.id]
        //   ? this.initValueLines(this.priceUnits[item.id])
        //   : null,
        lines: this.initValueLines(priceUnitsInit),
      };
      values.push(val);
    });
    this.setState({
      servicesOrigin: _.cloneDeep(values),
      services: _.cloneDeep(values),
    });
  };

  newServices = services => {
    const values = [];
    services.forEach((item, index) => {
      const val = {
        id: shortid(),
        idService: '',
        index: index + 1,
        serviceType: item.serviceType,
        parentId: item.parentId || '',
        provisioningId: item.provisioningId || '',
        action: item.action,
        reason: item.reason || '',
        status: item.status,
        bundleId: item.bundleId || '',
        packageId: item.packageId || '',
        lines: item.lines ? this.initValueLines(item.lines) : null,
      };
      values.push(val);
    });
    this.setState({ services: _.cloneDeep(values) });
  };

  onSelectPackage = pSelected => {
    const { originP } = this.state;
    let newServicePackage = [];
    if (originP.id !== pSelected.id) {
      newServicePackage = addServicesPackage(pSelected);
    }
    this.newServices(newServicePackage);
    this.setState({
      pSelected,
      newServicePackage: _.cloneDeep(newServicePackage),
    });
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
    this.newServices(newServicePackage);
  };

  onCancelChoosePackage = () => {
    const { originP, servicesOrigin } = this.state;

    this.setState({
      pSelected: _.cloneDeep(originP),
      newServicePackage: [],
      services: servicesOrigin,
      openModalAR: false,
    });
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
  onSelectBundle = bundle => {
    let value = [];
    let { bSelected, services } = this.state;
    const bundleTmp = bSelected.find(el => el.id === bundle.id);
    if (bundleTmp) {
      bSelected = bSelected.filter(el => el.id !== bundle.id);
    } else {
      bSelected.push(bundle);
    }
    let newServiceBundle = bSelected.filter(
      el => !checkExistElInArr(el, 'id', services, 'bundleId'),
    );
    const index = services.findIndex(el => el.bundleId === bundle.id);
    if (index === -1) {
      newServiceBundle = newServiceBundle.map(bundle => {
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
        };
      });
      value = services.concat(newServiceBundle);
    } else {
      services[index] = null;
      value = this.tranformArrayNotNull(services);
    }
    this.newServices(value);
    this.setState({ bSelected: _.cloneDeep(bSelected) });
  };

  onCancelChooseBundle = () => {
    const { originB, servicesOrigin } = this.state;
    this.setState({
      bSelected: _.cloneDeep(originB),
      openModalAR: false,
      services: servicesOrigin,
    });
  };

  onSelectPriceOffer = priceOffer => {
    let { poSelected, services } = this.state;
    const poTmp = poSelected.find(el => el.id === priceOffer.id);
    if (poTmp) {
      poSelected = poSelected.filter(el => el.id !== priceOffer.id);
    } else {
      poSelected.push(priceOffer);
    }
    const services1 = _.cloneDeep(services);
    const resultChanged = createServicePriceOffer(poSelected);
    const newServices = resultChanged.filter(
      el => !checkExistElInArr(el, 'serviceType', services1, 'serviceType'),
    );
    const keepServices = services1.filter(el =>
      checkExistElInArr(el, 'serviceType', resultChanged, 'serviceType'),
    );
    if (keepServices && keepServices.length) {
      keepServices.forEach(service => {
        const removeLines = [];
        service.lines.forEach(line => {
          if (!checkExistElInArr(line, 'priceOfferId', poSelected, 'id')) {
            removeLines.push(line);
          }
        });
        service.lines = service.lines.filter(
          line =>
            !checkExistElInArr(
              line,
              'priceOfferId',
              removeLines,
              'priceOfferId',
            ),
        );

        const oldServiceTmp = resultChanged.find(
          item => item.serviceType === service.serviceType,
        );
        if (oldServiceTmp) {
          oldServiceTmp.lines.forEach(line => {
            if (
              !checkExistElInArr(
                line,
                'priceOfferId',
                service.lines,
                'priceOfferId',
              )
            ) {
              service.lines.push(line);
            }
          });
        }
      });
    }

    const dataServices = keepServices.concat(newServices);
    this.newServices(dataServices);
    this.setState({ poSelected: _.cloneDeep(poSelected) });
  };

  onCancelChoosePO = () => {
    const { originPO, servicesOrigin } = this.state;
    this.setState({
      poSelected: _.cloneDeep(originPO),
      services: servicesOrigin,
      openModalAR: false,
    });
  };

  parseServices = services => {
    const values = services.map((item, index) => ({
      index: index + 1,
      serviceType: item.serviceType,
      provisioningId: item.provisioningId || null,
      action: item.action || 'ADD',
      reason: item.reason || null,
      status: 'CREATED',
      bundleId: item.bundleId || null,
      packageId: item.packageId || null,
      lines: item.lines ? parseLines(item.lines) : null,
    }));
    return values;
  };

  changeLines = (serviceId, lineId, name, value) => {
    const { services } = this.state;
    const service = services.find(el => el.id === serviceId);
    const line = service.lines.find(line => line.id === lineId);
    line[name] = value;
  };

  onHandleOrderModify = evt => {
    evt.preventDefault();
    this.setState({ isPosting: true });
    const { services, aSelectedId } = this.state;
    const { subscription } = this.props;
    const dataUpdate = {
      type: 'MODIFY',
      status: 'CREATED',
      reason: subscription.reason || null,
      accountId: aSelectedId,
      userId: 'US-123',
      effectiveDate: subscription.effectiveDate
        ? moment(subscription.effectiveDate).format('YYYY-MM-DD')
        : null,
      initialTerm: subscription.initialTerm || null,
      initialTermUnit: subscription.initialTermUnit || null,
      renewalTerm: subscription.renewalTerm || null,
      renewalTermUnit: subscription.renewalTermUnit || null,
      trialTerm: subscription.trialTerm || null,
      trialTermUnit: subscription.trialTermUnit || null,
      services: services ? this.parseServices(services) : null,
    };
    console.log('dataUD: ', dataUpdate);
    this.props.createOrder(dataUpdate, () => {
      this.setState({ isPosting: false });
    });
  };

  renderSelectModal() {
    const { mode, openModalAR, pSelected, bSelected, poSelected } = this.state;

    if (mode === ModalMode.purchasePackage) {
      return (
        <ModalChoosePackage
          openModal={openModalAR}
          pSelected={pSelected}
          onSelectPackage={this.onSelectPackage}
          toggleModal={this.onToggleModal}
          onCancel={this.onCancelChoosePackage}
        />
      );
    } else if (mode === ModalMode.purchaseBundle) {
      return (
        <ModalChooseBundle
          openModal={openModalAR}
          bSelected={bSelected}
          onSelectBundle={this.onSelectBundle}
          toggleModal={this.onToggleModal}
          onCancel={this.onCancelChooseBundle}
        />
      );
    } else if (mode === ModalMode.purchaseAlaCarte) {
      return (
        <ModalChoosePriceOffer
          openModal={openModalAR}
          poSelected={poSelected}
          onSelectPriceOffer={this.onSelectPriceOffer}
          toggleModal={this.onToggleModal}
          onCancel={this.onCancelChoosePO}
        />
      );
    }
    return null;
  }

  renderNewServicePackage() {
    const { newServicePackage, aSelectedId } = this.state;

    return (
      <div className="field-none">
        {newServicePackage.map((item, index) => (
          <OrderService
            key={item.id}
            index={index}
            aSelectedId={aSelectedId}
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

  render() {
    const {
      page,
      mode,
      showModalValidate,
      msgValidate,
      aSelectedId,
      pageAccount,
      sizeAccount,
      filterAccount,
      isPosting,
      services,
    } = this.state;
    const {
      subscription,
      serviceUnits,
      errorSubscription,
      errorServiceUnits,
    } = this.props;
    const enableBtn = true;
    return (
      <div className="order-modify">
        {this.renderNewServicePackage()}
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
          <FormAbstract onSubmit={this.onHandleOrderModify}>
            {page === 2 && (
              <OrderModifyInfo
                aSelectedId={aSelectedId}
                subscription={subscription}
                serviceUnits={services}
                errorSubscription={errorSubscription}
                errorServiceUnits={errorServiceUnits}
                getPriceUnits={this.getPriceUnits}
                changeLines={this.changeLines}
              />
            )}
            <ButtonToolbar className="form-create__btn">
              <div className="form-create__group-btn">
                {mode !== ModalMode.none && page === 2 ? (
                  <Button
                    color="success"
                    className="add-component"
                    type="button"
                    onClick={() => this.onToggleModal()}
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
                    disabled={!enableBtn}
                  />
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
        {this.renderSelectModal()}
      </div>
    );
  }
}

OrderModify.propsTypes = {
  getSubscriptionByAccountId: PropTypes.func,
  subscription: PropTypes.object,
  serviceUnits: PropTypes.array,
  errorSubscription: PropTypes.string,
  errorServiceUnits: PropTypes.string,
  createOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  subscription: makeGetSubscription() || {},
  serviceUnits: makeGetServiceUnits() || [],
  errorSubscription: makeGetErrorSubscription() || '',
  errorServiceUnits: makeGetErrorServiceUnits() || '',
});

export default connect(
  mapStateToProps,
  {
    getSubscriptionByAccountId,
    createOrder,
  },
)(OrderModify);
