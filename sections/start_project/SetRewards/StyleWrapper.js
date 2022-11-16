import styled from 'styled-components';

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  margin-top: 5%;
`;

export const RewardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 18%;
  padding-right: 18%;
  margin-top: 3%;
  @media (max-width: 768px) {
    padding-left: 9%;
    padding-right: 3%;
  }
`;
export const TabRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const TooltipBox = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  margin-top: 3%;
`;

export const IconBox = styled.div`
  margin-left: 2px;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const RewardDesc = styled.div`
  font-size: 0.9em;
  font-family: 'Montserrat';
  border-bottom: 1px solid #3a3a3a;
  padding-bottom: 2%;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 5%;
  }
  @media (min-width: 1968px) {
    font-size: 1.2em;
  }
`;

export const ButtonBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 350px;
  left: 15px;
  align-items: left;
  gap: 20px;
  @media (max-width: 768px) {
    top: 200px;
  }
`;

export const RewardButton = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: row;
  width: 190px;
  justify-content: space-between;
  background: transparent;
  border: none;
  font-size: 1.1em;
  text-align: left;
  letter-spacing: 0.2px;
  transition: 0.2s;
  padding-bottom: 5px;
  border-bottom: 1px solid #3a3a3a;
  font-family: 'Neucha';
  &:hover {
    cursor: pointer;
    opacity: 0.9;
    box-shadow: inset 0px 5px 20px rgba(255, 255, 255, 0.25);
  }
  @media (max-width: 768px) {
    border: none;
    padding-bottom: 10px;
  }
`;

export const RewardAction = styled.div`
  @media (max-width: 1228px) {
    display: none;
  }
`;

export const Disclaimer = styled.div`
  font-size: 0.9em;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const DisclaimerAdd = styled.div`
  margin-top: 5%;
  letter-spacing: 0.2px;
  padding-bottom: 5px;
  border-bottom: 1px solid #3a3a3a;
  font-family: 'Neucha';
  font-size: 1.3em;
  box-shadow: inset 0px 5px 20px rgba(255, 255, 255, 0.25);
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
