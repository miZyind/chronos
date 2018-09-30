import React, { Component } from 'react';
import { connect } from 'react-redux';
import Selector from '@components/selector';
import AddFormMoal from '@components/station/modal-add';
import EditFormMoal from '@components/station/modal-edit';
import { Table, Button, Icon } from 'semantic-ui-react';
import Wating from '@components/message-waiting';
import shiftLabs from '#lib/shift';
import { Actions } from '@actions/main';
import { IFetch } from '../../models/fetch';
import * as service from '../../services';

type ListTableProps = {
  className?: string;
  onChangeAreaEvent?: any;
  selectArea: string;
};

type FStateProps = IFetch;
type DispatchProps = typeof Actions;
type Props = ListTableProps & FStateProps & DispatchProps;

class ListTable extends Component<Props> {
  constructor(prop: Props) {
    super(prop);
    this.getStations(this.props.selectArea);
  }

  public componentWillUpdate(nextProps: Props) {
    if (nextProps.sendfinish !== this.props.sendfinish) {
      this.getStations(nextProps.selectArea);
    }
    if (nextProps.selectArea !== this.props.selectArea) {
      this.getStations(nextProps.selectArea);
    }
  }
  public getStations(area: string) {
    this.props.fetchBegin();
    service.getStations(area)
      .then((response: any) => {
        this.props.fetchGetDataSuccess({ 'type': 'stationList', 'data': response });
      }, (error) => {
        this.props.fetchFailure(error);
      });
  }
  public deleteStation(getId: any) {
    this.props.fetchBegin();
    const obj: object = { 'id': getId };
    service.deleteStation(obj)
      .then((response: any) => {
        if (response === 'yes') {
          this.props.fetchSendSuccess();
          alert('刪除成功');
        }
      }, (error) => {
        this.props.fetchFailure(error);
      });
  }
  public getLists() {
    const { stationListItems } = this.props;
    const rows: JSX.Element[] = [];

    Object.keys(stationListItems).map((area: any) => {
      const getArea = Object.values(stationListItems[area]);
      getArea.map((i: any) => {
        if (i.id) {
          let dayStart = '00:00';
          let dayEnd = '00:00';
          let nightStart = '00:00';
          let nightEnd = '00:00';
          if (i.dayStart !== null && i.dayStart !== undefined) {
            dayStart = i.dayStart;
          }
          if (i.dayEnd !== null && i.dayEnd !== undefined) {
            dayEnd = i.dayEnd;
          }
          if (i.nightStart !== null && i.nightStart !== undefined) {
            nightStart = i.nightStart;
          }
          if (i.nightEnd !== null && i.nightEnd !== undefined) {
            nightEnd = i.nightEnd;
          }
          rows.push(
            <Table.Row key={`st-${area}-${i.id}`}>
              <Table.Cell>{i.id}</Table.Cell>
              <Table.Cell>{i.name}</Table.Cell>
              <Table.Cell>{i.area}</Table.Cell>
              <Table.Cell>{i.workerNumber}</Table.Cell>
              <Table.Cell>{`${dayStart}-${dayEnd}`}</Table.Cell>
              <Table.Cell>{`${nightStart}-${nightEnd}`}</Table.Cell>
              <Table.Cell>{i.desc}</Table.Cell>
              <Table.Cell selectable>
                <EditFormMoal
                  editId={i.id}
                  editName={i.name}
                  editArea={i.area}
                  editWorker={i.workerNumber}
                  editDesc={i.desc}
                  editDayStart={dayStart}
                  editDayEnd={dayEnd}
                  editNightStart={nightStart}
                  editNightEnd={nightEnd}
                />
                <Button icon onClick={this.deleteStation.bind(this, i.id)}> <Icon name='trash' /></Button>
              </Table.Cell>
            </Table.Row>
          );
        }
      });
    });
    return rows;
  }
  public render() {
    const { loading } = this.props;
    if (loading) {
      return (<Wating />);
    }
    return (
      <div className={this.props.className} >
        <Selector options={shiftLabs.optionAreas} currentSelected={this.props.selectArea} onChangeEvent={this.props.onChangeAreaEvent} />
        <AddFormMoal />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>社區</Table.HeaderCell>
              <Table.HeaderCell>地區</Table.HeaderCell>
              <Table.HeaderCell>人數</Table.HeaderCell>
              <Table.HeaderCell>日班時間</Table.HeaderCell>
              <Table.HeaderCell>夜班時間</Table.HeaderCell>
              <Table.HeaderCell>備註</Table.HeaderCell>
              <Table.HeaderCell>動作</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.getLists()}</Table.Body>
        </Table>
      </div>
    );
  }
}
export default connect<FStateProps, DispatchProps>(
  (state: any) => state.fetch,
  Actions
)(ListTable);
