import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'reactstrap';
import { SimpleInfo } from 'components/commons';

const AccountInfo = ({ accountInfo }) => (
  <div className="table-content">
    <Col md={12}>
      <form className="row table-content__block">
        <div className="col-md-6 table-content-child">
          <SimpleInfo
            label="Customer Segment"
            value={accountInfo.customerSegment}
          />
          <SimpleInfo label="Type" value={accountInfo.type} />
          <SimpleInfo label="Sub Type" value={accountInfo.subType} />
          <SimpleInfo label="Sales Channel" value={accountInfo.salesChannel} />
          <SimpleInfo
            label="Market Segment"
            value={accountInfo.marketSegment}
          />
          <SimpleInfo
            label="Selling Company"
            value={accountInfo.sellingCompany}
          />
        </div>
        <div className="col-md-6 table-content-child">
          <SimpleInfo
            label="Line of Business"
            value={accountInfo.lineOfBusiness}
          />
          <SimpleInfo label="Legal Entity" value={accountInfo.legalEntity} />
          <SimpleInfo label="Currency" value={accountInfo.currency} />
          <SimpleInfo label="Status" value={accountInfo.status} />
          <SimpleInfo label="Reason" value={accountInfo.reason} />
          <SimpleInfo
            label="Effective Date"
            value={accountInfo.effectiveDate}
          />
        </div>
      </form>
    </Col>
    <div className="row bottom-button-group">
      <Col md={12}>
        <div className="pull-right">
          <Button color="primary">Modify</Button>{' '}
          <Button color="primary">Create New Order</Button>
        </div>
      </Col>
    </div>
  </div>
);

AccountInfo.propTypes = {
  accountInfo: PropTypes.object,
};

export default AccountInfo;
