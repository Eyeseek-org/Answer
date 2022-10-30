import styled from 'styled-components'

const Card = styled.div`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid #3C3C3C;
    border-radius: 15px;
    padding-left: 2em;
    padding-right: 1em;
    width: 40%;
    max-width: 800px;
    padding-top: 2em;
    margin: 2em;
    transition: 0.2s;
    &:hover{
        opacity: 0.8;
        background: rgba(5, 0, 0, 0.4);
        cursor: pointer;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`

const Title = styled.div`
    margin-top: 1em;
    font-family: "Gemunu Libre";
    font-style: normal;
    font-weight: 500;
    font-size: 1.7em;
    color: #b0f6ff;
`

const Description = styled.div`
     margin-top: 2em;
     margin-bottom: 2em;
     font-family: 'Neucha';
     letter-spacing: 0.8px;
     font-weight: 300;
     font-size: 1.1em;
     color: #FFFFFF;
`

const IconBox = styled.div`

`

const FeatureCard = ({ title, description, icon, onClick }) => {
    return  <Card onClick={onClick}>
        <IconBox>{icon} </IconBox>
        <Title>{title}</Title>
        <Description>{description}</Description>
    </Card>
}

export default FeatureCard