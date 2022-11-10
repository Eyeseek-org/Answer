import {motion} from 'framer-motion'
import styled from 'styled-components'

const MyButton = styled(motion.button)`
  background: rgba(167, 255, 176, 0.3);
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: white;
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
  cursor: pointer;
  width: ${(props) => props.width};
  @media (max-width: 768px) {
    margin: 0;
  }
  @media (min-width: 1580px) {
    font-size: 1em;
  }
`

const SuccessDisButton = ({ text, onClick, width }) => {
  return (
    <>
      <MyButton     
          whileHover={{ scale: 1.01 }} 
          transition={{ type: "spring", stiffness: 500, damping: 3 }} 
          onClick={onClick} width={width}
        >
        {text}
      </MyButton>
    </>
  )
}

export default SuccessDisButton
