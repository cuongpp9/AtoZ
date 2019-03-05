import React from 'react';
import { Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, RenderField, RenderSelectField } from 'components/form';
import { ModalSelectBundle, ModalSelectPackage } from 'components/modals';
import { dataSelect } from 'constantsApp';
import { selectBundleId, selectPackageId } from 'containers/App/actions';
import { calculateValCallback } from 'utils/utils';

class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bundles: props.bundles,
      bSelectedId: '',
      openModalB: false,
      pageB: 1,
      sizeB: 20,
      isSearchingB: false,
      packages: props.packages,
      pSelectedId: '',
      openModalP: false,
      pageP: 1,
      sizeP: 20,
      isSearchingP: false,
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

  onSelectBundle = bSelectedId => {
    this.setState({ bSelectedId });
    this.props.onSelectBundleLst(this.props.idx, bSelectedId);
  };

  unSelectBundle = () => {
    this.setState({ bSelectedId: '', openModalB: false });
    this.props.unSelectBundleLst(this.props.idx);
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

  onToggleModalP = () => {
    this.setState(preState => ({
      openModalP: !preState.openModalP,
    }));
  };

  onSelectPackage = pSelectedId => {
    this.setState({ pSelectedId });
    this.props.onSelectPackageLst(this.props.idx, pSelectedId);
  };

  unSelectPackage = () => {
    this.setState({ pSelectedId: '', openModalP: false });
    this.props.unSelectPackageLst(this.props.idx);
  };

  handlePagePackage = pageOffset => {
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

  handleSizePackage = sizeP => {
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

  onHandleSearchPackage = filter => {
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
          pageB: 1,
          sizeB: 20,
          packages,
        });
      },
    );
    this.filterP = filter;
  };

  render() {
    const { dependency } = this.props;
    const {
      bundles,
      bSelectedId,
      openModalB,
      pageB,
      sizeB,
      isSearchingB,
      packages,
      pSelectedId,
      openModalP,
      pageP,
      sizeP,
      isSearchingP,
    } = this.state;

    return (
      <div className="form-content">
        <div className="form__half">
          <FormGroup title="Index">
            <Field
              name={`${dependency}.index`}
              component={RenderField}
              type="number"
              placeholder="Index"
              disabled
            />
          </FormGroup>
          <FormGroup title="Type">
            <Field
              name={`${dependency}.type`}
              component={RenderSelectField}
              options={dataSelect.dependencyType.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              type="text"
              placeholder="Type"
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Bundle Id">
            <input
              onClick={() => this.onToggleModalB()}
              type="text"
              placeholder="Select Bundle"
              value={bSelectedId}
            />
          </FormGroup>
          <FormGroup title="Package Id">
            <input
              onClick={() => this.onToggleModalP()}
              type="text"
              placeholder="Select Package"
              value={pSelectedId}
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
        <ModalSelectPackage
          openModal={openModalP}
          toggleModal={this.onToggleModalP}
          items={packages}
          onSelectItem={this.onSelectPackage}
          itemSelected={pSelectedId}
          unSelectItem={this.unSelectPackage}
          page={pageP}
          size={sizeP}
          isSearching={isSearchingP}
          handlePage={this.handlePagePackage}
          handleSize={this.handleSizePackage}
          onHandleSearch={this.onHandleSearchPackage}
          modalTitle="Choose Package"
        />
      </div>
    );
  }
}

ChildComponent.propTypes = {
  dependency: PropTypes.any,
  selectBundleId: PropTypes.func,
  selectPackageId: PropTypes.func,
  onSelectBundleLst: PropTypes.func,
  unSelectBundleLst: PropTypes.func,
  idx: PropTypes.number,
};

export default connect(
  null,
  {
    selectBundleId,
    selectPackageId,
  },
)(ChildComponent);
