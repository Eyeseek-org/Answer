import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getGroupedRowModel, getFacetedUniqueValues } from '@tanstack/react-table';
import Address from '../functional/Address';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import { useState, useMemo } from 'react';
import {Table, Header, Tr, Cell, HeadRow, AddCol, HeaderCell, ImageHover } from './TableStyles';
import { NonVerifiedIcon, RewardIcon, UrlSocialsIcon, VerifiedIcon } from '../icons/Common';
import {ArrowUp, ArrowDown} from '../icons/TableIcons'
import Tooltip from '../Tooltip';
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import { ProjectActiveIcon } from '../icons/Project';
import RewardTable from './RewardTable';
import { Row } from '../format/Row';

const ProjectTable = () => {
  const [sorting, setSorting] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [projectId, setProjectId] = useState(null)

  const columns = [
    {
      accessorKey: 'title',
      header: 'Project',
    },
    {
      accessorKey: 'owner',
      cell: (props) => (
        <AddCol>
          <Address address={props.getValue()} />
        </AddCol>
      ),
      header: <HeaderCell>Owner</HeaderCell>,
    },
    {
        accessorKey: 'goal',
        cell: (props) => (
          <>
           {props.getValue()}
          </>
        ),
        header: <HeaderCell>Goal</HeaderCell>,
      },
    {
      accessorKey: 'category',
      cell: (props) => (
        <>
         {props.getValue()}
        </>
      ),
      header: <HeaderCell>Category</HeaderCell>,
    },
    {
      accessorKey: 'subcategory',
      cell: (props) => (
        <>
         {props.getValue()}
        </>
      ),
      header: <HeaderCell>Subcategory</HeaderCell>,
    },
    {
      accessorKey: 'urlProject',
      cell: (props) => (
        <a link href={props.getValue()} rel="noopener noreferrer" target="_blank" ><UrlSocialsIcon width={20}/></a>
      ),
      header: <HeaderCell>Web</HeaderCell>,
    },
    {
      accessorKey: 'urlSocials',
      cell: (props) => (
          <a link href={props.getValue()} rel="noopener noreferrer" target="_blank" ><UrlSocialsIcon width={20}/></a>
        ),
        header: <HeaderCell>Socials</HeaderCell>,
    },
    {
      accessorKey: 'chainId',
      cell: (props) => (
        <ChainIconComponent ch={props.getValue()} />
      ),
      header: <HeaderCell>Chain</HeaderCell>,
    },
    {
      accessorKey: 'verified',
      cell: (props) => (
        <>
        {props.getValue() ? <VerifiedIcon width={20}/> : <NonVerifiedIcon width={20}/>}
        </>
      ),
      header: <HeaderCell>Verified</HeaderCell>,
    },
    {
        accessorKey: 'objectId',
        cell: (props) => (
          <Row>
           <a href={`/project/${props.getValue()}`} rel="noopener noreferrer" target="_blank" ><ProjectActiveIcon width={20}/></a>
           <ImageHover onClick={()=>handleReward(props.getValue())} ><RewardIcon width={20}/></ImageHover>
          </Row>
        ),
        header: <HeaderCell>Ref</HeaderCell>,
      },
  ]

  // Tooltipy + Merge obrázků
  // On click rerender nefunguje

  const handleReward = (id) => {
    setProjectId(id)
  }

  const handleTooltip = (text) => {
    setShowTooltip(true);
    setTooltipText(text);
  }

  const handleClose = () => {
    setShowTooltip(false);
    setTooltipText('');
  }

  const { data, isLoading } = useQuery(['projects'], () => UniService.getDataAll('/classes/Project?where={"state": 1}'), {
    onError: (err) => {
      console.log('err', err);
    },
  });

  const { data: projectRewards } = useQuery(['rewards'], () => UniService.getDataAll(`/classes/Reward?where={"project": "${projectId}"}`), {
    onError: (err) => {
      console.log('err', err);
    },
  });


//   const sortedUniqueValues = useMemo(
//     () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
//     [column.getFacetedUniqueValues()]
//   )

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
 {isLoading ? <>Loading, server was sleeping...</> : 
      <>
        {data && data.length > 0 && (
          <Table>
              {showTooltip && <Tooltip text={tooltipText} />}
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
          </Table>
        )}
      </>}
     {projectRewards &&  <RewardTable data={projectRewards} />}
    </>
};

export default ProjectTable;
