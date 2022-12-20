import styled from "styled-components"
import {useContractRead} from 'wagmi'
import Subtitle from "../../components/typography/Subtitle"
import ProgressBar from "../../components/ProgressBar"
import diamondAbi from '../../abi/diamondAbi.json';
import { BodyBox } from "../../components/format/Box";


const DescriptionBox = styled.div`
    padding-bottom: 3%;
    padding-top: 7%;
    font-family: 'Gemunu Libre';
`

const ProjectDescription = ({descM, pid, add, chainId}) => {

    let bal = 'n/a';
    let max = 'n/a';
    let usdcBalance = 'n/a';
    let usdtBalance = 'n/a';
    let ratio = 0;
    let usdcRatio = 0;
    let usdtRatio = 0;
    let daiRatio = 0;
  
    const funds = useContractRead({
      address: add,
      abi: diamondAbi,
      functionName: 'getFundDetail',
      chainId: chainId,
      args: [pid]
    });
  
    if (funds.data) {
      console.log(funds.data)
      // Get fund balance
      bal = Number(funds.data.balance.toString()) / 1000000;
  
      // Get fund cap
      max = Number(funds.data.level1.toString()) / 1000000;
      ratio = bal / max * 100
  
      // Get fund usdc balance
      usdcBalance = Number(funds.data.usdcBalance.toString()) / 1000000;
  
      // Get fund usdt balance
      usdtBalance = Number(funds.data.usdtBalance.toString()) / 1000000;

      usdcRatio = usdcBalance / max * 100
      usdtRatio = usdtBalance / max * 100
    }
    

    return <BodyBox>
        <Subtitle text='Project milestones'/>
        <ProgressBar ratio={ratio} bal={bal} max={max} secRatio={usdcRatio} terRatio={usdtRatio} />
        <DescriptionBox>      {descM}</DescriptionBox>
  
    </BodyBox>
}

export default ProjectDescription