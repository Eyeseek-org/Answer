import styled, {useTheme} from 'styled-components';
import { MicrofundIcon } from '../../components/icons/Landing';
import { DonateIcon, Erc20Icon, NftIcon } from '../../components/icons/Project';
import { RewardTitle } from '../typography/Titles';
import { ProjectAmount } from '../typography/Amounts';
import { BetweenRow} from '../format/Row';
import { MainContainer, RewardBox } from '../format/Box';
import { R } from '../typography/ColoredTexts';

const TypeBox = styled.div`
  position: absolute;
  right: 10px;
  bottom: 0;
`;

const NumberBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  left: 5px;
  font-size: 0.8em;
  bottom: 10px;
  font-family: 'Neucha';
`;

const IconBox = styled.div`
  position: absolute;
  z-index: 150;
  top: -5px;
  left: -5px;
`


const RewardCard = ({reward, key, onClick, selected}) => {
  const theme = useTheme();


  return (
    <MainContainer key={key}>
           <IconBox>
        {reward?.rType === 1 && <Erc20Icon width={30} height={30}  color={theme.colors.icon}/>}
        {reward?.rType === 2 && <NftIcon width={30} height={30}  color={theme.colors.icon}/>}
      </IconBox>
       {reward.eligibleActual > 0 ? 
        <RewardBox
            whileHover={{ scale: 1.05 }}
            color={selected !== reward?.objectId ? '#3c3c3c' : '#B0F6FF'}
            onClick={onClick}
          >
          <BetweenRow>
            <RewardTitle>{reward?.title}</RewardTitle>
            {reward?.nftId === 0 ? <ProjectAmount>${reward?.requiredPledge / 1000000}</ProjectAmount> : <NftIcon width={30} color={theme.colors.icon}/>}
          </BetweenRow>
          {/* <NFTDisplay address={tokenAddress} tokenId={nftId} chain={chain} /> */}

          <NumberBox>
            <div>{reward?.eligibleActual} of {reward?.cap}{' '}</div>
          </NumberBox>
          <TypeBox>
            {reward?.type === 'Donate' ? 
          <DonateIcon width={30} /> 
          : 
          <MicrofundIcon width={30} color={theme.colors.icon}/>}
          </TypeBox>
        </RewardBox> :         
        <RewardBox color={theme.colors.redPastel}>
          <BetweenRow>
            <RewardTitle>{reward?.title}</RewardTitle>
            {reward?.nftId === 0 ? <ProjectAmount>${reward?.requiredPledge / 1000000}</ProjectAmount> : <NftIcon width={30} color={theme.colors.icon}/>}
          </BetweenRow>
          <NumberBox>
            <R>{reward?.eligibleActual} of {reward?.cap}{' '}</R>
          </NumberBox>
          <TypeBox>
            {reward?.type === 'Donate' ? 
          <DonateIcon width={30} /> 
          : 
          <MicrofundIcon width={30} color={theme.colors.icon}/>}
          </TypeBox>
        </RewardBox>}
    </MainContainer>
  );
};

export default RewardCard;
