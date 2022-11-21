import styled from 'styled-components';
import { useState } from 'react';
import { Table, Header, Tr, Cell, HeadRow } from './TableStyles';
import { ChainIconComponent, ExplorerReference } from '../../helpers/MultichainHelpers';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

interface ITransactionTable {
  data: any;
}

interface TransactionTableProps {
  amount: number;
  backer: string;
  chain: number;
  currency_id: number;
  date: string;
  drained: number;
  fund_id: number;
  txn_hash: string;
}

const TransactionTable = ({ data }: ITransactionTable): JSX.Element => {
  const [sorting, setSorting] = useState([]);

  const columns: ColumnDef<TransactionTableProps, string>[] = [
    {
      header: 'Chain',
      accessorKey: 'chain',
      enableSorting: false,
      cell: (props) => {
        return <ChainIconComponent ch={props.getValue()} />;
      },
    },
    {
      header: 'Backer',
      accessorKey: 'backer',
      enableSorting: false,
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      enableSorting: true,
    },
    {
      header: 'Currect Id',
      accessorKey: 'currency_id',
    },
    {
      header: 'Date',
      accessorKey: 'date',
    },
    {
      header: 'Drained',
      accessorKey: 'drained',
    },
    {
      header: ' ',
      accessorKey: 'txn_hash',
      cell: (props) => <ExplorerReference ch={props.cell.row.original.chain} tx={props.getValue()} />,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
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
    </>
  );
};

export default TransactionTable;
