import styled from 'styled-components'

export const MainContainer = styled.div`
  padding-top: 5%;
  margin-bottom: 10%;
  animation: fadeIn 0.7s;
    @keyframes fadeIn {
        0% {
        opacity: 0;
        }
        100% {
        opacity: 1;
        }
    }
`


export const MainMilestoneContainer = styled.div`
  margin-top: 20px;
  background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
  border: 1px solid #3C3C3C;
  border-radius: 5px;
  width: 100%;
  padding: 5%;
  border-radius: 10px;
`;

export const MilestoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;

export const RewardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 18%;
  padding-right: 18%;
  margin-top: 3%;
`