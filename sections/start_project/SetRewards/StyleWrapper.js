import styled from "styled-components";

export const ButtonRow = styled.div`
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    margin-top: 5%;
`

export const RewardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 18%;
  padding-right: 18%;
  margin-top: 3%;
`
export const TabRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;

  }
`

export const TooltipBox = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  margin-top: 3%;
`

export const IconBox = styled.div`
  margin-left: 2px;
  &:hover{
    cursor: pointer;
    opacity: 0.9;
  }
`

export const RewardDesc = styled.div`
    font-size: 0.8em;
    font-family: 'Montserrat';
    border-bottom: 1px solid #3a3a3a;
    padding-bottom: 2%;
    @media (max-width: 768px) {
      width: 100%;
      margin-top: 5%;
    }
`

export const TokenTooltip = styled.div`
  position: absolute;
  bottom: -30px;
  right: -250px;
  width: 100%;
`