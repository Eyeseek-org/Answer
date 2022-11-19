import styled from 'styled-components'
import { RewardIcon } from '../icons/Common'
import { Erc20ActiveIcon, Erc20Icon, NftActiveIcon, NftIcon, RewardActiveIcon } from '../icons/Project'

const Container = styled.div`
  display: flex;
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
    border-radius: 15px;
    background: ${(props) => props.theme.colors.invisible};
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
`


const IconBox = styled.div`
    margin-left: 10px;
`

const ActBox = styled(IconBox)`
    border-radius: 90px;
    box-shadow: 0px 2px 10px 0px ${(props) => props.theme.colors.font};
`

const Tab = ({ active, o1, o2, o3, o4, o5, change1, change2, change3, change4, change5 }) => {

    const Item = ({ act, text, onClick }) => {
        return <>{active === act ? 
            <Active>
                {text === 'Classic' && <ActBox><RewardActiveIcon width={60} height={60} /></ActBox>} 
                {text === 'ERC20' && <ActBox><Erc20ActiveIcon width={60} height={60}  /></ActBox>}
                {text === 'ERC1155' && <ActBox><NftActiveIcon width={60} height={60} /></ActBox>}
                {text !== 'ERC20' && text !== 'ERC1155' && text !== 'Classic' && <>{text}</> }
            </Active> : 
            <Inactive onClick={onClick}>
                {text === 'Classic' && <IconBox><RewardIcon width={60} height={60}  /></IconBox>} 
                {text === 'ERC20' && <IconBox><Erc20Icon width={60} height={60} /></IconBox>}
                {text === 'ERC1155' && <IconBox><NftIcon width={60}  height={60} /></IconBox>}
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
