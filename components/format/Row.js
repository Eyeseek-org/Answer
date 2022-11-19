import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`;

export const BetweenRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`

export const RowEnd = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 3%;
  gap: 1rem;
`

export const RowStart = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`


export const Col = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
