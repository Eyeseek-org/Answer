import styled from 'styled-components';
import { Row, Col } from '../format/Row';
import { WarningIcon } from '../icons/Common';
import { WarnDesc } from '../typography/Descriptions';
import { WarnTitle } from '../typography/Titles';

const Container = styled.div`
  position: relative;
  background: rgba(9, 0, 0, 0.3);
  border: 1px solid #500000;
  border-radius: 5px;
  padding: 3%;
  display: flex;
  flex-direction: column;
`;

const AbsoluteBox = styled.div`
  position: absolute;
  left: 1px;
  top: -50px;
`;

const WarningCard = ({ title, description }) => {
  return (
    <Container>
      <AbsoluteBox>
        <WarningIcon width={25} />
      </AbsoluteBox>
      <Row>
        <Col>
          <WarnTitle>{title}</WarnTitle>
          <WarnDesc>
            Project founders are not obligated to verify their identities to the Eyeseek. Backing is provided on your own risk, it is
            recommended to verify project validity on project website and socials. Do not trust projects without any reference to Eyeseeek
            funding.
          </WarnDesc>
        </Col>
      </Row>
    </Container>
  );
};

export default WarningCard;
