import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getGroupedRowModel, getFacetedUniqueValues } from '@tanstack/react-table';
import { useState, useMemo, useEffect } from 'react';
import {Table, Header, Tr, Cell, HeadRow, AddCol, HeaderCell, ImageHover } from './TableStyles';
import { NonVerifiedIcon, UsersIcon, VerifiedIcon } from '../icons/Common';
import {ArrowUp, ArrowDown} from '../icons/TableIcons'
import RewardModal from '../../sections/RewardModal'

const RewardTable = ({data}) => {
  const [sorting, setSorting] = useState([]);
  const [showRewardList, setShowRewardList] = useState(false);
  const [rewardList, setRewardList] = useState()

    console.log(data)
  const handleRewardList = (id) => {
    setRewardList(id)
    setShowRewardList(true)
  }

  const columns = [
    {
      accessorKey: 'title',
      header: 'Reward',
    },
    {
        accessorKey: 'requiredPledge',
        cell: (props) => (
          <>
           ${props.getValue()}
          </>
        ),
        header: <HeaderCell>Pledge</HeaderCell>,
      },
    {
      accessorKey: 'cap',
      cell: (props) => (
        <>
         {props.getValue()}
        </>
      ),
      header: <HeaderCell># Rewards</HeaderCell>,
    },
    {
      accessorKey: 'eligibleActual',
      cell: (props) => (
        <>
         {props.getValue()}
        </>
      ),
      header: <HeaderCell># Free</HeaderCell>,
    },
    {
      accessorKey: 'active',
      cell: (props) => (
        <>
        {props.getValue() ? <VerifiedIcon width={20}/> : <NonVerifiedIcon width={20}/>}
        </>
      ),
      header: <HeaderCell>Active</HeaderCell>,
    },
    {
        accessorKey: 'rewardId',
        cell: (props) => (
          <ImageHover onClick={()=>{handleRewardList(props.getValue())}}>
            <UsersIcon width={20}/>
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
        </Table> : <>No rewards</>
      }
      {showRewardList && rewardList && <RewardModal rewardId={rewardList} showMe={showRewardList} />}
    </>
};

export default RewardTable;
