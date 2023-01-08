import { UniService } from "../../services/DapAPIService";
import { useQuery } from "@tanstack/react-query";
import styled, {useTheme} from 'styled-components'
import { ChainIconComponent, ChainSmallIconComponent } from "../../helpers/MultichainHelpers";
import { DetailIcon } from "../icons/Project";
import { BetweenRow } from "../format/Row";
import { SubcatPick } from "./CatPicks";
import IconTooltip from "../buttons/IconTooltip";

const MiniContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
`

const AbsoluteChain = styled.div`
    position: absolute;
    right: 5px;
`

const ProjectStats = ({fund, chain}) => {

    const theme = useTheme()
    const query = `/classes/Project?where={"chainId":${chain}}`
    const { data: project } = useQuery(['project-single'], () => UniService.getDataSingle(query),{ });

    return <>
    {project && <MiniContainer>
            <AbsoluteChain><ChainSmallIconComponent ch={chain}/></AbsoluteChain>
           <BetweenRow> 
           <div>  <a href={`/${project.objectId}`} target="_blank" rel="noreferrer">
            <IconTooltip icon={<DetailIcon width={20} height={20} color={theme.colors.icon}/>} tooltip={"View Project"}/>
              </a></div>
                   <div> {project.title}</div>
                    <div><SubcatPick subcat={project.subcategory} width={25}/></div>
            </BetweenRow>
        </MiniContainer>}
    </>
}

export default ProjectStats