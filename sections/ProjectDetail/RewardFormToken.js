import { useReward } from '../utils/rewardContext';
import {useState} from 'react'
import InputContainer from "../../components/form/InputContainer";
import { Row } from "../../components/format/Row";
import { G, R } from '../../components/typography/ColoredTexts';

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
        description={'Create a unique title for your reward'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, title: e.target.value  }))}
        type={'text'}
    />
    <InputContainer
        label={'Description'}
        placeholder={'Backer receives autographed copy of the book'}
        description={'Describe briefly what backer receives for this reward'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, desc:e.target.value  }))}
        type={'textArea'}
    />
    <InputContainer
        label={'Pledge'}
        placeholder={'1000'}
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
        placeholder={'EYE'}
        description={'Symbol/Name of the reward token you will offer to backers'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, tokenName: e.value }))}
        type={'text'}
    />
    <InputContainer
        label={'Token address'}
        placeholder={process.env.NEXT_PUBLIC_AD_TOKEN}
        onChange={(e) => handleAddressChange(e)}
        description={<Row>Contract address of the locked token - 
               {!validAddress ? <R>Token address is not valid</R> : <G>Token address is valid</G>}
        </Row>}
        type={'text'}
     />
     <InputContainer
        label={'Amount/Backer'}
        placeholder={'1000000'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, tokenAmount: e.value }))}
        description={<>        
            Amount of tokens eligible for reward for each backer (wei units)</>}
        type={'number'}
                    />
    <InputContainer
        label={'Capacity'}
        placeholder={'10'}
        description={'Number of claimable rewards'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, cap: e.value }))}
        type={'number'}
    />
</>
}

export default RewardFormToken