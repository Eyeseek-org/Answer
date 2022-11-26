import styled from 'styled-components';

export const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  border: none;
  text-align: center;
  background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
  box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.85);
  margin-bottom: 2%;
  border: 1px solid grey;
`;

export const Header = styled.th`
  border-right: 1px solid grey;
  padding: 1% 16px;
  font-family: 'Roboto';
`;

export const Tr = styled.tr`
  padding: 1%;
  border-bottom: 1px solid grey;
  transition: 0.1s;
  &:hover {
    background: rgba(56, 56, 56, 0.4);
  }
`;

export const HeadRow = styled(Tr)`
  &:hover {
    background: transparent;
  }
`;
export const Cell = styled.td`
  padding: 2px;
  font-family: 'Neucha';
  border-right: 1px solid grey;
`;

export const Loading = () => {
  return <>...Loading</>;
};

export const AddCol = styled.div`
  display: flex;
  justify-content: center;

`;

export const ImageHover = styled.div`
  cursor: pointer;
`

export const HeaderCell = styled.div`
  cursor: pointer;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
