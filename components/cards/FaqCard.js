import styled from 'styled-components';

const Card = styled.div`
  padding: 2%;
  padding-left: 17px;
  background: #000000;
  border: 1px solid #4e4e4e;
  border-radius: 25px;
  max-height: 250px;
  @media (max-width: 1168px) {
    max-height: 200px;
    width: 100%;
    flex-wrap: wrap;
  }
`;
const An = styled.div`
  margin-top: 2%;
  font-family: 'Neucha';
  margin-bottom: 4%;
  @media (min-width: 1780px) {
    font-size: 1.3em;
  }
`;

const Li = styled.li`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 0.8em;
  line-height: 29px;
  letter-spacing: 0.01em;
  color: #ffffff;
  @media (min-width: 1780px) {
    font-size: 1em;
  }
`;

const FaqCard = ({ answer, point1, point2, point3, point4 }) => {
  return (
    <Card>
      <An>{answer}</An>
      <Li>{point1}</Li>
      <Li>{point2}</Li>
      {point3 && <Li>{point3}</Li>}
      {point4 && <Li>{point4}</Li>}
    </Card>
  );
};

export default FaqCard;
