import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import { HeaderCell } from '../../components/tables/TableStyles';
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import { useAccount } from 'wagmi';
import { MainContainer } from '../../components/format/Box';
import { RowCenter } from '../../components/format/Row';
import {useTheme} from 'styled-components';
import { DetailIcon } from '../../components/icons/Project';
import Bookmark from '../../components/functional/Bookmark';
import TableSkeleton from '../../components/skeletons/TableSkeleton';
import TableComponent from '../../components/tables/TableComponent';

const BookmarkTable = () => {
  const {address} = useAccount(); 
  const theme = useTheme();

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
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'objectId',
      cell: (props) => (
        <>
           <a href={`/project/${props.getValue()}`} rel="noopener noreferrer" target="_blank" ><DetailIcon height={20} width={20}  color={theme.colors.icon}/></a>
        </>
      ),
      header: <HeaderCell>Detail</HeaderCell>,
    },
    {
      accessorKey: 'objectId',
      cell: (props) => (
        <RowCenter>
           <Bookmark objectId={props.getValue()} bookmarks={props.row.original.bookmarks}/>
        </RowCenter>
      ),
      header: <HeaderCell>Unmark</HeaderCell>,
    },
  ]

  const { data, isLoading } = useQuery(['bookmarked-projects'], () => UniService.getDataAll(`/classes/Project?where={"state": 1, "bookmarks": "${address}"}`), {
    onError: (err) => {
      console.log('err', err);
    },
  });


  return  <MainContainer>
   {isLoading ? <TableSkeleton/> : 
      <>
        {data && data.length > 0 && (
          <TableComponent data={data} columns={columns} type={'project'}/>
        )}
      </>}
    </MainContainer>
};

export default BookmarkTable;
