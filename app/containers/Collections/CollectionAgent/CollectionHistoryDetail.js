import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PageAbstract, ErrorDetail } from 'components/commons';
import { FormAbstract, FormGroup } from 'components/form';
import { CollectionActionInvoiceTable } from 'components/collections';
import { getCollectionUnitsById } from '../actions';
import {
  makeCollectionHistoryDetail,
  makeErrorMessageHistory,
} from '../selectors';

class CollectionHistoryDetail extends Component {
  componentDidMount() {
    this.props.getCollectionUnitsById(this.props.id);
  }

  renderContent() {
    const { errorMessage, collectionHistoryDetail = {} } = this.props;
    if (errorMessage) {
      return <ErrorDetail msg={errorMessage} />;
    }

    const data = collectionHistoryDetail.unitActionList || [];
    return (
      <div className="form-apply__body">
        <FormAbstract>
          <Row>
            <Col md={6}>
              <FormGroup title="Invoice Date ">
                <input
                  type="text"
                  value={collectionHistoryDetail.invoiceDate || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="UserId">
                <input
                  type="text"
                  value={collectionHistoryDetail.userId || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Due Date">
                <input
                  type="text"
                  value={collectionHistoryDetail.dueDate || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Last Action Date">
                <input
                  type="text"
                  value={collectionHistoryDetail.lastActionDate || ''}
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
                  value={collectionHistoryDetail.status || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup title="Close Date">
                <input
                  type="text"
                  value={collectionHistoryDetail.closeDate || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup title="Days in Collection">
                <input
                  value={collectionHistoryDetail.daysInCollection || 0}
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
                  value={collectionHistoryDetail.notes || ''}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
        </FormAbstract>
        <CollectionActionInvoiceTable data={data} />
      </div>
    );
  }

  render() {
    const { collectionHistoryDetail = {} } = this.props;
    return (
      <PageAbstract>
        <div className="form-apply">
          <div className="form-apply__header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">
                  Collection History Detail
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="account-detail">
                    Invoice Id:
                  </span>&nbsp;&nbsp;
                  <span className="account-detail">{this.props.id}</span>
                  {collectionHistoryDetail.accountId && (
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="account-detail">
                        Account Id:
                      </span>&nbsp;&nbsp;
                      <span className="account-detail">
                        {collectionHistoryDetail.accountId}
                      </span>
                    </span>
                  )}
                </h3>
              </Col>
            </Row>
          </div>
          {this.renderContent()}
        </div>
      </PageAbstract>
    );
  }
}

CollectionHistoryDetail.propTypes = {
  getCollectionUnitsById: PropTypes.func,
  id: PropTypes.string,
  collectionHistoryDetail: PropTypes.object,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  collectionHistoryDetail: makeCollectionHistoryDetail() || {},
  errorMessage: makeErrorMessageHistory() || '',
});

export default connect(
  mapStateToProps,
  {
    getCollectionUnitsById,
  },
)(CollectionHistoryDetail);
