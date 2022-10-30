import styled from "styled-components"
import { DiscordIcon, EmailIcon, MediumIcon, TwitterIcon } from "../components/icons/Socials"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5%;
  padding: 5%;
  margin-bottom: 2%;
  margin-top: 2%;
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterItem = styled.div`
  display: flex;
  transition: 0.1s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
  font-size: 1em;
  font-family: "Gemunu Libre", sans-serif;
  font-style: normal;
  letter-spacing: 1px;
  color: #b0f6ff;
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`

const HeadSection = () => {
  return (
    <>
      <Container>
        <FooterSection>
          <FooterItem>
            {" "}
            <a href="mailto: eyeseek@proton.me">
              {" "}
              <EmailIcon width={50} />
              eyeseek@proton.me
            </a>
          </FooterItem>
        </FooterSection>
        <FooterSection>
          <FooterItem>
            {" "}
            <a href="https://discord.gg/JnTgUEZvtR" target="_blank" rel="noopener noreferrer">
              <DiscordIcon width={30} />
              Discord
            </a>
          </FooterItem>
        </FooterSection>
        <FooterSection>
          <FooterItem>
            <a href="https://twitter.com/Eyeseek6" target="_blank" rel="noopener noreferrer">
              {" "}
              <TwitterIcon width={30} />
              Twitter
            </a>
          </FooterItem>
        </FooterSection>
        <FooterSection>
          <FooterItem>
            <a href="https://medium.com/eyeseek" target="_blank" rel="noopener noreferrer">
              <MediumIcon width={30} />
              Medium
            </a>
          </FooterItem>
        </FooterSection>
      </Container>
    </>
  )
}

export default HeadSection
