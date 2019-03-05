import React from 'react';
import PropTypes from 'prop-types';
import { FormPrice } from './FormPrice';
class FlatPricing extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { data, id, onChangePrices } = this.props;
    return (
      <div className="form-section">
        <section className="section">
          <div className="form-content">
            <section className="section-form-child">
              <div className="table-title table-title-form">
                <h5 className="bold-text">Price</h5>
              </div>
              {data.prices && (
                <FormPrice
                  data={data.prices}
                  parentId={id}
                  parentName="flatPricing"
                  onChangePrices={onChangePrices}
                />
              )}
            </section>
          </div>
        </section>
      </div>
    );
  }
}

FlatPricing.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  onChangePrices: PropTypes.func,
};

export default FlatPricing;
