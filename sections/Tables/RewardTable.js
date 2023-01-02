import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getGroupedRowModel, getFacetedUniqueValues } from '@tanstack/react-table';
import { useState } from 'react';
import {Table, Header, Tr, Cell, HeadRow, HeaderCell, ImageHover } from '../../components/tables/TableStyles';
import { NonVerifiedIcon, UsersIcon, VerifiedIcon } from '../../components/icons/Common';
import {ArrowUp, ArrowDown} from '../../components/icons/TableIcons'
import RewardModal from '../RewardModal'
import {useTheme} from 'styled-components';
import { RewardDesc } from '../../components/typography/Descriptions';
import RewardStats from '../../components/functional/RewardStats';
import { Erc20Icon, NftIcon } from '../../components/icons/Project';
import Address from '../../components/functional/Address';
import { RowCenter } from '../../components/format/Row';

const RewardTable = ({data, projectId}) => {
  const [sorting, setSorting] = useState([]);
  const [backers, setBackers] = useState([]);
  const [owner, setOwner] = useState();
  const [rewardId, setRewardId] = useState();
  const [showRewardList, setShowRewardList] = useState(false);
  const theme = useTheme()
  const handleRewardList = (backers, owner, rewardId) => {
    setShowRewardList(!showRewardList);
    setBackers(backers)
    setOwner(owner)
    setRewardId(rewardId)
  }

  const columns = [
    {
      accessorKey: 'rewardId',
      cell: (props) => (
        <>{props.row.original.rewardId}</>
      ),
      header: <HeaderCell>id</HeaderCell>,
    },
    {
      accessorKey: 'title',
      cell: (props) => (
        <RewardStats reward={props.row.original} />
      ),
      header: 'Reward title'
    },
    {
        accessorKey: 'requiredPledge',
        cell: (props) => (
          <>
          ${props.row.original.requiredPledge / 1000000}
          </>
        ),
        header: <HeaderCell>Pledge</HeaderCell>,
      },
    {
      accessorKey: 'cap',
      cell: (props) => (
        <>
          {props.row.original.eligibleActual} of {props.row.original.cap}
        </>
      ),
      header: <HeaderCell>Available</HeaderCell>,
    },
    {
      accessorKey: 'rType',
      cell: (props) => (
        <RowCenter>
          {props.getValue() === 0 && <>Classic</>}
          {props.getValue() === 1 && <Erc20Icon width={20} color={theme.colors.icon}/>}
          {props.getValue() === 2 && <NftIcon width={20} color={theme.colors.icon}/>}
          {props.getValue() > 0 && <><Address address={props.row.original.tokenAddress}/></>}       
        </RowCenter>
      ),
      header: <HeaderCell>Type</HeaderCell>,
    },
    {
      accessorKey: 'active',
      cell: (props) => (
        <>
        {props.getValue() ? <VerifiedIcon color={theme.colors.icon} width={20}/> : <NonVerifiedIcon width={20}/>}
        </>
      ),
      header: <HeaderCell>Active</HeaderCell>,
    },
    {
        accessorKey: 'objectId',
        cell: (props) => (
          <ImageHover onClick={()=>{handleRewardList(props.row.original.donors, props.row.original.owner, props.row.original.objectId)}}>
            <UsersIcon color={theme.colors.icon} width={20}/>
          </ImageHover>
        ),
        header: <HeaderCell>Backers</HeaderCell>,
      },
  ]

//   const sortedUniqueValues = useMemo(
//     () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
//     [column.getFacetedUniqueValues()]
//   )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    enableGrouping: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return  <>
      {data && data.length > 0 ? 
        <Table>
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
        </Table> : <RewardDesc>No rewards found for this project</RewardDesc>
      }
      {showRewardList && data && <RewardModal backers={backers} showMe={showRewardList} owner={owner} rewardId={rewardId} projectId={projectId}/>}
    </>
};

export default RewardTable;
