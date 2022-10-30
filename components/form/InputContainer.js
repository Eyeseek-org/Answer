import styled from "styled-components"
import {useState} from "react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
  font-family: "Montserrat";
  .input_label {
    width: 20%;

  }

  .input_style {
    text-decoration: none;
    padding: 12px 10px;
    border-radius: 5px;
    border-style: none;
    width: 100%;
  }

  .input_description {
    font-size: 0.7em;
  }
  
  .input_description_container {
  
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .input_container {
    width: 100%;
  }
  
  .input_error {
  font-size: 0.7em;
  color: #ff0000;
  font-family: "Montserrat";
  }
`;

const InputContainer = ({label, name, placeholder,onChange, description, type, maxLength, isError, errorText}) => {
    const [counter, setCounter] = useState(0);

    const handleChange = (e) => {
        onChange(e);
        setCounter(e.target.value.length);
    }

    return <Container>
        <label className="input_label">{label}</label>
        <div className="input_container">
            {type === 'number' &&  <input name={name} className="input_style" type="number" maxLength={maxLength} placeholder={placeholder} onChange={handleChange}/> }
            {type === 'textArea' &&  <textarea name={name} className="input_style" type="text" maxLength={maxLength} placeholder={placeholder} onChange={handleChange}/> }
            {type === 'text' && <input name={name} className="input_style" type="text" maxLength={maxLength} placeholder={placeholder} onChange={handleChange} />}
         <div className="input_description_container">
             {isError ? (<div className="input_error">{errorText}</div>) : (<div className="input_description">{description}</div>)}
             {maxLength && <div className="input_description">{counter} / {maxLength}</div>}
         </div>
        </div>
    </Container>
}

export default InputContainer