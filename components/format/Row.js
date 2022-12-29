import styled from 'styled-components';

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`;

export const BetweenRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 1%;
  margin-bottom: 1%;
`

export const BetweenRowSm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.7em;
  width: 100%;
`

export const RowCenter = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4%;
  justify-content: center;
  // If there is props, color red, else color blue
  background: ${(props) => props.active ? props.theme.colors.border : 'inherit'};
`

export const RowEnd = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 3%;
  gap: 5%;
`

export const RowStart = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5%;
`

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2%;
`;

export const ColRight = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`