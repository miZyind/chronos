import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

type listRowProps = {
  worker: any,
  editBtnEvent: any,
  deleteBtnEvent: any
};

const listRow = ({ worker, editBtnEvent, deleteBtnEvent }: listRowProps) => (
  <Table.Row key={`worker-${worker.id}`}>
    <Table.Cell>{worker.id}</Table.Cell>
    <Table.Cell>{worker.name}</Table.Cell>
    <Table.Cell>{worker.mobile}</Table.Cell>
    <Table.Cell selectable>
      <Button icon onClick={editBtnEvent}><Icon name='compose' /></Button>
      <Button icon onClick={deleteBtnEvent}> <Icon name='trash' /></Button>
    </Table.Cell>
  </Table.Row>
);
export default listRow;
