import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import ImgSkeleton from '../skeletons/ImgSkeleton'
import Tag from "../../components/typography/Tag"
import donation from '../../abi/donation.json'
import { useContractRead } from 'wagmi'

const A = styled(Link)`
    &:hover{
        text-decoration: none;  
    }
`

const Container = styled.div`
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
    max-height: 450px;
    width: 32%;
    max-width: 500px;
    padding: 2%;
    margin-top: 3%;
    border: 1px solid rgba(163, 163, 163, 0.3);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
    border-radius: 5px;
    &:hover{
        opacity: 0.8;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        width: 100%;
        padding: 5%;
        margin-top: 7%;
    }
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Amount = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    color: #00FFA3;
`

const Title = styled.div`
    font-family: "Gemunu Libre";
    font-style: normal;
    font-weight: 700;
    font-size: 1.5em;
    color: #b0f6ff;
    margin-top: 5%;
`

const Desc = styled.div`
    font-family: 'Neucha';
    letter-spacing: 0.1px;
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    color: #FFFFFF;
    margin-top: 5%;
`

const Days = styled.div`
    position: absolute;
    font-size: 0.7em;
    font-family: 'Gemunu Libre';
    right: 5px;
    top: 5px;
`

const ProjectCard = ({ title, description, category, subcategory, link, pid, imageUrl }) => {

    var bal = '0'
    var days = '0'
    var max = '0'

    const balance = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'getFundBalance',
        chainId: 80001,
        args: [pid],
        watch: false,
    })

    if (balance.data) {
        bal = balance.data.toString()
    }

    const deadline = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'getFundDeadline',
        chainId: 80001,
        args: [pid],
        watch: false,
    })

    if (deadline.data) {
        const d = deadline.data.toString()
        const test = new Date(d * 1000);
        days = test.getDate()
    }

    const cap = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'getFundCap',
        chainId: 80001,
        args: [pid],
        watch: false,
    })

    if (cap.data) {
        max = cap.data.toString()
    }

    return <A href={link}>
        <Container>
            <Days>{days}d</Days>
            <div> {!imageUrl ? <ImgSkeleton /> : <Image src={imageUrl} alt={title} width={'300px'} height={'300px'} />}</div>
            <Row>
                <Row>
                    <div> {category && <Tag tag={category} color={"#000850"} />}</div>
                    <div>{subcategory && <Tag tag={subcategory} color={"#035201"} />}</div>
                </Row>
                <Amount>
                    {bal} / {max}
                </Amount>
            </Row>
            <Title>{title}</Title>
            <Desc>{description}</Desc>
        </Container>
    </A>
}

export default ProjectCard