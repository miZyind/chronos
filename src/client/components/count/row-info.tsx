import React from 'react';
import { Table } from 'semantic-ui-react';

type infoRowProps = {
  id: any,
};

const infoRow = ({ id }: infoRowProps) => (
  <Table.Row >
    <Table.Cell>{id.stationName}</Table.Cell>
    <Table.Cell>{id.type}</Table.Cell>
    <Table.Cell>{id.dayCount}</Table.Cell>
    <Table.Cell>{id.nightCount}</Table.Cell>
    <Table.Cell>{id.coverCount}</Table.Cell>
  </Table.Row>
);

export default infoRow;
