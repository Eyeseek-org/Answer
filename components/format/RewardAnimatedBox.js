import styled from "styled-components"
import {motion} from 'framer-motion'
import { RewardDesc } from "../typography/Descriptions"
import { Col } from "./Row"
import { E } from "../typography/ColoredTexts"

const Outer = styled(motion.div)`
    position: relative;

`

const Container = styled.div`
    min-width: 300px;
    min-height: 150px;
    padding: 5%;
    font-size: 1em;
    font-family: 'Montserrat';
    display: flex;
    flex-direction: column;
    gap: 5%;
`

const TitleBox = styled.div`
  position: relative;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1em;
  font-family: 'Gemunu Libre';
  padding-bottom: 1.5%;
  margin-bottom: 1.5%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  letter-spacing: 0.4px;
  &:hover{
    cursor: pointer;
  }
  @media (min-width: 1580px) {
    font-size: 1.15em;
  }
`

const DescBox = styled.div`
    margin-bottom: 5%;
`

export const RewardAnimatedBox = ({text, delivery, estimation, title, pledge}) => {
    return <>
    {text === '' ? null : 
    <Outer
          initial={ { x: -100, opacity: 0 }}
          animate={{ x: 0 ,opacity: 1 }}
          transition={{
            duration: 0.4,
            scale: [0, 1, 0.5, 1],
          }}>
        <Container>
            <TitleBox>{title} (${pledge})</TitleBox>
            <DescBox>{text}</DescBox>
            <RewardDesc><Col><E>Includes</E><li>{delivery}</li></Col></RewardDesc> 
            <RewardDesc><Col><E>Estimated delivery</E><li>{estimation}</li></Col></RewardDesc> 
        </Container>
    </Outer>}
    </>
}

