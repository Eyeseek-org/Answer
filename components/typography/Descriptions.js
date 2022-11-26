import styled from "styled-components";

export const FeatureDescription = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  font-family: 'Neucha';
  letter-spacing: 0.8px;
  font-weight: 300;
  font-size: 1.1em;
  color: ${(props) => props.theme.colors.font};
  @media (min-width: 1580px) {
    font-size: 1.4em;
  }
`;

export const ProjectDesc = styled.div`
  font-family: 'Neucha';
  letter-spacing: 0.1px;
  font-style: normal;
  font-weight: 300;
  font-size: 17px;
  color: ${(props) => props.theme.colors.font};
  margin-top: 5%;
  @media (min-width: 1580px) {
    font-size: 21px;
  }
`

export const RewardDesc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Neucha';
  letter-spacing: 0.4px;
  font-size: 0.9em;
  margin-bottom: 2px;
  color: ${(props) => props.theme.colors.font};
  @media (min-width: 1580px) {
    font-size: 1.2em;
  }
`

export const WarnDesc = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 0.8em;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: ${(props) => props.theme.colors.font};
  margin-left: 2%;
  @media (min-width: 1580px) {
    font-size: 1.2em;
  }
`

export const Reference = styled.div`
  margin-top: 3%;
  padding-bottom: 2%;
  color: #B0F6FF;
  font-family: 'Neucha';
  text-decoration: underline;
  opacity: 0.7;
  transition: 0.2s;
  &:hover{
    opacity: 1;
  }
  @media (min-width: 1580px) {
    font-size: 1.2em;
  }
`