import styled from "styled-components";

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
  border: 1px solid #3C3C3C;
  border-radius: 5px;
  padding: 4%;

  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #ccc;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    height: 350px;
    text-align: center;
    margin-bottom: 10px;
  }

  .input-span {
    width: 100%;
  }
`;

export const TellContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 18%;
  padding-right: 18%;
  margin-top: 3%;
  font-family: "Montserrat";
`;

export const Mandatory = styled.div`
  font-size: 0.7em;
  color: #ff0000;
  font-family: "Montserrat";
  width: 100%;
  text-align: right;
`

