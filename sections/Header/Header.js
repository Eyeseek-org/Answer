import { Navigation } from './Navigation';
import { LogoComponent } from './Logo';
import { ConnectWithNotifications } from './ConnectWithNotifications';
import Reapop from '../../components/notifications/Reapop'
import styled from 'styled-components';
import { motion } from 'framer-motion'

const HeaderBox = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  padding: 2%;
  z-index: 100;
  @media (max-width: 768px) {
    justify-content: center;
  }
`


const Header = () => (
  <HeaderBox      
    initial={{ opacity: 0, y: -180 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      ease: "easeInOut",
      duration: 1,
      delay: 0.6,
    }}>
    <LogoComponent />
    <Navigation />
    <ConnectWithNotifications />
    <Reapop/>
  </HeaderBox>
);

export default Header;
