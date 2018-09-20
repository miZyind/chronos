import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Modal, Table, Icon } from 'semantic-ui-react';
import { Actions } from '@actions/main';
import { IStore } from '../../models';
import 'rc-time-picker/assets/index.css';
import * as service from '../../services';

type InfoProps = {
  className?: string;
  getWorkerId: string;
};
const formPropos = {
  title: '詳細時數(建構中)'
};
const backdropStyle = {
  marginTop: '0px !important',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: 50
};

type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = InfoProps & StateProps & DispatchProps;

class Info extends Component<Props> {

  public state = {
    open: false,
    dimmer: true,
    closeondocument: false,
    closeondimmer: false,
  };
  constructor(prop: Props) {
    super(prop);
  }
  public show = (dimmer: boolean) => () => {
    this.fetchOneCount();
    this.setState({ dimmer, open: true });
  }
  public close = () => this.setState({ open: false });

  public fetchOneCount() {
    const obj: object = {
      'year': this.props.main.getSelectYear,
      'month': this.props.main.getSelectMonth,
      'worker': this.props.getWorkerId
    };
    service.getCountByWorker(obj)
      .then((response: any) => {
        this.props.fetchGetDataSuccess({ 'type': 'countListByWorker', 'data': response });
        console.log(this.props.fetch.countByWorkerListItems);
      }, (error) => {
        this.props.fetchFailure(error);
      });
  }
  public getLists() {
    const { countByWorkerListItems } = this.props.fetch;
    console.log(countByWorkerListItems);
    const rows: JSX.Element[] = [];
    if (countByWorkerListItems && countByWorkerListItems.length > 0) {
      countByWorkerListItems.map((id: any, key: number) => {
        rows.push(
          <Table.Row key={`worker-${key}}`}>
            <Table.Cell>{id.stationName}</Table.Cell>
            <Table.Cell>{id.type}</Table.Cell>
            <Table.Cell>{id.dayCount}</Table.Cell>
            <Table.Cell>{id.nightCount}</Table.Cell>
            <Table.Cell>{id.coverCount}</Table.Cell>
          </Table.Row>);
      });
    }
    return rows;
  }
  public render() {
    const {open, dimmer, closeondocument, closeondimmer} = this.state;
    const button = <Button onClick={this.show(true)} icon><Icon name='compose' /></Button>;
    return (
      <Modal
        closeOnDimmerClick={closeondimmer}
        closeOnDocumentClick={closeondocument}
        dimmer={dimmer}
        onClose={this.close}
        open={open}
        className={this.props.className}
        style={backdropStyle}
        trigger={button}
      >
        <Modal.Content image scrolling>
          <Modal.Description>
            <Header>{formPropos.title}</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>社區</Table.HeaderCell>
                  <Table.HeaderCell>上班型態</Table.HeaderCell>
                  <Table.HeaderCell>日班天數</Table.HeaderCell>
                  <Table.HeaderCell>夜班天數</Table.HeaderCell>
                  <Table.HeaderCell>代班天數</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.getLists()}</Table.Body>
            </Table>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.close}>關閉</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect<StateProps, DispatchProps>(
  (state: any) => state,
  Actions
)(Info);
