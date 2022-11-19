import styled from 'styled-components';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getGroupedRowModel } from '@tanstack/react-table';
import Address from '../functional/Address';
import { useQuery } from '@tanstack/react-query';
import { DapAPIService, UniService } from '../../services/DapAPIService';
import { useState } from 'react';
import { Stream } from '../../types/stream';
import { Project } from '../../types/project';
import { groupStreamWithProject } from '../../util/stream-table';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  border: none;
  text-align: center;
  background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
  box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.85);
  margin-bottom: 2%;
  border: 1px solid grey;
`;
const Header = styled.th`
  border-right: 1px solid grey;
  padding: 1% 16px;
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
  border-right: 1px solid grey;
`;

const AddCol = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
`;

export type GroupedStream = Stream & Pick<Project, 'title' | 'subcategory' | 'chainId'>;

const columns: ColumnDef<GroupedStream, string>[] = [
  {
    header: 'Project',
    columns: [
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'chainId',
        header: 'Chain ID',
      },
      {
        accessorKey: 'subcategory',
        header: 'Category',
      },
    ],
  },
  {
    header: ' ',
    columns: [
      {
        accessorKey: 'addressBacker',
        cell: (props) => (
          <AddCol>
            <Address address={props.getValue()} />
          </AddCol>
        ),
        header: 'Address',
      },
      {
        accessorKey: 'owner',
        cell: (props) => (
          <AddCol>
            <Address address={props.getValue().toLowerCase()} />
          </AddCol>
        ),
        header: 'Owner',
      },
      {
        accessorKey: 'flowRate',
        cell: (props) => (
          <AddCol>
            <Address address={props.getValue().toLowerCase()} />
          </AddCol>
        ),
        header: 'FlowRate',
      },
    ],
  },
  // streamCol.accessor('stream', {
  //   header: () => 'Stream',
  //   cell: (
  //     <AddCol>
  //       <StreamCounter startValue={0} endValue={500000} />
  //     </AddCol>
  //   ),
  // }),
];

const StreamTable = () => {
  const [sorting, setSorting] = useState([]);
  const [data, setData] = useState<GroupedStream[]>([]);

  const { data: activeStreams } = useQuery(['streams'], () => UniService.getDataAll<Stream>('/classes/Stream?where={"isActive": true}'), {
    onError: (err) => {
      console.log('err', err);
    },
    onSuccess: async (streams) => {
      const uniqueProjectIds = [...new Set(streams.map((stream) => stream.project))];
      const projectsDetail = await DapAPIService.getBatchProjectsById(uniqueProjectIds);
      const groupedData = groupStreamWithProject(streams, projectsDetail);

      setData(groupedData);
    },
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    enableGrouping: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  });

  return (
    <>
      {data && data.length > 0 && (
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <HeadRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Header {...{ onClick: header.column.getToggleSortingHandler() }} colSpan={header.colSpan} key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
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

export default StreamTable;
