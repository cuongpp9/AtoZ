import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { FormGroup } from 'components/form';

class PriceUnit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      priceOverride: '',
      priceOffset: '',
      discountPercent: '',
      startDate: null,
      endDate: null,
    };
  }

  componentDidMount() {
    this.initValue(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && this.props.data !== nextProps.data) {
      this.initValue(nextProps.data);
    }
  }

  initValue = data => {
    this.setState({
      quatity: data.quatity || '',
      priceOverride: data.priceOverride || '',
      priceOffset: data.priceOffset || '',
      discountPercent: data.discountPercent || '',
      startDate: data.startDate ? moment(data.startDate) : null,
      endDate: data.endDate ? moment(data.endDate) : null,
    });
  };

  onChangePriceOverride = async evt => {
    this.setState({
      priceOverride: evt.target.value,
      priceOffset: '',
      discountPercent: '',
    });

    const { changeLines, serviceId, data } = this.props;
    await changeLines(serviceId, data.id, 'priceOverride', evt.target.value);
    await changeLines(serviceId, data.id, 'priceOffset', null);
    await changeLines(serviceId, data.id, 'discountPercent', null);
  };

  onChangePriceOffset = async evt => {
    this.setState({
      priceOverride: '',
      priceOffset: evt.target.value,
      discountPercent: '',
    });

    const { changeLines, serviceId, data } = this.props;
    await changeLines(serviceId, data.id, 'priceOffset', evt.target.value);
    await changeLines(serviceId, data.id, 'priceOverride', null);
    await changeLines(serviceId, data.id, 'discountPercent', null);
  };

  onChangeDiscountPercent = async evt => {
    this.setState({
      priceOverride: '',
      priceOffset: '',
      discountPercent: evt.target.value,
    });

    const { changeLines, serviceId, data } = this.props;
    await changeLines(serviceId, data.id, 'discountPercent', evt.target.value);

    await changeLines(serviceId, data.id, 'priceOverride', null);
    await changeLines(serviceId, data.id, 'priceOffset', null);
  };

  onChangeDate = (name, date) => {
    const { changeLines, serviceId, data } = this.props;
    this.setState({ [name]: date });

    changeLines(serviceId, data.id, name, date);
  };

  onChangeSelect = (name, select) => {
    const { changeLines, serviceId, data } = this.props;
    this.setState({ [name]: select });

    changeLines(serviceId, data.id, name, select.value);
  };

  onChangeText = evt => {
    const { changeLines, serviceId, data } = this.props;
    this.setState({ [evt.target.name]: evt.target.value });
    changeLines(serviceId, data.id, evt.target.name, evt.target.value);
  };

  render() {
    const {
      startDate,
      endDate,
      priceOverride,
      priceOffset,
      discountPercent,
      quatity,
    } = this.state;
    const { data } = this.props;
    return (
      <tr>
        <td className="center">{data.action}</td>
        <td className="center">{data.status}</td>
        <td>
          <FormGroup title="">
            <input
              name="quatity"
              type="number"
              value={quatity}
              onChange={this.onChangeText}
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="priceOverride"
              type="number"
              min={0}
              value={priceOverride}
              onChange={this.onChangePriceOverride}
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="priceOffset"
              min={0}
              type="number"
              value={priceOffset}
              onChange={this.onChangePriceOffset}
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="discountPercent"
              type="number"
              min={0}
              value={discountPercent}
              onChange={this.onChangeDiscountPercent}
            />
          </FormGroup>
        </td>
        <td className="center">{data.priceOfferId}</td>
        <td>{data.discountOfferId || ''}</td>
        <td>
          <FormGroup title="">
            <div className="date-picker">
              <DatePicker
                name="startDate"
                dateFormat="YYYY-MM-DD"
                popperPlacement="bottom-start"
                placeholderText="YYYY-MM-DD"
                popperModifiers={{
                  flip: {
                    enabled: false,
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                  },
                }}
                selected={startDate}
                onChange={date => this.onChangeDate('startDate', date)}
                className="form__form-group-datepicker"
                autoComplete="off"
                isClearable
              />
            </div>
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <div className="date-picker">
              <DatePicker
                name="endDate"
                dateFormat="YYYY-MM-DD"
                placeholderText="YYYY-MM-DD"
                popperPlacement="bottom-start"
                popperModifiers={{
                  flip: {
                    enabled: false,
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                  },
                }}
                selected={endDate}
                onChange={date => this.onChangeDate('endDate', date)}
                className="form__form-group-datepicker"
                autoComplete="off"
                isClearable
              />
            </div>
          </FormGroup>
        </td>
      </tr>
    );
  }
}

PriceUnit.propTypes = {
  data: PropTypes.object,
  serviceId: PropTypes.string,
  changeLines: PropTypes.func,
};

export default PriceUnit;
