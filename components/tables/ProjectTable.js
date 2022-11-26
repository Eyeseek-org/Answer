import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getGroupedRowModel, getFacetedUniqueValues } from '@tanstack/react-table';
import Address from '../functional/Address';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import { useState, useMemo } from 'react';
import {Table, Header, Tr, Cell, HeadRow, AddCol, HeaderCell, ImageHover } from './TableStyles';
import { NonVerifiedIcon, RewardIcon, UrlSocialsIcon, VerifiedIcon, WarningIcons } from '../icons/Common';
import {ArrowUp, ArrowDown} from '../icons/TableIcons'
import Tooltip from '../Tooltip';
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import { DetailIcon, WebIcon } from '../icons/Project';
import RewardTable from './RewardTable';
import { Row } from '../format/Row';
import {useTheme} from 'styled-components';
import {SubcatPick} from '../functional/CatPicks'
import { RewardDesc } from '../typography/Descriptions';


const ProjectTable = () => {
  const [sorting, setSorting] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [projectId, setProjectId] = useState()
  const [donors, setDonors] = useState()
  const theme = useTheme()

  const columns = [
    {
      accessorKey: 'chainId',
      cell: (props) => (
        <ChainIconComponent ch={props.getValue()} />
      ),
      header: <HeaderCell>Chain</HeaderCell>,
    },
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
           ${props.getValue()}
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
         <SubcatPick subcat={props.getValue()}/>  
        </>
      ),
      header: <HeaderCell>Area</HeaderCell>,
    },
    {
      accessorKey: 'urlProject',
      cell: (props) => (
        <>
        {props.getValue() ? <a link href={props.getValue()} rel="noopener noreferrer" target="_blank" >
          <WebIcon color={theme.colors.icon} width={30}/>
          </a> : <WarningIcons widt={30} />}
        </>
      ),
      header: <HeaderCell>Web</HeaderCell>,
    },
    {
      accessorKey: 'urlSocials',
      cell: (props) => (
        <>         
         <a link href={props.getValue()} rel="noopener noreferrer" target="_blank" ><UrlSocialsIcon colors={theme.colors.icon} width={20}/></a></>
        ),
        header: <HeaderCell>Socials</HeaderCell>,
    },
    {
      accessorKey: 'verified',
      cell: (props) => (
        <>
         {props.getValue() ? <VerifiedIcon color={theme.colors.icon} width={30}/> : <NonVerifiedIcon width={30}/>}
        </>
      ),
      header: <HeaderCell>Verified</HeaderCell>,
    },
    {
        accessorKey: 'objectId',
        cell: (props) => (
          <Row>
           <a href={`/project/${props.getValue()}`} rel="noopener noreferrer" target="_blank" ><DetailIcon width={20}/></a>
           <ImageHover onClick={()=>handleReward(props.getValue())} ><RewardIcon color={theme.colors.icon} width={20}/></ImageHover>
          </Row>
        ),
        header: <HeaderCell>Actions</HeaderCell>,
      },
  ]

  // Tooltipy + Merge obrázků
  // On click rerender nefunguje

  const handleReward = async(id) => {
    // TBD musim kliknout dvakrát 
    setProjectId(id)
    refetch()
  }


  const { data, isLoading } = useQuery(['projects'], () => UniService.getDataAll('/classes/Project?where={"state": 1}'), {
    onError: (err) => {
      console.log('err', err);
    },
  });

  const { data: projectRewards, refetch  } = useQuery(['rewards'], () => UniService.getDataSingle(`/classes/Reward?where={"project": "${projectId}"}`), {
    onError: (err) => {
      console.log('err', err);
    },
    onSuccess: (data) => {
      // Tady je někde chyba
      setDonors(data.donors)
    }
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
 {isLoading ? <RewardDesc>Loading, server was sleeping...</RewardDesc> : 
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
              <Tr>
                <Cell></Cell>
              </Tr>
            </tbody>
          </Table>
        )}
      </>}
     {projectRewards && donors &&  <RewardTable data={projectRewards} donors={donors} />}
    </>
};

export default ProjectTable;
