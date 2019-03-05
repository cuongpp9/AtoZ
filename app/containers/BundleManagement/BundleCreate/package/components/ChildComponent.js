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
import { InputValidate } from 'components/commons';
import { ModalSelectBundle, ModalSelectDO } from 'components/modals';
import { dataSelect } from 'constantsApp';
import { selectBundleId } from 'containers/App/actions';
import { calculateValCallback } from 'utils/utils';

class ChildComponent extends React.Component {
  constructor() {
    super();
    this.state = {
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
    this.props.selectBundleId({ page: 1, size: 20 }, data => {
      const bundles = calculateValCallback(data);
      this.setState({ bundles });
    });
  }

  onToggleModalB = () => {
    this.setState(preState => ({ openModalB: !preState.openModalB }));
  };

  onToggleModalDO = () => {
    this.setState(preState => ({ openModalDO: !preState.openModalDO }));
  };

  onSelectBundle = bSelectedId => {
    this.setState({ bSelectedId });
    this.props.onSelectBundle(this.props.idx, bSelectedId);
  };

  unSelectBundle = () => {
    this.setState({ bSelectedId: '', openModalB: false });
    this.props.unSelectBundle(this.props.idx);
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

  render() {
    const { component } = this.props;
    const {
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
          <FormGroup title="Discount Offer Id">
            <input
              onClick={() => this.onToggleModalDO()}
              type="text"
              placeholder="Discount Offer"
              value={''}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Bundle Id">
            <InputValidate
              onClick={() => this.onToggleModalB()}
              type="text"
              value={bSelectedId}
              placeholder={bSelectedId ? '' : 'Field can not be empty!'}
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
  selectBundleId: PropTypes.func,
  onSelectBundle: PropTypes.func,
  unSelectBundle: PropTypes.func,
  idx: PropTypes.number,
};

export default connect(
  null,
  {
    selectBundleId,
  },
)(ChildComponent);
