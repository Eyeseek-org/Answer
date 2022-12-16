import styled from 'styled-components';
import {useState, useEffect} from 'react';
import diamondAbi from '../../abi/diamondAbi.json';
import { useContractRead } from 'wagmi';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import Socials from '../../components/buttons/Socials';
import Bookmark from '../../components/functional/Bookmark';
import Stream from './Stream';
import usdc from '../../public/icons/usdc.png';
import usdt from '../../public/icons/usdt.png';
import { BetweenRow, Row } from '../../components/format/Row';
import { G } from '../../components/typography/ColoredTexts';
import StatRow from '../../components/StatRow';
import { RightPart, SmallBal } from '../../components/cards/CardStyles';
import { diamond } from '../../data/contracts/core';

const ButtonBox = styled.div`
  margin-top: 4%;
`;

const AbsoluteShareIt = styled.div`
  position: absolute;
  font-family: 'Neucha';
  right: 5px;
  top: -20px;
`

const ProjectDetailRight = ({ pid, objectId, bookmarks, pType, owner, chainId }) => {
  const router = useRouter();
  const [add, setAdd] = useState(diamond.mumbai);

  useEffect(() => {
    if (process.env.PROD !== 'something'){
      setAdd(diamond.mumbai)
    }
  },[])

  let bal = 'n/a';
  let microInvolved = 'n/a';
  let days = 'n/a';
  let max = 'n/a';
  let backing = 'n/a';
  let usdcBalance = 'n/a';
  let usdtBalance = 'n/a';

  const funds = useContractRead({
    address: add,
    abi: diamondAbi,
    functionName: 'getFundDetail',
    chainId: chainId,
    args: [pid],
    watch: false,
  });



  if (funds.data) {
    // Get fund balance
    bal = Number(funds.data.balance.toString()) / 1000000;

    // Get fund deadline
    const d = funds.data.deadline.toString();
    const test = new Date(d * 1000);
    const today = new Date();
    const diffInTime = test.getTime() - today.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    days = Math.trunc(diffInDays);

    // Get fund cap

    max = Number(funds.data.level1.toString()) / 1000000;

    // Get fund usdc balance
    usdcBalance = Number(funds.data.usdcBalance.toString()) / 1000000;

    // Get fund usdt balance
    usdtBalance = Number(funds.data.usdtBalance.toString()) / 1000000;

  }

  // TBD to integrate new function with all addresses
  // const backers = useContractRead({
  //   address: add,
  //   abi: fundFacet.abi,
  //   functionName: 'getBackers',
  //   chainId: chainId,
  //   args: [pid],
  //   watch: false,
  // });

  // if (backers.data) {
  //   backing = backers.data.toString();
  // }

  const micros = useContractRead({
    address: add,
    abi: diamondAbi,
    functionName: 'getConnectedMicroFunds',
    chainId: chainId,
    args: [pid],
    watch: false,
  });

  if (micros.data) {
    microInvolved = micros.data.toString();
  }

  const Balances = () => {
    return (
      <Row>
        {bal}
        <SmallBal>
          <div>{usdcBalance} <Image src={usdc} alt="usdc" width={20} height={20} /></div>
          <div>{usdtBalance} <Image src={usdt} alt="usdt" width={20} height={20} /></div>
        </SmallBal>
      </Row>
    );
  };

  return (
    <RightPart>
      {pType !== 'Stream' ? (
        <div>
          <StatRow
            title={<Balances />}
            desc={`pledged of ${max} goal`}
            color="#00FFA3"
            right={<Bookmark objectId={objectId} bookmarks={bookmarks} />}
          />
          <StatRow title={backing} desc={'backers'} color="white" />
          <StatRow title={microInvolved} desc={`microfunds active`} color="white" />
          <BetweenRow>
            <StatRow title={days} desc={`days to go`} color="white" />
            <AbsoluteShareIt><G>Share it</G></AbsoluteShareIt>
            <Socials title={'Check out my project on Eyeseek, crowdfunding started and time is ticking!'}/>
          </BetweenRow>
        </div>
      ) : (
        <Stream recipient={owner} objectId={objectId} chainId={chainId} />
      )}
      <ButtonBox>
        {pType === 'Standard' && <ButtonAlt width={'100%'} text="Fund it!" onClick={() => router.push(`/donate/${objectId}`)} />}
      </ButtonBox>
    </RightPart>
  );
};

export default ProjectDetailRight;
