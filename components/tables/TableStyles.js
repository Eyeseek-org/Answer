import styled from 'styled-components';

export const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  border: none;
  text-align: center;
  background: ${(props) => props.theme.colors.tableGradient};
  box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.85);
  margin-bottom: 5%;
  border: 1px solid grey;
  animation: fadeIn 0.7s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Header = styled.th`
  position: relative;
  border-right: 1px solid grey;
  padding: 1% 16px;
  font-family: 'Roboto';
  letter-spacing: 0.7px;
  padding-bottom: 30px;
  color: ${(props) => props.theme.colors.primary};
  @media (min-width: 1568px) {
    font-size: 1.1em;
  }
`;

export const Tr = styled.tr`
  padding: 1%;
  border-bottom: 1px solid grey;
  transition: 0.1s;
  &:hover {
    background: ${(props) => props.theme.colors.transparentCard};
  }
`;

export const HeadRow = styled(Tr)`
  background: ${(props) => props.theme.colors.gradient};
  cursor: default;
`;

export const Cell = styled.td`
  padding-left: 2px;
  padding-right: 2px;
  font-family: 'Neucha';
  border-right: 1px solid grey;
`;

export const Loading = () => {
  return <>...Loading</>;
};

export const AddCol = styled.div`
  display: flex;
  justify-content: center;
  min-width: 150px;
`;

export const ImageHover = styled.button`
  cursor: pointer;
  background: inherit;
  border: none;
  outline: none;
`;

export const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  font-family: 'Neucha';
  letter-spacing: 1px;
  gap: 1rem;
`;

export const MyInput = styled.input`
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 10px;
  font-family: 'Gemunu Libre';
  width: 100%;
  @media (min-width: 1568px) {
    font-size: 15px;
  }
`;

export const ActionCol = styled.div`
  min-width: 100px;
`

export const TableWrapper = styled.div`
  position: relative;
  animation: fadeIn 0.7s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const AbsoluteFilter = styled.div`
  position: absolute;
  bottom: 7px;
`

export const ToggleBox = styled.div`
  position: absolute;
  top: -80px;
  right: 0;
`