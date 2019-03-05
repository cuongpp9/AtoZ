import React from 'react';
import { Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FormGroup,
  RenderField,
  RenderSelectField,
  ValidateSingleField,
} from 'components/form';
import {
  ModalSelectBundle,
  ModalSelectPriceOffer,
  ModalSelectDO,
} from 'components/modals';
import { dataSelect } from 'constantsApp';
import { selectPriceOfferId, selectBundleId } from 'containers/App/actions';
import { calculateValCallback } from 'utils/utils';

class ChildComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      priceOffers: [],
      poSelectedId: '',
      openModalPO: false,
      pagePO: 1,
      sizePO: 20,
      isSearchingPO: false,
      bundles: [],
      bSelectedId: '',
      openModalB: false,
      pageB: 1,
      sizeB: 20,
      isSearchingB: false,
      openModalDO: false,
    };
  }

  componentDidMount() {
    this.props.selectPriceOfferId({ page: 1, size: 20 }, data => {
      const priceOffers = calculateValCallback(data);
      this.setState({ priceOffers });
    });
    this.props.selectBundleId({ page: 1, size: 20 }, data => {
      const bundles = calculateValCallback(data)
      this.setState({ bundles });
    });
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
    this.setState({ bSelectedId });
    this.props.onSelectBundle(this.props.idx, bSelectedId);
  };

  onSelectPriceOffer = poSelectedId => {
    this.setState({ poSelectedId });
    this.props.onSelectPriceOffer(this.props.idx, poSelectedId);
  };

  unSelectBundle = () => {
    this.setState({ bSelectedId: '', openModalB: false });
    this.props.unSelectBundle(this.props.idx);
  };

  unSelectPriceOffer = () => {
    this.setState({ poSelectedId: '', openModalPO: false });
    this.props.unSelectPriceOffer(this.props.idx);
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

  render() {
    const { component } = this.props;
    const {
      priceOffers,
      poSelectedId,
      openModalPO,
      pagePO,
      sizePO,
      isSearchingPO,
      bundles,
      bSelectedId,
      openModalB,
      pageB,
      sizeB,
      isSearchingB,
      openModalDO,
    } = this.state;

    return (
      <div className="form-content">
        <div className="form__half">
          <FormGroup title="Index">
            <Field
              name={`${component}.index`}
              component={RenderField}
              type="number"
              placeholder="Index"
              validate={ValidateSingleField}
              disabled
            />
          </FormGroup>
          <FormGroup title="Service Type">
            <Field
              name={`${component}.serviceType`}
              component={RenderSelectField}
              options={dataSelect.serviceType.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              type="text"
              placeholder="Service Type"
              validate={ValidateSingleField}
            />
          </FormGroup>
          <FormGroup title="Service Add On">
            <Field
              name={`${component}.serviceAddOn`}
              component={RenderField}
              type="text"
              placeholder="Service Add On"
            />
          </FormGroup>
          <FormGroup title="Price Offer Id">
            <input
              onClick={() => this.onToggleModalPO()}
              type="text"
              placeholder="Select Price Offer"
              value={poSelectedId}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Discount Offer Id">
            <input
              onClick={() => this.onToggleModalDO()}
              type="text"
              placeholder="Discount Offer"
              value={''}
            />
          </FormGroup>
          <FormGroup title="Bundle Id">
            <input
              onClick={() => this.onToggleModalB()}
              type="text"
              placeholder="Select Bundle"
              value={bSelectedId}
            />
          </FormGroup>
          <FormGroup title="Validity Duration">
            <Field
              name={`${component}.validityDuration`}
              component={RenderField}
              type="number"
              placeholder="Validity Duration"
            />
          </FormGroup>
          <FormGroup title="Validity Unit">
            <Field
              name={`${component}.validityUnit`}
              component={RenderSelectField}
              options={dataSelect.unit.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              type="text"
              placeholder="Validity Unit"
            />
          </FormGroup>
        </div>
        <ModalSelectBundle
          openModal={openModalB}
          toggleModal={this.onToggleModalB}
          items={bundles}
          onSelectItem={this.onSelectBundle}
          itemSelected={bSelectedId}
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
          itemSelected={poSelectedId}
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
      </div>
    );
  }
}

ChildComponent.propTypes = {
  component: PropTypes.any,
  selectPriceOfferId: PropTypes.func,
  selectBundleId: PropTypes.func,
  onSelectBundle: PropTypes.func,
  onSelectPriceOffer: PropTypes.func,
  unSelectBundle: PropTypes.func,
  unSelectPriceOffer: PropTypes.func,
  idx: PropTypes.number,
};

export default connect(
  null,
  {
    selectPriceOfferId,
    selectBundleId,
  },
)(ChildComponent);
