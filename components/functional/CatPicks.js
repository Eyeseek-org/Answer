import {useEffect, useState} from 'react'
import {RoboticsIcon, WearablesIcon, CatOtherIcon, MobileGameIcon, BoardGameIcon, VideoGameIcon, HwIcon,
  IllustrationIcon, PerformanceIcon, MusicIcon, DefiIcon, DaoIcon, NftApeIcon
} from '../icons/Categories'

// Technology: ['Gadgets', 'Robots', 'Wearables', 'Other'],
// Games: ['Mobile', 'Board', 'Video', 'Hardware', 'Other'],
// Art: ['Film & Video', 'Illustrations', 'Performance', 'Digital', 'Publications', 'Design', 'Music', 'Photography', 'Other'],
// Web3: ['Defi', 'DAO', 'Gamefi', 'NFT', 'Social-fi', 'Infrastrucute', 'Dev tooling', 'Other'],
// Science: ['Biology', 'Ecologogy', 'Psychology', 'Chemistry', 'Physics', 'Engineering', 'Medicine', 'Neuroscience', 'Other'],
// OpenSource: ['AI', 'Big Data', 'Cloud', 'Cybersecurity', 'IoT', 'Machine Learning', 'Dev tools', 'Other'],

export const SubcatPick = ({subcat}) => {
    const [subcatIcon, setSubcatIcon] = useState(<></>);

    useEffect(() => {
      setSubcategory(subcat);
    },[subcat])


    const setSubcategory = (subcat) => {
        if (subcat === 'Gadgets') {
            setSubcatIcon(<GadgetsIcon width={20} />)
        } else if (subcat === 'Robots') {
          setSubcatIcon( <RoboticsIcon width={20} />)
        } else if (subcat === 'Wearables') {
          setSubcatIcon( <WearablesIcon width={20} />)
        } else if (subcat === 'Other') {
          setSubcatIcon( <CatOtherIcon width={20} />)
        } else if (subcat === 'Mobile') {
          setSubcatIcon( <MobileGameIcon width={20} />)
        } else if (subcat === 'Board') {
          setSubcatIcon( <BoardGameIcon width={20} />)
        } else if (subcat === 'Video') {
          setSubcatIcon( <VideoGameIcon width={20} />)
        } else if (subcat === 'Hardware') {
          setSubcatIcon( <HwIcon width={20} />)
        } else if (subcat === 'Video') {
          setSubcatIcon( <VideoIcon width={20} />)
        } else if (subcat === 'Illustrations'){
          setSubcatIcon( <IllustrationIcon width={20} />)
        } else if (subcat === 'Performance'){
          setSubcatIcon( <PerformanceIcon width={20} />)
        } else if (subcat === 'Music'){
          setSubcatIcon( <MusicIcon width={20} />)
        } else if (subcat === 'Defi') {
          setSubcatIcon( <DefiIcon width={20} />)
        } else if (subcat === 'DAO') {
          setSubcatIcon( <DaoIcon width={20} />)
        } else if (subcat === 'NFT') {
          setSubcatIcon( <NftApeIcon width={20} />)
        } else {
          setSubcatIcon(<>{subcat}</>)
        }
    } 

    return <>{subcatIcon}</>
  }
  


