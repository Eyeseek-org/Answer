import { UniService } from "../../services/DapAPIService";
import { useQuery } from "@tanstack/react-query";
import styled, {useTheme} from 'styled-components'
import { ChainIconComponent } from "../../helpers/MultichainHelpers";

const MiniContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
`

const ProjectStats = ({fund, chain}) => {

    const query = `/classes/Project?where={"pid": ${fund}, "chainId": ${chain} }`
    const { data: project } = useQuery(['project-single'], () => UniService.getDataSingle(query),{

     });


    return <>
    {project && <MiniContainer>
            <ChainIconComponent ch={chain}/>
        </MiniContainer>}
    </>
}

export default ProjectStats