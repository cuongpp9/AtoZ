import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CollectionActionsTable } from 'components/collections';
import {} from 'components/form';
import { collectionsEnum } from 'constantsApp';
import {
  getCollectionActionsByType,
  createCollectionAction,
  modifyCollectionAction,
} from '../../actions';
class CollectionActions extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      saveCollectionActions: [],
      collectionActions: [],
      rowSelectedActionItem: null,
      newAction: {},
    };

    this.isEmptyListServer = true;
  }

  componentDidMount() {
    this.getCollectionActionsByType();
  }

  onSelectActionTableRow = rowSelectedActionItem => {
    if (this.state.rowSelectedActionItem === rowSelectedActionItem) {
      this.setState({ rowSelectedActionItem: null });
    } else {
      this.setState({ rowSelectedActionItem });
    }
  };

  updateActionRowValue = (idx, type, val) => {
    try {
      const { collectionActions } = this.state;
      collectionActions[idx][type] = val;
    } catch (error) {
      console.log(error);
    }
  };

  onChangeNewActionValue = (type, val) => {
    try {
      const { newAction } = this.state;
      newAction[type] = val;
      this.setState({
        newAction: { ...newAction },
      });
    } catch (error) {
      console.log(error);
    }
  };

  getCollectionActionsByType = () => {
    this.props.getCollectionActionsByType(
      {
        type: collectionsEnum.type.collectionAction,
      },
      response => {
        const listTable = this.getTableFromRespone(
          response && response.getCollectionActionsByType,
          'actionList',
        );
        this.setState({
          collectionActions: listTable,
          saveCollectionActions: listTable,
        });
        if (
          !response.getCollectionActionsByType ||
          !Array.isArray(response.getCollectionActionsByType) ||
          response.getCollectionActionsByType.length <= 0
        ) {
          this.isEmptyListServer = true;
        } else {
          this.isEmptyListServer = false;
        }
      },
    );
  };

  getTableFromRespone = (array, key) => {
    if (!array || !Array.isArray(array) || array.length <= 0 || !array[0])
      return [];

    return array[0][key] || [];
  };

  handleClickAddNewAction = () => {
    let lastIdx = 1;
    if (
      this.state.collectionActions &&
      this.state.collectionActions.length > 0
    ) {
      const sortCollectionActions = this.state.collectionActions.sort(
        (a, b) => a.id - b.id,
      );
      lastIdx =
        sortCollectionActions[sortCollectionActions.length - 1].index + 1;
    }

    this.setState(pre => ({
      collectionActions: [
        ...pre.collectionActions,
        {
          ...pre.newAction,
          index: lastIdx,
        },
      ],
      newAction: { description: '' },
    }));
  };

  handleClickApplyButton = () => {
    const removeAction = [];
    (this.state.saveCollectionActions || []).map(item => {
      const checkArray = this.state.collectionActions.find(
        e => e.index === item.index,
      );
      if (!checkArray) {
        removeAction.push({ index: item.index });
      }
      return null;
    });
    const actionList = (this.state.collectionActions || []).map(item => ({
      index: item.index,
      description: item.description,
      action: item.action,
    }));
    const data = {
      actionList: [...removeAction, ...actionList],
    };

    if (this.isEmptyListServer) {
      this.props.createCollectionAction(data, response => {
        const listTable =
          response &&
          response.createCollectionAction &&
          response.createCollectionAction.actionList
            ? response.createCollectionAction.actionList
            : [];

        this.setState({
          collectionActions: listTable,
          saveCollectionActions: listTable,
        });
        if (!response.createCollectionAction) {
          this.isEmptyListServer = true;
        } else {
          this.isEmptyListServer = false;
        }
      });
    } else {
      this.props.modifyCollectionAction(data, response => {
        const listTable =
          response &&
          response.modifyCollectionAction &&
          response.modifyCollectionAction.actionList
            ? response.modifyCollectionAction.actionList
            : [];

        this.setState({
          collectionActions: listTable,
          saveCollectionActions: listTable,
        });
        if (!response.modifyCollectionAction) {
          this.isEmptyListServer = true;
        } else {
          this.isEmptyListServer = false;
        }
      });
    }
  };

  handleClickRemoveAction = () => {
    this.setState(pre => ({
      collectionActions: pre.collectionActions.filter(
        e => e !== pre.rowSelectedActionItem,
      ),
      rowSelectedActionItem: null,
    }));
  };

  render() {
    const { collectionActions, rowSelectedActionItem, newAction } = this.state;
    return (
      <CollectionActionsTable
        data={collectionActions}
        onSelectTableRow={this.onSelectActionTableRow}
        rowSelectedItem={rowSelectedActionItem}
        handleClickAddNewRecord={this.handleClickAddNewAction}
        handleClickRemoveRecord={this.handleClickRemoveAction}
        updateActionRowValue={this.updateActionRowValue}
        onChangeNewValue={this.onChangeNewActionValue}
        newAction={newAction}
        handleClickApplyButton={this.handleClickApplyButton}
      />
    );
  }
}

CollectionActions.propTypes = {
  getCollectionActionsByType: PropTypes.func,
  createCollectionAction: PropTypes.func,
  modifyCollectionAction: PropTypes.func,
};

export default connect(
  null,
  {
    getCollectionActionsByType,
    createCollectionAction,
    modifyCollectionAction,
  },
)(CollectionActions);
