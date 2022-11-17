import { Navigation } from './Navigation';
import { LogoComponent } from './Logo';
import { ConnectWithNotifications } from './ConnectWithNotifications';
import { HeaderBox } from './styles';

const Header = () => (
  <HeaderBox>
    <LogoComponent />
    <Navigation />
    <ConnectWithNotifications />
  </HeaderBox>
);

export default Header;
