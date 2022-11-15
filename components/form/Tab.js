import styled from 'styled-components'
import { RewardIcon } from '../icons/Common'
import { Erc20ActiveIcon, Erc20Icon, NftActiveIcon, NftIcon, RewardActiveIcon } from '../icons/Project'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1%;
  color: white;
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
    border: 1px solid #373737;
    background: rgba(0, 0, 0, 0.05);
    transition: 0.2s;
    box-shadow: 0px 0px 0px 0px #ffffff;
    &:hover{
        opacity: 0.7;
    }
    @media (min-width: 1768px) {
        font-size: 1.1em;
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

const IconBox = styled.div`
    margin-left: 10px;
    height: 120px;
`

const ActBox = styled(IconBox)`
    border-radius: 90px;
    box-shadow: 0px 2px 10px 0px #ffffff;
`

const Tab = ({ active, o1, o2, o3, o4, o5, change1, change2, change3, change4, change5 }) => {

    const Item = ({ act, text, onClick }) => {
        return <>{active === act ? 
            <Active>
                {text === 'Classic' && <ActBox><RewardActiveIcon width={120} height={100} /></ActBox>} 
                {text === 'ERC20' && <ActBox><Erc20ActiveIcon width={120} /></ActBox>}
                {text === 'ERC1155' && <ActBox><NftActiveIcon width={120} height={110} /></ActBox>}
                {text !== 'ERC20' && text !== 'ERC1155' && text !== 'Classic' && <>{text}</> }
            </Active> : 
            <Inactive onClick={onClick}>
                {text === 'Classic' && <IconBox><RewardIcon width={120} height={100}  /></IconBox>} 
                {text === 'ERC20' && <IconBox><Erc20Icon width={120} /></IconBox>}
                {text === 'ERC1155' && <IconBox><NftIcon width={120}  height={110} /></IconBox>}
                {text !== 'ERC20' && text !== 'ERC1155' && text !== 'Classic' && <>{text}</> }

            </Inactive>
        }</>
    }
    return <Container>
        <Item act={o1} text={o1} onClick={change1} />
        <Divider />
        <Item act={o2} text={o2} onClick={change2} />

        {o3 && <>  <Divider /><Item act={o3} o={o3} text={o3} onClick={change3} /></>}
        {o4 && <>  <Divider /><Item act={o4} o={o4} text={o4} onClick={change4} /></>}
        {o5 && <>  <Divider /><Item act={o5} o={o5} text={o5} onClick={change5} /></>}
    </Container>
}

export default Tab