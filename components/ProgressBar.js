import styled from "styled-components"

const ProgressContainer = styled.div`
    height: 10px;
    width: 100%;
    background: transparent;
    border-radius: 15px;
    border: 1px solid rgba(96, 96, 96, 0.7);
`

const ProgressFilter = styled.div`
    height: 100%;
    width: ${props => props.ratio}%;
    border-radius: inherit;
    text-align: right;
    background: linear-gradient(90.31deg, rgba(0, 224, 255, 0.85) 0.44%, rgba(0, 224, 255, 0) 94.79%);
    font-family: 'Gemunu Libre';
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Gemunu Libre';
`



const ProgressBar = ({ratio}) => {
    return <>
        <ProgressContainer>
            <ProgressFilter ratio={ratio}>Current</ProgressFilter>
        </ProgressContainer>
        <Row><div>0</div><div>Cap</div></Row>
    </>
}

export default ProgressBar