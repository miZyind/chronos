import React, { Component } from 'react';
import { Button, Header, Modal, Table } from 'semantic-ui-react';
import Row from './row-info';
import styled from 'styled-components';

const nameProps = {
  moadTitle: '詳細時數',
  tbHdCell1: '社區',
  tbHdCell2: '上班型態',
  tbHdCell3: '日班天數',
  tbHdCell4: '夜班天數',
  tbHdCell5: '代班天數',
  closeBtn: '關閉'
};

type InfoProps = {
  className?: string;
  isLoaded: boolean;
  open: boolean;
  closeEvent: any;
  countByWorkerListItems: any;
};

class Info extends Component<InfoProps> {
  public render() {
    const { className, open, isLoaded, countByWorkerListItems } = this.props;
    const { moadTitle, tbHdCell1, tbHdCell2, tbHdCell3, tbHdCell4, tbHdCell5, closeBtn } = nameProps;
    return (
      <Modal
        open={open}
        className={className}
      >
        <Modal.Content image scrolling>
          <Modal.Description>
            <Header>{moadTitle}</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>{tbHdCell1}</Table.HeaderCell>
                  <Table.HeaderCell>{tbHdCell2}</Table.HeaderCell>
                  <Table.HeaderCell>{tbHdCell3}</Table.HeaderCell>
                  <Table.HeaderCell>{tbHdCell4}</Table.HeaderCell>
                  <Table.HeaderCell>{tbHdCell5}</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{isLoaded && countByWorkerListItems.map((id: string, key: number) => <Row key={key} id={id} />)}</Table.Body>
            </Table>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.props.closeEvent}>{closeBtn}</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const StyledInfoModal = styled(Info) `
  &&&& {
    margin-top: 0px !important;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(0,0,0,0.3);
    padding: 50px;
  }
`;

export default StyledInfoModal;
