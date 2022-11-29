import styled, {useTheme} from 'styled-components';
import { MicrofundIcon } from '../../components/icons/Landing';
import { DonateIcon, Erc20Icon, NftIcon } from '../../components/icons/Project';
import Address from '../../components/functional/Address';
import Tooltip from '../Tooltip';
import { useState } from 'react';
import NFTDisplay from '../functional/NftDisplay';
import { RewardTitle } from '../typography/Titles';
import { ProjectAmount } from '../typography/Amounts';
import { BetweenRow} from '../format/Row';
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

const IconBox = styled.div`
  position: absolute;
  z-index: 50;
  top: 5px;
`

const TokenRow = styled.div`
  font-size: 0.8em;
  max-width: 100px;
`

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
  tokenAmount,
  selected,
  objectId,
  rType,
  chain,
}) => {
  const [typeTooltip, setTypeTooltip] = useState(false);
  const {theme} = useTheme();

  return (
    <MainContainer key={key}>
           <IconBox>
        {rType === 1 && <Erc20Icon width={20} height={20}  color={theme.colors.icon}/>}
        {rType === 2 && <NftIcon width={20} height={20}  color={theme.colors.icon}/>}
      </IconBox>
      {typeTooltip && 
        <ToolBox>
          <Tooltip text={`Requires ${type} $ ${pledge} to be eligible for ${tokenAmount}x ${tokenName}`} />
        </ToolBox>
      }
        <RewardBox
            whileHover={{ scale: 1.05 }}
            color={selected !== objectId ? '#3c3c3c' : '#B0F6FF'}
            onClick={onClick}
            onMouseEnter={() => { setTypeTooltip(true)}}
            onMouseLeave={() => { setTypeTooltip(false)}}
          >
          <BetweenRow>
            <RewardTitle>{title}</RewardTitle>
            {nftId === 0 ? <ProjectAmount>${pledge}</ProjectAmount> : <NftIcon width={30}  color={theme.colors.icon}/>}
          </BetweenRow>
          {/* <NFTDisplay address={tokenAddress} tokenId={nftId} chain={chain} /> */}
          {tokenName && tokenAddress && tokenAddress !== "0x0000000000000000000000000000000000000000" && (
              <TokenRow><Address address={tokenAddress} /></TokenRow>
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
