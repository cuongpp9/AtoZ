import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TableConfig } from 'components/arOperations';
import { PageAbstract } from 'components/commons';
import { getArOpsConfigByType, updateArOpsConfigByType } from '../actions';

class ConfigIndex extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      AROpsConfig: [],
      saveAROpsConfig: [],
      itemNew: {
        type: '',
        reasonCode: '',
        taxCode: '',
        gLAccount: '',
      },
      reasonSelected: {},
    };
  }

  componentDidMount() {
    this.getArOpsConfig();
  }

  getArOpsConfig = () => {
    this.props.getArOpsConfigByType(response => {
      const listTable = this.getTableFromRespone(response, 'reasonCodes');
      this.setState({
        AROpsConfig: listTable,
        saveAROpsConfig: [...listTable],
        itemNew: {
          type: '',
          reasonCode: '',
          taxCode: '',
          gLAccount: '',
        },
      });
    });
  };

  getTableFromRespone = (result, key) => {
    if (!result) return [];

    return result[key] || [];
  };

  updateItemNewValue = (name, value) => {
    const { itemNew } = this.state;
    itemNew[name] = value;

    this.setState({ itemNew: _.cloneDeep(itemNew) });
  };

  addNewReason = () => {
    const { AROpsConfig, itemNew } = this.state;
    AROpsConfig.push(itemNew);

    this.setState({
      AROpsConfig,
      itemNew: {
        type: '',
        reasonCode: '',
        taxCode: '',
        gLAccount: '',
      },
    });
  };

  onSelectReason = reasonSelectedRs => {
    const { reasonSelected } = this.state;
    if (reasonSelected === reasonSelectedRs) {
      this.setState({ reasonSelected: {} });
    } else {
      this.setState({ reasonSelected: reasonSelectedRs });
    }
  };

  removeSelectedReason = () => {
    const { reasonSelected, AROpsConfig } = this.state;
    const newAROpsConfig = AROpsConfig.filter(
      el => el.index !== reasonSelected.index,
    );

    this.setState({
      reasonSelected: {},
      AROpsConfig: newAROpsConfig,
    });
  };

  onUpdateValue = (index, name, value) => {
    const { AROpsConfig } = this.state;
    AROpsConfig[index][name] = value;
  };

  handleClickApplyButton = () => {
    const removeRows = [];

    const reasonCodes = (this.state.AROpsConfig || []).map((item, index) => ({
      index: index + 1,
      taxCode: item.taxCode,
      gLAccount: item.gLAccount,
      type: item.type,
      reasonCode: item.reasonCode,
    }));

    (this.state.saveAROpsConfig || []).map(item => {
      const checkArray = reasonCodes.find(e => e.index === item.index);
      if (!checkArray) {
        removeRows.push({ index: item.index });
      }
      return null;
    });

    const data = {
      arOpsConfigType: 'REASON_CODES',
      reasonCodes: [...removeRows, ...reasonCodes],
    };

    this.props.updateArOpsConfigByType(data, response => {
      const listTable =
        response && response.reasonCodes ? response.reasonCodes : [];

      this.setState({
        AROpsConfig: listTable,
        saveAROpsConfig: [...listTable],
      });
    });
  };

  render() {
    const { AROpsConfig, itemNew, reasonSelected } = this.state;
    return (
      <PageAbstract>
        <div className="form-apply">
          <div className="form-apply__header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">AR Ops Config</h3>
              </Col>
            </Row>
          </div>
          <Row>
            <TableConfig
              data={AROpsConfig}
              itemNew={itemNew}
              updateItemNewValue={this.updateItemNewValue}
              addNewReason={this.addNewReason}
              reasonSelected={reasonSelected}
              onSelectReason={this.onSelectReason}
              removeSelectedReason={this.removeSelectedReason}
              onUpdateValue={this.onUpdateValue}
              handleClickApplyButton={this.handleClickApplyButton}
            />
          </Row>
        </div>
      </PageAbstract>
    );
  }
}

ConfigIndex.propTypes = {
  getArOpsConfigByType: PropTypes.func,
  updateArOpsConfigByType: PropTypes.func,
};

export default connect(
  null,
  { getArOpsConfigByType, updateArOpsConfigByType },
)(withRouter(ConfigIndex));
