import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup } from 'components/form';
import { InputValidate } from 'components/commons';
import { dataSelect } from 'constantsApp';
import { ModalNotificationDelete } from 'components/modals';
import { FormPrice } from './FormPrice';
class CustomerPricing extends React.PureComponent {
  constructor() {
    super();
    this.state = { openModalDelete: false };
  }

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
      onChangePrices,
      onChangeFieldArr,
      isPosting,
      onSubmit,
    } = this.props;
    const { openModalDelete } = this.state;
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
                  onChange={evt =>
                    onChangeFieldArr(
                      'customerPricing',
                      id,
                      'index',
                      evt.target.value,
                    )
                  }
                />
              </FormGroup>
              <FormGroup title="Sales Channel">
                <Select
                  name="salesChannel"
                  options={dataSelect.salesChannel}
                  className="form__form-group-select"
                  placeholder="Sales Channel"
                  value={data.salesChannel}
                  onChange={val =>
                    onChangeFieldArr('customerPricing', id, 'salesChannel', val)
                  }
                />
              </FormGroup>
              <FormGroup title="Market Segment">
                <Select
                  name="marketSegment"
                  options={dataSelect.marketSegment}
                  placeholder="Market Segment"
                  className="form__form-group-select"
                  value={data.marketSegment}
                  onChange={val =>
                    onChangeFieldArr(
                      'customerPricing',
                      id,
                      'marketSegment',
                      val,
                    )
                  }
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Account Type">
                <Select
                  name="accountType"
                  options={dataSelect.accountType}
                  className="form__form-group-select"
                  placeholder="Account Type"
                  value={data.accountType}
                  onChange={val =>
                    onChangeFieldArr('customerPricing', id, 'accountType', val)
                  }
                />
              </FormGroup>
              <FormGroup title="Account SubType">
                <Select
                  name="accountSubType"
                  options={dataSelect.accountSubType}
                  className="form__form-group-select"
                  placeholder="Account SubType"
                  value={data.accountSubType}
                  onChange={val =>
                    onChangeFieldArr(
                      'customerPricing',
                      id,
                      'accountSubType',
                      val,
                    )
                  }
                />
              </FormGroup>
            </div>
            <div className="m-t">
              <section className="section-form-child">
                <div className="table-title table-title-form">
                  <h5 className="bold-text">Price</h5>
                </div>
                {data.prices && (
                  <FormPrice
                    data={data.prices}
                    parentId={id}
                    parentName="customerPricing"
                    onChangePrices={onChangePrices}
                  />
                )}
              </section>
            </div>
          </div>
        </section>
        <ModalNotificationDelete
          modalTitle="Customer Pricing"
          openModal={openModalDelete}
          toggleModal={this.unToggleModalDelete}
          isPosting={isPosting}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}
CustomerPricing.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  onChangePrices: PropTypes.func,
  onChangeFieldArr: PropTypes.func,
  isPosting: PropTypes.bool,
  onSubmit: PropTypes.func,
  checkDelete: PropTypes.func,
};

export default CustomerPricing;
