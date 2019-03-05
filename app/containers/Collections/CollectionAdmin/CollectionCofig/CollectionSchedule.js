import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CollectionScheduleTable } from 'components/collections';
import {} from 'components/form';
import { collectionsEnum } from 'constantsApp';
import {
  getCollectionScheduleByType,
  createCollectionSchedule,
  modifyCollectionSchedule,
} from '../../actions';
class CollectionSchedule extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      collectionSchedule: [],
      saveCollectionSchedule: [],
      rowSelectedItem: null,
      newSchedule: {},
    };
    this.isEmptyListServer = true;
  }

  componentDidMount() {
    this.getCollectionScheduleByType();
  }

  getCollectionScheduleByType = () => {
    this.props.getCollectionScheduleByType(
      {
        type: collectionsEnum.type.collectionSchedule,
      },
      response => {
        const listTable = this.getTableFromRespone(
          response && response.getCollectionScheduleByType,
          'collectionSchedule',
        );
        this.setState({
          collectionSchedule: listTable,
          saveCollectionSchedule: listTable,
        });
        if (
          !response.getCollectionScheduleByType ||
          !Array.isArray(response.getCollectionScheduleByType) ||
          response.getCollectionScheduleByType.length <= 0
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
      const collectionSchedule = this.state.collectionSchedule || [];
      collectionSchedule[id][type] = val;

      this.setState({
        collectionSchedule: [...collectionSchedule],
      });
    } catch (error) {
      console.log(error);
    }
  };

  onChangeNewValue = (type, val) => {
    try {
      const { newSchedule } = this.state;
      newSchedule[type] = val;
      this.setState({
        newSchedule: { ...newSchedule },
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleClickApplyButton = () => {
    const removeSchedule = [];
    (this.state.saveCollectionSchedule || []).map(item => {
      const checkArray = this.state.collectionSchedule.find(
        e => e.index === item.index,
      );
      if (!checkArray) {
        removeSchedule.push({ index: item.index });
      }
      return null;
    });
    const scheduleList = (this.state.collectionSchedule || []).map(item => ({
      index: item.index,
      offsetdays: item.offsetdays,
      description: item.description,
      action: item.action,
    }));
    const data = {
      collectionSchedule: [...removeSchedule, ...scheduleList],
    };

    if (this.isEmptyListServer) {
      this.props.createCollectionSchedule(data, response => {
        const listTable =
          response &&
          response.createCollectionSchedule &&
          response.createCollectionSchedule.collectionSchedule
            ? response.createCollectionSchedule.collectionSchedule
            : [];
        this.setState({
          collectionSchedule: listTable,
          saveCollectionSchedule: listTable,
        });

        if (!response.createCollectionSchedule) {
          this.isEmptyListServer = true;
        } else {
          this.isEmptyListServer = false;
        }
      });
    } else {
      this.props.modifyCollectionSchedule(data, response => {
        const listTable =
          response &&
          response.modifyCollectionSchedule &&
          response.modifyCollectionSchedule.collectionSchedule
            ? response.modifyCollectionSchedule.collectionSchedule
            : [];
        this.setState({
          collectionSchedule: listTable,
          saveCollectionSchedule: listTable,
        });

        if (!response.modifyCollectionSchedule) {
          this.isEmptyListServer = true;
        } else {
          this.isEmptyListServer = false;
        }
      });
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
    if (
      this.state.collectionSchedule &&
      this.state.collectionSchedule.length > 0
    ) {
      const sortCollectionSchedule = this.state.collectionSchedule.sort(
        (a, b) => a.id - b.id,
      );
      lastIdx =
        sortCollectionSchedule[sortCollectionSchedule.length - 1].index + 1;
    }
    this.setState(pre => ({
      collectionSchedule: [
        ...pre.collectionSchedule,
        {
          ...pre.newSchedule,
          index: lastIdx,
        },
      ],
      newSchedule: { description: '', offsetdays: '' },
    }));
  };

  handleClickRemoveRecord = () => {
    this.setState(pre => ({
      collectionSchedule: this.resetListIndex(
        pre.collectionSchedule.filter(e => e !== pre.rowSelectedItem),
      ),
      rowSelectedItem: null,
    }));
  };

  render() {
    const { collectionSchedule, rowSelectedItem, newSchedule } = this.state;
    return (
      <CollectionScheduleTable
        data={collectionSchedule}
        onSelectTableRow={this.onSelectTableRow}
        rowSelectedItem={rowSelectedItem}
        handleClickAddNewRecord={this.handleClickAddNewRecord}
        handleClickRemoveRecord={this.handleClickRemoveRecord}
        onChangeRowValue={this.onChangeRowValue}
        onChangeNewValue={this.onChangeNewValue}
        handleClickApplyButton={this.handleClickApplyButton}
        newSchedule={newSchedule}
      />
    );
  }
}
CollectionSchedule.propTypes = {
  getCollectionScheduleByType: PropTypes.func,
  createCollectionSchedule: PropTypes.func,
  modifyCollectionSchedule: PropTypes.func,
};
export default connect(
  null,
  {
    getCollectionScheduleByType,
    createCollectionSchedule,
    modifyCollectionSchedule,
  },
)(CollectionSchedule);
