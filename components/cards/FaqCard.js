import styled from 'styled-components'

const Card = styled.div`
    padding: 2%;
    padding-left: 17px;
    background: #000000;
    border: 1px solid #4E4E4E;
    border-radius: 25px;
    max-height: 250px;
    @media (max-width: 1168px) {
        max-height: 200px;
        width: 100%;
        flex-wrap: wrap;
    }
`
const An = styled.div`
    margin-top: 2%;
    margin-bottom: 4%;
`

const Li = styled.li`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 0.8em;
    line-height: 29px;
    letter-spacing: 0.01em;
    color: #FFFFFF;
`

const FaqCard = ({ answer, point1, point2, point3, point4 }) => {
    return <Card>
        <An>{answer}</An>
        <Li>{point1}</Li>
        <Li>{point2}</Li>
        {point3 && <Li>{point3}</Li>}
        {point4 && <Li>{point4}</Li>}
    </Card>
}

export default FaqCard