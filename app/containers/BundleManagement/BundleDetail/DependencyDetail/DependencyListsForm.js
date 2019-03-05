import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup } from 'components/form';
import { InputValidate, ButtonCustom } from 'components/commons';
import { calculateValCallback } from 'utils/utils';
import { selectPackageId, selectBundleId } from 'containers/App/actions';
import {
  ModalSelectBundle,
  ModalSelectPackage,
  ModalNotificationDelete,
} from 'components/modals';
import { dataSelect } from 'constantsApp';

class DependencyListsForm extends React.PureComponent {
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
      openModalDelete: false,
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

  // for select bundleId modal
  onToggleModalB = () => {
    this.setState(preState => ({ openModalB: !preState.openModalB }));
  };

  onSelectB = bSelectedId => {
    this.props.onChangeDependencyLists(this.props.id, 'bundleId', bSelectedId);
  };

  unSelectB = () => {
    this.setState({ openModalB: false });
    this.props.unSelectedDependencyLists(this.props.id, 'bundleId');
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

  // for select packageId modal
  onToggleModalP = () => {
    this.setState(preState => ({ openModalP: !preState.openModalP }));
  };

  onSelectP = pSelectedId => {
    this.props.onChangeDependencyLists(this.props.id, 'packageId', pSelectedId);
  };

  unSelectP = () => {
    this.setState({ openModalP: false });
    this.props.unSelectedDependencyLists(this.props.id, 'packageId');
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
      data,
      id,
      onChangeDependencyLists,
      isPosting,
      onSubmit,
    } = this.props;
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
                  name="index"
                  type="number"
                  placeholder="Index"
                  value={data.index}
                  disabled
                  onChange={() => {}}
                />
              </FormGroup>
              <FormGroup title="Type">
                <Select
                  name="type"
                  options={dataSelect.dependencyType}
                  value={data.type}
                  className="form__form-group-select"
                  onChange={val => onChangeDependencyLists(id, 'type', val)}
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
                  value={data.bundleId}
                  onChange={() => {}}
                />
              </FormGroup>
              <FormGroup title="Package Id">
                <input
                  onClick={() => this.onToggleModalP()}
                  type="text"
                  placeholder="Select Package"
                  value={data.packageId}
                  onChange={() => {}}
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
        <ModalSelectPackage
          openModal={openModalP}
          toggleModal={this.onToggleModalP}
          items={packages}
          onSelectItem={this.onSelectP}
          itemSelected={data.packageId}
          unSelectItem={this.unSelectP}
          page={pageP}
          size={sizeP}
          isSearching={isSearchingP}
          handlePage={this.handlePageP}
          handleSize={this.handleSizeP}
          onHandleSearch={this.onHandleSearchP}
          modalTitle="Choose Package"
        />
        <ModalNotificationDelete
          modalTitle="dependency list"
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
DependencyListsForm.propTypes = {
  data: PropTypes.object,
  onChangeDependencyLists: PropTypes.func,
  unSelectedDependencyLists: PropTypes.func,
  id: PropTypes.string,
  bundles: PropTypes.array,
  packages: PropTypes.array,
  selectBundleId: PropTypes.func,
  selectPackageId: PropTypes.func,
  checkDelete: PropTypes.func,
  isPosting: PropTypes.bool,
  onSubmit: PropTypes.func,
};
export default connect(
  null,
  {
    selectBundleId,
    selectPackageId,
  },
)(DependencyListsForm);
