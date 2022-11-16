import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MicrofundIcon } from '../../components/icons/Landing';
import { DonateIcon, NftIcon } from '../../components/icons/Project';
import Address from '../../components/functional/Address';
import Tooltip from '../Tooltip';
import { useState } from 'react';
import NFTDisplay from '../functional/NftDisplay';

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
  background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
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

const ModalTitle = styled.div`
  padding-bottom: 2%;
  border-bottom: 1px dashed #3c3c3c;
  margin-bottom: 4%;
  color: #b0f6ff;
  font-size: 1em;
  font-family: 'Gemunu Libre';
  letter-spacing: 0.4px;
`;

const ModalDesc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Neucha';
  letter-spacing: 0.4px;
  font-size: 0.9em;
  color: white;
`;

const ModalAmount = styled.div`
  font-family: 'Neucha';
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
          <Tooltip text={`Reward requires backing ${type} ${pledge} `} />
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
          <Row>
            <ModalTitle>{title}</ModalTitle>
            {nftId === 0 ? <ModalAmount>${pledge}</ModalAmount> : <NftIcon width={30} />}
          </Row>
          <ModalDesc>{description}</ModalDesc>
          <NFTDisplay address={tokenAddress} tokenId={nftId} chain={chain} />
          {tokenName && tokenAddress && (
            <ModalDesc>
              <div>{tokenName}</div>
              <Address address={tokenAddress} />
            </ModalDesc>
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
          <Row>
            <ModalTitle>{title}</ModalTitle>
            {nftId === 0 ? <ModalAmount>${pledge}</ModalAmount> : <NftIcon width={30} />}
          </Row>
          <ModalDesc>{description}</ModalDesc>
          <NFTDisplay address={tokenAddress} tokenId={nftId} chain={chain} />
          {tokenName && tokenAddress && (
            <ModalDesc>
              <div>{tokenName}</div>
              <Address address={tokenAddress} />
            </ModalDesc>
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
