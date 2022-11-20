import styled from 'styled-components'

export const TxStatus = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.gradient};
  border-radius: 5px;
  padding: 5%;
  font-family: 'Courier New';
  font-size: 0.8em;
  @media (min-width: 1580px) {
    font-size: 1.1em;
  }
`;

export const AnimBox = styled.div`
  position: absolute;
  right: 10%;
  top: 0;
  opacity: 0.7;
`;

export const LogRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

export const Ref = styled.div`
  color: ${(props) => props.theme.colors.primary};
  margin-left: 5px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

export const InfoTag = styled.div`
  background: #0d0d0d;
  padding: 2px;
  border-radius: 5px;
  margin-right: 3%;
`;

export const Ok = styled.div`
  color: #00f600;
  text-align: left;
`;

export const Err = styled.div`
  color: red;
  text-align: right;
  font-family: 'Neucha';
  margin-top: 2%;
  font-size: 0.9em;
`;