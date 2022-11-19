import styled from "styled-components"
import {useContractRead} from 'wagmi'
import Subtitle from "../../components/typography/Subtitle"
import ProgressBar from "../../components/ProgressBar"
import donation from '../../abi/donation.json';
import { BodyBox } from "../../components/format/Box";


const DescriptionBox = styled.div`
    padding-bottom: 5%;
`

const ProjectDescription = ({descM, pid, add, chainId}) => {

    let bal = 'n/a';
    let max = 'n/a';
    let usdcBalance = 'n/a';
    let usdtBalance = 'n/a';
    let daiBalance = 'n/a';
    let ratio = 0;
    let usdcRatio = 0;
    let usdtRatio = 0;
    let daiRatio = 0;
  
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

      usdcRatio = usdcBalance / max * 100
      usdtRatio = usdtBalance / max * 100
      daiRatio = daiBalance / max * 100
    }
    

    return <BodyBox>
        <Subtitle text='Project milestones'/>
        <ProgressBar ratio={ratio} bal={bal} max={max} secRatio={usdcRatio} terRatio={usdtRatio} quaRatio={daiRatio}/>
        <DescriptionBox></DescriptionBox>
        {descM}
    </BodyBox>
}

export default ProjectDescription