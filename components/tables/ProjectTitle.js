import {useTheme} from 'styled-components'
import { VerifiedIcon } from '../icons/Common';
import { AbsoluteRight } from '../format/Box';
import {useState} from 'react'
import MyTooltip from '../Tooltip';

const ProjectTitle = ({tooltip,title, verified}) => {
    const theme = useTheme();
    const [showTooltip, setShowTooltip] = useState(false)
    return <div onMouseEnter={()=>{setShowTooltip(true)}} onMouseLeave={()=>{setShowTooltip(false)}}>         
    {showTooltip && <MyTooltip text={`Project ID # ${tooltip}`}/>}   
        <b>{title}</b>
            <AbsoluteRight>
              {verified && <VerifiedIcon height={15} width={15} color={theme.colors.icon} />}
            </AbsoluteRight>
    </div>
}

export default ProjectTitle