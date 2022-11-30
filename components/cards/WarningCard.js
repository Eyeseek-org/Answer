import styled from 'styled-components';
import { Wrapper } from '../format/Box';
import { Row, Col } from '../format/Row';
import { WarningIcon } from '../icons/Common';
import { WarnDesc } from '../typography/Descriptions';
import { WarnTitle } from '../typography/Titles';

const ErrStyle = styled.div`
  background: ${props => props.theme.colors.errGradient};
`

const AbsoluteBox = styled.div`
  position: absolute;
  left: -30px;
  top: -50px;
`;

const WarningCard = ({ title, description }) => {
  return (

    <Wrapper>
        <ErrStyle>
      <Row>
        <Col>
          <AbsoluteBox>
            <WarningIcon width={25} />
          </AbsoluteBox>
          <WarnTitle>{title}</WarnTitle>
          <WarnDesc>
              {description}
          </WarnDesc>
        </Col>
      </Row>
      </ErrStyle>
    </Wrapper>
  );
};

export default WarningCard;
