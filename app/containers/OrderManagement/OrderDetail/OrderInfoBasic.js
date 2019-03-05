import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
// import { FormPanel } from 'components/form';
import { SimpleInfo } from 'components/commons';

class OrderInfoBasic extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data, title } = this.props;
    if (!data) {
      return null;
    }
    return (
      <div className="table-block">
        <div className="table-title table-title-form table-title-form-detail">
          <Row>
            <Col md={12}>
              <h3 className="bold-text">
                {title} &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="account-detail">Order Id:</span>&nbsp;&nbsp;
                <span className="account-detail">{data.id}</span>
              </h3>
            </Col>
          </Row>
        </div>
        <div className="table-content">
          <Row>
            <Col md={12}>
              <form className="row table-content__block">
                <div className="col-md-6 table-content-child">
                  <SimpleInfo label="Account Number" value={data.accountId} />
                  <SimpleInfo label="Type" value={data.type} />
                  <SimpleInfo label="Status" value={data.status} />
                  <SimpleInfo label="User Id" value={data.userId} />
                  <SimpleInfo
                    label="Effective Date"
                    value={data.effectiveDate}
                  />
                  <SimpleInfo
                    label="Submitted Date"
                    value={data.submittedDate}
                  />
                </div>
                <div className="col-md-6 table-content-child">
                  <SimpleInfo label="Initial Term" value={data.initialTerm} />
                  <SimpleInfo
                    label="Initial Term Unit"
                    value={data.initialTermUnit}
                  />
                  <SimpleInfo label="Renewal Term" value={data.renewalTerm} />
                  <SimpleInfo
                    label="Renewal Term Unit"
                    value={data.renewalTermUnit}
                  />
                  <SimpleInfo label="Trial Term" value={data.trialTerm} />
                  <SimpleInfo
                    label="Trial Term Unit"
                    value={data.trialTermUnit}
                  />
                </div>
              </form>
            </Col>
          </Row>
        </div>
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
  }
}
OrderInfoBasic.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
};

export default OrderInfoBasic;
