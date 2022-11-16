import StreamTable from '../components/tables/StreamTable';
import styled from 'styled-components';
import { createColumnHelper } from '@tanstack/react-table';
import SectionTitle from '../components/typography/SectionTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 5%;
`;

const streamCol = createColumnHelper<Stream>();

type Stream = {
  addressBacker: string;
  owner: string;
  flowRate: number;
  isActive: boolean;
};

const colStream = [
  streamCol.accessor('addressBacker', {
    cell: (info) => info.getValue(),
  }),
  streamCol.accessor('flowRate', {
    header: () => 'Flow Rate',
    cell: (info) => info.renderValue(),
  }),
  streamCol.accessor('owner', {
    header: () => <span>Owner</span>,
    cell: (props) => <span>{props.getValue().toLowerCase()}</span>,
  }),
  streamCol.accessor('isActive', {
    header: 'Status',
  }),
];

// Create couple of common tables

const Stats = ({col}) => {
  return (
    <>
      <SectionTitle title={'Streams'} subtitle={'Overview'} />
      <Container>
        <StreamTable col={colStream} />
      </Container>
    </>
  );
};

export default Stats;
