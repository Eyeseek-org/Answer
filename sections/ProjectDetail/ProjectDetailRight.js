import styled from 'styled-components';
import donation from '../../abi/donation.json';
import { useContractRead } from 'wagmi';
import { useRouter } from 'next/router';
import Image from 'next/image';

import ButtonAlt from '../../components/buttons/ButtonAlt';
import Socials from '../../components/buttons/Socials';
import Bookmark from '../../components/functional/Bookmark';
import Stream from './Stream';
import usdc from '../../public/icons/usdc.png';
import usdt from '../../public/icons/usdt.png';
import dai from '../../public/icons/dai.png';

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
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1.4%;
  padding-bottom: 0.5%;
  @media (min-width: 1580px) {
    font-size: 1.3em;
  }
`;

const RowCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const RowTitle = styled.div`
  font-family: 'Chenla';
  font-style: normal;
  font-size: 1.5em;
  font-weight: 400;
  color: ${(props) => props.color};
  @media (min-width: 1580px) {
    font-size: 1.8em;
  }
`;

const RowDesc = styled.div`
  color: ${(props) => props.theme.colors.font};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
`;

const FlexRow = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;
const ButtonBox = styled.div`
  margin-top: 4%;
`;


const Bal = styled.div`
  display: flex;
  flex-direction: row;
`;

const SmallBal = styled.div`
  font-size: 0.7em;
  margin-left: 20px;
  font-family: 'Gemunu Libre';
  opacity: 0.9;
  color: ${(props) => props.theme.colors.font};
  display: flex;
  flex-direction: row;
  gap: 7px;
`;

const ProjectDetailRight = ({ pid, objectId, bookmarks, pType, owner, add, chainId }) => {
  const router = useRouter();

  let bal = 'n/a';
  let microInvolved = 'n/a';
  let days = 'n/a';
  let max = 'n/a';
  let backing = 'n/a';
  let usdcBalance = 'n/a';
  let usdtBalance = 'n/a';
  let daiBalance = 'n/a';

  const funds = useContractRead({
    address: add,
    abi: donation.abi,
    functionName: 'funds',
    chainId: chainId,
    args: [pid],
    watch: false,
  });

  if (funds.data) {
    // Get fund balance
    bal = funds.data.balance.toString();

    // Get fund deadline
    const d = funds.data.deadline.toString();
    const test = new Date(d * 1000);
    const today = new Date();
    const diffInTime = test.getTime() - today.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    days = Math.trunc(diffInDays);

    // Get fund cap
    max = funds.data.level1.toString();

    // Get fund usdc balance
    usdcBalance = funds.data.usdcBalance.toString();

    // Get fund usdt balance
    usdtBalance = funds.data.usdtBalance.toString();

    // Get fund dai balance
    daiBalance = funds.data.daiBalance.toString();
  }

  const backers = useContractRead({
    address: add,
    abi: donation.abi,
    functionName: 'getBackers',
    chainId: chainId,
    args: [pid],
    watch: false,
  });

  if (backers.data) {
    backing = backers.data.toString();
  }

  const micros = useContractRead({
    address: add,
    abi: donation.abi,
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
      <Bal>
        {bal}
        <SmallBal>
          <div>
            {usdcBalance} <Image src={usdc} alt="usdc" width={20} height={20} />{' '}
          </div>
          <div>
            {usdtBalance} <Image src={usdt} alt="usdt" width={20} height={20} />{' '}
          </div>
          <div>
            {daiBalance} <Image src={dai} alt="dai" width={20} height={20} />
          </div>
        </SmallBal>
      </Bal>
    );
  };

  const Row = ({ title, desc, right, color }) => {
    return (
      <RowBox>
        <RowCol>
          <RowTitle color={color}>{title}</RowTitle> <RowDesc>{desc}</RowDesc>
        </RowCol>
        {right}
      </RowBox>
    );
  };

  return (
    <RightPart>
      {pType !== 'Stream' ? (
        <div>
          <Row
            title={<Balances />}
            desc={`pledged of ${max} goal`}
            color="#00FFA3"
            right={<Bookmark objectId={objectId} bookmarks={bookmarks} />}
          />
          <Row title={backing} desc={'backers'} color="white" />
          <Row title={microInvolved} desc={`microfunds active`} color="white" />
          <FlexRow>
            <Row title={days} desc={`days to go`} color="white" />
            <Socials />
          </FlexRow>
        </div>
      ) : (
        <Stream recipient={owner} objectId={objectId} />
      )}
      <ButtonBox>
        {pType === 'Standard' && <ButtonAlt width={'100%'} text="Fund it!" onClick={() => router.push(`/donate/${objectId}`)} />}
      </ButtonBox>
    </RightPart>
  );
};

export default ProjectDetailRight;
