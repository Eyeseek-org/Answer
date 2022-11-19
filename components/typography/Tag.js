import styled from 'styled-components';

const Box = styled.div`
  text-align: center;
  padding: 1%;
  background: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  border-radius: 45px;
  padding-left: 15px;
  padding-right: 15px;
`;

const Text = styled.div`
  font-family: 'Neucha';
  font-style: normal;
  font-weight: 300;
  font-size: 0.9em;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.colors.font};
  @media (min-width: 1980px) {
    font-size: 1.1em;
  }
`;

const Tag = ({ tag, color, icon }) => {
  return (
    <>
      <Box color={color}>{icon ? <></> : <Text>{tag}</Text>}</Box>
    </>
  );
};

export default Tag;
