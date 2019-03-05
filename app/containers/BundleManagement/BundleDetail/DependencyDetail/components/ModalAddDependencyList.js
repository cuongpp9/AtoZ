import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ModalSelectBundle, ModalSelectPackage } from 'components/modals';
import { FormAbstract, FormGroup } from 'components/form';
import { InputValidate, ButtonCustom } from 'components/commons';
import { dataSelect } from 'constantsApp';
import { selectBundleId, selectPackageId } from 'containers/App/actions';
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
      packages: props.packages,
      openModalP: false,
      pageP: 1,
      sizeP: 20,
      isSearchingP: false,
      bundleId: '',
      packageId: '',
      index: '',
      type: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bundles !== nextProps.bundles) {
      this.setState({ bundles: nextProps.bundles });
    }
    if (this.props.packages !== nextProps.packages) {
      this.setState({ packages: nextProps.packages });
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

  // for select packageId modal
  onToggleModalP = () => {
    this.setState(preState => ({ openModalP: !preState.openModalP }));
  };

  onSelectP = packageId => {
    this.setState({ packageId });
  };

  unSelectP = () => {
    this.setState({ packageId: '', openModalP: false });
  };

  handlePageP = pageOffset => {
    const { pageP, sizeP } = this.state;

    this.setState({ pageP: pageP + pageOffset });
    this.props.selectPackageId(
      {
        page: pageP + pageOffset,
        size: sizeP,
        filter: this.filterP,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({ packages });
      },
    );
  };

  handleSizeP = sizeP => {
    this.setState({ sizeP, pageP: 1 });
    this.props.selectPackageId(
      {
        page: 1,
        size: sizeP,
        filter: this.filterP,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({ packages });
      },
    );
  };

  onHandleSearchP = filter => {
    this.setState({ isSearchingP: true });
    this.props.selectPackageId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({
          isSearchingP: false,
          pageP: 1,
          sizeP: 20,
          packages,
        });
      },
    );
    this.filterP = filter;
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onHandleAddDependencyList = evt => {
    evt.preventDefault();
    const { index, bundleId, packageId, type } = this.state;
    const dataDependencyList = {
      index,
      bundleId: bundleId || null,
      packageId: packageId || null,
      type: type ? type.value : null,
    };
    console.log('onHandleAddDependencyList: ', dataDependencyList);
    this.props.onSubmitAdd(evt, dataDependencyList);
  };

  toggleModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({
      bundleId: '',
      packageId: '',
      index: '',
      type: null,
    });
  };

  render() {
    const { openModal, modalTitle, isPosting } = this.props;
    const {
      bundles,
      openModalB,
      pageB,
      sizeB,
      isSearchingB,
      packages,
      openModalP,
      pageP,
      sizeP,
      isSearchingP,
      index,
      bundleId,
      packageId,
    } = this.state;
    const parentModal = openModalP || openModalB;

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
          <FormAbstract onSubmit={this.onHandleAddDependencyList}>
            <div className="form-section">
              <section className="section">
                <div className="form-content body-modal-add-component">
                  <div className="form__half">
                    <FormGroup title="Index">
                      <InputValidate
                        name="index"
                        type="number"
                        placeholder="Index"
                        value={index}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Type">
                      <Select
                        name="type"
                        options={dataSelect.dependencyType}
                        className="form__form-group-select"
                        onChange={val => this.onChangeSelect('type', val)}
                      />
                    </FormGroup>
                  </div>
                  <div className="form__half">
                    <FormGroup title="Bundle Id">
                      <input
                        name="bundleId"
                        onClick={() => this.onToggleModalB()}
                        type="text"
                        placeholder="Select Bundle"
                        value={bundleId || ''}
                        onChange={() => {}}
                      />
                    </FormGroup>
                    <FormGroup title="Package Id">
                      <input
                        onClick={() => this.onToggleModalP()}
                        type="text"
                        placeholder="Select Package"
                        value={packageId || ''}
                        onChange={() => {}}
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
            onClick={evt => this.onHandleAddDependencyList(evt)}
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
        <ModalSelectPackage
          openModal={openModalP}
          toggleModal={this.onToggleModalP}
          items={packages}
          onSelectItem={this.onSelectP}
          itemSelected={packageId}
          unSelectItem={this.unSelectP}
          page={pageP}
          size={sizeP}
          isSearching={isSearchingP}
          handlePage={this.handlePageP}
          handleSize={this.handleSizeP}
          onHandleSearch={this.onHandleSearchP}
          modalTitle="Choose Package"
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
  selectPackageId: PropTypes.func,
  bundles: PropTypes.array,
  packages: PropTypes.array,
  // index: PropTypes.number,
  onSubmitAdd: PropTypes.func,
  isPosting: PropTypes.bool,
};

export default connect(
  null,
  {
    selectBundleId,
    selectPackageId,
  },
)(ModalAddComponent);
