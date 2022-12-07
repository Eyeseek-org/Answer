import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.colors.body};
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 1px solid #003e46;
  gap: 7%;
  padding: 5%;
  margin-bottom: 2%;
  margin-top: 2%;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FooterItem = styled.div`
  transition: 0.1s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  font-size: 1em;
  font-family: 'Gemunu Libre', sans-serif;
  font-style: normal;
  padding-top: 5%;
  width: 100%;
  letter-spacing: 1px;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;


export const FooterTitle = styled.div`
  font-size: 1.1em;
  font-family: 'Montserrat';
  padding-bottom: 2%;
  margin-bottom: 5%;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 5%;
  }
  @media (min-width: 1968px) {
    font-size: 1.2em;
  }
`;
