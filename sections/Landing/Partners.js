import styled, {useTheme} from 'styled-components'
import {motion} from 'framer-motion'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const MovingRow = styled(motion.div)`
    display: flex;
    justify-content: space-around;
`


const PartnerCard = styled.div`
    background: ${props => props.theme.colors.cardGradient};
`

const Partners = () => {
    return <Container>
        <MovingRow>
            <PartnerCard>Top row - Howdy </PartnerCard>
            <PartnerCard>Top row - Howdy </PartnerCard>
            <PartnerCard>Top row - Howdy </PartnerCard>
        </MovingRow>
        <MovingRow>
             <PartnerCard>Top row - Howdy </PartnerCard>
             <PartnerCard>Top row - Howdy </PartnerCard>
             <PartnerCard>Top row - Howdy </PartnerCard>
        </MovingRow>
    </Container>
}

export default Partners