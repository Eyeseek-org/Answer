import { BetweenRow } from "../format/Row"
import Subtitle from "../typography/Subtitle"
import styled, {useTheme} from "styled-components"
import {useState} from 'react'
import MyTooltip from "../Tooltip"
import {motion} from 'framer-motion'

const AbsoluteBox = styled.div`
    position: absolute;
    right: 0;
    top: -70px;
    padding: 5px;
    background: ${props => props.theme.colors.tableGradient};
`

const StatsWrapper = styled.div`
    width: 400px;
`

const Category = styled.div`
    font-size: 0.8em;
    font-family: 'Gemunu Libre';
    letter-spacing: 1px;
    position: absolute;
    right: -70px;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`

const StatsComponent = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 2px;
    width: ${props => props.ratio}%;
    border-radius: 45px;
    text-align: right;
    align-items: flex-end;
    background: ${props => props.color};
    font-family: 'Gemunu Libre';
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`

const TableHeader = ({ text, numberOneFull, numberTwoFull, numberOneVerified, numberTwoVerified, all }) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipText, setTooltipText] = useState('')
    const theme = useTheme()

    const handleTooltip = (full, verified) => {
        setShowTooltip(true)
    }

    const CatStats = ({ratio, color, full, verified}) => {
        return <StatsComponent 
        //    onMouseEnter={() => handleTooltip(full, verified)} onMouseLeave={() => setShowTooltip(false)}
            initial={{width: 0}} animate={{width: ratio}} transition={{duration: 1}}
        ratio={ratio} color={color} />
    }

    return <BetweenRow>
        <Subtitle text={text} />
        <AbsoluteBox>
            {showTooltip && all && <MyTooltip text={`Total number of projects: ${all}`} margin={'-60px'} />}
            <StatsWrapper>
               <Row><CatStats ratio={'100%'} color={theme.colors.primary} full={all} verified={all} /><Category>• Stats TBD</Category></Row> 
                <CatStats ratio={(numberOneFull/all)*100} full={all} verified={all}> {numberOneFull >= 1 && <CatStats ratio={(numberOneVerified/ all)*100} full={all} verified={all}/>}</CatStats>
                <CatStats ratio={(numberTwoFull/all)*100} full={all} verified={all}> {numberTwoFull >= 1 && <CatStats ratio={(numberTwoVerified/ all)*100} full={all} verified={all}/>}</CatStats>
            </StatsWrapper>
        </AbsoluteBox>
    </BetweenRow>
}

export default TableHeader