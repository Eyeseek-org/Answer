import { ColumnDef} from '@tanstack/react-table';
import Address from '../../components/functional/Address';
import { useQuery } from '@tanstack/react-query';
import { DapAPIService, UniService } from '../../services/DapAPIService';
import { useState } from 'react';
import { Stream } from '../../types/stream';
import { Project } from '../../types/project';
import { groupStreamWithProject } from '../../util/stream-table';
import { AddCol, HeaderCell } from '../../components/tables/TableStyles';
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import { DetailIcon } from '../../components/icons/Project';
import { SubcatPick } from '../../components/functional/CatPicks';
import SuperBalance from '../../components/functional/SuperBalance';
import {useTheme} from 'styled-components'
import TableComponent from '../../components/tables/TableComponent';
import TableSkeleton from '../../components/skeletons/TableSkeleton';
import { RewardDesc } from '../start_project/Styles';

export type GroupedStream = Stream & Pick<Project, 'title' | 'subcategory' | 'chainId'>;

const StreamTable = () => {
  const [data, setData] = useState<GroupedStream[]>([]);
  const theme = useTheme();

  const columns: ColumnDef<GroupedStream, string>[] = [

    {
      header: 'Projects',
      columns: [
        {
          accessorKey: 'chainId',
          cell: (props) => (<ChainIconComponent ch={props.getValue()} />),
          header: 'Chain',
        },
        {
          accessorKey: 'title',
          header: 'Title',
        },
        {
          accessorKey: 'subcategory',
          cell: (props) => (<><SubcatPick width={20} subcat={props.getValue()}/>  </>),
           // @ts-ignore
          header: <HeaderCell>Area</HeaderCell>,
        },
        {
          accessorKey: 'projectId',
          cell: (props) => (
            // @ts-ignore
            <a href={`/project/${props.getValue()}`} rel="noopener noreferrer" target="_blank" ><DetailIcon width={20}  color={theme.colors.icon}/></a>
          ),
          header: 'Detail',
        },
        {
          accessorKey: 'chainId',
          cell: (props) => (<SuperBalance chain={props.getValue()} address={'0xa0a39c5823A51184043655711C8157ef4826447a'} />),
          header: 'wBalance',
        },
      ],
    },
    {
      header: 'Active streams',
      columns: [
        {
          accessorKey: 'addressBacker',
          cell: (props) => (<AddCol><Address address={props.getValue()} /></AddCol>),
          header: 'Address',
        },
        {
          accessorKey: 'owner',
          cell: (props) => (
            <AddCol><Address address={props.getValue().toLowerCase()} /></AddCol>),
          header: 'Creator',
        },
        {
          accessorKey: 'flowRate',
          cell: (props) => (<>{props.getValue()}</>),
          header: 'Rate /mo',
        },
      ],
    },
  ];

  const { data: activeStreams, isLoading } = useQuery(['streams'], () => UniService.getDataAll<Stream>('/classes/Stream?where={"isActive": true}'), {
    onError: (err) => {
      console.log('err', err);
    },
    onSuccess: async (streams) => {
      const uniqueProjectIds = [...new Set(streams.map((stream) => stream.projectId))];
      const projectsDetail = await DapAPIService.getBatchProjectsById(uniqueProjectIds);
      const groupedData = groupStreamWithProject(streams, projectsDetail);

      setData(groupedData);
    },
  });

  return <>
    {isLoading ? <TableSkeleton/> :  <>
      {activeStreams && activeStreams.length > 0 ? <>
        <TableComponent data={data} type={'stream'} columns={columns}/>
      </> : <RewardDesc>No stream projects active</RewardDesc>}
    </> }
  </>
};

export default StreamTable;
