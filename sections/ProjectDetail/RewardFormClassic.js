import { useReward } from '../utils/rewardContext';
import InputContainer from "../../components/form/InputContainer";
import { Row } from '../../components/format/Row';

const RewardFormClassic = ({dType}) => {
    const { setRewardState } = useReward();

    return <> 
    <InputContainer
        label={'Title'}
        placeholder={'Godspeed'}
        description={'Create a unique title for your reward'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, title: e.target.value }))}
        type={'text'}
    />
    <InputContainer
        label={'Description'}
        placeholder={'Backer receives autographed copy of the book'}
        description={'Describe briefly what backer receives for this reward'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, desc: e.target.value  }))}
        type={'textArea'}
    />
    <InputContainer
        label={'Pledge'}
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
        placeholder={'10'}
        description={'Number of claimable rewards'}
        onChange={(e) => setRewardState((prev) => ({ ...prev, cap:  e.target.value  }))}
        type={'number'}
    />
</>
}

export default RewardFormClassic