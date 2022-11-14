import { useState, useEffect } from 'react';
import Button from './Button';
import Lottie from 'react-lottie';
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent, useNetwork } from 'wagmi';
import styled from 'styled-components';
import { GetFundingAddress, GetTokenAddress } from '../functional/GetContractAddress';
import { BigNumber, utils } from 'ethers';

import token from '../../abi/token.json';
import Rainbow from './Rainbow';
import successAnimation from '../../data/successAnimation.json';
import smallLoading from '../../data/smallLoading.json';
import Amount from '../functional/Amount';

// Animation configs
const okAnim = {
  loop: false,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
const loadingAnim = {
  loop: true,
  autoplay: true,
  animationData: smallLoading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Container = styled.div`
  position: relative;
`;

const ApprovalBox = styled.div`
  position: absolute;
  bottom: 1px;
  left: 0;
  z-index: 50;
`;

const Approve = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const AmountStyled = styled.div`
  font-size: 0.7em;
  position: absolute;
  color: white;
  right: 0;
  top: -10px;
  font-family: 'Gemunu Libre';
`;

const ApproveButton = (sum) => {
  const { address } = useAccount();
  const [ev, setEv] = useState(false);
  const { chain } = useNetwork();
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);
  const [tokenAdd, setTokenAdd] = useState(process.env.NEXT_PUBLIC_AD_USDC);

  const decimals = 18;
  const input = Number.isNaN(sum.sum) ? 0 : sum.sum;
  const amount = BigNumber.from(input).mul(BigNumber.from(10).pow(decimals));

  useEffect(() => {
    setAdd(GetFundingAddress(chain));
    setTokenAdd(GetTokenAddress(chain));
  }, []);

  const dec = utils.formatUnits(amount, decimals);

  const listened = async () => {
    await setEv(true);
    await setLoading(false);
  };
  const { config } = usePrepareContractWrite({
    address: tokenAdd,
    abi: token.abi,
    functionName: 'approve',
    args: [add, amount],
  });

  useContractEvent({
    address: tokenAdd,
    abi: token.abi,
    eventName: 'Approval',
    listener: (event) => listened(event),
    once: true,
  });

  const { write } = useContractWrite(config);

  const handleApprove = async () => {
    await write?.();
    setLoading(true);
  };

  return (
    <Container>
      <ApprovalBox>
        {ev && loading && (
          <>
            <Lottie height={30} width={30} options={okAnim} />
          </>
        )}
        {!ev && loading && (
          <>
            <Lottie height={50} width={50} options={loadingAnim} />
          </>
        )}
      </ApprovalBox>
      {!address && <Rainbow />}
      {address && (
        <Button
          width={'200px'}
          onClick={() => handleApprove()}
          text={
            <Approve>
              <div>
                {loading && <>Approving</>}
                {!ev && !loading && <>Approve</>}
                {ev && !loading && <>Approved</>}
              </div>
              <AmountStyled>
                <Amount value={input} />
              </AmountStyled>
            </Approve>
          }
        />
      )}
    </Container>
  );
};

export default ApproveButton;
