import styled from 'styled-components';
import { motion } from 'framer-motion';
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

const Container = styled.div`
  position: relative;
  padding-left: 7%;
`;

const Modal = styled(motion.div)`
  position: relative;
  font-family: 'Montserrat';
  height: 250px;
  margin: 1%;
  padding: 6%;
  width: 300px;
  background: ${(props) => props.theme.colors.gradient};
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  cursor: pointer;
  animation: fadeIn 0.5s;
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #9bffff;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @media (min-width: 1750px) {
    font-size: 1.3em;
  }
`;

const ActModal = styled(Modal)`
  border: 1px solid #005b00;
  cursor: default;
  animation: none;
`;


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
  description,
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
    <Container>
      {typeTooltip && (
        <ToolBox>
          <Tooltip text={`Reward requires ${type} $ ${pledge} `} />
        </ToolBox>
      )}
      {selected !== title ? (
        <Modal
          key={key}
          whileHover={{ scale: 1.05 }}
          onClick={onClick}
          onMouseEnter={() => {
            setTypeTooltip(true);
          }}
          onMouseLeave={() => {
            setTypeTooltip(false);
          }}
        >
          <BetweenRow>
            <RewardTitle>{title}</RewardTitle>
            {nftId === 0 ? <ProjectAmount>${pledge}</ProjectAmount> : <NftIcon width={30} />}
          </BetweenRow>
          <RewardDesc>{description}</RewardDesc>
          <NFTDisplay address={tokenAddress} tokenId={nftId} chain={chain} />
          {tokenName && tokenAddress && (
            <RewardDesc>
              <div>{tokenName}</div>
              <Address address={tokenAddress} />
            </RewardDesc>
          )}
          <NumberBox>
            {' '}
            {eligibleActual} of {cap}{' '}
          </NumberBox>
          <TypeBox>{type === 'Donate' ? <DonateIcon width={30} /> : <MicrofundIcon width={30} />}</TypeBox>
        </Modal>
      ) : (
        <ActModal
          key={key}
          onMouseEnter={() => {
            setTypeTooltip(true);
          }}
          onMouseLeave={() => {
            setTypeTooltip(false);
          }}
        >
          <BetweenRow>
            <ModalTitle>{title}</ModalTitle>
            {nftId === 0 ? <ModalAmount>${pledge}</ModalAmount> : <NftIcon width={30} />}
          </BetweenRow>
          <RewardDesc>{description}</RewardDesc>
          <NFTDisplay address={tokenAddress} tokenId={nftId} chain={chain} />
          {tokenName && tokenAddress && (
            <RewardDesc>
              <div>{tokenName}</div>
              <Address address={tokenAddress} />
            </RewardDesc>
          )}
          <NumberBox>
            {' '}
            {eligibleActual} of {cap}{' '}
          </NumberBox>
          <TypeBox>{type === 'Donate' ? <DonateIcon width={30} /> : <MicrofundIcon width={30} />}</TypeBox>
        </ActModal>
      )}
    </Container>
  );
};

export default RewardCard;
