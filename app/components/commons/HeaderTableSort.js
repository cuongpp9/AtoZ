import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SortType } from 'constantsApp';

const HeaderTableSort = props => (
  <th
    className={props.className || 'sortable w-25 p-3'}
    onClick={() => props.handleSort(props.sortName)}
    scope="col"
  >
    <div
      className={classNames('sort-field', {
        'sort-asc':
          props.keySort === props.sortName && props.valueSort === SortType.asc,
        'sort-desc':
          props.keySort === props.sortName && props.valueSort === SortType.desc,
      })}
    >
      <span>{props.headerName}</span>
    </div>
  </th>
);

HeaderTableSort.propTypes = {
  headerName: PropTypes.string,
  keySort: PropTypes.string,
  className: PropTypes.string,
  valueSort: PropTypes.string,
  sortName: PropTypes.string,
  handleSort: PropTypes.func,
};

export default HeaderTableSort;
