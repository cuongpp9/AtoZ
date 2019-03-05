import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ButtonToolbar } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  FormAbstract,
  FormPanel,
  FormGroup,
  RenderField,
  RenderDatePickerField,
  ValidateSingleField,
} from 'components/form';
import { ButtonCustom } from 'components/commons';
import { ModalSelectPackage, ModalSelectBundle } from 'components/modals';
import { calculateValCallback } from 'utils/utils';
import { selectBundleId, selectPackageId } from 'containers/App/actions';
import { createDependency } from '../../actions';
import { renderSectionForm } from './components/FormDependencyLists';

class PricingDependenciesCreate extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isPosting: false,
      bundles: [],
      bundleSelectedId: '',
      openModalBundle: false,
      pageBundle: 1,
      sizeBundle: 20,
      isSearchingBundle: false,
      packages: [],
      openModalPackage: false,
      packageSelectedId: '',
      pagePackage: 1,
      sizePackage: 20,
      isSearchingPackage: false,
    };
    this.bundleLst = {};
    this.packageLst = {};
  }

  componentDidMount() {
    this.props.selectBundleId({ page: 1, size: 20 }, data => {
      const bundles = calculateValCallback(data);
      this.setState({ bundles });
    });
    this.props.selectPackageId({ page: 1, size: 20 }, data => {
      const packages = calculateValCallback(data);
      this.setState({ packages });
    });
  }

  onToggleModalBundle = () => {
    this.setState(preState => ({
      openModalBundle: !preState.openModalBundle,
    }));
  };

  onSelectBundle = bundleSelectedId => {
    this.setState({ bundleSelectedId });
  };

  unSelectBundle = () => {
    this.setState({ bundleSelectedId: '', openModalBundle: false });
  };

  handlePageBundle = pageOffset => {
    const { pageBundle, sizeBundle } = this.state;

    this.setState({ pageBundle: pageBundle + pageOffset });
    this.props.selectBundleId(
      {
        page: pageBundle + pageOffset,
        size: sizeBundle,
        filter: this.filterBundle,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({ bundles });
      },
    );
  };

  handleSizeBundle = sizeBundle => {
    this.setState({ sizeBundle, pageBundle: 1 });
    this.props.selectBundleId(
      {
        page: 1,
        size: sizeBundle,
        filter: this.filterBundle,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({ bundles });
      },
    );
  };

  onHandleSearchBundle = filter => {
    this.setState({ isSearchingBundle: true });
    this.props.selectBundleId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({
          isSearchingBundle: false,
          pageBundle: 1,
          sizeBundle: 20,
          bundles,
        });
      },
    );
    this.filterBundle = filter;
  };

  onToggleModalPackage = () => {
    this.setState(preState => ({
      openModalPackage: !preState.openModalPackage,
    }));
  };

  onSelectPackage = packageSelectedId => {
    this.setState({ packageSelectedId });
  };

  unSelectPackage = () => {
    this.setState({ packageSelectedId: '', openModalPackage: false });
  };

  handlePagePackage = pageOffset => {
    const { pagePackage, sizePackage } = this.state;

    this.setState({ pagePackage: pagePackage + pageOffset });
    this.props.selectPackageId(
      {
        page: pagePackage + pageOffset,
        size: sizePackage,
        filter: this.filterBundle,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({ packages });
      },
    );
  };

  handleSizePackage = sizePackage => {
    this.setState({ sizePackage, pagePackage: 1 });
    this.props.selectPackageId(
      {
        page: 1,
        size: sizePackage,
        filter: this.filterPackage,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({ packages });
      },
    );
  };

  onHandleSearchPackage = filter => {
    this.setState({ isSearchingBundle: true });
    this.props.selectPackageId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({
          isSearchingPackage: false,
          pagePackage: 1,
          sizePackage: 20,
          packages,
        });
      },
    );
    this.filterPackage = filter;
  };

  onSelectBundleLst = (id, value) => {
    this.bundleLst[id] = value;
  };

  unSelectBundleLst = id => {
    delete this.bundleLst[id];
  };

  onSelectPackageLst = (id, value) => {
    this.packageLst[id] = value;
  };

  unSelectPackageLst = id => {
    delete this.packageLst[id];
  };

  parseDependencyLists(dependencyLists) {
    const dataDependencyLists = dependencyLists.map((item, idx) => ({
      index: item.index || null,
      bundleId: this.bundleLst[idx] || null,
      packageId: this.packageLst[idx] || null,
      type: item.type ? item.type.value : null,
    }));
    return dataDependencyLists;
  }

  onHandleCreateItem = value => {
    const result = value.toJS();
    const { bundleSelectedId, packageSelectedId } = this.state;
    this.setState({ isPosting: true });
    const { id, startDate, endDate, dependencyLists } = result;
    const dataCreate = {
      id: id || null,
      bundleId: bundleSelectedId || null,
      packageId: packageSelectedId || null,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      dependencyLists: dependencyLists
        ? this.parseDependencyLists(dependencyLists)
        : null,
    };
    this.props.createDependency(dataCreate, () => {
      this.setState({ isPosting: false });
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const {
      isPosting,
      bundles,
      openModalBundle,
      pageBundle,
      sizeBundle,
      isSearchingBundle,
      bundleSelectedId,
      openModalPackage,
      packages,
      pagePackage,
      sizepackage,
      isSearchingPackage,
      packageSelectedId,
    } = this.state;

    return (
      <FormPanel title="Dependency">
        <FormAbstract onSubmit={handleSubmit(this.onHandleCreateItem)}>
          <div className="form-inner">
            <div className="form__half">
              <FormGroup title="Id">
                <Field
                  name="id"
                  component={RenderField}
                  type="text"
                  placeholder="Id"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title="Bundle Id">
                <input
                  onClick={() => this.onToggleModalBundle()}
                  type="text"
                  placeholder="Select Bundle"
                  value={bundleSelectedId}
                />
              </FormGroup>
              <FormGroup title="Package Id">
                <input
                  onClick={() => this.onToggleModalPackage()}
                  type="text"
                  placeholder="Select Package"
                  value={packageSelectedId}
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Start Date">
                <Field
                  name="startDate"
                  component={RenderDatePickerField}
                  placeholder="YYYY-MM-DD"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
              <FormGroup title="End Date">
                <Field
                  name="endDate"
                  component={RenderDatePickerField}
                  placeholder="YYYY-MM-DD"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
            </div>
            <div className="form-child">
              <FieldArray
                name="dependencyLists"
                component={renderSectionForm}
                bundles={bundles}
                packages={packages}
                onSelectBundleLst={this.onSelectBundleLst}
                unSelectBundleLst={this.unSelectBundleLst}
                onSelectPackageLst={this.onSelectPackageLst}
                unSelectPackageLst={this.unSelectPackageLst}
              />
            </div>
            <ButtonToolbar className="form-create__btn">
              <ButtonCustom
                loading={isPosting}
                className="btn btn-primary"
                type="submit"
                title="Create"
                titleloading="Creating"
              />
            </ButtonToolbar>
          </div>
        </FormAbstract>
        <ModalSelectPackage
          openModal={openModalPackage}
          toggleModal={this.onToggleModalPackage}
          items={packages}
          onSelectItem={this.onSelectPackage}
          itemSelected={packageSelectedId}
          unSelectItem={this.unSelectPackage}
          page={pagePackage}
          size={sizepackage}
          isSearching={isSearchingPackage}
          handlePage={this.handlePagePackage}
          handleSize={this.handleSizePackage}
          onHandleSearch={this.onHandleSearchPackage}
          modalTitle="Choose Package"
        />
        <ModalSelectBundle
          openModal={openModalBundle}
          toggleModal={this.onToggleModalBundle}
          items={bundles}
          onSelectItem={this.onSelectBundle}
          itemSelected={bundleSelectedId}
          unSelectItem={this.unSelectBundle}
          page={pageBundle}
          size={sizeBundle}
          isSearching={isSearchingBundle}
          handlePage={this.handlePageBundle}
          handleSize={this.handleSizeBundle}
          onHandleSearch={this.onHandleSearchBundle}
          modalTitle="Choose Bundle"
        />
      </FormPanel>
    );
  }
}

PricingDependenciesCreate.propTypes = {
  handleSubmit: PropTypes.func,
  createDependency: PropTypes.func,
  selectBundleId: PropTypes.func,
  selectPackageId: PropTypes.func,
};

const withConnect = connect(
  null,
  {
    createDependency,
    selectBundleId,
    selectPackageId,
  },
);

const withReduxForm = reduxForm({
  form: 'form_create_dependency',
  initialized: true,
  initialValues: {
    dependencyLists: [{ index: '1' }],
  },
});

export default compose(
  withReduxForm,
  withConnect,
)(PricingDependenciesCreate);
