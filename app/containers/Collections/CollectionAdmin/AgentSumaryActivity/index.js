import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PageAbstract } from 'components/commons';
import { AgentSumaryActivityTable } from 'components/collections';
import {
  searchCollectionAgentActivity,
  setParamsAccountsCollection,
} from '../../actions';
import {
  makeAgentActivityParams,
  makeGetAgentActivities,
  makeErrorAgentActivity,
} from '../../selectors';

class AgentSumaryActivity extends Component {
  constructor() {
    super();
    this.state = {
      isActiveNext: false,
    };
  }

  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchCollectionAgentActivity({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.agentActivites !== nextProps.agentActivites) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.agentActivites.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsAccountsCollection({ size, page: page + pageOffset });
    this.props.searchCollectionAgentActivity({
      page: page + pageOffset,
      size,
    });
  };

  handleSize = size => {
    this.props.setParamsAccountsCollection({ size, page: 1 });
    this.props.searchCollectionAgentActivity({
      page: 1,
      size,
    });
  };

  render() {
    const {
      agentActivites,
      errorMessage,
      params: { page, size },
    } = this.props;
    const { isActiveNext } = this.state;
    // console.log('AAAA', agentSelected, collectionAgents);
    return (
      <PageAbstract>
        <div className="form-accounts-in-collection">
          <div className="form-header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">Collection Agents</h3>
              </Col>
            </Row>
          </div>
          <Row>
            <AgentSumaryActivityTable
              data={agentActivites}
              page={page}
              size={size}
              handlePage={this.handlePage}
              isActiveNext={isActiveNext}
              handleSize={this.handleSize}
              errorMessage={errorMessage}
            />
          </Row>
        </div>
      </PageAbstract>
    );
  }
}

AgentSumaryActivity.propTypes = {
  searchCollectionAgentActivity: PropTypes.func,
  agentActivites: PropTypes.array,
  params: PropTypes.object,
  errorMessage: PropTypes.string,
  setParamsAccountsCollection: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  agentActivites: makeGetAgentActivities() || [],
  params: makeAgentActivityParams() || {},
  errorMessage: makeErrorAgentActivity() || '',
});

export default connect(
  mapStateToProps,
  {
    searchCollectionAgentActivity,
    setParamsAccountsCollection,
  },
)(AgentSumaryActivity);
