import styled, {useTheme} from 'styled-components';
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
import { SmallBal } from '../../components/cards/CardStyles';
import { diamond } from '../../data/contracts/core';
import Currency from '../../components/functional/Currency';

const ProgressFilter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 2px;
    width: ${props => props.ratio}%;
    max-width: 100%;
    border-radius: inherit;
    text-align: right;
    background: ${props => props.theme.colors.secondary};
    font-family: 'Gemunu Libre';
`

const RightPart = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 3px solid #b0f6ff;
  width: 50%;
  margin-left: 3%;
  margin-top: 2%;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    margin-top: 5%;
    margin-bottom: 5%;
  }
`;

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
  const theme = useTheme();

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

    // Number of deployed microfunds, number of backers
    microInvolved = funds.data.micros.toString();
    backing = funds.data.backerNumber.toString();

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

  const Balances = () => {
    return (
      <Row>
        <b>{bal}</b>
        <SmallBal>
          <div>{usdcBalance} <Image src={usdc} alt="usdc" width={20} height={20} /></div>
          <div>{usdtBalance} <Image src={usdt} alt="usdt" width={20} height={20} /></div>
        </SmallBal>
      </Row>
    );
  };

  return (
    <RightPart>
      <ProgressFilter ratio={bal / max * 100} />
      {pType !== 'Stream' ? (
        <div>
          <StatRow
            title={<Balances />}
            desc={<>pledged of  <Currency amount={max}/> goal</>}
            color={theme.colors.secondary}
            right={<Bookmark objectId={objectId} bookmarks={bookmarks} />}
          />
          <StatRow title={backing} desc={'backers'} color={theme.colors.font} />
          <StatRow title={microInvolved} desc={`microfunds`}  color={theme.colors.font}/>
          <BetweenRow>
            <StatRow title={days} desc={`days to go`}  color={theme.colors.font}/>
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
