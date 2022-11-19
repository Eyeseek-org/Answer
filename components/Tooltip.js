import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: ${(props) => (props.margin ? `${props.margin}` : '-30px')};
  background: ${(props) => props.theme.colors.black};
  border-radius: 5px;
  padding: 5px;
  color: ${(props) => props.theme.colors.font};
  min-width: 200px;
  text-align: center;
  letter-spacing: 0.3px;
  font-size: 0.8em;
  font-family: 'Neucha';
  border: 1px solid ${(props) => props.theme.colors.border};
  @media (min-width: 1580px) {
    font-size: 1em;
  }
`;

const Tooltip = ({ text, margin }) => {
  return <Container margin={margin}>{text}</Container>;
};

export default Tooltip;
