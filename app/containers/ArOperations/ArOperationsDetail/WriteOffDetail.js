import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import NumberFormat from 'react-number-format';
import { PageAbstract, ErrorDetail } from 'components/commons';
import { FormAbstract, FormGroup } from 'components/form';
import { strTwoFractionDigits } from 'utils/utils';
import { getWriteOffDetail } from '../actions';
import { makeWiteOffsDetail, makeErrorMessageWriteOffs } from '../selectors';

class WriteOffDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getWriteOffDetail(this.props.id);
  }

  renderContent() {
    const { errorMessage, writeOffsDetail = {} } = this.props;
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
                  value={writeOffsDetail.type || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Item Id">
                <input
                  type="text"
                  value={writeOffsDetail.itemId || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Writeoff Status">
                <input
                  type="text"
                  value={writeOffsDetail.status || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Account Number">
                <input
                  type="text"
                  value={writeOffsDetail.accountId || ''}
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
                  value={writeOffsDetail.taxRule || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Invoice Id">
                <input
                  type="text"
                  value={writeOffsDetail.invoiceId || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Amount">
                <NumberFormat
                  value={writeOffsDetail.amount || 0}
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
                  value={writeOffsDetail.userId || ''}
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
                  value={strTwoFractionDigits(writeOffsDetail.percent)}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Date">
                <input
                  type="text"
                  value={writeOffsDetail.date || ''}
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
                  value={writeOffsDetail.reason || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Recovered Debt">
                <NumberFormat
                  value={writeOffsDetail.recoveryAmount || 0}
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
                  value={writeOffsDetail.source || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Recovered Date">
                <input
                  type="text"
                  value={writeOffsDetail.recoveryDate || ''}
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
                  value={writeOffsDetail.notes || ''}
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
                <h3 className="bold-text">Write-off Details</h3>
              </Col>
            </Row>
          </div>
          {this.renderContent()}
        </div>
      </PageAbstract>
    );
  }
}

WriteOffDetail.propTypes = {
  id: PropTypes.string,
  getWriteOffDetail: PropTypes.func,
  writeOffsDetail: PropTypes.object,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  writeOffsDetail: makeWiteOffsDetail() || {},
  errorMessage: makeErrorMessageWriteOffs() || '',
});

export default connect(
  mapStateToProps,
  { getWriteOffDetail },
)(WriteOffDetail);
