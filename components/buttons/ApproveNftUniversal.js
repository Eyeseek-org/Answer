import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent } from 'wagmi';
import styled from 'styled-components';
import multi from '../../abi/multi.json';
import Rainbow from './Rainbow';
import Lottie from 'react-lottie';
import ButtonAlt from './ButtonAlt';
import { Col } from '../format/Row';
import {okAnim, loadingAnim} from '../animated/Animations';

const Container = styled.div`
  position: relative;
`;

const ApprovalBox = styled.div`
  position: absolute;
  bottom: 1px;
  left: 0;
  z-index: 50;
`;

const Amount = styled.div`
  font-size: 0.8em;
  position: absolute;
  color: ${(props) => props.theme.colors.font};
  right: 0;
  top: -3px;
  font-family: 'Gemunu Libre';
`;

const ApproveNftUniversal = ({ tokenContract, spender, amount }) => {
  const { address } = useAccount();
  const [ev, setEv] = useState(false);
  const [loading, setLoading] = useState(false);

  const listened = async () => {
    setEv(true);
    setLoading(false);
  };
  /// Tohle nebude diamondAbi ale Multitoken

  const { config } = usePrepareContractWrite({
    address: tokenContract,
    abi: multi.abi,
    functionName: 'setApprovalForAll',
    args: [spender, true],
  });

  useContractEvent({
    address: tokenContract,
    abi: multi.abi,
    eventName: 'ApprovalForAll',
    listener: (event) => listened(event),
    once: true,
  });

  const { write } = useContractWrite(config);

  const handleApprove = async () => {
    write?.();
    setLoading(true);
  };

  return (
    <Container>
      <ApprovalBox>
        {ev && loading && (
          <><Lottie height={30} width={30} options={okAnim} /></>
        )}
        {!ev && loading && (
          <><Lottie height={50} width={50} options={loadingAnim} /></>
        )}
      </ApprovalBox>
      {!address && <Rainbow />}
      {address && (
        <>
          {!ev ? (
            <ButtonAlt
              width={'200px'}
              onClick={() => handleApprove()}
              text={
                <Col>
                  <div>Approve</div>
                  <Amount>{amount}</Amount>
                </Col>
              }
            />
          ) : (
            <ButtonAlt width={'200px'} text={'Approved'} />
          )}
        </>
      )}
    </Container>
  );
};

export default ApproveNftUniversal;
