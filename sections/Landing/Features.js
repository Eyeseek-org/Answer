import FeatureCard from '../../components/cards/FeatureCard'
import { BlockchainIcon, MicrofundIcon, PiggyIcon, StreamIcon } from '../../components/icons/Landing'
import styled from 'styled-components'
import { useState } from 'react'
import Image from 'next/image'
import cross from '../../public/cross.gif'
import chaindonation from '../../public/chaindonation.gif'
import fee from '../../public/fee.gif'
import SectionTitle from '../../components/typography/SectionTitle'

const Container = styled.div`
    position: relative;
    margin-top: 10%;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`

const ContentBox = styled.div`
    margin-top: 5%;
`

const A = styled.a`
    color: #989898;
`

const P = styled.a`
    color: #8247e5;
`

const B = styled.a`
    color: #FFC107;
`

const F = styled.a`
    color: #19e1ff;
`

const G = styled.a`
    color: #00FC83;
`

const R = styled.a`
    color: #FF0000;
`

const Texts = {
    title1: "Crosschain UX",
    description1: "No matter from which chain backers donate, thanks to the Axelar Network, total amount will sum up across all. Currently supported backing from Polygon, BNB Chain, Fantom.",
    title2: "Microfunds",
    description2: "Backers can deploy microfunds instead of classic donations and each time someone after donates, the same amount is charged from all microfunds until they are depleted. With good strategy even $1 donation could have $100 impact.",
    title3: "5x cheaper than Kickstarter",
    description3: "Our infrastructure is powered by blockchain smart contracts, the infrastructure is much more cheaper than traditional crowdfunding companies like Kickstarter, which takes 5% platform fee for successful projects.",
    title4: "Money streaming",
    description4: "Already started project and need long-term support? Create a funding type using our crypto payment streaming, backers can flow resources real-time and turn on/off the streams based on your delivery."
}

const CrossDescription = () => {
    return <>
        No matter from which chain backers donate, thanks to the <A>Axelar Network</A>, total amount will sum up across all. Currently supported backing from <P>Polygon</P>, <B>BNB Chain</B>, <F>Fantom</F>.
    </>
}

const MicroDescription = () => {
    return <>
        Backers can deploy microfunds instead of classic donations and each time someone after donates, the same amount is charged from all microfunds until they are depleted. With good strategy even <G>$1 donation could have $100 impact</G>.
    </>
}

const FeeDescription = () => {
    return <>
        Our infrastructure is powered by blockchain smart contracts, the decentralized infrastructure is just cheaper than <R>Kickstarter's, which charges 5% platform fee</R> from successful projects to profit.
    </>
}

const Features = () => {
    const [demoMicro, setDemoMicro] = useState(false)
    const [demoFunding, setDemoFunding] = useState(false)
    const [demoFee, setDemoFee] = useState(false)


    return <Container>
    
        <SectionTitle title='Key concepts' subtitle='How is Eyeseek different' />
        <ContentBox>
            <Row>
                {demoMicro ? <FeatureCard icon={<BlockchainIcon width={50} />} title={Texts.title1} description={<Image src={cross} layout='responsive' />} onClick={() => { setDemoMicro(!demoMicro) }} /> :
                    <FeatureCard icon={<BlockchainIcon width={50} />} title={Texts.title1} description={<CrossDescription />} onClick={() => { setDemoMicro(!demoMicro) }} />}

                {demoFunding ? <FeatureCard icon={<MicrofundIcon width={50} />} title={Texts.title2} description={<Image src={chaindonation} layout='responsive' />} onClick={() => { setDemoFunding(!demoFunding) }} /> :
                    <FeatureCard icon={<MicrofundIcon width={50} />} title={Texts.title2} description={<MicroDescription />} onClick={() => { setDemoFunding(!demoFunding) }} />
                }
            </Row>
            <Row>
                {demoFee ? <FeatureCard icon={<PiggyIcon width={50} />} title={Texts.title3} description={<Image src={fee} layout='responsive' />} onClick={() => { setDemoFee(!demoFee) }} /> :
                    <FeatureCard icon={<PiggyIcon width={50} />} title={Texts.title3} description={<FeeDescription />} onClick={() => { setDemoFee(!demoFee) }} />
                }
                <FeatureCard icon={<StreamIcon width={50} />} title={Texts.title4} description={Texts.description4} />
            </Row>
        </ContentBox>
    </Container>
}

export default Features