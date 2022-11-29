import styled, {useTheme} from 'styled-components';
import { MicrofundIcon } from '../../components/icons/Landing';
import { DonateIcon, NftIcon } from '../../components/icons/Project';
import Address from '../../components/functional/Address';
import { RewardTitle } from '../typography/Titles';
import { ProjectAmount } from '../typography/Amounts';
import { RewardDesc } from '../typography/Descriptions';
import ErrText from '../../components/typography/ErrText'
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

const RewardCard = ({
  key,
  pledge,
  title,
  eligibleActual,
  type,
  cap,
  nftId,
  tokenName,
  tokenAddress,
  selected,
}) => {
  const theme = useTheme();

  return (
    <MainContainer>
        <RewardBox
            color={selected !== title ? '#3c3c3c' : '#005b00'}
            key={key}
          > 
          <BetweenRow>
            <RewardTitle>{title}</RewardTitle>
            {nftId === 0 ? <ProjectAmount>${pledge}</ProjectAmount> : <NftIcon width={30}  color={theme.colors.icon} />}
          </BetweenRow>
          {tokenName && tokenAddress && (
            <RewardDesc>
              <div>{tokenName}</div>
              <Address address={tokenAddress} />
            </RewardDesc>
          )}
          <NumberBox>
            <ErrText text={<>{eligibleActual} of {cap}{' '}</>}/>
          </NumberBox>
          <TypeBox>{type === 'Donate' ? <DonateIcon width={30} /> : <MicrofundIcon width={30} />}</TypeBox>
        </RewardBox>
    </MainContainer>
  );
};

export default RewardCard;
