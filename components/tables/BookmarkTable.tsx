import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getGroupedRowModel, getFacetedUniqueValues } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import { useState, useMemo } from 'react';
import {Table, Header, Tr, Cell, HeadRow, HeaderCell } from './TableStyles';
import {ArrowUp, ArrowDown} from '../icons/TableIcons'
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import { RewardDesc } from '../typography/Descriptions';
import { useAccount } from 'wagmi';
import { MainContainer } from '../format/Box';
import { RowCenter } from '../format/Row';
import {useTheme} from 'styled-components';
import { DetailIcon } from '../icons/Project';
import Bookmark from '../functional/Bookmark';
import TableSkeleton from '../skeletons/TableSkeleton';

const BookmarkTable = () => {
  const [sorting, setSorting] = useState([]);
  const {address} = useAccount(); 
  const theme = useTheme();
  const [marked, setMarked] = useState<boolean>();

  const columns = [
    {
      accessorKey: 'chainId',
      cell: (props) => (
        <ChainIconComponent ch={props.getValue()} />
      ),
      header: <HeaderCell>Chain</HeaderCell>,
    },
    {
      accessorKey: 'title',
      header: 'Project',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'objectId',
      cell: (props) => (
        <>
           <a href={`/project/${props.getValue()}`} rel="noopener noreferrer" target="_blank" ><DetailIcon height={20} width={20}  color={theme.colors.icon}/></a>
        </>
      ),
      header: <HeaderCell>Detail</HeaderCell>,
    },
    {
      accessorKey: 'objectId',
      cell: (props) => (
        <RowCenter>
           <Bookmark objectId={props.getValue()} bookmarks={props.row.original.bookmarks}/>
        </RowCenter>
      ),
      header: <HeaderCell>Unmark</HeaderCell>,
    },
  ]

  const { data, isLoading } = useQuery(['bookmarked-projects'], () => UniService.getDataAll(`/classes/Project?where={"state": 1, "bookmarks": "${address}"}`), {
    onError: (err) => {
      console.log('err', err);
    },
  });

  const table = useReactTable({
    data,
    //@ts-ignore
    columns,
    state: {
      sorting,
    },
    enableGrouping: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return  <MainContainer>
 {isLoading ? <TableSkeleton/> : 
      <>
        {data && data.length > 0 && (
          <Table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <HeadRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Header {...{ onClick: header.column.getToggleSortingHandler() }} colSpan={header.colSpan} key={header.id}>
                    <div> {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</div>
                      {/*@ts-ignore */}
                      {{  asc: <><ArrowDown width={10}/></>, desc: <><ArrowUp width={10}/> </>,  }[header.column.getIsSorted()] ?? null}
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
              <Tr>
                <Cell></Cell>
              </Tr>
            </tbody>
          </Table>
        )}
      </>}
    </MainContainer>
};

export default BookmarkTable;
