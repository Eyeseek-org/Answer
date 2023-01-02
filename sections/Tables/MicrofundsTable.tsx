import { useState } from 'react';
import { AddCol, HeaderCell } from '../../components/tables/TableStyles';
import {  ExplorerReference } from '../../helpers/MultichainHelpers';
import { ArrowDown, ArrowUp } from '../../components/icons/TableIcons';
import { RowCenter } from '../../components/format/Row';
import Address from '../../components/functional/Address';
import {useTheme} from 'styled-components'
import { Microfund } from '../../types/microfund';
import TableComponent from '../../components/tables/TableComponent';
import { ColumnDef } from '@tanstack/react-table';
import ProjectStats from '../../components/functional/ProjectStats';

interface ITransactionTable {
  data: any;
}

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;

const filterInputs = ['select'] as const;

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends unknown, TValue> {
    filter: ArrElement<typeof filterInputs>;
  }
}
const currenciesIdMapping = {
  1: 'USDC',
  2: 'USDT',
  3: 'DAI',
};


const MicrofundsTable = ({ data }: ITransactionTable): JSX.Element => {
  const [backerFilter, setBackerFilter] = useState<boolean>(false)
  const theme = useTheme();
  const columns: ColumnDef<Microfund, string>[] = [
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
      header: () => <RowCenter onClick={()=>{setBackerFilter(!backerFilter)}}>Backer </RowCenter>,
      accessorKey: 'backer',
      cell: (props) => (
        <AddCol>
          <Address address={props.getValue()} />
        </AddCol>
      ),
      enableSorting: false,
    },
    {
      header: () => <HeaderCell onClick={()=>{setBackerFilter(!backerFilter)}} >Amount {backerFilter ? <ArrowDown width={13} height={13}/> : <ArrowUp width={13} height={13}/>}</HeaderCell>,
      accessorKey: 'amount',
      cell: (props) => (
        <>
         ${Number(props.getValue()) / 1000000}
        </>
      ),
      enableSorting: true,
      enableColumnFilter: false,
    },
    {
      header: () => <RowCenter onClick={()=>{setBackerFilter(!backerFilter)}}>Token </RowCenter>,
      enableColumnFilter: true,
      accessorKey: 'currency_id',
      meta: {
        filter: 'select',
      },
      enableSorting: false,
      cell: (props) => currenciesIdMapping[props.getValue()],
    },
    {
      header: 'Date',
      enableColumnFilter: false,
      accessorKey: 'date',
    },
    {
      header: ' ',
      accessorKey: 'txn_hash',
      enableColumnFilter: false,
      cell: (props) => <ExplorerReference ch={props.cell.row.original.chain} tx={props.getValue()} />,
      enableSorting: false,
    },
  ];

  return (
    <>
      <TableComponent type={'microfund'} data={data} columns={columns}/>
    </>
  );
};

export default MicrofundsTable;
