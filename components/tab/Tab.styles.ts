import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1%;
  color: ${(props) => props.theme.colors.font};
  padding: 0.5%;
  width: 40%;
  margin-top: 3%;
  margin-left: 17%;
  margin-right: 17%;

  @media (max-width: 768px) {
    padding-left: 2%;
    padding-right: 2%;
    width: 100%;
  }
`;

export const TabHeader = styled.div`
  font-size: 0.9em;
  font-family: 'Montserrat';
  padding: 2%;
  cursor: pointer;
  border-radius: 15px;
  background: ${(props) => props.theme.colors.invisible};
  transition: 0.2s;
  box-shadow: 0px 0px 0px 0px ${(props) => props.theme.colors.font};

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: 1768px) {
    font-size: 1.1em;
  }
`;
