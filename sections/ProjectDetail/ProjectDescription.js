import styled from 'styled-components';
import Subtitle from '../../components/typography/Subtitle';

const Container = styled.div`
  margin-top: 5%;
  padding-left: 15%;
  padding-right: 15%;
  @media (max-width: 768px) {
    padding-left: 2%;
    padding-right: 2%;
  }
`;

const DescriptionBox = styled.div`
  padding-bottom: 5%;
`;

const ProjectDescription = ({ descM }) => {
  return (
    <Container>
      <Subtitle text="Project milestones" />
      <DescriptionBox></DescriptionBox>
      {descM}
    </Container>
  );
};

export default ProjectDescription;
