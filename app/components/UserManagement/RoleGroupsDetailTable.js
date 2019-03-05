import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { SortType } from 'constantsApp';
import { Pagination, Sizing, HeaderTableSort } from '../commons';

const heads = [
  {
    key: 'id',
    name: 'Id',
  },

  {
    key: 'Remove',
    name: 'Remove',
  },
];

class RoleGroupsTable extends PureComponent {
  constructor() {
    super();
    this.state = {
      keySort: '',
      valueSort: '',
    };
  }

  handleSort = sortName => {
    let { keySort, valueSort } = this.state;
    if (!keySort || keySort !== sortName) {
      keySort = sortName;
      valueSort = SortType.asc;
    } else {
      valueSort = valueSort === SortType.asc ? SortType.desc : SortType.asc;
    }
    this.setState({ keySort, valueSort });
  };

  handleClickRow = () => {};
  handleRemoveButton = id => {
    this.props.handleRemoveButton(id);
  };
  renderRow = row => (
    <tr key={row.roleId} onClick={() => this.handleClickRow()}>
      <td>{row.roleId}</td>

      <td
        style={{ cursor: 'pointer' }}
        onClick={() => this.handleRemoveButton(row.roleId)}
      >
        <i className="fa fa-times font-size-25" />
      </td>
    </tr>
  );

  renderHeader = header => {
    const { keySort, valueSort } = this.state;
    if (header.sortName) {
      return (
        <HeaderTableSort
          key={header.key}
          headerName={header.name}
          sortName={header.sortName}
          keySort={keySort}
          valueSort={valueSort}
          handleSort={this.handleSort}
        />
      );
    }

    return (
      <th key={header.key} scope="col" className="w-25 p-3">
        {header.name}
      </th>
    );
  };

  renderBody() {
    const { data, errorMessage } = this.props;
    if (errorMessage) {
      return (
        <tbody>
          <tr>
            <td colSpan={12} className="txt-error">
              {errorMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={12}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { data } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="table-block">
            <CardBody>
              <div className="table__block">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>{heads.map(item => this.renderHeader(item))}</tr>
                  </thead>
                  {this.renderBody(data)}
                </table>
              </div>
            </CardBody>
          </div>
        </Card>
      </Col>
    );
  }
}

RoleGroupsTable.propTypes = {
  data: PropTypes.array,
  errorMessage: PropTypes.string,
  handleRemoveButton: PropTypes.func,
};
RoleGroupsTable.defaultProps = {
  data: [],
};
export default compose(withRouter)(RoleGroupsTable);
