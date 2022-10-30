import styled from 'styled-components'
import {useState} from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3%;
  color: white;
  padding: 0.5%;
  border-bottom: 1px solid #3a3a3a;
  margin-right: 60%;
  width: 100%;
`

const Inactive = styled.div`
    font-size: 0.8em;
    font-family: 'Montserrat';
    cursor: pointer;
    transition: 0.2s;
    &:hover{
        opacity: 0.8;
    }
`

const Active = styled(Inactive)`
    color: #b0f6ff;
`

const Divider = styled.div`
    width: 1px;
    height: 10px;
    background: #3a3a3a;
`

/// TBD connect it with parent

const Tab = ({o1, o2, o3, onClick}) => {
    const [active, setActive] = useState(o1)

    const handleChange = (v) => {
        setActive(v)
    }

    const Item = ({o, text, onClick}) => {
        return <>{active === o ? <Active>{text}</Active> : <Inactive onClick={onClick}>{text}</Inactive>}</>
    }
    return <Container onClick={onClick}>
        <Item o={o1} text={o1} onClick={() => handleChange(o1)}/>
            <Divider/>
        <Item o={o2} text={o2} onClick={() => handleChange(o2)}/>
          
      {o3 && <>  <Divider/><Item o={o3} text={o3} onClick={() => handleChange(o3)}/></>}
    </Container>
}

export default Tab