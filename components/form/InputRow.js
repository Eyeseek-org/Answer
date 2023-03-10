import styled, {useTheme} from 'styled-components';
import { useState } from 'react';
import { InfoIcon } from '../icons/Common';
import Tooltip from '../Tooltip';



const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 2%;
  color: white;
  font-family: 'Roboto';
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const InputInnerWrapper = styled.div`
  width: 80%;
  position: relative;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const InputAmount = styled.div`
  position: absolute;
  right: 4%;
  top: 30%;
`;

const Input = styled.input`
  background: ${(props) => props.theme.colors.input};
  border: 1px solid #ffffff;
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  margin-bottom: 10px;

  // hiding input spinner on "input[type=number]" for Chrome, Safari, Edge, Opera
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  // hiding input spinner on "input[type=number]" for Firefox
  -moz-appearance: textfield;
`;

const DonationRow = styled.div`
  width: 30%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 769px) {
    width: 45%;
  }
  @media (max-width: 500px) {
    margin-bottom: 1rem;
    width: 100%;
  }
  @media (min-width: 1580px) {
    font-size: 1.3em;
  }
`;

const InfoBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const InputRow = ({ id, name, min, placeholder, onChange, onBlur, tooltip, currency }) => {
  const [isTooltip, setIsTooltip] = useState();
  const theme = useTheme();

  return (
    <InputWrapper>
      {isTooltip && <Tooltip text={tooltip} margin={'-110px'}/>}
      <DonationRow>
        {' '}
        <div>{name}</div>{' '}
        <InfoBox
          onMouseEnter={() => {
            setIsTooltip(true);
          }}
          onMouseLeave={() => {
            setIsTooltip(false);
          }}
        >
          {' '}
          <InfoIcon width={15} color={theme.colors.icon} />
        </InfoBox>
      </DonationRow>
      <InputInnerWrapper>
        <Input
          id={id}
          name={name}
          min={min}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          inputMode="numeric"
        />
        <InputAmount>{currency}</InputAmount>
      </InputInnerWrapper>
    </InputWrapper>
  );
};

export default InputRow;
