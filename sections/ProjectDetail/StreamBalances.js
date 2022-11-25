// Shows balances of wrapped/unwrapped tokens
// Adds possibility to wrap/unwrap tokens
import { ethers } from "ethers";
import { useState} from 'react'
import styled, {useTheme} from 'styled-components';
import { Framework } from "@superfluid-finance/sdk-core";

import BalanceComponent from "../../components/functional/BalanceComponent.js";
import Allowance from "../../components/functional/Allowance.js";
import Tooltip from "../../components/Tooltip.js";
import ButtonAlt from "../../components/buttons/ButtonAlt";
import { Reference } from "../../components/typography/Descriptions.js";
import { InfoIcon } from "../../components/icons/Common.js";


const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9em;
  padding-bottom: 1%;
`

const BalancesBox = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.transparent};
  border-top: 1px solid ${(props) => props.theme.colors.primary};
  padding: 5%;
  margin-top: 5%;
`

const ActionRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 5%;
  margin-bottom: 5%;
`

const Input = styled.input`
  background: inherit;
  border: none;
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.2);
  width: 150px;
  padding-left: 10px;
  padding-right: 10px;
`

const Texts = {
    wrappedTooltip: "Wrapped tokens are tokens that are wrapped into a SuperToken. This allows you to use them in the Superfluid protocol.",
    nativeTooltip: "Native tokens are tokens that are not wrapped into a SuperToken. This means that you can't use them in the Superfluid protocol.",
    approvedTooltip: "Amount of approved SuperTokens able to stream.",
}

const StreamBalances = ({address, provider, signer, token, superContract}) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipText, setTooltipText] = useState('')
    const [wrappedAmount, setWrappedAmount] = useState(1000)
    const theme = useTheme()

    const native = "0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7"

    const handleTooltip = (text) => {
        setShowTooltip(true)
        setTooltipText(text)

    }
    const wrap = async(amt) => {
        const sf = await Framework.create({
          provider: provider,
          chainId: chainId
        })
      
      
        const DAIx = await sf.loadSuperToken(
          token
        );
    
      
        try {
          console.log(`upgrading $${amt} DAI to DAIx`);
          const amtToUpgrade = ethers.utils.parseEther(amt.toString());
          const upgradeOperation = DAIx.upgrade({
            amount: amtToUpgrade.toString()
          });
          const upgradeTxn = await upgradeOperation.exec(signer);
          await upgradeTxn.wait().then(function (tx) {
            console.log(
              `
              Congrats - you've just upgraded DAI to DAIx!
            `
            );
          });
        } catch (error) {
          console.error(error);
        }
      }
    
    
      async function unwrap(amt) {
        const sf = await Framework.create({
          provider: provider,
          chainId: chainId
        })
    
      
        const DAIx = await sf.loadSuperToken(
          token
        );
      
      
        try {
          console.log(`Downgrading $${amt} fDAIx...`);
          const amtToDowngrade = ethers.utils.parseEther(amt.toString());
          const downgradeOperation = DAIx.downgrade({
            amount: amtToDowngrade.toString()
          });
          const downgradeTxn = await downgradeOperation.exec(signer);
          await downgradeTxn.wait().then(function (tx) {
            console.log(
              `
                Looks like success
            `
            );
          });
        } catch (error) {
          console.error(error);
        }
      }

    return  <BalancesBox>
       {showTooltip && <Tooltip text={tooltipText}/>}
        <Row>
            <div onMouseEnter={()=>{handleTooltip(Texts.wrappedTooltip)}} onMouseLeave={()=>{setShowTooltip(false)}}>Wrapped balance <InfoIcon color={theme.colors.icon} width={15}/> </div> 
            <BalanceComponent token={token} address={address} dec/>
        </Row>
        <Row>
            <div onMouseEnter={()=>{handleTooltip(Texts.nativeTooltip)}} onMouseLeave={()=>{setShowTooltip(false)}}>Native balance <InfoIcon color={theme.colors.icon} width={15}/></div> 
            <BalanceComponent token={native} address={address} dec/>
        </Row>
        <Row>
            <div onMouseEnter={()=>{handleTooltip(Texts.approvedTooltip)}} onMouseLeave={()=>{setShowTooltip(false)}}>Approved amount <InfoIcon color={theme.colors.icon} width={15}/></div> 
            <Allowance address={address} spender={superContract} apprToken={token} tokenSymbol={'fDAIx'} />
        </Row>
        <ActionRow>
          <Input type='number' placeholder='un/wrap amount' onChange={(e) => { setWrappedAmount(e.target.value) }} />
           <ButtonAlt width={100} text='Wrap' onClick={()=>{wrap(wrappedAmount)}}/>
           <ButtonAlt width={100} text='Unwrap' onClick={()=>{unwrap(wrappedAmount)}}/>
        </ActionRow>
        <a href='https://app.superfluid.finance/wrap?upgrade' rel="noopener noreferrer" target="_blank">  
            <Reference>Alternatively Wrap/Unwrap stablecoin on Superfluid</Reference>
           </a>
</BalancesBox>
}

export default StreamBalances

