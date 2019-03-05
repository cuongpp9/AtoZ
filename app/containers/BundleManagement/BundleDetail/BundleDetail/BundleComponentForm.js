import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup } from 'components/form';
import { InputValidate } from 'components/commons';
import {
  ModalSelectBundle,
  ModalSelectPriceOffer,
  ModalSelectDO,
  ModalNotificationDelete,
} from 'components/modals';
import { dataSelect } from 'constantsApp';
import { selectPriceOfferId, selectBundleId } from 'containers/App/actions';
import { calculateValCallback } from 'utils/utils';

class BundleComponentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      priceOffers: props.priceOffers,
      openModalPO: false,
      pagePO: 1,
      sizePO: 20,
      isSearchingPO: false,
      bundles: props.bundles,
      openModalB: false,
      pageB: 1,
      sizeB: 20,
      isSearchingB: false,
      openModalDO: false,
      openModalDelete: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.bundles !== nextProps.bundles) {
      this.setState({ bundles: nextProps.bundles });
    }

    if (this.props.priceOffers !== nextProps.priceOffers) {
      this.setState({ priceOffers: nextProps.priceOffers });
    }
  }

  onToggleModalB = () => {
    this.setState(preState => ({ openModalB: !preState.openModalB }));
  };

  onToggleModalPO = () => {
    this.setState(preState => ({ openModalPO: !preState.openModalPO }));
  };

  onToggleModalDO = () => {
    this.setState(preState => ({ openModalDO: !preState.openModalDO }));
  };

  onSelectBundle = bSelectedId => {
    this.props.onChangeComponents(this.props.id, 'bundleId', bSelectedId);
  };

  onSelectPriceOffer = poSelectedId => {
    this.props.onChangeComponents(this.props.id, 'priceOfferId', poSelectedId);
  };

  unSelectBundle = () => {
    this.setState({ openModalB: false });
    this.props.unSelectedComponent(this.props.id, 'bundleId');
  };

  unSelectPriceOffer = () => {
    this.setState({ openModalPO: false });
    this.props.unSelectedComponent(this.props.id, 'priceOfferId');
  };

  handlePageBundle = pageOffset => {
    const { pageB, sizeB } = this.state;

    this.setState({ pageB: pageB + pageOffset });
    this.props.selectBundleId(
      {
        page: pageB + pageOffset,
        size: sizeB,
        filter: this.filterB,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({ bundles });
      },
    );
  };

  handleSizeBundle = sizeB => {
    this.setState({ sizeB, pageB: 1 });
    this.props.selectBundleId(
      {
        page: 1,
        size: sizeB,
        filter: this.filterB,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({ bundles });
      },
    );
  };

  onHandleSearchBundle = filter => {
    this.setState({ isSearchingB: true });
    this.props.selectBundleId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({
          isSearchingB: false,
          pageB: 1,
          sizeB: 20,
          bundles,
        });
      },
    );
    this.filterB = filter;
  };

  handlePagePO = pageOffset => {
    const { pagePO, sizePO } = this.state;

    this.setState({ pagePO: pagePO + pageOffset });
    this.props.selectPriceOfferId(
      {
        page: pagePO + pageOffset,
        size: sizePO,
        filter: this.filterPO,
      },
      data => {
        const priceOffers = calculateValCallback(data);
        this.setState({ priceOffers });
      },
    );
  };

  handleSizePO = sizePO => {
    this.setState({ sizePO, pagePO: 1 });
    this.props.selectPriceOfferId(
      {
        page: 1,
        size: sizePO,
        filter: this.filterPO,
      },
      data => {
        const priceOffers = calculateValCallback(data);
        this.setState({ priceOffers });
      },
    );
  };

  onHandleSearchPO = filter => {
    this.setState({ isSearchingPO: true });
    this.props.selectPriceOfferId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const priceOffers = calculateValCallback(data);
        this.setState({
          isSearchingPO: false,
          pagePO: 1,
          sizePO: 20,
          priceOffers,
        });
      },
    );
    this.filterPO = filter;
  };

  onToggleModalDelete = () => {
    const { checkDelete, data } = this.props;
    checkDelete(data.index);
    this.setState(preState => ({ openModalDelete: !preState.openModalDelete }));
  };

  unToggleModalDelete = () => {
    this.setState(preState => ({ openModalDelete: !preState.openModalDelete }));
  };

  render() {
    const {
      priceOffers,
      openModalPO,
      pagePO,
      sizePO,
      isSearchingPO,
      bundles,
      openModalB,
      pageB,
      sizeB,
      isSearchingB,
      openModalDO,
      openModalDelete,
    } = this.state;
    const { data, onChangeComponents, id, isPosting, onSubmit } = this.props;
    return (
      <div className="form-section form-section--trash">
        <section className="section">
          <button
            type="button"
            title="Delete"
            className="button-trash"
            onClick={() => this.onToggleModalDelete()}
          >
            <i className="fa fa-trash" />
          </button>
          <div className="form-content form-content--trash">
            <div className="form__half">
              <FormGroup title="Index">
                <InputValidate
                  name="name"
                  type="number"
                  value={data.index}
                  placeholder="Index"
                  onChange={() => {}}
                  disabled
                />
              </FormGroup>
              <FormGroup title="Service Type">
                <Select
                  name="serviceType"
                  options={dataSelect.serviceType}
                  type="text"
                  placeholder="Service Type"
                  value={data.serviceType}
                  className="form__form-group-select"
                  onChange={val => onChangeComponents(id, 'serviceType', val)}
                  isClearable
                />
              </FormGroup>
              <FormGroup title="Service Add On">
                <input
                  name="serviceAddOn"
                  type="text"
                  value={data.serviceAddOn}
                  placeholder="Service Add On"
                  onChange={evt =>
                    onChangeComponents(id, 'serviceAddOn', evt.target.value)
                  }
                />
              </FormGroup>
              <FormGroup title="Price Offer Id">
                <input
                  name="priceOfferId"
                  onClick={() => this.onToggleModalPO()}
                  type="text"
                  value={data.priceOfferId}
                  placeholder="Select Price Offer"
                  onChange={() => {}}
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Discount Offer Id">
                <input
                  name="discountOfferId"
                  onClick={() => this.onToggleModalDO()}
                  type="text"
                  placeholder="Discount Offer"
                  onChange={() => {}}
                  value={data.discountOfferId}
                />
              </FormGroup>
              <FormGroup title="Bundle Id">
                <input
                  name="bundleId"
                  onClick={() => this.onToggleModalB()}
                  type="text"
                  value={data.bundleId}
                  onChange={() => {}}
                  placeholder="Select Bundle"
                />
              </FormGroup>
              <FormGroup title="Validity Duration">
                <input
                  name="validityDuration"
                  type="number"
                  placeholder="Validity Duration"
                  value={data.validityDuration}
                  onChange={evt =>
                    onChangeComponents(id, 'validityDuration', evt.target.value)
                  }
                />
              </FormGroup>
              <FormGroup title="Validity Unit">
                <Select
                  name="validityUnit"
                  options={dataSelect.unit}
                  placeholder="Validity Unit"
                  value={data.validityUnit}
                  className="form__form-group-select"
                  onChange={val => onChangeComponents(id, 'validityUnit', val)}
                  isClearable
                />
              </FormGroup>
            </div>
          </div>
        </section>
        <ModalSelectBundle
          openModal={openModalB}
          toggleModal={this.onToggleModalB}
          items={bundles}
          onSelectItem={this.onSelectBundle}
          itemSelected={data.bundleId}
          unSelectItem={this.unSelectBundle}
          page={pageB}
          size={sizeB}
          isSearching={isSearchingB}
          handlePage={this.handlePageBundle}
          handleSize={this.handleSizeBundle}
          onHandleSearch={this.onHandleSearchBundle}
          modalTitle="Choose Bundle"
        />
        <ModalSelectPriceOffer
          openModal={openModalPO}
          toggleModal={this.onToggleModalPO}
          items={priceOffers}
          onSelectItem={this.onSelectPriceOffer}
          itemSelected={data.priceOfferId}
          unSelectItem={this.unSelectPriceOffer}
          page={pagePO}
          size={sizePO}
          isSearching={isSearchingPO}
          handlePage={this.handlePagePO}
          handleSize={this.handleSizePO}
          onHandleSearch={this.onHandleSearchPO}
          modalTitle="Choose Price Offer"
        />
        <ModalSelectDO
          modalTitle="Choose Discount Offer"
          openModal={openModalDO}
          toggleModal={this.onToggleModalDO}
        />
        <ModalNotificationDelete
          modalTitle="Component"
          openModal={openModalDelete}
          toggleModal={this.unToggleModalDelete}
          isPosting={isPosting}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}
BundleComponentForm.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  onChangeComponents: PropTypes.func,
  selectPriceOfferId: PropTypes.func,
  selectBundleId: PropTypes.func,
  bundles: PropTypes.array,
  priceOffers: PropTypes.array,
  unSelectedComponent: PropTypes.func,
  checkDelete: PropTypes.func,
  isPosting: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default connect(
  null,
  {
    selectPriceOfferId,
    selectBundleId,
  },
)(BundleComponentForm);
