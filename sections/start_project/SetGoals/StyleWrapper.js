import styled from 'styled-components';

export const Image = styled.img`
  width: 40px;
  cursor: pointer;
`;

export const InactiveImage = styled.img`
  width: 40px;
  opacity: 30%;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  width: 100%;
  padding-left: 2%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15%;
  margin-bottom: 2%;
`;

export const SelectionWrapper = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.gradient};
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  padding: 15px;
`;

export const Label = styled.label`
  width: 100px;
`;

export const MilestoneContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;

export const MilestoneTitle = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

export const MainMilestoneContainer = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.gradient};
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  width: 100%;
  padding: 5%;
  border-radius: 10px;
  margin: 20px;
`;

export const MilestoneHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CancelButton = styled.button`
  background-color: red;
  border-style: none;
  border-radius: 5px;
  padding: 8px 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const BlockchainDesc = styled.div`
  font-size: 0.7em;
`;

export const StreamAnnouncement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  letter-spacing: 0.4px;
  font-size: 1.2em;
  margin-top: 2%;
  font-family: 'Gemunu Libre';
  margin-right: 17%;
  margin-left: 17%;
`;
