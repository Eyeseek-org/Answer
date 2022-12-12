import { useMemo, useState } from 'react';
import { Table, Header, Tr, Cell, HeadRow, ImageHover, AddCol, HeaderCell, MyInput } from './TableStyles';
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
  Header as HeaderProps,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, FilterFullIcon, FilterIcon } from '../icons/TableIcons';
import { RowCenter } from '../format/Row';
import Address from '../functional/Address';
import { TablePagination } from './TablePagination';
import { filterInputs } from '../../util/constants';
import { ArrElement } from '../../types/common';
import ProjectStats from '../functional/ProjectStats';
import { XIcon } from '../icons/Project';
import {useTheme} from 'styled-components';
import TokenStats from '../functional/TokenStats';
import IconToggle from '../buttons/IconToggle';
import { Reward } from '../../types/reward';

interface ITable {
  data: any;
}


declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends unknown, TValue> {
    filter: ArrElement<typeof filterInputs>;
  }
}
const PAGE_SIZE = 10;

const MyHeader = ({ header }: { header: HeaderProps<Reward, unknown> }): JSX.Element => {
  const [showFilter, setShowFilter] = useState(false);
  const theme = useTheme();

  return (
    <>
      <HeaderCell>
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanFilter() && (
          <ImageHover onClick={() => setShowFilter(!showFilter)}>
              <IconToggle icon={<FilterIcon height={13} width={13} color={theme.colors.icon}/>} toggleIcon={<FilterFullIcon height={13} width={13} color={theme.colors.icon}/>} />
          </ImageHover>
        )}
          {{
        asc: <ArrowDown height={10} width={10} />,
        desc: <ArrowUp height={10} width={10} />,
      }[header.column.getIsSorted() as string] ?? null}
      {header.column.getCanFilter() && showFilter && <FilterInput column={header.column} />}
      </HeaderCell>

    </>
  );
};

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

  const columns = useMemo<ColumnDef<Reward, string>[]>(
    () => [
      {
         //@ts-ignore
        header: (
          <HeaderCell 
              onClick={() => {
                setBackerFilter(!backerFilter);
              }}>
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
            Owner
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
            Token
          </RowCenter>
        ),
        // Token component - Number, Amount, Address
        accessorKey: 'tokenContract',
        cell: (props) => (
          <>
           {props.row.original.tokenAddress !== '0x0000000000000000000000000000000000000000' 
           ?  <TokenStats address={props.row.original.tokenAddress} amount={props.row.original.tokenAmount} name={undefined}  /> 
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
          {props.row.original.rType == 0 && 'Classic'}
          {props.row.original.rType == 1 && 'ERC20'}
          {props.row.original.rType == 2 && 'NFT'}
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
    ],
    []
  );

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
                      <MyHeader header={header} />
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
