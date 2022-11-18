import styled from "styled-components"

const ProgressContainer = styled.div`
    height: 10px;
    width: 100%;
    background: transparent;
    border-radius: 15px;
    border: 1px solid  rgba(0, 224, 255, 0.15);
`

const ProgressFilter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-width: 100%;
    width: ${props => props.ratio}%;
    border-radius: inherit;
    text-align: right;
    background: linear-gradient(90.31deg, rgba(0, 224, 255, 0.85) 0.44%, rgba(0, 224, 255, 0) 94.79%);
    font-family: 'Gemunu Libre';
`

const FullFilter = styled(ProgressFilter)`
    width: 100%;
    background: rgba(0, 224, 255, 0.85);
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Gemunu Libre';
`

const LineButton = styled.button`
    background: rgba(96, 96, 96, 0.7);
    height: 10px;
    width: 2px;
    border: none;
`

const ProgressBar = ({ratio, bal, max}) => {
    return <>
        <ProgressContainer>
            {bal < max ? <ProgressFilter ratio={ratio}>
                {bal !== '0' && <>
                <div><LineButton/></div>
                <div>{bal}</div></>}
                </ProgressFilter> : <FullFilter/>}
        </ProgressContainer>
        <Row>
            <div>0</div>
            <div>{max} {bal >= max && <>reached</>} </div></Row>
    </>
}

export default ProgressBar