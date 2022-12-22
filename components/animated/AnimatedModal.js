import styled from "styled-components";
import { motion } from "framer-motion";



export const AnimatedModal = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 0;
  z-index: 80;
  top: 15%;
  transition: all 0.5s ease-in-out;
  height: 500px;
  width: ${(props) => (props.expand ? '700px' : '300px')};
  background: ${(props) => props.theme.colors.body};
  border-radius: 10px;
  border: 1px solid #4e4e4e;
  overflow-y: scroll;
  margin: 5px;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 2px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

/* Handle */
::-webkit-scrollbar-thumb {
  background: #9bffff;
}
@media (max-width: 768px) {
  max-width: 100%;
  flex-wrap: wrap;
  padding-left: 3%;
  padding-right: 3%;
}
`;