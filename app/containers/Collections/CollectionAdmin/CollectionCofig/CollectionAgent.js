import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CollectionAgentsTable } from 'components/collections';
import {} from 'components/form';
import { collectionsEnum } from 'constantsApp';
import {
  getCollectionAgentByType,
  createCollectionAgent,
  modifyCollectionAgent,
} from '../../actions';
class CollectionAgent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      collectionAgent: [],
      saveCollectionAgent: [],
      rowSelectedItem: null,
      newAgent: {},
    };
    this.isEmptyListServer = true;
  }

  componentDidMount() {
    this.getCollectionAgentByType();
  }

  getCollectionAgentByType = () => {
    this.props.getCollectionAgentByType(
      {
        type: collectionsEnum.type.collectionAgents,
      },
      response => {
        const listTable = this.getTableFromRespone(
          response && response.getCollectionAgentByType,
          'collectionAgents',
        );
        this.setState({
          collectionAgent: listTable,
          saveCollectionAgent: listTable,
        });
        if (
          !response.getCollectionAgentByType ||
          !Array.isArray(response.getCollectionAgentByType) ||
          response.getCollectionAgentByType.length <= 0
        ) {
          this.isEmptyListServer = true;
        } else {
          this.isEmptyListServer = false;
        }
      },
    );
  };

  onSelectTableRow = rowSelectedItem => {
    if (this.state.rowSelectedItem === rowSelectedItem) {
      this.setState({ rowSelectedItem: null });
    } else {
      this.setState({ rowSelectedItem });
    }
  };

  onChangeRowValue = (id, type, val) => {
    try {
      const collectionAgent = this.state.collectionAgent || [];
      collectionAgent[id][type] = val;

      this.setState({
        collectionAgent: [...collectionAgent],
      });
    } catch (error) {
      console.log(error);
    }
  };

  onChangeNewValue = (type, val) => {
    try {
      const { newAgent } = this.state;
      newAgent[type] = val;
      this.setState({
        newAgent: { ...newAgent },
      });
    } catch (error) {
      console.log(error);
    }
  };

  getTableFromRespone = (array, key) => {
    if (!array || !Array.isArray(array) || array.length <= 0 || !array[0])
      return [];

    return array[0][key] || [];
  };

  resetListIndex = list =>
    list.map((item, id) => ({
      ...item,
      index: id + 1,
    }));

  handleClickAddNewRecord = () => {
    let lastIdx = 1;
    if (this.state.collectionAgent && this.state.collectionAgent.length > 0) {
      const sortCollectionAgent = this.state.collectionAgent.sort(
        (a, b) => a.id - b.id,
      );
      lastIdx = sortCollectionAgent[sortCollectionAgent.length - 1].index + 1;
    }
    this.setState(pre => ({
      collectionAgent: [
        ...pre.collectionAgent,
        {
          ...pre.newAgent,
          index: lastIdx,
        },
      ],
      newAgent: { userName: '', firstName: '', lastName: '' },
    }));
  };

  handleClickRemoveRecord = () => {
    this.setState(pre => ({
      collectionAgent: this.resetListIndex(
        pre.collectionAgent.filter(e => e !== pre.rowSelectedItem),
      ),
      rowSelectedItem: null,
    }));
  };

  handleClickApplyButton = () => {
    const removeAgent = [];
    (this.state.saveCollectionAgent || []).map(item => {
      const checkArray = this.state.collectionAgent.find(
        e => e.index === item.index,
      );
      if (!checkArray) {
        removeAgent.push({ index: item.index });
      }
      return null;
    });
    const agentList = (this.state.collectionAgent || []).map(item => ({
      index: item.index,
      userId: item.userId,
      firstName: item.firstName,
      lastName: item.lastName,
    }));
    const data = {
      collectionAgents: [...removeAgent, ...agentList],
    };

    if (this.isEmptyListServer) {
      this.props.createCollectionAgent(data, response => {
        const listTable =
          response &&
          response.createCollectionAgent &&
          response.createCollectionAgent.collectionAgents
            ? response.createCollectionAgent.collectionAgents
            : [];
        this.setState({
          collectionAgent: listTable,
          saveCollectionAgent: listTable,
        });

        if (!response.createCollectionAgent) {
          this.isEmptyListServer = true;
        } else {
          this.isEmptyListServer = false;
        }
      });
    } else {
      this.props.modifyCollectionAgent(data, response => {
        const listTable =
          response &&
          response.modifyCollectionAgent &&
          response.modifyCollectionAgent.collectionAgents
            ? response.modifyCollectionAgent.collectionAgents
            : [];
        this.setState({
          collectionAgent: listTable,
          saveCollectionAgent: listTable,
        });

        if (!response.modifyCollectionAgent) {
          this.isEmptyListServer = true;
        } else {
          this.isEmptyListServer = false;
        }
      });
    }
  };

  render() {
    const { collectionAgent, rowSelectedItem, newAgent } = this.state;
    return (
      <CollectionAgentsTable
        data={collectionAgent}
        onSelectTableRow={this.onSelectTableRow}
        rowSelectedItem={rowSelectedItem}
        handleClickAddNewRecord={this.handleClickAddNewRecord}
        handleClickRemoveRecord={this.handleClickRemoveRecord}
        onChangeRowValue={this.onChangeRowValue}
        onChangeNewValue={this.onChangeNewValue}
        handleClickApplyButton={this.handleClickApplyButton}
        newAgent={newAgent}
      />
    );
  }
}

CollectionAgent.propTypes = {
  getCollectionAgentByType: PropTypes.func,
  createCollectionAgent: PropTypes.func,
  modifyCollectionAgent: PropTypes.func,
};

export default connect(
  null,
  {
    getCollectionAgentByType,
    createCollectionAgent,
    modifyCollectionAgent,
  },
)(CollectionAgent);
