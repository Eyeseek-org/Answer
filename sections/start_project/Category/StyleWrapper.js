import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 2%;
  margin-bottom: 2%;
  gap: 20px;
`

export const SiteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 18%;
  padding-right: 18%;
  margin-top: 3%;
`

export const NextButton = styled.button`
  background-color: #3c4048;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #7bd3d3;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-color: #9bffff;
  }
`

export const DisButton = styled(NextButton)`
  opacity: 0.2;
  &:hover{
    cursor: not-allowed;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5%;
  margin-bottom: 15%;
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
