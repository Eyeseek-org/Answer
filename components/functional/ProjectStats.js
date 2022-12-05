import { UniService } from "../../services/DapAPIService";
import { useQuery } from "@tanstack/react-query";
import styled, {useTheme} from 'styled-components'
import { ChainSmallIconComponent } from "../../helpers/MultichainHelpers";
import { DetailIcon } from "../icons/Project";
import { BetweenRow, Row, RowCenter } from "../format/Row";
import { SubcatPick } from "./CatPicks";

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
    const query = `/classes/Project?where={"pid": ${fund}, "chainId": ${chain} }`
    const { data: project } = useQuery(['project-single'], () => UniService.getDataSingle(query),{ });


    return <>
    {project && <MiniContainer>
            <AbsoluteChain><ChainSmallIconComponent ch={chain}/></AbsoluteChain>
           <BetweenRow> 
           <div>  <a href={`/${project.objectId}`} target="_blank" rel="noreferrer"><DetailIcon width={30} height={30} color={theme.colors.icon}/></a></div>
                   <div> {project.title}</div>
                    <div><SubcatPick subcat={project.subcategory} width={30}/></div>
            </BetweenRow>
        </MiniContainer>}
    </>
}

export default ProjectStats