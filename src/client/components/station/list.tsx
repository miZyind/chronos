import React, { Component } from 'react';
import { connect } from 'react-redux';
import Selector from '@components/selector';
import AddFormMoal from '@components/station/add';
import EditFormMoal from '@components/station/edit';
import { Table, Button, Icon, Message } from 'semantic-ui-react';
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

const optionAreas = [
  { title: '全部', key: 'all' },
  { title: '北區', key: '北區' },
  { title: '中區', key: '中區' },
  { title: '南區', key: '南區' },
  { title: '東區', key: '東區' },
];

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
          rows.push(
            <Table.Row key={`st-${area}-${i.id}`}>
              <Table.Cell>{i.id}</Table.Cell>
              <Table.Cell>{i.name}</Table.Cell>
              <Table.Cell>{i.mobileNumber}</Table.Cell>
              <Table.Cell>{i.area}</Table.Cell>
              <Table.Cell>{i.stableNumber}</Table.Cell>
              <Table.Cell>{i.desc}</Table.Cell>
              <Table.Cell selectable>
                <EditFormMoal
                  editId={i.id}
                  editName={i.name}
                  editMobile={i.mobileNumber}
                  editArea={i.area}
                  editStable={i.stableNumber}
                  editDesc={i.desc}
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
      return (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Loading</Message.Header>
          </Message.Content>
        </Message>
      );
    }
    return (
      <div className={this.props.className} >
        <Selector options={optionAreas} currentSelected={this.props.selectArea} onChangeEvent={this.props.onChangeAreaEvent} />
        <AddFormMoal />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>社區</Table.HeaderCell>
              <Table.HeaderCell>電話</Table.HeaderCell>
              <Table.HeaderCell>地區</Table.HeaderCell>
              <Table.HeaderCell>人數</Table.HeaderCell>
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
