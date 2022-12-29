import { useMemo, useState } from 'react';
import { AddCol, HeaderCell} from '../../components/tables/TableStyles';
import { ExplorerReference } from '../../helpers/MultichainHelpers';
import { RowCenter } from '../../components/format/Row';
import Address from '../../components/functional/Address';
import { filterInputs } from '../../util/constants';
import { ArrElement } from '../../types/common';
import ProjectStats from '../../components/functional/ProjectStats';
import { XIcon } from '../../components/icons/Project';
import {useTheme} from 'styled-components';
import TokenStats from '../../components/functional/TokenStats';
import { Reward } from '../../types/reward';
import TableComponent from '../../components/tables/TableComponent';
import { ColumnDef } from '@tanstack/react-table';

interface ITable {
  data: any;
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends unknown, TValue> {
    filter: ArrElement<typeof filterInputs>;
  }
}

const RewardAllTable = ({ data }: ITable): JSX.Element => {
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
           {props.row.original.tokenContract !== '0x0000000000000000000000000000000000000000' 
           ?  <TokenStats address={props.row.original.tokenContract} amount={props.row.original.amount} chain={props.row.original.chainId} />
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
    ],
    []
  );

  return (
    <>
      <TableComponent type='reward' columns={columns} data={data} />
    </>
  );
};

export default RewardAllTable;
