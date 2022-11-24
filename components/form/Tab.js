import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 1%;
  color: ${(props) => props.theme.colors.font};
  padding: 0.5%;
  width: 40%;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Inactive = styled.div`
    font-size: 0.9em;
    font-family: 'Montserrat';
    padding: 2%;
    cursor: pointer;
    background: ${(props) => props.theme.colors.invisible};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    transition: 0.2s;
    box-shadow: 0px 0px 0px 0px ${(props) => props.theme.colors.font};
    &:hover{
        opacity: 0.7;
    }
    @media (min-width: 1768px) {
        font-size: 1.1em;
    }
`

const Active = styled(Inactive)`
    color: ${(props) => props.theme.colors.primary};
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
`


const Tab = ({ active, o1, o2, o3, o4, o5, change1, change2, change3, change4, change5 }) => {


    const Item = ({ act, text, onClick }) => {
        return <>{active === act ? 
            <Active>

                {text !== 'ERC20' && text !== 'ERC1155' && text !== 'Classic' && <>{text}</> }
            </Active> : 
            <Inactive onClick={onClick}>

                {text !== 'ERC20' && text !== 'ERC1155' && text !== 'Classic' && <>{text}</> }
            </Inactive>
        }</>
    }
    return <Container>

        <Item act={o1} text={o1} onClick={change1} />
        <Item act={o2} text={o2} onClick={change2} />

        {o3 && <><Item act={o3} o={o3} text={o3} onClick={change3} /></>}
        {o4 && <><Item act={o4} o={o4} text={o4} onClick={change4} /></>}
        {o5 && <><Item act={o5} o={o5} text={o5} onClick={change5} /></>}
    </Container>
}

export default Tab
