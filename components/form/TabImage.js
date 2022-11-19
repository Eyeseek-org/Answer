import styled from 'styled-components'
import { Row } from '../format/Row'
import { BookmarkFilledIcon, BookmarkIcon } from '../icons/Common'
import { StreamIcon } from '../icons/Landing'
import { DonateActiveIcon, DonateIcon, ProjectActiveIcon, ProjectIcon } from '../icons/Project'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.colors.font};
  padding: 0.5%;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1%;
    padding-left: 3%;
    padding-right: 8%;
    gap: 10%;
`

const Inactive = styled.div`
    font-size: 0.9em;
    font-family: 'Montserrat';
    padding-right: 2%;
    cursor: pointer;
    transition: 0.2s;
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


const TabImage = ({ active, o1, o2, o3, o4, o5, change1, change2, change3, change4, change5 }) => {

    // Doplnit hover - odebrat výplň

    const Item = ({ act, text, onClick }) => {
        return <>{active === act ? 
            <Active>
                {text === 'Projects' && <Row><ProjectActiveIcon width={50} /><div>{text}</div></Row>} 
                {text === 'Donates' && <Row><DonateActiveIcon width={50} /><div>{text}</div></Row>}
                {text === 'Bookmarks' && <Row><BookmarkFilledIcon width={50} /><div>{text}</div></Row>}
                {text === 'Streams' && <Row><StreamIcon width={50} /><div>{text}</div></Row>}
            </Active> : 
            <Inactive onClick={onClick}>
                {text === 'Projects' && <Row><ProjectIcon width={50}/><div>{text}</div></Row>} 
                {text === 'Donates' && <Row><DonateIcon width={50} /><div>{text}</div></Row>}
                {text === 'Bookmarks' && <Row><BookmarkIcon width={50} /><div>{text}</div></Row>}
                {text === 'Streams' && <Row><StreamIcon width={50}  /><div>{text}</div></Row>}
            </Inactive>
        }</>
    }
    return <Container>
    <Menu>
        <Item act={o1} text={o1} onClick={change1} />
        <Item act={o2} text={o2} onClick={change2} />

        {o3 && <><Item act={o3} o={o3} text={o3} onClick={change3} /></>}
        {o4 && <><Item act={o4} o={o4} text={o4} onClick={change4} /></>}
        {o5 && <><Item act={o5} o={o5} text={o5} onClick={change5} /></>}
    </Menu>
    </Container>
}

export default TabImage