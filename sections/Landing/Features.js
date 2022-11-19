import FeatureCard from '../../components/cards/FeatureCard';
import {
  BlockchainIcon,
  MicrofundIcon,
  PiggyIcon,
  StreamIcon,
  CrossAnim,
  LightAnim,
  CostAnim,
  StreamAnim,
  RewardAnim,
  RewardLandingIcon,
} from '../../components/icons/Landing';
import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import cross from '../../public/cross.gif';
import chaindonation from '../../public/chaindonation.gif';
import fee from '../../public/fee.gif';
import SectionTitle from '../../components/typography/SectionTitle';
import { P, B, F, G, R } from '../../components/typography/ColoredTexts';

const Container = styled.div`
  position: relative;
  margin-top: 10%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const ContentBox = styled.div`
  margin-top: 5%;
`;

const Texts = {
  title1: 'Multichain experience',
  description1: <>You can create and donate to projects on multiple blockchains, currently supported <P>Polygon</P>, <B>BNB Chain</B>, and <F>Fantom</F></>,
  title2: 'Microfunds',
  description2:<>With <B>chain funding</B> capacities of Eyeseek microfunds, each time someone donates, the same amount is charged from all deployed
  microfunds until they are depleted. With right strategy even <G>$1 donation could have $100 impact</G>.</>,
  title3: 'Cheapest crowdfunding around',
  description3:<>Our infrastructure is powered by blockchain smart contracts, which is more lightweight than{' '}
  <R>Kickstarter's maintanenace, which charges 5% platform fee</R> from successful projects to profit.
  <F> Eyeseek does it 5x cheaper.</F></>,
  title4: 'Money streaming',
  description4: <>Already started project and need long-term support? Use our <G>crypto payment streaming</G>, backers can flow resources real-time and
  turn on/off the streams based on your delivery.</>,
  title5: 'Rewards',
  description5:<>Reward your backers with unique <F>NFT collections</F> or <F>in-game blockchain items</F>. We support reward distributuon of 
  <P>ERC1155</P> and <B>ERC20 tokens</B>.</>
};

const Features = () => {
  const [demoMicro, setDemoMicro] = useState(false);
  const [demoFunding, setDemoFunding] = useState(false);
  const [demoFee, setDemoFee] = useState(false);
  const [demoStream, setDemoStream] = useState(false);
  const [demoReward, setDemoReward] = useState(false);

  return (
    <Container>
      <SectionTitle title="Key concepts" subtitle="How is Eyeseek different" />
      <ContentBox>
        <Row>
          {demoMicro ? (
            <FeatureCard
              icon={<BlockchainIcon width={55} />}
              title={Texts.title1}
              description={<Image unoptimized={true} src={cross} width={500} height={300} />}
            />
          ) : (
            <FeatureCard
              icon={<BlockchainIcon width={55} />}
              anim={<CrossAnim width={200} />}
              title={Texts.title1}
              description={Texts.description1}
            />
          )}

          {demoFunding ? (
            <FeatureCard
              icon={<MicrofundIcon width={55} />}
              title={Texts.title2}
              description={<Image unoptimized={true} src={chaindonation} width={500} height={300} />}
              onClick={() => {
                setDemoFunding(!demoFunding);
              }}
            />
          ) : (
            <FeatureCard
              icon={<MicrofundIcon width={55} />}
              anim={<LightAnim width={200} />}
              title={Texts.title2}
              description={Texts.description2}
              onClick={() => {
                setDemoFunding(!demoFunding);
              }}
            />
          )}
        </Row>
        <Row>
          {demoReward ? (
            <FeatureCard
              icon={<RewardLandingIcon width={5} />}
              title={Texts.title5}
              description={<Image unoptimized={true} src={fee} width={500} height={300} />}
            />
          ) : (
            <FeatureCard
              icon={<RewardLandingIcon width={55} />}
              anim={<RewardAnim width={180} />}
              title={Texts.title5}
              description={Texts.description5}
            />
          )}
          {demoStream ? (
            <FeatureCard
              icon={<StreamIcon width={55} />}
              title={Texts.title4}
              description={<Image unoptimized={true} src={fee} width={500} height={300} />}
            />
          ) : (
            <FeatureCard
              icon={<StreamIcon width={55} />}
              anim={<StreamAnim width={200} />}
              title={Texts.title4}
              description={Texts.description4}
            />
          )}
        </Row>
        <Row>
          {demoFee ? (
            <FeatureCard
              icon={<PiggyIcon width={55} />}
              title={Texts.title3}
              description={<Image unoptimized={true} src={fee} width={500} height={300} />}
              onClick={() => {
                setDemoFee(!demoFee);
              }}
            />
          ) : (
            <FeatureCard
              icon={<PiggyIcon width={55} />}
              anim={<CostAnim width={200} />}
              title={Texts.title3}
              description={Texts.description3}
              onClick={() => {
                setDemoFee(!demoFee);
              }}
            />
          )}
        </Row>
      </ContentBox>
    </Container>
  );
};

export default Features;
