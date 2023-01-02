import { useReward } from '../utils/rewardContext';
import InputContainer from "../../components/form/InputContainer";
import { Row } from '../../components/format/Row';

const RewardFormClassic = ({dType}) => {
    const { setRewardState } = useReward();

    return <> 
    <InputContainer
        label={'Title'}
        maxLength={20}
        placeholder={'Godspeed'}
        description={'Create a unique title for your reward'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, title: e.target.value }))}
        type={'text'}
    />
    <InputContainer
        label={'Specify delivery'}
        maxLength={120}
        placeholder={'Account trial for 1 month'}
        description={'Shortly describe what backer will receive for this reward'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, delivery: e.target.value  }))}
        type={'text'}
    />
    <InputContainer
        label={'Description'}
        maxLength={250}
        placeholder={'User receives same benefits as for group "Premium" + 1 month trial'}
        description={'Optionally you can describe more detailed benefit of this reward'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, desc: e.target.value  }))}
        type={'textArea'}
    />
    <InputContainer
        label={'Estimated delivery'}
        maxLength={20}
        placeholder={'October 2055'}
        description={'Estimate time of delivery'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, estimation: e.target.value  }))}
        type={'text'}
    />
    <InputContainer
        label={'Pledge'}
        maxLength={10}
        placeholder={'1000'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, pledge:  e.target.value  }))}
        type={'number'}
        description={<>
            {dType === 'Microfund' ? 
                <Row>Required amount of backer's microfund </Row> :     
                <Row>Required amount of donation</Row>}
        </>}
     />
    <InputContainer
        label={'Capacity'}
        maxLength={4}
        placeholder={'10'}
        description={'Number of claimable rewards'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, cap:  e.target.value  }))}
        type={'number'}
    />
</>
}

export default RewardFormClassic