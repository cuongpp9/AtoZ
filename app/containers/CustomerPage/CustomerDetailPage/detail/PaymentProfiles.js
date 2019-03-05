import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'reactstrap';
import { SimpleInfo } from 'components/commons';

const PaymentProfiles = ({ paymentProfiles }) => (
  <div className="table-content">
    <Col md={12}>
      {paymentProfiles.map(item => (
        <form className="row table-content__block" key={item.id}>
          <div className="col-md-6 table-content-child">
            <SimpleInfo label="Id" value={item.id} />
            <SimpleInfo
              label="Billing Profile Id"
              value={item.billingProfileId}
            />
            <SimpleInfo label="Payment Term" value={item.paymentTerm} />
            <SimpleInfo label="Paument Method" value={item.paymentMethod} />
          </div>
          <div className="col-md-6 table-content-child">
            {item.creditCards &&
              item.creditCards.map((creditCard, idx) => (
                <div key={idx.toString()}>
                  <SimpleInfo
                    label="Last 4 Credit Card"
                    value={creditCard.last4CC}
                  />
                  <SimpleInfo label="Address Id" value={creditCard.addressId} />
                </div>
              ))}
          </div>
        </form>
      ))}
    </Col>
    <div className="row bottom-button-group">
      <Col md={12}>
        <div className="pull-right">
          <Button color="primary">Modify</Button>
        </div>
      </Col>
    </div>
  </div>
);

PaymentProfiles.propTypes = {
  paymentProfiles: PropTypes.array,
};

export default PaymentProfiles;
