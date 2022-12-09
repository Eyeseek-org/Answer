import {useState} from 'react';
import { RewardAnimatedBox } from '../format/BoxAnimated';
import { BetweenRow } from '../format/Row';
import { ArrowDown, ArrowUp } from '../icons/TableIcons';
import { ImageHover } from '../tables/TableStyles';
import styled, {useTheme} from 'styled-components';

const Wrapper = styled.div`
    padding-left: 4%;
    padding-right: 4%;
`

const RewardStats = ({ desc, delivery, estimation, title }) => {
    const [show, setShow] = useState(false)
    return <Wrapper>
        <BetweenRow >
            {title}
            <ImageHover onClick={()=>{setShow(!show)}}>{show ? <ArrowUp width={10} height={10} /> : <ArrowDown width={10} height={10} />}</ImageHover>
        {show && <RewardAnimatedBox text={desc} delivery={delivery} estimation={estimation} />}
        </BetweenRow>    
    </Wrapper>
}
export default RewardStats