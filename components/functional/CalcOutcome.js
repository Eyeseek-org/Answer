import Tooltip from '../Tooltip';
import { RewardTitle } from '../typography/Titles';
import {useState} from 'react'
import { InfoIcon } from '../icons/Common';
import { Col } from '../format/Row';


const CalcOutcome = ({ conn, multi }) => {
  const [microTooltip, setMicroTooltip] = useState(false);
  const [impactTooltip, setImpactTooltip] = useState(false);
  return (
    <Col>
      {conn ?
        <RewardTitle onMouseEnter={()=>{setMicroTooltip(true)}} onMouseLeave={()=>{setMicroTooltip(false)}}>
          {microTooltip && <Tooltip text={'Number of involved microfunds from other users'} margin={'-70px'}/>}
          {conn} X 
          <InfoIcon width={15}/>
        </RewardTitle>
       : null}
      {multi ? 
        <RewardTitle onMouseEnter={()=>{setImpactTooltip(true)}} onMouseLeave={()=>{setImpactTooltip(false)}}>
        {impactTooltip && <Tooltip text={'Total impact of this donation'} margin={'-50px'}/>}
          ${multi}
          <InfoIcon width={15}/>
        </RewardTitle>
      : null}
    </Col>
  );
};

export default CalcOutcome;
