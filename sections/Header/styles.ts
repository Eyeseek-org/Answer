import { motion } from 'framer-motion';
import styled from 'styled-components';

interface LinkATagProps {
  bold?: boolean;
}

export const NavigationMenuBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;

  @media (max-width: 960px) {
    padding: 0;
    flex-wrap: wrap;
    display: none;
  }
  @media (min-width: 1780px) {
    gap: 125px;
  }
`;

export const NavItem = styled.div`
  display: flex;
  font-size: 1.6em;
  font-family: 'Gemunu Libre', sans-serif;
  font-style: normal;
  font-weight: ${(props: LinkATagProps) => props.bold === true && 'bold'};
  align-items: center;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 8px 0px ${(props) => props.theme.colors.invisible};
  letter-spacing: 1px;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
    box-shadow: 0px 0px 8px 0px ${(props) => props.theme.colors.transparent};
  }
  @media (max-width: 768px) {
    font-size: 1em;
    flex-wrap: wrap;
  }
  @media (min-width: 1580px) {
    font-size: 2em;
  }
`;

export const ImageBox = styled.div`
  display: block;
  @media (max-width: 768px) {
    font-size: 0.8em;
    flex-wrap: wrap;
    padding-right: 10%;
    right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const ConnectWalletBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const IconFrame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid white;
  padding: 4px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const Notis = styled(motion.div)`
  position: absolute;
  color: ${(props) => props.theme.colors.font};
  text-align: center;
  align-items: center;
  width: 17px;
  height: 17px;
  font-size: 13px;
  padding: 2%;
  border-radius: 15px;
  background: #ab0000;
  right: -10%;
  top: -20%;
`;

export const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  padding: 2%;
  z-index: 100;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
