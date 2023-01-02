import { MainContainer } from '../format/Box';
import ButtonAlt from '../buttons/ButtonAlt';
import styled from 'styled-components';
import { RewardTitle } from '../typography/Titles';
import {motion} from 'framer-motion';
import { RewardDesc } from '../typography/Descriptions';
import { R } from '../typography/ColoredTexts';

const Container = styled(motion.div)`
    width: 150px; 
    height: 150px;
    background: ${(props) => props.theme.colors.cardGradient};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1%;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.border};
`

const AdminCard = ({ fn, handler, error}) => {


  return (
    <MainContainer >
        <Container  initial={{ height: 0}}
                    animate={{ height: 150}}
                    transition={{ duration: 0.5}}>
             <RewardTitle>{fn}</RewardTitle>
            {error && <RewardDesc><R>Error</R></RewardDesc>}
            <ButtonAlt onClick={handler} text='Dew it'/>
        </Container>
    </MainContainer>
  );
};

export default AdminCard;
