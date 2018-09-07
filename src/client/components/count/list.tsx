import React, { Component } from 'react';
import { connect } from 'react-redux';
import Selector from '@components/selector';
import shiftLabs from '#lib/shift';
import InfoMoal from '@components/count/info';
import { Table } from 'semantic-ui-react';
import Wating from '@components/waiting';
import { Actions } from '@actions/main';
import { IStore } from '../../models';
import * as service from '../../services';

type ListTableProps = {
  className?: string;
};
type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = ListTableProps & StateProps & DispatchProps;

class ListTable extends Component<Props> {
  constructor(prop: Props) {
    super(prop);
    this.getCounts(this.props.main.getSelectYear, this.props.main.getSelectMonth);
  }
  public componentWillUpdate(nextProps: Props) {
    if (nextProps.main.getSelectYear !== this.props.main.getSelectYear) {
      this.getCounts(nextProps.main.getSelectYear, nextProps.main.getSelectMonth);
    } else {
      if (nextProps.main.getSelectMonth !== this.props.main.getSelectMonth) {
        this.getCounts(nextProps.main.getSelectYear, nextProps.main.getSelectMonth);
      }
    }
  }
  public getCounts(year: string, month: string) {
    const obj: object = {
      'year': year,
      'month': month
    };
    this.props.fetchBegin();
    service.getCounts(obj)
      .then((response: any) => {
        this.props.fetchGetDataSuccess({ 'type': 'countList', 'data': response });
      }, (error) => {
        this.props.fetchFailure(error);
      });
  }
  public getLists() {
    const { countListItems } = this.props.fetch;
    const rows: JSX.Element[] = [];
    Object.keys(countListItems).map((id: any) => {
      // tslint:disable-next-line:no-string-literal
      const getItemName = countListItems[id].workerName;
      let dayCount = 0;
      let nightCount = 0;
      let dayoffCount = 0;
      // console.log(Object.keys(countListItems[id].nomal));
      if (countListItems[id].nomal) {
        const getNomal = countListItems[id].nomal;
        Object.keys(getNomal).map((k: any) => {
          dayCount += parseInt(getNomal[k].totalDayHours);
          nightCount += parseInt(getNomal[k].totalNightHours);
        });
      }
      if (countListItems[id].cover) {
        const getCover = countListItems[id].cover;
        Object.keys(getCover).map(() => {
          dayoffCount++;
        });
      }
      rows.push(
        <Table.Row key={`worker-${id}}`}>
          <Table.Cell>{id}</Table.Cell>
          <Table.Cell>{getItemName}</Table.Cell>
          <Table.Cell>{dayCount}</Table.Cell>
          <Table.Cell>{nightCount}</Table.Cell>
          <Table.Cell>{dayoffCount}</Table.Cell>
          <Table.Cell><InfoMoal getWorkerId={id}/></Table.Cell>
        </Table.Row>);
    });
    return rows;
  }
  public render() {
    const { loading } = this.props.fetch;
    if (loading) {
      return (<Wating />);
    }
    return (
      <div className={this.props.className} >
        <Selector options={shiftLabs.optionYears} currentSelected={this.props.main.getSelectYear} onChangeEvent={this.props.selectyear} />
        <Selector options={shiftLabs.optionMonths} currentSelected={this.props.main.getSelectMonth} onChangeEvent={this.props.selectmonth} />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>保全</Table.HeaderCell>
              <Table.HeaderCell>日班總時數</Table.HeaderCell>
              <Table.HeaderCell>夜班總時數</Table.HeaderCell>
              <Table.HeaderCell>代班天數</Table.HeaderCell>
              <Table.HeaderCell>詳細</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.getLists()}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps>(
  (state: any) => state,
  Actions
)(ListTable);
