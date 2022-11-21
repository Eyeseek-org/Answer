import styled from 'styled-components';

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1.4%;
  padding-bottom: 0.5%;
  @media (min-width: 1580px) {
    font-size: 1.3em;
  }
`;

const RowCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const RowTitle = styled.div`
  font-family: 'Chenla';
  font-style: normal;
  font-size: 1.5em;
  font-weight: 400;
  color: ${(props) => props.color};
  @media (min-width: 1580px) {
    font-size: 1.8em;
  }
`;

const RowDesc = styled.div`
  color: ${(props) => props.theme.colors.font};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
`;

const StatRow = ({ title, desc, right, color })  => {
    return   <RowBox>
            <RowCol>
              <RowTitle color={color}>{title}</RowTitle> <RowDesc>{desc}</RowDesc>
            </RowCol>
            {right}
          </RowBox>
}

export default StatRow
