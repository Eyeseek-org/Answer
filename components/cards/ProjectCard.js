import styled, {useTheme} from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import ImgSkeleton from '../skeletons/ImgSkeleton';
import Tag from '../../components/typography/Tag';
import diamondAbi from '../../abi/diamondAbi.json';
import { useContractRead } from 'wagmi';
import { BlockchainIcon, StreamIcon } from '../icons/Landing';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Tooltip from '../Tooltip';
import { Erc20Icon, NftIcon } from '../../components/icons/Project';
import {ProjectAmount} from '../../components/typography/Amounts';
import { BetweenRow, Row } from '../format/Row';
import {ImageBoxSm} from '../format/Images'
import { ProjectTitle } from '../typography/Titles';
import { ProjectDesc } from '../typography/Descriptions';
import { AbsoluteLeft, AbsoluteRight } from '../format/Box';
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { diamond } from '../../data/contracts/core';
import Currency from '../functional/Currency';

const A = styled(Link)`
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
`;

const Container = styled(motion.div)`
  background: ${(props) => props.theme.colors.cardGradient};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  max-height: 750px;
  width: 32%;
  max-width: 500px;
  padding: 2%;
  margin-top: 3%;
  border: 1px solid rgba(163, 163, 163, 0.3);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 5%;
    margin-top: 7%;
  }
`;

const IconWrapper = styled.button`
  position: relative;
  background: inherit;
  border: none;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;


const ProjectCard = ({ title, description, category, subcategory, link, pid, imageUrl, pType, state, chainId, hasFungible, hasNft, youtube }) => {
  const [add, setAdd] = useState();
  const [chainTooltip, setChainTooltip] = useState(false);
  const [streamTypeTooltip, setStreamTypeTooltip] = useState(false);
  const [standardTypeTooltip, setStandardTypeTooltip] = useState(false);
  const [nftTooltip, setNftTooltip] = useState(false);
  const [erc20Tooltip, setErc20Tooltip] = useState(false);
  const theme = useTheme()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV !== 'production'){
      setAdd(diamond.mumbai)
    } else {
      setAdd(diamond.polygon);
    }
  }, []);

  let bal = 'n/a';
  let days = 'n/a';
  let max = 'n/a';

  const funds = useContractRead({
    address: add,
    abi: diamondAbi,
    functionName: 'getFundDetail',
    chainId: chainId,
    args: [pid],
    watch: false,
  });

  if (funds.data) {
    bal = Number(funds.data.balance.toString()) / 1000000;
    const d = funds.data.deadline.toString();
    const test = new Date(d * 1000);
    const today = new Date();
    const diffInTime = test.getTime() - today.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    days = Math.trunc(diffInDays);
    max = Number(funds.data.level1.toString()) / 1000000;
  }

  // Condition for ERC20 & NFT from the profile

  return (
      <Container whileHover={{ scale: 1.05 }}>
        {chainTooltip &&  <Tooltip text={`Chain ID: ${chainId}`}  />}
        {standardTypeTooltip && <Tooltip text={'Funding type: Standard crowdfunnding'} />}
        {streamTypeTooltip && <Tooltip text={'Funding type: Money streaming'} />}
        {nftTooltip && <Tooltip text={'NFT Rewards offered'} />}
        {erc20Tooltip && <Tooltip text={'ERC20 Rewards offered'} />}
        {pType !== 'Stream' && days > 0 && <AbsoluteRight>{days}d</AbsoluteRight>}
        <AbsoluteLeft>
          {pType === 'Stream' ? (
            <IconWrapper onMouseEnter={() => {setStreamTypeTooltip(true);}} onMouseLeave={() => {setStreamTypeTooltip(false);}}>
              <StreamIcon width={30} />
            </IconWrapper>
          ) : (
            <IconWrapper onMouseEnter={() => {setStandardTypeTooltip(true); }} onMouseLeave={() => {setStandardTypeTooltip(false);}}>
              <BlockchainIcon width={30} />
            </IconWrapper>
          )}
          <IconWrapper onMouseEnter={() => {setChainTooltip(true)}} onMouseLeave={() => {setChainTooltip(false)}}>
            <ChainIconComponent ch={chainId} />
          </IconWrapper>
          {hasFungible && (
            <IconWrapper onMouseEnter={() => { setErc20Tooltip(true) }} onMouseLeave={() => { setErc20Tooltip(false)}}>
              <Erc20Icon width={50} height={70} color={theme.colors.icon}/>
            </IconWrapper>
          )}
          {hasNft && ( <IconWrapper onMouseEnter={() => { setNftTooltip(true) }} onMouseLeave={() => { setNftTooltip(false) }} >
              <NftIcon width={40} height={40} color={theme.colors.icon} />
            </IconWrapper>
          )}
        </AbsoluteLeft>
        {!youtube ?   <ImageBoxSm> {!imageUrl ? <ImgSkeleton /> : <Image src={imageUrl} alt={title} width={'220px'} height={'200px'} />}</ImageBoxSm> :
           <LiteYouTubeEmbed id={youtube} title={'youtube'}/>}
        <BetweenRow>
          <Row>
              {category && (
                <div>
                  {category === 'Art' && <Tag tag={category} color={'#7E0000'} />}
                  {category === 'Games' && <Tag tag={category} color={'#7E3D00'} />}
                  {category === 'OpenSource' && <Tag tag={category} color={'#7C007E'} />}
                  {category === 'Science' && <Tag tag={category} color={'#00502E'} />}
                  {category === 'Technology' && <Tag tag={category} color={'#2B2B2B'} />}
                  {category === 'Web3' && <Tag tag={category} color={'#687900'} />}
                </div>
              )}
              <div>{subcategory && <Tag tag={subcategory} color={'#035201'} />}</div>

          </Row>
          <ProjectAmount>
            {pType === 'Standard' ? (
              <> <Currency amount={bal}/> / <Currency amount={max}/>  $</>
            ) : (
              <></>
            )}
          </ProjectAmount>
        </BetweenRow>
        <BetweenRow>
        <ProjectTitle> <A href={link}>{title}</A></ProjectTitle>
          <ProjectDesc>
            {state === 0 && <>Initiated</>}
            {state === 1 && <>Active</>}
            {state === 2 && <>Completed</>}
            {state === 3 && <>Failed</>}
            {state === 4 && <>Canceled</>}
          </ProjectDesc>
        </BetweenRow>
        <ProjectDesc>{description}</ProjectDesc>
      </Container>
  );
};

export default ProjectCard;
