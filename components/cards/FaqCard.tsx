import styled from 'styled-components';
import { IFAQ } from '../../pages/faq';
import { AnimatePresence, motion } from 'framer-motion';

const Card = styled(motion.div)`
  padding: 2%;
  padding-left: 17px;
  background: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 25px;
  max-height: 250px;
  min-width: 500px;
  letter-spacing: 0.7px;
  @media (max-width: 1268px) {
    max-height: 200px;
    width: 100%;
    flex-wrap: wrap;
    min-width: 300px;
  }
`;
const Answer = styled.div`
  margin-top: 2%;
  font-family: 'Neucha';
  margin-bottom: 4%;
  @media (min-width: 1780px) {
    font-size: 1.3em;
  }
`;

const Point = styled(motion.li)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 0.8em;
  line-height: 29px;
  letter-spacing: 0.01em;
  color: ${(props) => props.theme.colors.font};
  @media (min-width: 1780px) {
    font-size: 1em;
  }
`;

const FaqCard = ({ answer, points }: Omit<IFAQ, 'question' | 'image'>): JSX.Element => {
  return <>
     
 {points ?    <Card className='card' initial={{  height: 50 }}  animate={{ height: 500}}   transition={{ duration: 1}} key={'card'} >
 <AnimatePresence> 
      <Answer>{answer}</Answer>
      {points && points.map((point, index) => {
        return   <Point 
          initial={{  opacity: 0.1 }} 
          animate={{ opacity: 1}}
          exit={{  opacity: 0, transition: { duration: 0.7 } }} 
          transition={{ duration: 0.5}}
          key={index}>{point}
        </Point>
       
      })}
          </AnimatePresence>
    </Card> : 
    <Card className='empty' initial={{  height: 500 }}  animate={{ height: 70}}  transition={{ duration: 1}}>  
      <Answer>{answer}</Answer>
    </Card>}
    </>
};

export default FaqCard;
