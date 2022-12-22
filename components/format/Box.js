import styled from "styled-components"
import {motion} from 'framer-motion'

export const BodyBox = styled.div`
  margin-top: 3%;
  margin-left: 17%;
  margin-right: 17%;
  @media (max-width: 768px) {
     margin-left: 2%;
     margin-right: 2%;
    }
`

export const AbsoluteRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

export const Absolute = styled.div`
  position: absolute;
  top: 0;
  z-index: 150;
`

export const AbsoluteRightDown = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
`

export const AbsoluteLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 50;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding-top: 5%;
  padding-left: 18%;
  padding-right: 18%;
  @media (max-width: 750px) {
    padding: 0 5%;
  }
  @media (min-width: 2000px) {
    padding-left: 25%;
    padding-right: 25%;
  }
`

export const MainContainer = styled.div`
  position: relative;
  padding-top: 3%;
  padding-bottom: 8%;
  width: 100%;
  scroll-behavior: smooth;
  z-index: 1;
  animation: fadeIn 0.7s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const RewardBox = styled(motion.div)`
  position: relative;
  font-family: 'Montserrat';
  height: 100px;
  margin: 1%;
  padding: 6%;
  width: 200px;
  background: ${(props) => props.theme.colors.gradient};
  border: 1px solid ${(props) => props.color};
  border-radius: 5px;
  cursor: pointer;
  animation: fadeIn 0.5s;
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #9bffff;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @media (min-width: 1750px) {
    font-size: 1.1em;
  }
`;

export const SpacingBox = styled.div`
  padding-left: 16%;
  padding-right: 16%;
  @media (max-width: 768px) {
    padding-left: 2%;
    padding-right: 2%;
  }
    @media (min-width: 1968px) {
    padding-left: 30%;
    padding-right: 30%;
  }
`
export const TabBox = styled.div`
  margin-top: 3%;
  margin-bottom: 3%;
  padding-left: 16%;
  padding-right: 16%;
  font-size: 1.1em;
`;
