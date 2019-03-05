import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col } from 'reactstrap';
import { permissionEnum } from 'constantsApp';

import { CheckBox, PageAbstract } from '../commons';
import DynamicInput from '../commons/DynamicInput';

const heads = [
  {
    key: 'Permission',
    name: 'Permission',
  },
  {
    key: 'Read',
    name: 'Read',
  },
  {
    key: 'ReadWrite',
    name: 'ReadWrite',
  },
  {
    key: 'None',
    name: 'None',
  },
  {
    key: 'Limit',
    name: 'Limit',
  },
];

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      permissionsList: props.permissionsList || [],
      allPermissionType: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.permissionsList) !==
      JSON.stringify(this.state.permissionsList)
    ) {
      this.setState({
        permissionsList: [...nextProps.permissionsList],
      });
    }
  }
  handleClickRow = () => {};

  handleClickCheckBox = (value, index) => {
    const { permissionsList, allPermissionType } = this.state;
    const { hubName, moduleName } = this.props;
    if (index === 'all') {
      const tempList = permissionsList.map(item => ({
        ...item,
        type: value,
      }));
      this.setState({
        permissionsList: tempList,
        allPermissionType: value,
      });
      this.props.setPermissionList(hubName, moduleName, tempList);
    } else {
      permissionsList[index].type = value;
      this.setState({
        permissionsList: [...permissionsList],
      });
      this.props.setPermissionList(hubName, moduleName, permissionsList);
      if (value !== allPermissionType) {
        this.setState({
          allPermissionType: '',
        });
      }
    }
  };
  updateActionRowValue = () => {};
  renderRow = (row, id) => (
    <tr key={row.index} onClick={() => this.handleClickRow()}>
      <td className="w-20 p-3">{row.permission}</td>

      <td className="w-20 p-3">
        <CheckBox
          checked={row.type === permissionEnum.permissionType.READ}
          onChange={() => {
            this.handleClickCheckBox(permissionEnum.permissionType.READ, id);
          }}
        />
      </td>
      <td className="w-20 p-3">
        <CheckBox
          checked={row.type === permissionEnum.permissionType.READ_WRITE}
          onChange={() => {
            this.handleClickCheckBox(
              permissionEnum.permissionType.READ_WRITE,
              id,
            );
          }}
        />
      </td>
      <td className="w-20 p-3">
        <CheckBox
          checked={row.type === permissionEnum.permissionType.NONE}
          onChange={() => {
            this.handleClickCheckBox(permissionEnum.permissionType.NONE, id);
          }}
        />
      </td>
      <DynamicInput
        value={row.roleLimit || ''}
        name="roleLimit"
        index={row.index}
        onUpdateValue={this.updateActionRowValue}
      />
    </tr>
  );

  renderHeader = header => (
    <th key={header.key} scope="col" className="w-20 p-3">
      {header.name}
    </th>
  );

  renderBody() {
    const { errorMessage } = this.props;
    const { permissionsList } = this.state;
    if (errorMessage) {
      return (
        <tr>
          <td colSpan={12} className="txt-error">
            {errorMessage}
          </td>
        </tr>
      );
    }

    if (!permissionsList.length) {
      return (
        <tr>
          <td colSpan={12}>No record has found!</td>
        </tr>
      );
    }

    return permissionsList.map(this.renderRow);
  }
  renderFooterRow = allPermissionType => (
    <tr key="all" onClick={() => this.handleClickRow()}>
      <td className="w-20 p-3">All</td>

      <td className="w-20 p-3">
        <CheckBox
          checked={allPermissionType === permissionEnum.permissionType.READ}
          onChange={() => {
            this.handleClickCheckBox(permissionEnum.permissionType.READ, 'all');
          }}
        />
      </td>
      <td className="w-20 p-3">
        <CheckBox
          checked={
            allPermissionType === permissionEnum.permissionType.READ_WRITE
          }
          onChange={() => {
            this.handleClickCheckBox(
              permissionEnum.permissionType.READ_WRITE,
              'all',
            );
          }}
        />
      </td>
      <td className="w-20 p-3">
        <CheckBox
          checked={allPermissionType === permissionEnum.permissionType.NONE}
          onChange={() => {
            this.handleClickCheckBox(permissionEnum.permissionType.NONE, 'all');
          }}
        />
      </td>
      <td className="w-20 p-3"> </td>
    </tr>
  );
  render() {
    const { iHaveSelectAll } = this.props;
    const { allPermissionType, permissionsList } = this.state;
    return (
      <div className="global-page customer-page">
        <PageAbstract>
          <Col md={12} lg={12}>
            <Card>
              <div className="table-block">
                <CardBody>
                  <div className="table__block">
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>{heads.map(item => this.renderHeader(item))}</tr>
                      </thead>
                      <tbody>
                        {this.renderBody(permissionsList)}
                        {iHaveSelectAll &&
                          permissionsList.length > 0 &&
                          this.renderFooterRow(allPermissionType)}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </div>
            </Card>
          </Col>
        </PageAbstract>
      </div>
    );
  }
}

Table.propTypes = {
  errorMessage: PropTypes.string,
  iHaveSelectAll: PropTypes.bool,
  permissionsList: PropTypes.array,
  hubName: PropTypes.string,
  moduleName: PropTypes.string,
  setPermissionList: PropTypes.func,
};

export default Table;
