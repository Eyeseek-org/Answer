import { useMemo, useState } from 'react';
import { Table, Header, Tr, Cell, HeadRow, PaginationContainer } from './TableStyles';
import { ChainIconComponent, ExplorerReference } from '../../helpers/MultichainHelpers';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  useReactTable,
} from '@tanstack/react-table';

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

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;

const filterInputs = ['select'] as const;

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends unknown, TValue> {
    filter: ArrElement<typeof filterInputs>;
  }
}
// TODO: move it shared folder once we have more detail about currencies on blockchain
const currenciesIdMapping = {
  1: 'USDC',
  2: 'USDT',
  3: 'DAI',
};

const PAGE_SIZE = 5;

const FilterInput = ({ column }: { column: Column<TransactionTableProps> }) => {
  const columnFilterValue = column.getFilterValue() as string | number;

  const isSelectInput = column.columnDef.meta?.filter === 'select';

  const uniqueValues = useMemo(() => {
    let uniqueValues = Array.from(column.getFacetedUniqueValues().keys());

    if (column.id === 'currency_id') {
      uniqueValues = uniqueValues.map((currency) => currenciesIdMapping[currency]);
    }

    return uniqueValues;
  }, [column.getFacetedUniqueValues]);

  return isSelectInput ? (
    <select onChange={(e) => column.setFilterValue(e.target.value)}>
      {uniqueValues.map((value) => (
        <option>{value}</option>
      ))}
    </select>
  ) : (
    <input value={columnFilterValue ?? ''} onChange={(e) => column.setFilterValue(e.target.value)} />
  );
};

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
      enableColumnFilter: true,
      meta: {
        filter: 'select',
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
      enableColumnFilter: false,
    },
    {
      header: 'Currency Id',
      enableColumnFilter: true,
      accessorKey: 'currency_id',
      meta: {
        filter: 'select',
      },
      enableSorting: false,
      cell: (props) => currenciesIdMapping[props.getValue()],
    },
    {
      header: 'Date',
      enableColumnFilter: false,
      accessorKey: 'date',
    },
    {
      header: 'Drained',
      enableColumnFilter: false,
      accessorKey: 'drained',
    },
    {
      header: ' ',
      accessorKey: 'txn_hash',
      enableColumnFilter: false,
      cell: (props) => <ExplorerReference ch={props.cell.row.original.chain} tx={props.getValue()} />,
      enableSorting: false,
    },
  ];
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
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
                  {header.column.getCanFilter() ? (
                    <div>
                      <FilterInput column={header.column} />
                    </div>
                  ) : null}
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
      {/* Pagination */}
      <PaginationContainer>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {'<'}
        </button>
        <div>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </div>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
      </PaginationContainer>
    </>
  );
};

export default TransactionTable;
