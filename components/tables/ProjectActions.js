import styled, { useTheme } from "styled-components"
import {useState} from 'react'
import { UrlSocialsIcon } from "../icons/Common"
import { DetailIcon, WebIcon } from "../icons/Project"
import MyTooltip from "../Tooltip"
import { ImageHover } from "./TableStyles"

const Container = styled.div`
    position: relative;
`

const ProjectActions = ({project, website, socials}) => {
    const theme = useTheme()
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipText, setTooltipText] = useState('')

    const handleTooltip = (text) => {
        setTooltipText(text)
        setShowTooltip(true)
    }

    return <Container>
        {showTooltip && <MyTooltip text={tooltipText} margin={'-70px'}/>}
        <a href={`/project/${project}`} rel="noopener noreferrer" target="_blank">
           <ImageHover onMouseEnter={()=>{handleTooltip('Open project in new window')}} onMouseLeave={()=>{setShowTooltip(false)}}>
                <DetailIcon width={30}  color={theme.colors.icon} height={30} />
            </ImageHover>
        </a>
        <a href={website} rel="noopener noreferrer" target="_blank">
            <ImageHover onMouseEnter={()=>{handleTooltip(`Project website: ${website}`)}} onMouseLeave={()=>{setShowTooltip(false)}}>
                <WebIcon color={theme.colors.icon} width={30} height={30}/>
            </ImageHover>
        </a>
        <a href={socials} rel="noopener noreferrer" target="_blank">
           <ImageHover onMouseEnter={()=>{handleTooltip(`Primary socials: ${socials}`)}} onMouseLeave={()=>{setShowTooltip(false)}}>
                <UrlSocialsIcon color={theme.colors.icon} height={30} width={30} />
            </ImageHover>
        </a>
    </Container>
}

export default ProjectActions