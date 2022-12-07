import {useState} from 'react'
import Tooltip from '../Tooltip';


const IconTooltip = ({ icon, tooltip }) => {
  const [show, setShow] = useState(false);

  return <div onMouseEnter={()=>{setShow(true)}} onMouseLeave={()=>{setShow(false)}}>
       {show && tooltip && <Tooltip text={tooltip} margin={'-30px'}/>}
      {icon}
    </div>;
};

export default IconTooltip;
