import styled from 'styled-components';
import { IFAQ } from '../../pages/faq';

const Card = styled.div`
  padding: 2%;
  padding-left: 17px;
  background: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 25px;
  max-height: 250px;
  @media (max-width: 1168px) {
    max-height: 200px;
    width: 100%;
    flex-wrap: wrap;
  }
`;
const Answer = styled.div`
  margin-top: 2%;
  font-family: 'Neucha';
  margin-bottom: 4%;
  @media (min-width: 1780px) {
    font-size: 1.3em;
  }
`;

const Point = styled.li`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 0.8em;
  line-height: 29px;
  letter-spacing: 0.01em;
  color: ${(props) => props.theme.colors.font};
  @media (min-width: 1780px) {
    font-size: 1em;
  }
`;

const FaqCard = ({ answer, points }: Omit<IFAQ, 'question' | 'image'>): JSX.Element => {
  return (
    <Card>
      <Answer>{answer}</Answer>
      {points.map((point, index) => {
        return <Point key={index}>{point}</Point>;
      })}
    </Card>
  );
};

export default FaqCard;
