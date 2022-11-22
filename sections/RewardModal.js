import {useState} from 'react';
import {AnimatedModal} from '../components/animated/AnimatedModal'
import { BetweenRow } from '../components/format/Row';
import { ExpandIcon, ShrinkIcon } from '../components/icons/Notifications';
import RewardManageTable from '../components/tables/RewardManageTable';


const RewardModal = ({ rewardId, showMe }) => {
    const [display, setDisplay] = useState(showMe);
    const [expand, setExpand] = useState(false);

    return  <> 
            <AnimatedModal expand={expand}>
              <BetweenRow>
                <>Notifications</>
                <button onClick={() => setExpand(!expand)}>
                    {!expand ? <ExpandIcon width={20} height={20} /> : <ShrinkIcon width={20} height={20} />}
                </button>
            </BetweenRow>
            <RewardManageTable rewardId={rewardId} />
        </AnimatedModal>
        </>
}

export default RewardModal