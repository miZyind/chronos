import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '@actions/main';
import { Table } from 'semantic-ui-react';
import shiftLabs from '#lib/shift';
import Selector from '@components/selector';
import InfoMoal from '@components/count/modal-info';
import Wating from '@components/message-waiting';
import { IStore } from '../../models';
import * as service from '../../services';
import Row from './row-list';

const nameProps = {
  tbHdCell1: 'Id',
  tbHdCell2: '日班總時數',
  tbHdCell3: '夜班總時數',
  tbHdCell4: '夜班天數',
  tbHdCell5: '代班天數',
  tbHdCell6: '詳細',
  closeBtn: '關閉'
};

type ListTableProps = {
  className?: string;
};
type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = ListTableProps & StateProps & DispatchProps;

class ListTable extends Component<Props, any> {
  constructor(prop: Props) {
    super(prop);
    this.getCounts(this.props.main.getSelectCountYear, this.props.main.getSelectCountMonth);
    this.state = {
      open: false,
      listIsLoaded: false,
      infoIsLoaded: false
    };
  }
  public componentWillUpdate(nextProps: Props) {
    if (nextProps.main.getSelectCountYear !== this.props.main.getSelectCountYear) {
      this.getCounts(nextProps.main.getSelectCountYear, nextProps.main.getSelectCountMonth);
    } else {
      if (nextProps.main.getSelectCountMonth !== this.props.main.getSelectCountMonth) {
        this.getCounts(nextProps.main.getSelectCountYear, nextProps.main.getSelectCountMonth);
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
        this.setState({ listIsLoaded: true });
      }, (error) => {
        this.props.fetchFailure(error);
      });
  }
  public fetchOneCount(getWorkerId: string) {
    const obj: object = {
      'year': this.props.main.getSelectCountYear,
      'month': this.props.main.getSelectCountMonth,
      'worker': getWorkerId
    };
    service.getCountByWorker(obj)
      .then((response: any) => {
        this.props.fetchGetDataSuccess({ 'type': 'countListByWorker', 'data': response });
        this.setState({ infoIsLoaded: true });
      }, (error) => {
        this.props.fetchFailure(error);
      });
  }

  public showInfo = (getWorkerId: string) => {
    this.fetchOneCount(getWorkerId);
    this.setState({ open: true });
    console.log(this.props.fetch.countByWorkerListItems);
  }
  public close = () => {
    this.setState({ open: false });
  }
  public render() {
    const { loading, countListItems, countByWorkerListItems } = this.props.fetch;
    const { listIsLoaded, infoIsLoaded, open } = this.state;
    const { tbHdCell1, tbHdCell2, tbHdCell3, tbHdCell4, tbHdCell5, tbHdCell6 } = nameProps;
    if (loading) {
      return (<Wating />);
    }
    return (
      <div className={this.props.className} >
        <Selector options={shiftLabs.optionYears} currentSelected={this.props.main.getSelectCountYear} onChangeEvent={this.props.selectcountyear} />
        <Selector options={shiftLabs.optionMonths} currentSelected={this.props.main.getSelectCountMonth} onChangeEvent={this.props.selectcountmonth} />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{tbHdCell1}</Table.HeaderCell>
              <Table.HeaderCell>{tbHdCell2}</Table.HeaderCell>
              <Table.HeaderCell>{tbHdCell3}</Table.HeaderCell>
              <Table.HeaderCell>{tbHdCell4}</Table.HeaderCell>
              <Table.HeaderCell>{tbHdCell5}</Table.HeaderCell>
              <Table.HeaderCell>{tbHdCell6}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{listIsLoaded && countListItems.map((worker: any, key: number) => <Row key={key} worker={worker} btnEvent={this.showInfo.bind(this, worker.workerId)} />)}</Table.Body>
        </Table>
        <InfoMoal isLoaded={infoIsLoaded} countByWorkerListItems={countByWorkerListItems} open={open} closeEvent={this.close}/>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps>(
  (state: any) => state,
  Actions
)(ListTable);
