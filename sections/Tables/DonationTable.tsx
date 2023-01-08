import { useState } from 'react';
import {  AddCol, HeaderCell} from '../../components/tables/TableStyles';
import { ExplorerReference } from '../../helpers/MultichainHelpers';
import { ArrowDown, ArrowUp } from '../../components/icons/TableIcons';
import { RowCenter } from '../../components/format/Row';
import Address from '../../components/functional/Address';
import { filterInputs } from '../../util/constants';
import { ArrElement } from '../../types/common';
import {useTheme} from 'styled-components'
import { currenciesIdMapping } from '../../helpers/TableHelpers';
import TableComponent from '../../components/tables/TableComponent';
import { Transaction } from '../../types/transaction';
import { ColumnDef } from '@tanstack/react-table';
import ProjectStats from '../../components/functional/ProjectStats';

interface ITransactionTable {
  data: any;
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends unknown, TValue> {
    filter: ArrElement<typeof filterInputs>;
  }
}

const DonationTable = ({ data }: ITransactionTable): JSX.Element => {
  const [backerFilter, setBackerFilter] = useState<boolean>(false);
  const theme = useTheme();

  const columns: ColumnDef<Transaction, string>[] = [
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
      cell: (props) => <ProjectStats fund={props.row.original.fund_id} chain={props.row.original.chain} />,
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
          Backer
        </RowCenter>
      ),
      accessorKey: 'backer',
      cell: (props) => (
        <AddCol>
          <Address address={props.getValue()} />
        </AddCol>
      ),
      enableSorting: false,
    },
    {
        //@ts-ignore
      header: (
        <HeaderCell
          onClick={() => {
            setBackerFilter(!backerFilter);
          }}
        >
          Amount {backerFilter ? <ArrowDown width={13} height={13} /> : <ArrowUp width={13} height={13} />}
        </HeaderCell>
      ),
      accessorKey: 'amount',
        //@ts-ignore
      cell: (props: number) => <>${props.getValue() / 1000000}</>,
      enableSorting: true,
      enableColumnFilter: false,
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
       //@ts-ignore
      header: (
        <HeaderCell
          onClick={() => {
            setBackerFilter(!backerFilter);
          }}
        >
          Drained {backerFilter ? <ArrowDown height={13} width={13} /> : <ArrowUp height={13} width={13} />}
        </HeaderCell>
      ),
      enableColumnFilter: false,
        //@ts-ignore
      cell: (props:number) => <>{props.getValue() / 1000000}</>,
      accessorKey: 'drained',
    },
    {
      header: 'Tx',
      accessorKey: 'txn_hash',
      enableColumnFilter: false,
      cell: (props) => <ExplorerReference ch={props.cell.row.original.chain} tx={props.getValue()} />,
      enableSorting: false,
    },
  ];

  return (
    <>
      <TableComponent data={data} columns={columns} type={'transactions'} />
    </>
  );
};

export default DonationTable;
