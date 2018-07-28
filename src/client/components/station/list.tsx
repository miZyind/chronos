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
        this.props.fetchGetDataSuccess(response);
      }, (error) => {
        this.props.fetchFailure(error);
      });
  }
  public deleteStation(getId: any) {
    this.props.fetchBegin();
    const obj: object = { 'id': getId };
    console.log(obj);
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
    const { items } = this.props;
    const rows: JSX.Element[] = [];
    Object.keys(items).map((area: any) => {
      const getArea = items[area];
      Object.keys(getArea).map((id: any) => {
        rows.push(
          <Table.Row key={`${area}-${id}`}>
            <Table.Cell>{getArea[id].id}</Table.Cell>
            <Table.Cell>{getArea[id].name}</Table.Cell>
            <Table.Cell>{getArea[id].mobileNumber}</Table.Cell>
            <Table.Cell>{getArea[id].area}</Table.Cell>
            <Table.Cell>{getArea[id].stableNumber}</Table.Cell>
            <Table.Cell>{getArea[id].desc}</Table.Cell>
            <Table.Cell selectable>
              <EditFormMoal
                editId={getArea[id].id}
                editName={getArea[id].name}
                editMobile={getArea[id].mobileNumber}
                editArea={getArea[id].area}
                editStable={getArea[id].stableNumber}
                editDesc={getArea[id].desc}
              />
              <Button icon onClick={this.deleteStation.bind(this, getArea[id].id)}> <Icon name='trash' /></Button>
            </Table.Cell>
          </Table.Row>
        );
      }
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
