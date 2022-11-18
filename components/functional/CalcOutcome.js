import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  border-radius: 15px;
  padding: 4%;
  background: rgba(0, 0, 0, 0.4);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 1%;
`;

const Item = styled.div`
  width: 50%;
  font-size: 1em;
  color: white;
  font-family: 'Gemunu Libre';
`;

const Value = styled.div`
  font-style: italic;
  font-weight: 500;
  color: #ffffff;
  font-family: 'Gemunu Libre';
`;

const CalcOutcome = ({ conn, multi, currency }) => {
  return (
    <Container>
      <Row>
        <Item>Microfund multiplier</Item>
        <Value>{conn} X</Value>
      </Row>
      <Row>
        <Item>Fund receives (in total)</Item>
       {currency &&  <Value>{multi} {currency}</Value>}
      </Row>
    </Container>
  );
};

export default CalcOutcome;
