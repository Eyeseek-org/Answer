import styled from "styled-components"

export const BodyBox = styled.div`
  margin-top: 3%;
  margin-left: 17%;
  margin-right: 17%;
  @media (max-width: 768px) {
        padding-left: 2%;
        padding-right: 2%;
    }
`

export const AbsoluteRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

export const AbsoluteLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 5%;
  padding-left: 18%;
  padding-right: 18%;
  @media (max-width: 750px) {
    padding: 0 5%;
  }
  @media (min-width: 2000px) {
    padding-left: 25%;
    padding-right: 25%;
  }
`

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