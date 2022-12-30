import { useReward } from '../utils/rewardContext';
import {useState} from 'react'
import InputContainer from "../../components/form/InputContainer";
import { Row } from "../../components/format/Row";
import { G, R } from '../../components/typography/ColoredTexts';
import { stable } from '../../data/contracts/stablecoins';
import {ethers} from 'ethers'

const RewardFormToken = ({dType}) => {
    const { setRewardState } = useReward();
    const [validAddress, setValidAddress] = useState(false);

    const handleAddressChange = async (e) => {
        const add = ethers.utils.isAddress(e.target.value) 
        if (add) {
            setRewardState((prev) => ({ ...prev, tokenAddress: e.target.value }))
            setValidAddress(true)
        } else {
            setValidAddress(false)
        }
    }

    return <> 
    <InputContainer
        label={'Title'}
        placeholder={'Godspeed'}
        maxLength={20}
        description={'Create a unique title for your reward'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, title: e.target.value  }))}
        type={'text'}
    />
    <InputContainer
        label={'Specify delivery'}
        maxLength={120}
        placeholder={'DAO governance token'}
        description={'Shortly and specifically what backer will receive'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, delivery: e.target.value  }))}
        type={'text'}
    />
    <InputContainer
        label={'Description'}
        maxLength={250}
        placeholder={'User receives same benefits as for group "Premium" + DAO governance token'}
        description={'Optionally you can describe more detailed benefit of this reward'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, desc: e.target.value  }))}
        type={'textArea'}
    />
    <InputContainer
        label={'Pledge'}
        placeholder={'1000'}
        maxLength={10}
        onChange={(e) => setRewardState((prev) => ({ ...prev, pledge: e.target.value  }))}
        type={'number'}
        description={<>
            {dType === 'Microfund' ? 
                <Row>Required amount of backer's microfund </Row> :     
                <Row>Required amount of donation</Row>}
        </>}
     />
    <InputContainer
        label={'Token name'}
        maxLength={20}
        placeholder={'EYE'}
        description={'Symbol/Name of the reward token you will offer to backers'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, tokenName: e.target.value }))}
        type={'text'}
    />
    <InputContainer
        label={'Token address'}
        placeholder={stable.mumbai.usdc}
        onChange={(e) => handleAddressChange(e)}
        description={<Row>Contract address of the locked token - 
               {!validAddress ? <R>Token address is not valid</R> : <G>Token address is valid</G>}
        </Row>}
        type={'text'}
     />
     <InputContainer
        label={'Tokens per Backer'}
        maxLength={15}
        placeholder={'1000000'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, tokenAmount: e.target.value }))}
        description={<>        
            Amount of reward tokens distributed for each backer (in wei)</>}
        type={'number'}
                    />
    <InputContainer
        label={'Capacity'}
        maxLength={3}
        placeholder={'10'}
        description={'Number of claimable rewards'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, cap: e.target.value }))}
        type={'number'}
    />
</>
}

export default RewardFormToken