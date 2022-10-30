import styled from "styled-components"

export const RulesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: left;
  flex-direction: column;
  text-align: left;
  padding-left: 17%;
  padding-right: 17%;
  margin-top: 7%;
`

export const RulesTitle = styled.p`
    font-size: 1.3em;
    font-weight: normal;
    font-family: "Neucha";
    margin-bottom: 5%;
    letter-spacing: 0.2px;
`

export const WarningBox = styled.div`
    background: rgba(9, 0, 0, 0.3);
    border: 1px solid #500000;
    border-radius: 5px;
    padding: 4%;
    color: #FFFFFF;
`

export const Li = styled.li`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 00;
    font-size: 0.8em;
    line-height: 2em; 
    letter-spacing: 0.01em;
    color: #FFFFFF;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 8%;
    padding-bottom: 4%;
    gap: 10%;
    border-bottom: 1px solid #262626;
    @media (max-width: 868px) {
        flex-wrap: wrap;
    }
`

export const ImageBox = styled.div`
    display: flex;
    padding-left: 1%;
`

export const Ok = styled.div`
    color: #00f600;
    text-align: left;
`

export const Err = styled.div`
    color: red;
    text-align: left;
`

export const Summary = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #1e1e1e;
    padding: 4%;
    border-radius: 45px;
    margin: 2%;
    font-size: 1em;
`

export const SumItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
`

export const SumTitle = styled.div`
    font-weight: 300;
    font-size: 0.8em;
    font-style: italic;
    font-family: 'Roboto';
    opacity: 0.9;
`

export const SumValue = styled.div`
    font-weight: 500;
    color: #B0F6FF;
    font-size: 0.95em;
    font-family: 'Neucha';
`

export const SumHalf = styled.div`
    margin-left: 8%;
    margin-right: 8%;
    text-align: ${(props) => props.align};
`

export const SumRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const SumHead = styled.div`
    text-align: center;
    font-family: 'Neucha';
    font-size: 1.3em;
    margin-bottom: 2%;
`

export const Divider = styled.div`
    align-self: center;
`

export const TxStatus = styled.div`
    position: relative;
    background: black;
    border-radius: 5px;
    padding: 5%;
    font-family: 'Courier New';
    font-size: 0.8em;
`

export const AnimBox = styled.div`
    position: absolute;
    right: 10%;
    top: 0;
    opacity: 0.7;
`

export const LogRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
`

export const Ref = styled.div`
    color: #B0F6FF;
    margin-left: 5px;
    text-decoration: underline;
    &:hover{
        cursor: pointer;
    }
`

export const InfoTag = styled.div`
    background: #0d0d0d;
    padding: 2px;
    border-radius: 5px;
    margin-right: 3%;
`

export const EyeBox = styled.div`
    position: absolute;
    margin-left: 24%;
    margin-top: 2%;
    @media (max-width: 1068px) {
        display: none;
    }
`