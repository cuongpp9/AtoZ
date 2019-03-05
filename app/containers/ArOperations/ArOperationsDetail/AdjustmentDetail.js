import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { PageAbstract, ErrorDetail } from 'components/commons';
import { FormAbstract, FormGroup } from 'components/form';
import { strTwoFractionDigits } from 'utils/utils';
import { getAdjustmentDetail } from '../actions';
import {
  makeAdjustmentDetail,
  makeErrorMessageAdjustments,
} from '../selectors';
class AdjustmentDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getAdjustmentDetail(this.props.id);
  }

  renderContent() {
    const { errorMessage, adjustmentDetail = {} } = this.props;
    if (errorMessage) {
      return <ErrorDetail msg={errorMessage} />;
    }
    return (
      <div className="form-apply__body">
        <FormAbstract>
          <Row>
            <Col md={6}>
              <FormGroup title="AR Type">
                <input
                  type="text"
                  value={adjustmentDetail.type || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Source">
                <input
                  type="text"
                  value={adjustmentDetail.source || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Crdr Type">
                <input
                  type="text"
                  value={adjustmentDetail.arType || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Item Id">
                <input
                  type="text"
                  value={adjustmentDetail.itemId || ''}
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
                  value={adjustmentDetail.taxRule || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Account Number">
                <input
                  type="text"
                  value={adjustmentDetail.accountId || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Amount">
                <NumberFormat
                  value={adjustmentDetail.amount || 0}
                  thousandSeparator
                  prefix="$ "
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Invoice Id">
                <input
                  type="text"
                  value={adjustmentDetail.invoiceId || ''}
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
                  value={strTwoFractionDigits(adjustmentDetail.percent)}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="User Id">
                <input
                  type="text"
                  value={adjustmentDetail.userId || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Number of Transactions">
                <input
                  type="text"
                  value={adjustmentDetail.numberOfTransactions}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Date">
                <input
                  type="text"
                  value={adjustmentDetail.startDate || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Reason">
                <input
                  type="text"
                  value={adjustmentDetail.reason || ''}
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
                  value={adjustmentDetail.notes || ''}
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
                <h3 className="bold-text">Adjustment Details</h3>
              </Col>
            </Row>
          </div>
          {this.renderContent()}
        </div>
      </PageAbstract>
    );
  }
}

AdjustmentDetail.propTypes = {
  id: PropTypes.string,
  getAdjustmentDetail: PropTypes.func,
  errorMessage: PropTypes.string,
  adjustmentDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adjustmentDetail: makeAdjustmentDetail() || {},
  errorMessage: makeErrorMessageAdjustments() || '',
});

export default connect(
  mapStateToProps,
  { getAdjustmentDetail },
)(AdjustmentDetail);
