import styled from 'styled-components';

export const ButtonRow = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background: ${(props) => props.theme.colors.black};
  padding: 2%;
  padding-right: 5%;
`;

export const Buttons = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: 'Neucha';
  font-style: italic;
  font-weight: 400;
  padding-right: 15px;
  letter-spacing: 0.2px;
  font-size: 1.2em;
  color: #b0f6ff;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
  @media (min-width: 1780px) {
    font-size: 1.4em;
  }
`;
