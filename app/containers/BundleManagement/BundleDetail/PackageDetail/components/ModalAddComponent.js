import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ModalSelectBundle, ModalSelectDO } from 'components/modals';
import { FormAbstract, FormGroup, SelectField } from 'components/form';
import { InputValidate, ButtonCustom } from 'components/commons';
import { dataSelect } from 'constantsApp';
import { selectBundleId } from 'containers/App/actions';
import { calculateValCallback } from 'utils/utils';
class ModalAddComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bundles: props.bundles,
      openModalB: false,
      pageB: 1,
      sizeB: 20,
      isSearchingB: false,
      openModalDO: false,
      bundleId: '',
      index: '',
      serviceType: null,
      serviceAddOn: '',
      discountOfferId: '',
      validityDuration: '',
      validityUnit: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bundles !== nextProps.bundles) {
      this.setState({ bundles: nextProps.bundles });
    }
  }

  onToggleModalB = () => {
    this.setState(preState => ({ openModalB: !preState.openModalB }));
  };

  onToggleModalDO = () => {
    this.setState(preState => ({ openModalDO: !preState.openModalDO }));
  };
  onSelectBundle = bundleId => {
    this.setState({ bundleId });
  };

  unSelectBundle = () => {
    this.setState({ bundleId: '', openModalB: false });
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

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onHandleAddComponent = evt => {
    evt.preventDefault();
    const {
      index,
      serviceType,
      serviceAddOn,
      discountOfferId,
      bundleId,
      validityDuration,
      validityUnit,
    } = this.state;
    const dataComponent = {
      index,
      serviceType: serviceType ? serviceType.value : null,
      serviceAddOn: serviceAddOn || null,
      discountOfferId: discountOfferId || null,
      bundleId: bundleId || null,
      validityDuration: validityDuration || null,
      validityUnit: validityUnit ? validityUnit.value : null,
    };
    console.log('onHandleAddComponent: ', dataComponent);
    this.props.onSubmitAdd(evt, dataComponent);
  };

  toggleModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({
      index: '',
      bundleId: '',
      serviceType: null,
      serviceAddOn: '',
      discountOfferId: '',
      validityDuration: '',
      validityUnit: '',
    });
  };

  render() {
    const { openModal, modalTitle, isPosting } = this.props;
    const {
      index,
      bundles,
      openModalB,
      pageB,
      sizeB,
      isSearchingB,
      openModalDO,
      bundleId,
      serviceType,
    } = this.state;
    const parentModal = openModalDO || openModalB;

    return (
      <Modal
        isOpen={openModal}
        toggle={() => this.toggleModal()}
        size="lg"
        className={classNames('modal-custom', {
          'parent-modal': parentModal,
        })}
      >
        <ModalHeader toggle={() => this.toggleModal()}>
          {modalTitle}
        </ModalHeader>
        <ModalBody>
          <FormAbstract onSubmit={this.onHandleAddComponent}>
            <div className="form-section">
              <section className="section">
                <div className="form-content body-modal-add-component">
                  <div className="form__half">
                    <FormGroup title="Index">
                      <InputValidate
                        name="index"
                        type="number"
                        value={index}
                        placeholder="Index"
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Service Type">
                      <SelectField
                        name="serviceType"
                        options={dataSelect.serviceType}
                        type="text"
                        placeholder="Service Type can not be blank!"
                        className="form__form-group-select"
                        valueSelected={serviceType}
                        onChange={val =>
                          this.onChangeSelect('serviceType', val)
                        }
                        isClearable
                        required
                      />
                    </FormGroup>
                    <FormGroup title="Service Add On">
                      <input
                        name="serviceAddOn"
                        type="text"
                        placeholder="Service Add On"
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Discount Offer Id">
                      <input
                        name="discountOfferId"
                        onClick={() => this.onToggleModalDO()}
                        type="text"
                        placeholder="Discount Offer"
                        onChange={() => {}}
                      />
                    </FormGroup>
                  </div>
                  <div className="form__half">
                    <FormGroup title="Bundle Id">
                      <InputValidate
                        name="bundleId"
                        onClick={() => this.onToggleModalB()}
                        type="text"
                        value={bundleId || ''}
                        placeholder="Bundle Id can not be blank! "
                        onChange={() => {}}
                      />
                    </FormGroup>
                    <FormGroup title="Validity Duration">
                      <input
                        name="validityDuration"
                        type="number"
                        placeholder="Validity Duration"
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Validity Unit">
                      <Select
                        name="validityUnit"
                        options={dataSelect.unit}
                        placeholder="Validity Unit"
                        className="form__form-group-select"
                        isClearable
                        onChange={val =>
                          this.onChangeSelect('validityUnit', val)
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
              </section>
            </div>
          </FormAbstract>
        </ModalBody>
        <ModalFooter>
          <ButtonCustom
            loading={isPosting}
            className="btn btn-primary"
            type="submit"
            title="Add New"
            titleloading="Adding"
            onClick={evt => this.onHandleAddComponent(evt)}
          />
          <Button color="secondary" onClick={() => this.toggleModal()}>
            Cancel
          </Button>
        </ModalFooter>
        <ModalSelectBundle
          openModal={openModalB}
          toggleModal={this.onToggleModalB}
          items={bundles}
          onSelectItem={this.onSelectBundle}
          itemSelected={bundleId}
          unSelectItem={this.unSelectBundle}
          page={pageB}
          size={sizeB}
          isSearching={isSearchingB}
          handlePage={this.handlePageBundle}
          handleSize={this.handleSizeBundle}
          onHandleSearch={this.onHandleSearchBundle}
          modalTitle="Choose Bundle"
        />
        <ModalSelectDO
          modalTitle="Choose Discount Offer"
          openModal={openModalDO}
          toggleModal={this.onToggleModalDO}
        />
      </Modal>
    );
  }
}

ModalAddComponent.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  selectBundleId: PropTypes.func,
  bundles: PropTypes.array,
  // index: PropTypes.number,
  onSubmitAdd: PropTypes.func,
  isPosting: PropTypes.bool,
};

export default connect(
  null,
  {
    selectBundleId,
  },
)(ModalAddComponent);
