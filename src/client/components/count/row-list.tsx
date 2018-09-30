import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

type listRowProps = {
  worker: any,
  btnEvent: any
};

const listRow = ({ worker, btnEvent }: listRowProps) => (
  <Table.Row key={`worker-${worker.workerId}`}>
    <Table.Cell>{worker.workerId}</Table.Cell>
    <Table.Cell>{worker.workerName}</Table.Cell>
    <Table.Cell>{worker.dayCount}</Table.Cell>
    <Table.Cell>{worker.nightCount}</Table.Cell>
    <Table.Cell>{worker.coverCount}</Table.Cell>
    <Table.Cell><Button onClick={btnEvent}><Icon name='compose' /></Button></Table.Cell>
  </Table.Row>
);
export default listRow;
