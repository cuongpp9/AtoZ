import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import NumberFormat from 'react-number-format';
import { PageAbstract, ErrorDetail } from 'components/commons';
import { FormAbstract, FormGroup } from 'components/form';
import { strTwoFractionDigits } from 'utils/utils';
import { getDisputeDetail } from '../actions';
import { makeDisputeDetail, makeErrorMessageDisputes } from '../selectors';

class DisputeDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getDisputeDetail(this.props.id);
  }

  renderContent() {
    const { errorMessage, disputeDetail } = this.props;
    if (errorMessage) {
      return <ErrorDetail msg={errorMessage} />;
    }

    return (
      <div className="form-apply__body">
        <FormAbstract>
          <Row>
            <Col md={6}>
              <FormGroup title="AR Type">
                <input type="text" value={disputeDetail.type || ''} readOnly />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Item Id">
                <input
                  type="text"
                  value={disputeDetail.itemId || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Status">
                <input
                  type="text"
                  value={disputeDetail.status || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Account Number">
                <input
                  type="text"
                  value={disputeDetail.accountId || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Tax Rule">
                <input
                  type="text"
                  value={disputeDetail.taxRule || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Invoice Id">
                <input
                  type="text"
                  value={disputeDetail.invoiceId || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Amount">
                <NumberFormat
                  value={disputeDetail.amount || 0}
                  thousandSeparator
                  prefix="$ "
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="User Id">
                <input
                  type="text"
                  value={disputeDetail.userId || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Percent">
                <input
                  type="text"
                  value={strTwoFractionDigits(disputeDetail.percent)}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Date">
                <input type="text" value={disputeDetail.date || ''} readOnly />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Reason">
                <input
                  type="text"
                  value={disputeDetail.reason || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Settled Amount">
                <NumberFormat
                  value={disputeDetail.settledAmount || 0}
                  thousandSeparator
                  prefix="$ "
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Source">
                <input
                  type="text"
                  value={disputeDetail.source || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Settled Date">
                <input
                  type="text"
                  value={disputeDetail.settlementDate || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup title="Notes" className="input-textarea">
                <textarea
                  name="notes"
                  type="text"
                  value={disputeDetail.notes || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
        </FormAbstract>
      </div>
    );
  }

  render() {
    return (
      <PageAbstract>
        <div className="form-apply">
          <div className="form-apply__header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">Dispute Detail</h3>
              </Col>
            </Row>
          </div>
          {this.renderContent()}
        </div>
      </PageAbstract>
    );
  }
}

DisputeDetail.propTypes = {
  id: PropTypes.string,
  getDisputeDetail: PropTypes.func,
  disputeDetail: PropTypes.object,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  disputeDetail: makeDisputeDetail() || {},
  errorMessage: makeErrorMessageDisputes() || '',
});

export default connect(
  mapStateToProps,
  { getDisputeDetail },
)(DisputeDetail);
