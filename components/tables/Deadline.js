import styled from 'styled-components'
import {useState, useEffect} from 'react'
import { R } from '../typography/ColoredTexts';

const Container = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: -5px;
`

const Deadline = ({ deadline }) => {
    const [days, setDays] = useState(null);
    useEffect(() => {
        if (deadline) {
            const test = new Date(deadline);
            const today = new Date();
            const diffInTime = test.getTime() - today.getTime();
            const diffInDays = diffInTime / (1000 * 3600 * 24);
            console.log(diffInDays) 
            setDays(Math.trunc(diffInDays))
        }
    }, [])

    return <Container>
        {days && <>
           {days > 0 && <>  {days}d </>}
            {days <= 0 && <R> 0d </R>}
        </>}
    </Container>
}

export default Deadline