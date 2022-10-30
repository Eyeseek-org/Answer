import styled from 'styled-components';
import { Row, Col } from '../format/Row';
import { WarningIcon } from '../icons/Common';

const Container = styled.div`
    position: relative;
    background: rgba(9, 0, 0, 0.3);
    border: 1px solid #500000;
    border-radius: 5px;
    padding: 3%;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    position: relative;
    font-family: 'Neucha';
    font-style: normal;
    letter-spacing: 0.4px;
    font-weight: 600;
    font-size: 0.9em;
    color: #FFFFFF;
    margin-bottom: 2%;
    margin-left: 2%;
`

const Description = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 0.8em;
    line-height: 20px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    margin-left: 2%;
`

const AbsoluteBox = styled.div`
    position: absolute;
    left: 1px;
    top: -50px;
`



const WarningCard = ({title, description}) => {
    return <Container>
        <AbsoluteBox><WarningIcon width={25}/></AbsoluteBox>
        <Row>
            <Col><Title>{title}</Title>
            <Description>Project founders are not obligated to verify their identities to the Eyeseek. Backing is provided on your own risk, it is recommended to verify project validity on project website and socials. Do not trust projects without any reference to Eyeseeek funding.</Description></Col>
        </Row>
    </Container>
}

export default WarningCard;