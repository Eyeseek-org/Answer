import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5%;
  padding: 5%;
  margin-bottom: 2%;
  margin-top: 2%;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterItem = styled.div`
  display: flex;
  transition: 0.1s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
  font-size: 1em;
  font-family: 'Gemunu Libre', sans-serif;
  font-style: normal;
  letter-spacing: 1px;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;
