import React from 'react';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { ButtonToolbar, Button } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormPanel, FormGroup, FormAbstract } from 'components/form';
import { dataSelect } from 'constantsApp';
import { ButtonCustom, InputValidate, ErrorDetail } from 'components/commons';
import {
  calculateValCallback,
  checkChangeValue,
  checkChangeDate,
  checkChangeSelectField,
} from 'utils/utils';
import { ModalSelectBundle, ModalSelectPackage } from 'components/modals';
import { selectPackageId, selectBundleId } from 'containers/App/actions';
import DependencyListsForm from './DependencyListsForm';
import { makeGetDependencyDetail, makeErrorMessage } from '../../selectors';
import { modifyDependency } from '../../actions';
import ModalAddDependencyList from './components/ModalAddDependencyList';
class DependencyEditForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPosting: false,
      id: '',
      bundleId: '',
      packageId: '',
      startDate: null,
      endDate: null,
      dependencyLists: null,
      bundles: [],
      openModalB: false,
      pageB: 1,
      sizeB: 20,
      isSearchingB: false,
      packages: [],
      openModalP: false,
      pageP: 1,
      sizeP: 20,
      isSearchingP: false,
      isOpenModal: false,
      isDelete: false,
      indexDelete: '',
      isAdd: false,
    };
    this.dependencyListsOrigin = {};
  }

  componentDidMount() {
    this.props.selectPackageId({ page: 1, size: 20 }, data => {
      const packages = calculateValCallback(data);
      this.setState({ packages });
    });
    this.props.selectBundleId({ page: 1, size: 20 }, data => {
      const bundles = calculateValCallback(data);
      this.setState({ bundles });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.dependencyInfo &&
      this.props.dependencyInfo !== nextProps.dependencyInfo &&
      nextProps.dependencyInfo.id
    ) {
      this.initValue(nextProps.dependencyInfo);
      this.setState({ isDelete: false, indexDelete: '' });
    }
  }

  // for select bundleId modal
  onToggleModalB = () => {
    this.setState(preState => ({ openModalB: !preState.openModalB }));
  };

  onSelectB = bundleId => {
    this.setState({ bundleId });
  };

  unSelectB = () => {
    this.setState({
      bundleId: this.props.dependencyInfo.bundleId,
      openModalB: false,
    });
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

  onSelectP = packageId => {
    this.setState({ packageId });
  };

  unSelectP = () => {
    this.setState({
      packageId: this.props.dependencyInfo.packageId,
      openModalP: false,
    });
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

  initValueDependencyLists = dependencyLists => {
    const result = {};
    this.dependencyListsOrigin = {};
    dependencyLists.forEach(item => {
      const sId = shortid();
      const val = {
        index: item.index || '',
        bundleId: item.bundleId || '',
        packageId: item.packageId || '',
        type: item.type
          ? dataSelect.dependencyType.find(el => el.value === item.type)
          : null,
      };
      result[sId] = _.cloneDeep(val);
      this.dependencyListsOrigin[sId] = _.cloneDeep(val);
    });
    return result;
  };

  initValue = dependencyInfo => {
    this.setState({
      id: dependencyInfo.id,
      bundleId: dependencyInfo.bundleId || '',
      packageId: dependencyInfo.packageId || '',
      startDate: dependencyInfo.startDate
        ? moment(dependencyInfo.startDate)
        : null,
      endDate: dependencyInfo.endDate ? moment(dependencyInfo.endDate) : null,
      dependencyLists: dependencyInfo.dependencyLists
        ? this.initValueDependencyLists(dependencyInfo.dependencyLists)
        : null,
    });
  };

  handleButtonCancel = () => {
    this.initValue(this.props.dependencyInfo);
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

  onChangeDependencyLists = (id, name, val) => {
    const { dependencyLists } = this.state;
    dependencyLists[id][name] = val;

    this.setState({ dependencyLists: _.cloneDeep(dependencyLists) });
  };

  unSelectedDependencyLists = (id, name) => {
    const { dependencyLists } = this.state;
    dependencyLists[id][name] = this.dependencyListsOrigin[id][name];

    this.setState({ dependencyLists: _.cloneDeep(dependencyLists) });
  };

  checkChangeComponent = dependencyLists =>
    _.some(
      this.dependencyListsOrigin,
      (val, key) =>
        checkChangeSelectField(val.type, dependencyLists[key].type) ||
        checkChangeValue(val.bundleId, dependencyLists[key].bundleId) ||
        checkChangeValue(val.packageId, dependencyLists[key].packageId),
    );

  checkChangeInfo = () => {
    const { dependencyInfo } = this.props;
    if (dependencyInfo || !dependencyInfo.id) return false;
    const {
      bundleId,
      packageId,
      startDate,
      endDate,
      dependencyLists,
    } = this.state;
    return (
      checkChangeValue(bundleId, dependencyInfo.bundleId) ||
      checkChangeValue(packageId, dependencyInfo.packageId) ||
      checkChangeDate(startDate, dependencyInfo.startDate) ||
      checkChangeDate(endDate, dependencyInfo.endDate) ||
      this.checkChangeComponent(dependencyLists)
    );
  };

  parseDependencyLists(dependencyLists, dataDependencyAdd) {
    const { isDelete, indexDelete } = this.state;
    const dataDependencyLists = _.map(dependencyLists, item => ({
      index: item.index || null,
      bundleId: item.bundleId || null,
      packageId: item.packageId || null,
      type: item.type ? item.type.value : null,
    }));
    if (isDelete) {
      dataDependencyLists.push({
        index: indexDelete,
      });
    }
    if (dataDependencyAdd) {
      dataDependencyLists.push(dataDependencyAdd);
    }
    return dataDependencyLists;
  }

  checkDelete = indexDelete => {
    this.setState({ isDelete: true, indexDelete });
  };

  onHandleUpdateDependency = (evt, dataDependencyAdd) => {
    evt.preventDefault();
    const {
      id,
      bundleId,
      packageId,
      startDate,
      endDate,
      dependencyLists,
    } = this.state;
    this.setState({ isPosting: true });
    const dataDependency = {
      id,
      bundleId,
      packageId,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      dependencyLists: dependencyLists
        ? this.parseDependencyLists(dependencyLists, dataDependencyAdd)
        : null,
    };
    if (this.checkChangeInfo() || this.state.isDelete || this.state.isAdd) {
      this.props.modifyDependency(dataDependency, () => {
        this.setState({ isPosting: false, isOpenModal: false });
      });
    }
  };

  toggleModalAdd = () => {
    this.setState(preState => ({
      isOpenModal: !preState.isOpenModal,
      isAdd: !preState.isAdd,
    }));
  };

  render() {
    const {
      isPosting,
      id,
      bundleId,
      packageId,
      startDate,
      endDate,
      dependencyLists,
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
      isOpenModal,
    } = this.state;
    const enableBtn = this.checkChangeInfo();
    const { dependencyInfo, errorMessage } = this.props;
    if (errorMessage) {
      return <ErrorDetail msg={errorMessage} />;
    }
    return (
      <FormPanel title="Dependency">
        <FormAbstract onSubmit={this.onHandleUpdateDependency}>
          <div className="form__half">
            <FormGroup title="Id">
              <InputValidate
                name="id"
                type="text"
                placeholder="Id"
                onChange={this.onChangeText}
                value={id}
                disabled
              />
            </FormGroup>
            <FormGroup title="Bundle Id">
              <input
                name="bundleId"
                onClick={() => this.onToggleModalB()}
                type="text"
                placeholder="Select Bundle"
                value={bundleId}
                onChange={this.onChangeText}
              />
            </FormGroup>
            <FormGroup title="Package Id">
              <input
                onClick={() => this.onToggleModalP()}
                type="text"
                placeholder="Select Package"
                value={packageId}
                onChange={this.onChangeText}
              />
            </FormGroup>
          </div>
          <div className="form__half">
            <FormGroup title="Start Date">
              <div className="date-picker">
                <DatePicker
                  name="startDate"
                  placeholderText="YYYY-MM-DD"
                  popperPlacement="bottom-start"
                  popperModifiers={{
                    flip: {
                      enabled: false,
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  dateFormat="YYYY-MM-DD"
                  className="form__form-group-datepicker"
                  onChange={date => this.onChangeDate('startDate', date)}
                  selected={startDate}
                  autoComplete="off"
                  isClearable
                />
              </div>
              <div className="form__form-group-icon">
                <CalendarBlankIcon />
              </div>
            </FormGroup>
            <FormGroup title="End Date">
              <div className="date-picker">
                <DatePicker
                  name="endDate"
                  placeholderText="YYYY-MM-DD"
                  dateFormat="YYYY-MM-DD"
                  popperPlacement="bottom-start"
                  popperModifiers={{
                    flip: {
                      enabled: false,
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  className="form__form-group-datepicker"
                  onChange={date => this.onChangeDate('endDate', date)}
                  autoComplete="off"
                  selected={endDate}
                />
              </div>
              <div className="form__form-group-icon">
                <CalendarBlankIcon />
              </div>
            </FormGroup>
          </div>
          {dependencyLists && (
            <div className="bundle-content">
              <div className="label-content">Lists</div>
              {_.map(dependencyLists, (val, key) => (
                <DependencyListsForm
                  key={key}
                  data={val}
                  id={key}
                  onChangeDependencyLists={this.onChangeDependencyLists}
                  unSelectedDependencyLists={this.unSelectedDependencyLists}
                  bundles={bundles}
                  packages={packages}
                  checkDelete={this.checkDelete}
                  isPosting={isPosting}
                  onSubmit={this.onHandleUpdateDependency}
                />
              ))}
            </div>
          )}
          <ButtonToolbar className="form-create__btn">
            <Button
              className="add-component"
              color="success"
              onClick={() => this.toggleModalAdd()}
            >
              Add New Dependency List
            </Button>
            <ButtonCustom
              loading={isPosting}
              className="btn btn-default m-l"
              type="button"
              title="Cancel"
              onClick={this.handleButtonCancel}
              disabled={!enableBtn}
            />
            <ButtonCustom
              loading={isPosting}
              className="btn btn-primary"
              type="submit"
              title="Modify"
              titleloading="Modifying"
              disabled={!enableBtn}
            />
          </ButtonToolbar>
        </FormAbstract>
        <ModalSelectBundle
          openModal={openModalB}
          toggleModal={this.onToggleModalB}
          items={bundles}
          onSelectItem={this.onSelectB}
          itemSelected={bundleId}
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
        <ModalAddDependencyList
          modalTitle="Add New Dependency List"
          isPosting={isPosting}
          openModal={isOpenModal}
          toggleModal={this.toggleModalAdd}
          onSubmitAdd={this.onHandleUpdateDependency}
          bundles={bundles}
          packages={packages}
          // index={
          //   dependencyInfo.dependencyLists
          //     ? dependencyInfo.dependencyLists.length + 1
          //     : 1
          // }
        />
      </FormPanel>
    );
  }
}
DependencyEditForm.propTypes = {
  dependencyInfo: PropTypes.object,
  errorMessage: PropTypes.string,
  modifyDependency: PropTypes.func,
  selectBundleId: PropTypes.func,
  selectPackageId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dependencyInfo: makeGetDependencyDetail() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  {
    modifyDependency,
    selectBundleId,
    selectPackageId,
  },
)(DependencyEditForm);
