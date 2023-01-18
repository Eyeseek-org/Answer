import styled from "styled-components"
import { Row } from "../format/Row"
import {motion} from "framer-motion"

const ListRow = styled(motion.div)`
    display: flex;  
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    height: 1rem;
    border: 1px solid #4E4E4E;
    @media (max-width: 1168px) {
        height: 3rem;
    }
    &:hover {
        opacity: 0.9;
    }
`

const ListItem = ({text, delay}) => {
    return <>
        <ListRow
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                delay: delay,
                duration: 0.3,
                opacity: 1,
            }}
        >
            <div>{text}</div>
            <Row>
                <div>O</div>
                <div>O</div>
                <div>O</div>
            </Row>
        </ListRow>
    </>
}

export default ListItem 