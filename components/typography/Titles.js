import styled from "styled-components";

export const FeatureTitle = styled.div`
  margin-top: 1em;
  font-family: 'Gemunu Libre';
  font-style: normal;
  font-weight: 500;
  font-size: 1.7em;
  color: ${(props) => props.theme.colors.primary};
  @media (min-width: 1580px) {
    font-size: 2.2em;
  }
`;

export const ProjectTitle = styled.div`
  font-family: 'Gemunu Libre';
  font-style: normal;
  font-weight: 700;
  font-size: 1.5em;
  color: ${(props) => props.theme.colors.primary};
  margin-top: 5%;
`

export const RewardTitle = styled.div`
  padding-bottom: 2%;
  border-bottom: 1px dashed ${(props) => props.theme.colors.gray};
  margin-bottom: 4%;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1em;
  font-family: 'Gemunu Libre';
  letter-spacing: 0.4px;
`

export const WarnTitle = styled.div`
  position: relative;
  font-family: 'Neucha';
  font-style: normal;
  letter-spacing: 0.4px;
  font-weight: 600;
  font-size: 0.9em;
  color: ${(props) => props.theme.colors.font};
  margin-bottom: 2%;
  margin-left: 2%;
`