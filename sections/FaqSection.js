import FaqCard from '../components/cards/FaqCard';
import styled from 'styled-components'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUp } from '../components/icons/TableIcons';

const Question = styled.div`
  font-family: 'Neucha';
  font-style: normal;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.3;
  font-size: 1.4em;
  line-height: 43px;
  min-width: 30%;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: 1168px) {
    line-height: 20px;
  }
  @media (min-width: 1780px) {
    font-size: 1.8em;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Sentence = styled.div`
    display: flex;
    gap: 10px;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`

const ImageBox = styled(motion.div)`
  @media (max-width: 968px) {
    display: none;
  }
`;

const Block = styled.div`

`

const FaqSection = ({ answer, image, points, question }) => {
    const [show, setShow] = useState(false);
    return <>
        {show ? <FaqCard answer={answer} points={points} /> : <FaqCard answer={answer} points={undefined} />}
        <Question>
        <Sentence onClick={() => { setShow(!show) }}><div>{question}</div> 
         <div>   {!show ? <ArrowDown width={15} /> : <ArrowUp width={15} />}</div>
        </Sentence>
        
        <AnimatePresence>
        {show ? 
        <ImageBox
            initial={{  y: 200 }} 
            key={'image'}
            animate={{ y: 0}}
            transition={{ duration: 0.5}}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >{image}</ImageBox> : <Block />}
        </AnimatePresence>
        </Question>
    </>
}

export default FaqSection