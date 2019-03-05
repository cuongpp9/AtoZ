import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormGroup } from 'components/form';
import { dataSelect } from 'constantsApp';
import { FormPrice } from './FormPrice';
class RecurringPricing extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { data, id, onChangePrices, onChangeFieldArr } = this.props;
    return (
      <div className="form-section">
        <section className="section">
          <div className="form-content">
            <div className="form__half">
              <FormGroup title="Purchase Proration">
                <Select
                  name="purchaseProration"
                  options={dataSelect.proration}
                  className="form__form-group-select"
                  placeholder="Purchase Proration"
                  value={data.purchaseProration}
                  onChange={val =>
                    onChangeFieldArr(
                      'recurringPricing',
                      id,
                      'purchaseProration',
                      val,
                    )
                  }
                />
              </FormGroup>
              <FormGroup title="Cancel Proration">
                <Select
                  name="cancelProration"
                  options={dataSelect.proration}
                  className="form__form-group-select"
                  placeholder="Cancel Proration"
                  value={data.cancelProration}
                  onChange={val =>
                    onChangeFieldArr(
                      'recurringPricing',
                      id,
                      'cancelProration',
                      val,
                    )
                  }
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Upgrade Proration">
                <Select
                  name="upgradeProration"
                  options={dataSelect.proration}
                  placeholder="Upgrade Proration"
                  className="form__form-group-select"
                  value={data.upgradeProration}
                  onChange={val =>
                    onChangeFieldArr(
                      'recurringPricing',
                      id,
                      'upgradeProration',
                      val,
                    )
                  }
                />
              </FormGroup>
              <FormGroup title="Downgrade Proration">
                <Select
                  name="downgradeProration"
                  options={dataSelect.proration}
                  className="form__form-group-select"
                  placeholder="Downgrade Proration"
                  value={data.downgradeProration}
                  onChange={val =>
                    onChangeFieldArr(
                      'recurringPricing',
                      id,
                      'downgradeProration',
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
                    parentName="recurringPricing"
                    onChangePrices={onChangePrices}
                  />
                )}
              </section>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

RecurringPricing.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  onChangePrices: PropTypes.func,
  onChangeFieldArr: PropTypes.func,
};
export default RecurringPricing;
