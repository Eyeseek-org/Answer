import {useEffect, useState} from 'react'
import { Absolute } from '../format/Box';
import { RowCenter } from '../format/Row';
import {RoboticsIcon, WearablesIcon, CatOtherIcon, MobileGameIcon, BoardGameIcon, VideoGameIcon, HwIcon,
  IllustrationIcon, PerformanceIcon, MusicIcon, DefiIcon, DaoIcon, NftApeIcon
} from '../icons/Categories'
import { BookIcon, BookmarkIcon } from '../icons/Common';
import { ImageHover } from '../tables/TableStyles';
import Tooltip from '../Tooltip';

// Technology: ['Gadgets', 'Robots', 'Wearables', 'Other'],
// Games: ['Mobile', 'Board', 'Video', 'Hardware', 'Other'],
// Art: ['Film & Video', 'Illustrations', 'Performance', 'Digital', 'Publications', 'Design', 'Music', 'Photography', 'Other'],
// Web3: ['Defi', 'DAO', 'Gamefi', 'NFT', 'Social-fi', 'Infrastrucute', 'Dev tooling', 'Other'],
// Science: ['Biology', 'Ecologogy', 'Psychology', 'Chemistry', 'Physics', 'Engineering', 'Medicine', 'Neuroscience', 'Other'],
// OpenSource: ['AI', 'Big Data', 'Cloud', 'Cybersecurity', 'IoT', 'Machine Learning', 'Dev tools', 'Other'],

export const SubcatPick = ({subcat}) => {
    const [subcatIcon, setSubcatIcon] = useState(<></>);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipText, setTooltipText] = useState('');

    useEffect(() => {
      setSubcategory(subcat);
    },[subcat])


    const setSubcategory = (subcat) => {
         setTooltipText(subcat)
        if (subcat === 'Gadgets') {
            setSubcatIcon(<GadgetsIcon width={30} />)
        } else if (subcat === 'Robots') {
          setSubcatIcon( <RoboticsIcon width={30} />)
        } else if (subcat === 'Wearables') {
          setSubcatIcon( <WearablesIcon width={30} />)
        } else if (subcat === 'Other') {
          setSubcatIcon( <CatOtherIcon width={30} />)
        } else if (subcat === 'Mobile') {
          setSubcatIcon( <MobileGameIcon width={30} />)
        } else if (subcat === 'Board') {
          setSubcatIcon( <BoardGameIcon width={30} />)
        } else if (subcat === 'Video') {
          setSubcatIcon( <VideoGameIcon width={30} />)
        } else if (subcat === 'Hardware') {
          setSubcatIcon( <HwIcon width={30} />)
        } else if (subcat === 'Video') {
          setSubcatIcon( <VideoIcon width={30} />)
        } else if (subcat === 'Illustrations'){
          setSubcatIcon( <IllustrationIcon width={30} />)
        } else if (subcat === 'Performance'){
          setSubcatIcon( <PerformanceIcon width={30} />)
        } else if (subcat === 'Publications'){
          setSubcatIcon( <PerformanceIcon width={30} />)
        } else if (subcat === 'Music'){
          setSubcatIcon( <MusicIcon width={30} />)
        } else if (subcat === 'Defi') {
          setSubcatIcon( <DefiIcon width={30} />)
        } else if (subcat === 'DAO') {
          setSubcatIcon( <DaoIcon width={30} />)
        } else if (subcat === 'NFT') {
          setSubcatIcon( <NftApeIcon width={30} />)
        } else {
          setSubcatIcon(<>{subcat}</>)
        }
    } 

    return <RowCenter>
   {showTooltip && <Absolute><Tooltip text={tooltipText}/></Absolute>}
    <ImageHover onMouseEnter={()=>{setShowTooltip(true)}} onMouseLeave={()=>{setShowTooltip(false)}}>
      {subcatIcon}
    </ImageHover>
    </RowCenter>
  }
  


