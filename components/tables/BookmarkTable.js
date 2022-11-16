import styled from 'styled-components';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Address from '../functional/Address';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  border: none;
  text-align: center;
  background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
  box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.85);
  margin-bottom: 2%;
`;
const Header = styled.th`
  border: none;
  padding: 1%;
  font-family: 'Roboto';
`;
const Row = styled.tr`
  padding: 1%;
  border-bottom: 1px solid grey;
  transition: 0.1s;
  &:hover {
    background: rgba(56, 56, 56, 0.4);
  }
`;

const HeadRow = styled(Row)`
  &:hover {
    background: transparent;
  }
`;
const Cell = styled.td`
  padding: 2px;
  font-family: 'Neucha';
`;

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
              <HeadRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Header key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </Header>
                ))}
              </HeadRow>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Cell>
                ))}
              </Row>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BookmarkTable;
