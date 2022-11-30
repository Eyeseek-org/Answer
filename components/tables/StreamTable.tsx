import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getGroupedRowModel } from '@tanstack/react-table';
import Address from '../functional/Address';
import { useQuery } from '@tanstack/react-query';
import { DapAPIService, UniService } from '../../services/DapAPIService';
import { useState } from 'react';
import { Stream } from '../../types/stream';
import { Project } from '../../types/project';
import { groupStreamWithProject } from '../../util/stream-table';
import {Table, Header, Tr, Cell, HeadRow, AddCol, HeaderCell } from './TableStyles';
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import { DetailIcon } from '../icons/Project';
import { SubcatPick } from '../functional/CatPicks';
import SuperBalance from '../functional/SuperBalance';
import {useTheme} from 'styled-components'

export type GroupedStream = Stream & Pick<Project, 'title' | 'subcategory' | 'chainId'>;

const columns: ColumnDef<GroupedStream, string>[] = [

  {
    header: 'Project',
    columns: [
      {
        accessorKey: 'chainId',
        cell: (props) => (
          <ChainIconComponent ch={props.getValue()} />
        ),
        header: 'Chain',
      },
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'subcategory',
        cell: (props) => (
          <>
           <SubcatPick subcat={props.getValue()}/>  
          </>
        ),
         // @ts-ignore
        header: <HeaderCell>Area</HeaderCell>,
      },
      {
        accessorKey: 'projectId',
        cell: (props) => (
          // @ts-ignore
          <a href={`/project/${props.getValue()}`} rel="noopener noreferrer" target="_blank" ><DetailIcon width={20}  color={theme.colors.icon}/></a>
        ),
        header: 'Detail',
      },
      {
        accessorKey: 'chainId',
        cell: (props) => (
          <SuperBalance chain={props.getValue()} address={'0xa0a39c5823A51184043655711C8157ef4826447a'} />
        ),
        header: 'wBalance',
      },
    ],
  },
  {
    header: 'Streams',
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
        header: 'Creator',
      },
      {
        accessorKey: 'flowRate',
        cell: (props) => (
          <>
            {props.getValue()}
          </>
        ),
        header: 'Rate /mo',
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
  const theme = useTheme();

  const { data: activeStreams } = useQuery(['streams'], () => UniService.getDataAll<Stream>('/classes/Stream?where={"isActive": true}'), {
    onError: (err) => {
      console.log('err', err);
    },
    onSuccess: async (streams) => {
      const uniqueProjectIds = [...new Set(streams.map((stream) => stream.projectId))];
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
      {activeStreams && activeStreams.length > 0 && (
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

export default StreamTable;
