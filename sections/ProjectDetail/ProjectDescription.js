import styled from "styled-components"
import {useContractRead} from 'wagmi'
import Subtitle from "../../components/typography/Subtitle"
import ProgressBar from "../../components/ProgressBar"
import donation from '../../abi/donation.json';

const Container = styled.div`
    margin-top: 5%;
    padding-left: 15%;
    padding-right: 15%;
    @media (max-width: 768px) {
        padding-left: 2%;
        padding-right: 2%;
    }
`

const DescriptionBox = styled.div`
    padding-bottom: 5%;
`

const ProjectDescription = ({descM, pid, add, chainId}) => {

    let bal = 'n/a';
    let max = 'n/a';
    let usdcBalance = 'n/a';
    let usdtBalance = 'n/a';
    let daiBalance = 'n/a';
    let ratio = 'n/a';
  
    const funds = useContractRead({
      address: add,
      abi: donation.abi,
      functionName: 'funds',
      chainId: chainId,
      args: [pid],
      watch: true,
    });
  
    if (funds.data) {
      // Get fund balance
      bal = funds.data.balance.toString();
  
      // Get fund cap
      max = funds.data.level1.toString();
      ratio = bal / max * 100
  
      // Get fund usdc balance
      usdcBalance = funds.data.usdcBalance.toString();
  
      // Get fund usdt balance
      usdtBalance = funds.data.usdtBalance.toString();
  
      // Get fund dai balance
      daiBalance = funds.data.daiBalance.toString();
    }
    

    return <Container>
        
        <Subtitle text='Project milestones'/>
        <ProgressBar ratio={ratio} bal={bal} max={max}/>
        <DescriptionBox></DescriptionBox>
        {descM}
    </Container>
}

export default ProjectDescription