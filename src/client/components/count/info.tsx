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
    // Object.keys(countByWorkerListItems.nomal).map((id: any) => {
    //   // tslint:disable-next-line:no-string-literal
    //   // const getItemName = countByWorkerListItems[id].workerName;
    //   // let dayCount = 0;
    //   // let nightCount = 0;
    //   // let dayoffCount = 0;
    //   // console.log(Object.keys(countListItems[id].nomal));
    //   // if (countListItems[id].nomal) {
    //   //   const getNomal = countListItems[id].nomal;
    //   //   Object.keys(getNomal).map((k: any) => {
    //   //     dayCount += parseInt(getNomal[k].totalDayHours);
    //   //     nightCount += parseInt(getNomal[k].totalNightHours);
    //   //   });
    //   // }
    //   // if (countListItems[id].cover) {
    //   //   const getCover = countListItems[id].cover;
    //   //   Object.keys(getCover).map(() => {
    //   //     dayoffCount++;
    //   //   });
    //   // }
    //   rows.push(
    //     <Table.Row key={`worker-${id}}`}>
    //       <Table.Cell>{id}</Table.Cell>
    //       <Table.Cell>{countByWorkerListItems.nomal[id].totalDays}</Table.Cell>
    //       <Table.Cell>{countByWorkerListItems.nomal[id].totalDays}</Table.Cell>
    //     </Table.Row>);
    // });
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
                  <Table.HeaderCell>日班天數</Table.HeaderCell>
                  <Table.HeaderCell>夜班天數</Table.HeaderCell>
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
