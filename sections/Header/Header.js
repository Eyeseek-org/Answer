import { Navigation } from './Navigation';
import { LogoComponent } from './Logo';
import { ConnectWithNotifications } from './ConnectWithNotifications';
import { HeaderBox } from './styles';
import Reapop from '../../components/notifications/Reapop'


const Header = () => (
  <HeaderBox>
    <LogoComponent />
    <Navigation />
    <ConnectWithNotifications />
    <Reapop/>
  </HeaderBox>
);

export default Header;
