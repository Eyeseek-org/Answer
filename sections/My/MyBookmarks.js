import styled from 'styled-components'
import BookmarkTable from '../../components/tables/BookmarkTable'
import Subtitle from '../../components/typography/Subtitle'
import { Wrapper } from '../../components/format/Box'

const Container = styled.div`
    text-align: center;
`

const MyBookmarks = () => {

    return <Container>  
        <Subtitle text="Watched projects" />
        <Wrapper>
            <BookmarkTable/>
        </Wrapper>
    </Container>
}

export default MyBookmarks