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
    if (countListItems && countListItems.length > 0) {
      countListItems.map((worker: any) => {
        rows.push(
          <Table.Row key={`worker-${worker.workerId}}`}>
            <Table.Cell>{worker.workerId}</Table.Cell>
            <Table.Cell>{worker.workerName}</Table.Cell>
            <Table.Cell>{worker.dayCount}</Table.Cell>
            <Table.Cell>{worker.nightCount}</Table.Cell>
            <Table.Cell>{worker.coverCount}</Table.Cell>
            <Table.Cell><InfoMoal getWorkerId={worker.workerId} /></Table.Cell>
          </Table.Row>);
      });
    }
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
