import { useMemo, useState } from 'react';
import { Table, Header, Tr, Cell, HeadRow, PaginationContainer, ImageHover, AddCol, HeaderCell, MyInput } from './TableStyles';
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
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, FilterIcon } from '../icons/TableIcons';
import { RowCenter } from '../format/Row';
import Address from '../functional/Address';
import { TablePagination } from './TablePagination';
import { filterInputs } from '../../util/constants';
import { ArrElement } from '../../types/common';

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

export const FilterInput = <T,>({ column }: { column: Column<T> }) => {
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
      <option value="" selected>
        All
      </option>
      {uniqueValues.map((value) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  ) : (
    <MyInput value={columnFilterValue ?? ''} onChange={(e) => column.setFilterValue(e.target.value)} />
  );
};

const TransactionTable = ({ data }: ITransactionTable): JSX.Element => {
  const [sorting, setSorting] = useState([]);
  const [backerFilter, setBackerFilter] = useState<boolean>(false);

  const columns: ColumnDef<TransactionTableProps, string>[] = [
    {
      header: (
        <RowCenter
          onClick={() => {
            setBackerFilter(!backerFilter);
          }}
        >
          Chain{' '}
          <ImageHover>
            <FilterIcon width={13} />
          </ImageHover>
        </RowCenter>
      ),
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
      header: (
        <RowCenter
          onClick={() => {
            setBackerFilter(!backerFilter);
          }}
        >
          Backer{' '}
          <ImageHover>
            <FilterIcon width={13} />
          </ImageHover>
        </RowCenter>
      ),
      accessorKey: 'backer',
      cell: (props) => (
        <AddCol>
          <Address address={props.getValue()} />
        </AddCol>
      ),
      enableSorting: false,
    },
    {
      header: (
        <HeaderCell
          onClick={() => {
            setBackerFilter(!backerFilter);
          }}
        >
          Amount {backerFilter ? <ArrowDown width={13} /> : <ArrowUp width={13} />}
        </HeaderCell>
      ),
      accessorKey: 'amount',
      cell: (props) => <>${props.getValue() / 1000000}</>,
      enableSorting: true,
      enableColumnFilter: false,
    },
    {
      header: (
        <RowCenter
          onClick={() => {
            setBackerFilter(!backerFilter);
          }}
        >
          Token{' '}
          <ImageHover>
            <FilterIcon width={13} />
          </ImageHover>
        </RowCenter>
      ),
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
      header: (
        <HeaderCell
          onClick={() => {
            setBackerFilter(!backerFilter);
          }}
        >
          Drained {backerFilter ? <ArrowDown width={13} /> : <ArrowUp width={13} />}
        </HeaderCell>
      ),
      enableColumnFilter: false,
      cell: (props) => <>{props.getValue() / 1000000}</>,
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
                    asc: <></>,
                    desc: <></>,
                  }[header.column.getIsSorted() as string] ?? null}
                  {header.column.getCanFilter() ? (
                    <>{backerFilter && <FilterInput<TransactionTableProps> column={header.column} />}</>
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
      <TablePagination table={table} />
    </>
  );
};

export default TransactionTable;
