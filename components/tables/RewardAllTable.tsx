import { useMemo, useState } from 'react';
import { Table, Header, Tr, Cell, HeadRow, PaginationContainer, ImageHover, AddCol, HeaderCell, MyInput } from './TableStyles';
import { ExplorerReference } from '../../helpers/MultichainHelpers';
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
import { Row, RowCenter } from '../format/Row';
import Address from '../functional/Address';
import { TablePagination } from './TablePagination';
import { filterInputs } from '../../util/constants';
import { ArrElement } from '../../types/common';
import ProjectStats from '../functional/ProjectStats';
import { XIcon } from '../icons/Project';
import {useTheme} from 'styled-components';
import TokenStats from '../functional/TokenStats';

interface ITable {
  data: any;
}

interface RewardTableProps {
  amount: number;
  owner: string;
  tokenContract: string;
  date: string;
  rewardType: number;
  fund_id: number;
  txn_hash: string;
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends unknown, TValue> {
    filter: ArrElement<typeof filterInputs>;
  }
}
const PAGE_SIZE = 5;

export const FilterInput = <T,>({ column }: { column: Column<T> }) => {
  const columnFilterValue = column.getFilterValue() as string | number;
  const isSelectInput = column.columnDef.meta?.filter === 'select';
  // TBD tooltips
  const uniqueValues = useMemo(() => {
    let uniqueValues = Array.from(column.getFacetedUniqueValues().keys());

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

const RewardAllTable = ({ data }: ITable): JSX.Element => {
  const [sorting, setSorting] = useState([]);
  const [backerFilter, setBackerFilter] = useState<boolean>(false);
  const theme = useTheme()

    // Missing project reference
  const columns: ColumnDef<RewardTableProps, string>[] = [
    {
       //@ts-ignore
      header: (
        <HeaderCell>
          Project 
        </HeaderCell>
      ),
      accessorKey: 'fund_id',
       //@ts-ignore
      cell: (props) => <ProjectStats fund={props.row.original.fund_id} chain={props.row.original.chain}/>,
      enableSorting: false,
    },
    {
       //@ts-ignore
      header: (
        <RowCenter
          onClick={() => {
            setBackerFilter(!backerFilter);
          }}
        >
          Owner{' '}
          <ImageHover>
            <FilterIcon width={13} height={13} color={theme.colors.icon}/>
          </ImageHover>
        </RowCenter>
      ),
      accessorKey: 'owner',
      cell: (props) => (
        <AddCol>
          <Address address={props.getValue()}/>
        </AddCol>
      ),
      enableSorting: false,
    },
    {
       //@ts-ignore
      header: (
        <RowCenter
          onClick={() => {
            setBackerFilter(!backerFilter);
          }}
        >
          Token{' '}
          <ImageHover>
            <FilterIcon width={13} height={13} color={theme.colors.icon} />
          </ImageHover>
        </RowCenter>
      ),
      // Token component - Number, Amount, Address
      accessorKey: 'tokenContract',
      cell: (props) => (
        <>
         {props.row.original.tokenContract !== '0x0000000000000000000000000000000000000000' 
         ?  <TokenStats address={props.row.original.tokenContract} amount={props.row.original.amount} name={undefined}  /> 
         : <XIcon width={30} height={30} color={'#FF4D4D'}/>}
        </>
      ),
      enableSorting: false,
    },
    {
       //@ts-ignore
      header: (
        <HeaderCell>
          Type 
        </HeaderCell>
      ),
      accessorKey: 'rewardType',
      cell: (props) => <>
        {props.row.original.rewardType == 0 && 'Classic'}
        {props.row.original.rewardType == 1 && 'ERC20'}
        {props.row.original.rewardType == 2 && 'NFT'}
      </>,
      enableSorting: true,
      enableColumnFilter: false,
    },
    {
       //@ts-ignore
      header: (
        <HeaderCell>
          Tx
        </HeaderCell>
      ),
      accessorKey: 'txn_hash',
       //@ts-ignore
      cell: (props) => <ExplorerReference ch={props.cell.row.original.chain} tx={props.getValue()} />,
      enableSorting: false,
      enableColumnFilter: false,
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
                    <>{backerFilter && <FilterInput<RewardTableProps> column={header.column} />}</>
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

export default RewardAllTable;
