import {useState} from 'react';
import { RewardAnimatedBox } from '../format/RewardAnimatedBox';
import { BetweenRow } from '../format/Row';
import { ArrowDown, ArrowUp } from '../icons/TableIcons';
import { ImageHover } from '../tables/TableStyles';
import styled, {useTheme} from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';

const Wrapper = styled.div`
    padding-left: 4%;
    padding-right: 4%;
    &:hover{
        cursor: pointer;
    }
`


const RewardStats = ({ reward }: any) => {
    const [show, setShow] = useState(false)
    return <Wrapper onClick={()=>{setShow(!show)}}>

        <BetweenRow >
            {reward.title}
            {show ? <ArrowUp width={10} height={10} /> : <ArrowDown width={10} height={10} />}
            <AnimatePresence>
        {show && <motion.div
                    initial={{  height: 10 }} 
                    animate={{ height: 250}}
                    exit={{  height: 10, width: 100,opacity: 0, transition: { duration: 0.7 } }} 
                    transition={{ duration: 0.5}}
                    key={'rewardBox'}>
                <RewardAnimatedBox reward={reward} />
            </motion.div>}
            </AnimatePresence>
        </BetweenRow>    
    </Wrapper>
}
export default RewardStats