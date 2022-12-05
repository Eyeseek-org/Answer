import Link from 'next/link';
import { Container, FooterItem, FooterSection, FooterTitle } from './Footer.styles';
import { socialLinks, refLinks, docLinks } from './footerLinks';


const Footer = (): JSX.Element => {
  return (
    <Container>
       <FooterSection>
        <FooterTitle>Documentation</FooterTitle>
        {docLinks.map(({ href, text, icon, target }) => {
          return (
              <FooterItem>
                <Link href={href} target={target} rel="noopener noreferrer">
                  <div>
                    {icon}
                    {text}
                  </div>
                </Link>
              </FooterItem>
          );
        })}
      </FooterSection>
      <FooterSection>
        <FooterTitle>Contact</FooterTitle>
        {socialLinks.map(({ href, text, icon, target }) => {
          return (
              <FooterItem>
                <Link href={href} target={target} rel="noopener noreferrer">
                  <div>
                    {icon}
                    {text}
                  </div>
                </Link>
              </FooterItem>
          );
        })}
      </FooterSection>
      <FooterSection>
       <FooterTitle>References</FooterTitle>
        {refLinks.map(({ href, text, icon, target }) => {
          return (
              <FooterItem>
                <Link href={href} target={target} rel="noopener noreferrer">
                  <div>
                    {icon}
                    {text}
                  </div>
                </Link>
              </FooterItem>
          );
        })}
      </FooterSection>
    </Container>
  );
};

export default Footer;
