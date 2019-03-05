import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup } from 'components/form';
import { InputValidate, ButtonCustom } from 'components/commons';
import { calculateValCallback } from 'utils/utils';
import { dataSelect } from 'constantsApp';
import {
  ModalSelectBundle,
  ModalSelectDO,
  ModalNotificationDelete,
} from 'components/modals';
import { selectBundleId } from 'containers/App/actions';

class PackageComponentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  onToggleModalDO = () => {
    this.setState(preState => ({ openModalDO: !preState.openModalDO }));
  };
  // for select bundleId modal
  onToggleModalB = () => {
    this.setState(preState => ({ openModalB: !preState.openModalB }));
  };

  onSelectB = bSelectedId => {
    this.props.onChangeComponents(this.props.id, 'bundleId', bSelectedId);
  };

  unSelectB = () => {
    this.setState({ openModalB: false });
    this.props.unSelectedComponent(this.props.id, 'bundleId');
  };

  handlePageB = pageOffset => {
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

  handleSizeB = sizeB => {
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

  onHandleSearchB = filter => {
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

  onToggleModalDelete = () => {
    const { checkDelete, data } = this.props;
    checkDelete(data.index);
    this.setState(preState => ({ openModalDelete: !preState.openModalDelete }));
  };

  unToggleModalDelete = () => {
    this.setState(preState => ({ openModalDelete: !preState.openModalDelete }));
  };

  render() {
    const { data, onChangeComponents, id, isPosting, onSubmit } = this.props;
    const {
      bundles,
      openModalB,
      pageB,
      sizeB,
      isSearchingB,
      openModalDO,
      openModalDelete,
    } = this.state;
    return (
      <div className="form-section">
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
                  disabled
                  onChange={() => {}}
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
                  isClearable
                  onChange={val => onChangeComponents(id, 'serviceType', val)}
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
              <FormGroup title="Discount Offer Id">
                <input
                  name="discountOfferId"
                  onClick={() => this.onToggleModalDO()}
                  type="text"
                  placeholder="Discount Offer"
                  value={data.discountOfferId}
                  onChange={() => {}}
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Bundle Id">
                <input
                  name="bundleId"
                  onClick={() => this.onToggleModalB()}
                  type="text"
                  value={data.bundleId}
                  placeholder="Select Bundle"
                  onChange={() => {}}
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
                  isClearable
                  onChange={val => onChangeComponents(id, 'validityUnit', val)}
                />
              </FormGroup>
            </div>
          </div>
        </section>
        <ModalSelectBundle
          openModal={openModalB}
          toggleModal={this.onToggleModalB}
          items={bundles}
          onSelectItem={this.onSelectB}
          itemSelected={data.bundleId}
          unSelectItem={this.unSelectB}
          page={pageB}
          size={sizeB}
          isSearching={isSearchingB}
          handlePage={this.handlePageB}
          handleSize={this.handleSizeB}
          onHandleSearch={this.onHandleSearchB}
          modalTitle="Choose Bundle"
        />
        <ModalSelectDO
          modalTitle="Choose Discount Offer"
          openModal={openModalDO}
          toggleModal={this.onToggleModalDO}
        />
        <ModalNotificationDelete
          modalTitle="component"
          openModal={openModalDelete}
          toggleModal={this.unToggleModalDelete}
          onHandleDelete={this.onHandleDelete}
          isPosting={isPosting}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}
PackageComponentForm.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  selectBundleId: PropTypes.func,
  onChangeComponents: PropTypes.func,
  unSelectedComponent: PropTypes.func,
  bundles: PropTypes.array,
  checkDelete: PropTypes.func,
  isPosting: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default connect(
  null,
  {
    selectBundleId,
  },
)(PackageComponentForm);
