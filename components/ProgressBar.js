import styled from "styled-components"
import { BetweenRow, RowStart } from "./format/Row"

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
    height: 5px;
    max-width: 100%;
    width: ${props => props.ratio}%;
    border-radius: inherit;
    text-align: right;
    background: rgba(0, 224, 255, 0.95);
    font-family: 'Gemunu Libre';
`

const SecondaryFilter = styled(ProgressFilter)`
    background: ${props => props.color};
    height: 3px;
`

const FullFilter = styled(ProgressFilter)`
    width: 100%;
    background: rgba(0, 224, 255, 0.85);
`

const LineButton = styled.button`
    background: rgba(96, 96, 96, 0.7);
    height: 10px;
    width: 2px;
    border: none;
`

// TBD possibly toolbar

const ProgressBar = ({ratio, bal, max, secRatio, terRatio, quaRatio}) => {
    return <>
        <ProgressContainer>
            {bal < max ? <ProgressFilter ratio={ratio}>
                {bal !== '0' && <>
                <div><LineButton/></div>
                <div>{bal}</div></>}
                </ProgressFilter> : <FullFilter/>}
                <RowStart>
                    {secRatio && <SecondaryFilter color={'blue'} ratio={secRatio}/>}  
                    {terRatio && <SecondaryFilter color={'green'} ratio={terRatio}/>}  
                    {quaRatio && <SecondaryFilter color={'yellow'} ratio={quaRatio}/>}  
                </RowStart>
        </ProgressContainer>
        <BetweenRow>
            <div>0</div>
            <div>{max} {bal >= max && <>reached</>} </div></BetweenRow>
    </>
}

export default ProgressBar