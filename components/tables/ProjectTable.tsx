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
import { Table, Tr, Cell, HeadRow, AddCol, HeaderCell, ImageHover, Header, ActionCol, TableWrapper } from './TableStyles';
import { InfoIcon, NonVerifiedIcon, RewardIcon, UrlSocialsIcon, VerifiedIcon } from '../icons/Common';
import { ArrowUp, ArrowDown, FilterIcon, FilterFullIcon } from '../icons/TableIcons';
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import { DetailIcon, WebIcon } from '../icons/Project';
import RewardTable from './RewardTable';
import { Col, BetweenRowSm, RowCenter, Row } from '../format/Row';
import { useTheme } from 'styled-components';
import { SubcatPick } from '../functional/CatPicks';
import TableSkeleton from '../skeletons/TableSkeleton';
import { Project } from '../../types/project';
import { TablePagination } from './TablePagination';
import { filterInputs } from '../../util/constants';
import { ArrElement } from '../../types/common';
import { FilterInput } from './DonationTable';
import BalanceProjectSmall from '../functional/BalanceProjectSmall';
import Tooltip from '../Tooltip';
import IconToggle from '../buttons/IconToggle';
import Toggle from '../form/Toggle'
import { AbsoluteRight } from '../format/Box';

const PAGE_SIZE = 10;

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends unknown, TValue> {
    filter: ArrElement<typeof filterInputs>;
  }
}

const filterChains: FilterFn<Project> = (row, columnId, value) => row.getValue(columnId).toString().includes(value);

const MyHeader = ({ header }: { header: HeaderProps<Project, unknown> }): JSX.Element => {
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

const ProjectTable = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [sorting, setSorting] = useState([]);
  const [projectId, setProjectId] = useState<string | undefined>();
  const theme = useTheme();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleTooltip = (text: string) => {
    setShowTooltip(true);
    setTooltipText(text);
  }


  const columns = useMemo<ColumnDef<Project, string>[]>(
    () => [
      {
        accessorKey: 'chainId',
        cell: (props) => <ChainIconComponent ch={props.getValue()} />,
         //@ts-ignore
        header: <div onMouseEnter={() => { handleTooltip('Supported chains: Polygon, BNB, Optimism, Fantom') }} onMouseLeave={() => { setShowTooltip(false) }}>Ch</div>,
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
        cell: (props) => (
          <RowCenter>
            {props.getValue()}
            <AbsoluteRight>
              {props.row.original.verified && <VerifiedIcon height={15} width={15} color={theme.colors.icon} />}
            </AbsoluteRight>
          </RowCenter>
        ),
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
        accessorKey: 'pid',
        cell: (props) => <BalanceProjectSmall pid={props.getValue()} chainId={props.row.original.chainId} />,
        //@ts-ignore
        header: <Col>
          <div onMouseEnter={() => { handleTooltip('Project goal, d = donated, m = microfunds created') }} onMouseLeave={() => { setShowTooltip(false) }}>Goal</div>
          <BetweenRowSm><div>d</div><div>m</div></BetweenRowSm>
        </Col>,
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'category',
        cell: (props) => <>{props.getValue()}</>,
        header: 'Category',
        enableSorting: false,
        meta: {
          filter: 'select',
        },
      },
      {
        accessorKey: 'subcategory',
        cell: (props) => <SubcatPick width={40} subcat={props.getValue()} />,
        header: 'Area',
        meta: {
          filter: 'select',
        },
        enableSorting: false,
      },
      {
        accessorKey: 'objectId',
        cell: (props) => (
          <RowCenter>
            <a href={`/project/${props.getValue()}`} rel="noopener noreferrer" target="_blank">
              <DetailIcon width={30}  color={theme.colors.icon} height={30} />
            </a>
            <ImageHover
              onClick={() => {handleReward(props.getValue())}}
            >
              <RewardIcon height={30} color={theme.colors.icon} width={20} />
            </ImageHover>
            <a href={props.row.original.urlProject} rel="noopener noreferrer" target="_blank">
              <WebIcon color={theme.colors.icon} width={30} height={30}/>
            </a>
            <a href={props.row.original.urlSocials} rel="noopener noreferrer" target="_blank">
              <UrlSocialsIcon color={theme.colors.icon} height={30} width={30} />
            </a>
          </RowCenter>
        ),
         //@ts-ignore
        header: <ActionCol onMouseEnter={() => { handleTooltip('Project detail, Reward list, Website, Socials') }} onMouseLeave={() => { setShowTooltip(false) }}>
                      Actions <ImageHover><InfoIcon  width={15} color={theme.colors.icon} /></ImageHover>
                </ActionCol>,
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    []
  );

  const { data, isLoading } = useQuery<Project[]>(['projects'], () => UniService.getDataAll(`/classes/Project?where={"state": 1, "type": "Standard"}`), {
    onError: (err) => {
      console.log('err', err);
    }
  });

  const { data: projectRewards } = useQuery(
    ['rewards', projectId],
    () => UniService.getDataAll(`/classes/Reward?where={"project":"${projectId}"}`),
    {
      onError: (err) => {
        console.log('err', err);
      },
      enabled: !!projectId,
    }
  );

  const handleReward = (id: string) => {
    setProjectId(id);
  };

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
    <TableWrapper>
      {isLoading ? (
        <TableSkeleton/>
      ) : (
        <Col>
          {showTooltip && <Tooltip margin={undefined} text={tooltipText} />}
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
        </Col>
      )}
      {projectRewards && <RewardTable data={projectRewards}  projectId={projectId} />}
    </TableWrapper>
  );
};

export default ProjectTable;
