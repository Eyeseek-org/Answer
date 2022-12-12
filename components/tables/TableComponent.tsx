import {useState} from 'react'
import { ColumnFiltersState, FilterFn, flexRender, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, Header as HeaderProps, PaginationState, useReactTable } from "@tanstack/react-table"
import { PAGE_SIZE } from "../../helpers/TableHelpers";
import { Project } from "../../types/project";
import { Reward } from "../../types/reward";
import { Stream } from "../../types/stream";
import HeaderComponent from "./HeaderComponent";
import { TablePagination } from "./TablePagination";
import { Cell, Header, HeadRow, Table, Tr } from "./TableStyles"
import { Transaction } from '../../types/transaction';
import { Microfund } from '../../types/microfund';

const ProjectHeader = ({ header }: { header: HeaderProps<Project, unknown> }): JSX.Element => {
    return <HeaderComponent header={header}/>
  };

const RewardHeader = ({ header }: { header: HeaderProps<Reward, unknown> }): JSX.Element => {
    return <HeaderComponent header={header}/>
  };

const StreamHeader = ({ header }: { header: HeaderProps<Stream, unknown> }): JSX.Element => {
    return <HeaderComponent header={header}/>
  };

const TransactionHeader = ({ header }: { header: HeaderProps<Transaction, unknown> }): JSX.Element => {
    return <HeaderComponent header={header}/>
};

const MicrofundHeader = ({ header }: { header: HeaderProps<Microfund, unknown> }): JSX.Element => {
  return <HeaderComponent header={header}/>
};

  
const filterChains: FilterFn<Project> = (row, columnId, value) => row.getValue(columnId).toString().includes(value);

  

const TableComponent = ({type, columns, data}) => {
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: PAGE_SIZE,
      });
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
          sorting,
          pagination,
          columnFilters,
        },
        filterFns: {
          chains: filterChains,
        },
        enableGrouping: true,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getPaginationRowModel: getPaginationRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        onPaginationChange: setPagination,
      });

      
    return  <><Table>
    <thead>
      {table && table.getHeaderGroups().map((headerGroup) => (
        <HeadRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Header {...{ onClick: header.column.getToggleSortingHandler() }} colSpan={header.colSpan} key={header.id}>
              {/*//@ts-ignore */}
              {type === 'project' && <ProjectHeader header={header} />}
              {/*//@ts-ignore */}
              {type === 'reward' && <RewardHeader header={header} />}
              {/*//@ts-ignore */}
              {type === 'stream' && <StreamHeader header={header} />}
              {/*//@ts-ignore */}
              {type === 'transactions' && <TransactionHeader header={header} />}
              {/*//@ts-ignore */}
              {type === 'microfund' && <MicrofundHeader header={header} />}
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
}

export default TableComponent