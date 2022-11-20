import styled from 'styled-components';
import { MicrofundIcon } from '../../components/icons/Landing';
import { DonateIcon, NftIcon } from '../../components/icons/Project';
import Address from '../../components/functional/Address';
import Tooltip from '../Tooltip';
import { useState } from 'react';
import NFTDisplay from '../functional/NftDisplay';
import { RewardTitle } from '../typography/Titles';
import { ProjectAmount } from '../typography/Amounts';
import { RewardDesc } from '../typography/Descriptions';
import { BetweenRow } from '../format/Row';
import { MainContainer, RewardBox } from '../format/Box';

const TypeBox = styled.div`
  position: absolute;
  right: 10px;
  bottom: 0;
`;

const NumberBox = styled.div`
  position: absolute;
  left: 5px;
  font-size: 0.8em;
  bottom: 10px;
  font-family: 'Neucha';
`;

const ToolBox = styled.div`
  position: absolute;
  top: -25px;
`;

const RewardCard = ({
  key,
  pledge,
  title,
  eligibleActual,
  type,
  cap,
  onClick,
  nftId,
  tokenName,
  tokenAddress,
  selected,
  chain,
}) => {
  const [typeTooltip, setTypeTooltip] = useState(false);

  return (
    <MainContainer>
      {typeTooltip && 
        <ToolBox>
          <Tooltip text={`Reward requires ${type} $ ${pledge} `} />
        </ToolBox>
      }
        <RewardBox
            key={key}
            whileHover={{ scale: 1.05 }}
            color={selected !== title ? '#3c3c3c' : '#B0F6FF'}
            onClick={onClick}
            onMouseEnter={() => { setTypeTooltip(true)}}
            onMouseLeave={() => { setTypeTooltip(false)}}
          > 
          <BetweenRow>
            <RewardTitle>{title}</RewardTitle>
            {nftId === 0 ? <ProjectAmount>${pledge}</ProjectAmount> : <NftIcon width={30} />}
          </BetweenRow>
          {/* <NFTDisplay address={tokenAddress} tokenId={nftId} chain={chain} /> */}
          {tokenName && tokenAddress && (
            <RewardDesc>
              <div>{tokenName}</div>
              <Address address={tokenAddress} />
            </RewardDesc>
          )}
          <NumberBox>
            {eligibleActual} of {cap}{' '}
          </NumberBox>
          <TypeBox>{type === 'Donate' ? <DonateIcon width={30} /> : <MicrofundIcon width={30} />}</TypeBox>
        </RewardBox>
    </MainContainer>
  );
};

export default RewardCard;
