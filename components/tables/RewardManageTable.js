import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getGroupedRowModel, getFacetedUniqueValues } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import { useState, useMemo } from 'react';
import {Table, Header, Tr, Cell, HeadRow, AddCol, HeaderCell } from './TableStyles';
import {ArrowUp, ArrowDown} from '../icons/TableIcons'

const RewardManageTable = ({rewardId}) => {
  const [sorting, setSorting] = useState([]);

  const columns = [
    {
      accessorKey: 'title',
      header: 'Backer',
    },
  ]
  
  const { data } = useQuery(['rewards'], () => UniService.getDataSingle(`/classes/Reward?where={"_id": "${rewardId}"}`), {
    onError: (err) => {
      console.log('err', err);
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
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return  <>
      {data && data.length > 0 ? 
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <HeadRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Header {...{ onClick: header.column.getToggleSortingHandler() }} colSpan={header.colSpan} key={header.id}>
                   <div> {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</div>
                    {{
                      asc: <><ArrowDown width={10}/></>,
                      desc: <><ArrowUp width={10}/> </>,
                    }[header.column.getIsSorted()] ?? null}
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
        </Table> : <>No backers found</>
      }
    </>
};

export default RewardManageTable;
