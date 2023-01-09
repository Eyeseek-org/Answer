import styled from 'styled-components';
import { useMoralisCloudFunction } from "react-moralis";
import NFTDisplay from '../components/functional/NftDisplay';
import { BetweenRow, Col, RowCenter } from '../components/format/Row';
import {useState} from 'react'
import Subtitle from '../components/typography/Subtitle';
import InputContainer from '../components/form/InputContainer';
import { RewardTitle } from '../components/typography/Titles';
import CancelComponent from '../components/admin/CancelComponent';
import CancelRewComponent from '../components/admin/CancelRewComponent';
import DistributeComponent from '../components/admin/DistributeComponent';
import DistributeRewComponent from '../components/admin/DistributeRewComponent';
import ZeroComponent from '../components/admin/ZeroComponent';
import ButtonAlt from '../components/buttons/ButtonAlt';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 5%;
`;

const AdminWrapper = styled.div`
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`


const Cloud = () => {
  const [chain, setChain] = useState();
  const [fundId, setFundId] = useState();
  const [showCancel, setShowCancel] = useState(false);
  const [showCancelRew, setShowCancelRew] = useState(false);
  const [showDistributeRew , setShowDistributeRew] = useState(false);
  const [showDistribute, setShowDistribute] = useState(false);
  const [showZero, setShowZero] = useState(false);

  const params = { 
    custom: "custom" 
  };
  const { fetch } = useMoralisCloudFunction(
      "firstOne"
  );
    
      const cloudCall = () => {
        fetch({
          onSuccess: (data) => console.log(data), 
          onError: (error) => console.log(error)
        });
      };
  return (
    <Container>
        <Subtitle text='Cloud function'/>
        <BetweenRow>
            <ButtonAlt onClick={cloudCall} text={'Make cloud call'} width={'auto'}/>  
           <NFTDisplay address={'0x2F33B8870f86B319258380377076147a59E29135'} tokenId={24}/>
        </BetweenRow>
      
      <AdminWrapper>
        <Subtitle text='List of admin functions'/>
          <Col>
            <InputContainer
              label={'Chain'}
              name={'Chain'}
              placeholder={'80001'}
              description={'Pass chainId needed to admin'}
              onChange={(e) => setChain(e.target.value)}
              type={'num'}
              maxLength={5}
              errorText={undefined}
              isError={undefined}
              min={undefined}
            />
            <InputContainer
              label={'FundId'}
              name={'FundId'}
              placeholder={'1'}
              description={'Pass on-chain project id'}
              onChange={(e) => setFundId(e.target.value)}
              type={'num'}
              maxLength={5}
              errorText={undefined}
              isError={undefined}
              min={undefined}
            />
          </Col>
          <RowCenter>
              {showZero ?  <ZeroComponent ch={chain} /> : <RewardTitle onClick={()=>{setShowZero(true)}}>Zero data</RewardTitle>}
            </RowCenter>
            <RowCenter>
              {showCancel ?  <CancelComponent ch={chain} fundId={fundId} /> : <RewardTitle onClick={()=>{setShowCancel(true)}}>Cancel fund</RewardTitle>}
              {showCancelRew ?  <CancelRewComponent ch={chain} fundId={fundId} /> : <RewardTitle onClick={()=>{setShowCancelRew(true)}}>Return canceled reward</RewardTitle>}
              {showDistribute ?  <DistributeComponent ch={chain} fundId={fundId} /> : <RewardTitle onClick={()=>{setShowDistribute(true)}}>Distribute fund</RewardTitle>}
              {showDistributeRew ?  <DistributeRewComponent ch={chain} fundId={fundId} /> : <RewardTitle onClick={()=>{setShowDistributeRew(true)}}>Distribute rewards</RewardTitle>}
            </RowCenter>
      </AdminWrapper>
    </Container>
  );
};

export default Cloud;
