import styled from 'styled-components';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Address from '../functional/Address';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import {Table, Header, Tr, Cell, HeadRow} from './TableStyles'


const AddCol = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
`;

const streamCol = createColumnHelper();

const columns = [
  streamCol.accessor('projectId', {
    header: () => 'Project',
    cell: (info) => info.row.original.projectId,
  }),
  streamCol.accessor('addressBacker', {
    header: () => <AddCol>Backer</AddCol>,
    cell: (props) => (
      <AddCol>
        <Address address={props.getValue().toLowerCase()} />
      </AddCol>
    ),
  }),
  streamCol.accessor('owner', {
    header: () => <AddCol>Owner</AddCol>,
    cell: (props) => (
      <AddCol>
        <Address address={props.getValue().toLowerCase()} />
      </AddCol>
    ),
  }),
  streamCol.accessor('flowRate', {
    header: () => 'Flow Rate',
    cell: (info) => info.renderValue(),
  }),
  // streamCol.accessor('stream' , {
  //   header: () => 'Stream',
  //   cell: <AddCol><StreamCounter startValue={0} endValue={500000} /></AddCol>,
  // }),
];

const BookmarkTable = () => {

  return (
    <>
      {activeStreams && activeStreams.length > 0 && (
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Header key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </Header>
                ))}
              </Tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Cell>
                ))}
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BookmarkTable;
