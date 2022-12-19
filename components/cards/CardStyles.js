import styled from 'styled-components'

export const IconWrapper = styled.button`
  position: relative;
  background: inherit;
  border: none;
  padding-left: 10px;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const Inactive = styled.div`
  position: absolute;
  display: flex;
  font-size: 2em;
  font-family: 'Neucha';
  color: #d90000;
`;

export const DetailBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: ${(props) => props.theme.colors.cardGradient};
  border: 1px solid #2f2f2f;
  padding: 3%;
  padding-left: 5%;
  margin-left: 15%;
  margin-right: 15%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin: 1%;
    padding: 1%;
    padding-left: 3%;
    padding-right: 3%;
  }
  @media (min-width: 2100px) {
    margin-left: 25%;
    margin-right: 25%;
  }
`;

export const ProjectType = styled.div`
  position: absolute;
  left: -20px;
  font-family: 'Neucha';
  top: 0;
  display: flex;
  flex-direction: column;
`;

export const Categories = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;


export const LeftPart = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5%;
    margin-top: 5%;
  }
`;

export const ActionPanel = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0;
  top: 10px;
  right: 4%;
`;

export const RightPart = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 3px solid #b0f6ff;
  width: 50%;
  margin-left: 3%;
  margin-top: 2%;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    margin-top: 5%;
    margin-bottom: 5%;
  }
`;

export const SmallBal = styled.div`
  font-size: 0.7em;
  margin-left: 20px;
  font-family: 'Gemunu Libre';
  opacity: 0.9;
  color: ${(props) => props.theme.colors.font};
  display: flex;
  flex-direction: row;
  gap: 7px;
`;