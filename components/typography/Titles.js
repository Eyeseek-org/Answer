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
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 5%;
  margin-bottom: 4%;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1em;
  font-family: 'Gemunu Libre';
  letter-spacing: 0.4px;
  &:hover{
    cursor: pointer;
  }
`

export const WarnTitle = styled.div`
  position: relative;
  font-family: 'Neucha';
  font-style: normal;
  letter-spacing: 0.7px;
  font-weight: 600;
  font-size: 0.9em;
  color: ${(props) => props.theme.colors.font};
  margin-bottom: 2%;
  margin-left: 2%;
`