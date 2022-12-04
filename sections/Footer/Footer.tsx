import Link from 'next/link';
import { Container, FooterItem, FooterSection } from './Footer.styles';
import { footerLinks } from './footerLinks';


const Footer = (): JSX.Element => {
  return (
    <Container>
      {footerLinks.map(({ href, text, icon, target }) => {
        return (
          <FooterSection>
            <FooterItem>
              <Link href={href} target={target} rel="noopener noreferrer">
                <a>
                  {icon}
                  {text}
                </a>
              </Link>
            </FooterItem>
          </FooterSection>
        );
      })}
    </Container>
  );
};

export default Footer;
