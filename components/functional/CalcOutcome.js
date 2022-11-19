import styled from 'styled-components';
import { BetweenRow } from '../format/Row';
import { RewardTitle } from '../typography/Titles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  border-radius: 15px;
  padding: 4%;
  background: rgba(0, 0, 0, 0.4);
`;

const CalcOutcome = ({ conn, multi, currency }) => {
  return (
    <Container>
      <BetweenRow>
        <RewardTitle>Microfund multiplier</RewardTitle>
        <RewardTitle>{conn} X</RewardTitle>
      </BetweenRow>
      <BetweenRow>
        <RewardTitle>Fund receives (in total)</RewardTitle>
       {currency &&  <RewardTitle>{multi} {currency}</RewardTitle>}
      </BetweenRow>
    </Container>
  );
};

export default CalcOutcome;
