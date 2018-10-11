import React from 'react';
import { Table, Button } from 'semantic-ui-react';

type listRowProps = {
  worker: any,
  btnEvent: any
};
const nameProps = {
  btnTitle: '點我查看詳細',
};

const listRow = ({ worker, btnEvent }: listRowProps) => (
  <Table.Row key={`worker-${worker.workerId}`}>
    <Table.Cell>{worker.workerId}</Table.Cell>
    <Table.Cell>{worker.workerName}</Table.Cell>
    <Table.Cell>{worker.dayCount}</Table.Cell>
    <Table.Cell>{worker.nightCount}</Table.Cell>
    <Table.Cell>{worker.coverCount}</Table.Cell>
    <Table.Cell><Button onClick={btnEvent}>{nameProps.btnTitle}</Button></Table.Cell>
  </Table.Row>
);
export default listRow;
