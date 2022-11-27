import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getGroupedRowModel,
  getFacetedUniqueValues,
  ColumnDef,
  PaginationState,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  FilterFn,
  Header as HeaderProps,
} from '@tanstack/react-table';
import Address from '../functional/Address';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import { useMemo, useState } from 'react';
import { Table, Tr, Cell, HeadRow, AddCol, HeaderCell, ImageHover, Header } from './TableStyles';
import { NonVerifiedIcon, RewardIcon, UrlSocialsIcon, VerifiedIcon, WarningIcons } from '../icons/Common';
import { ArrowUp, ArrowDown, FilterIcon } from '../icons/TableIcons';
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import { DetailIcon, WebIcon } from '../icons/Project';
import RewardTable from './RewardTable';
import { Row } from '../format/Row';
import { useTheme } from 'styled-components';
import { SubcatPick } from '../functional/CatPicks';
import { RewardDesc } from '../typography/Descriptions';
import { Project } from '../../types/project';
import { TablePagination } from './TablePagination';
import { filterInputs } from '../../util/constants';
import { ArrElement } from '../../types/common';
import { FilterInput } from './DonationTable';

const PAGE_SIZE = 5;

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends unknown, TValue> {
    filter: ArrElement<typeof filterInputs>;
  }
}

const filterChains: FilterFn<Project> = (row, columnId, value) => row.getValue(columnId).toString().includes(value);

const MyHeader = ({ header }: { header: HeaderProps<Project, unknown> }): JSX.Element => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <HeaderCell>
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanFilter() && (
          <ImageHover onClick={() => setShowFilter(!showFilter)}>
            <FilterIcon height={13} width={13} />
          </ImageHover>
        )}
      </HeaderCell>
      {{
        asc: <ArrowDown height={10} width={10} />,
        desc: <ArrowUp height={10} width={10} />,
      }[header.column.getIsSorted() as string] ?? null}
      {header.column.getCanFilter() && showFilter && <FilterInput column={header.column} />}
    </>
  );
};

const ProjectTable = () => {
  const [sorting, setSorting] = useState([]);
  const [projectId, setProjectId] = useState<string | undefined>();
  const theme = useTheme();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<Project, string>[]>(
    () => [
      {
        header: 'Details',
        columns: [
          {
            accessorKey: 'chainId',
            cell: (props) => <ChainIconComponent ch={props.getValue()} />,
            header: 'Chain',
            enableSorting: false,
            meta: {
              filter: 'select',
            },
            enableColumnFilter: true,
            filterFn: filterChains,
          },
          {
            accessorKey: 'title',
            header: 'Project',
            enableColumnFilter: true,
            enableSorting: false,
          },
          {
            accessorKey: 'owner',
            cell: (props) => (
              <AddCol>
                <Address address={props.getValue()} />
              </AddCol>
            ),
            header: 'Owner',
            enableColumnFilter: true,
            enableSorting: false,
          },
          {
            accessorKey: 'goal',
            cell: (props) => <>${props.getValue()}</>,
            header: 'Goal',
            meta: {
              filter: 'select',
            },
            enableSorting: false,
            filterFn: filterChains,
          },
          {
            accessorKey: 'category',
            cell: (props) => <>{props.getValue()}</>,
            header: 'Category',
            enableSorting: false,
          },
          {
            accessorKey: 'subcategory',
            cell: (props) => <SubcatPick subcat={props.getValue()} />,
            header: 'Area',
            meta: {
              filter: 'select',
            },
            enableSorting: false,
          },
        ],
      },
      {
        header: 'Reference',
        columns: [
          {
            accessorKey: 'urlProject',
            cell: (props) => (
              <>
                {props.getValue() ? (
                  <a href={props.getValue()} rel="noopener noreferrer" target="_blank">
                    <WebIcon color={theme.colors.icon} width={30} />
                  </a>
                ) : (
                  <WarningIcons width={30} />
                )}
              </>
            ),
            header: 'Web',
            enableColumnFilter: false,
            enableSorting: false,
          },
          {
            accessorKey: 'urlSocials',
            cell: (props) => (
              <>
                <a href={props.getValue()} rel="noopener noreferrer" target="_blank">
                  <UrlSocialsIcon colors={theme.colors.icon} width={20} />
                </a>
              </>
            ),
            header: 'Socials',
            enableColumnFilter: false,
            enableSorting: false,
          },
        ],
      },
      {
        accessorKey: 'verified',
        cell: (props) => <>{props.getValue() ? <VerifiedIcon color={theme.colors.icon} width={30} /> : <NonVerifiedIcon width={30} />}</>,
        header: 'Verified',
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        accessorKey: 'objectId',
        cell: (props) => (
          <Row>
            <a href={`/project/${props.getValue()}`} rel="noopener noreferrer" target="_blank">
              <DetailIcon width={20} />
            </a>
            <ImageHover
              onClick={() => {
                console.log('objectId value', props.getValue());
                handleReward(props.getValue());
              }}
            >
              <RewardIcon color={theme.colors.icon} width={20} />
            </ImageHover>
          </Row>
        ),
        header: 'Actions',
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    []
  );
  // Tooltipy + Merge obrázků
  // On click rerender nefunguje

  const handleReward = (id: string) => {
    // TBD musim kliknout dvakrát
    setProjectId(id);
  };

  const { data, isLoading } = useQuery<Project[]>(['projects'], () => UniService.getDataAll('/classes/Project?where={"state": 1}'), {
    onError: (err) => {
      console.log('err', err);
    },
  });

  const { data: projectRewards } = useQuery(
    ['rewards'],
    () => UniService.getDataSingle(`/classes/Reward?where={"project":"${projectId}"}`),
    {
      onError: (err) => {
        console.log('err', err);
      },
      enabled: !!projectId,
    }
  );

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

  return (
    <>
      {isLoading ? (
        <RewardDesc>Loading, server was sleeping...</RewardDesc>
      ) : (
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
          <TablePagination<Project> table={table} />
        </>
      )}
      {projectRewards?.donors && <RewardTable data={projectRewards} donors={projectRewards.donors} />}
    </>
  );
};

export default ProjectTable;
