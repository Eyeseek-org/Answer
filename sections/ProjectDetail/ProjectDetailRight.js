import styled from 'styled-components'
import donation from '../../abi/donation.json'
import { useContractRead, useAccount } from 'wagmi'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ButtonAlt from "../../components/buttons/ButtonAlt"
import Socials from '../../components/buttons/Socials'
import Bookmark from '../../components/functional/Bookmark'
import Stream from './Stream'


const RightPart = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 3px solid #b0f6ff;
  width: 50%;
  margin-left: 3%;
  margin-top: 2%;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    margin-top: 5%;
    margin-bottom: 5%;
  }
`
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1.4%;
  padding-bottom: 0.5%;
  @media (min-width: 1580px) {
    font-size: 1.3em;
  }
`

const RowCol = styled.div`
  display: flex;
  flex-direction: column;
`
const RowTitle = styled.div`
  font-family: "Chenla";
  font-style: normal;
  font-size: 1.5em;
  font-weight: 400;
  color: ${(props) => props.color};
  @media (min-width: 1580px) {
    font-size: 1.8em;
  }
`

const RowDesc = styled.div`
  color: white;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
`

const FlexRow = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`
const ButtonBox = styled.div`
  margin-top: 4%;
`

const Backers = styled.div`
    color: #B0F6FF;
    cursor: pointer;
    &:hover{
        opacity: 0.9;
    }
`

const ProjectDetailRight = ({pid, objectId, bookmarks, pType, owner, add, chainId}) => {
    const {address} = useAccount()
    const router = useRouter()

    var bal = 'n/a'
    var microInvolved = 'n/a'
    var days = 'n/a'
    var max = 'n/a'
    var backing ='n/a'

    const micros = useContractRead({
        addressOrName: add,
        contractInterface: donation.abi,
        functionName: 'getConnectedMicroFunds',
        chainId: chainId,
        args: [pid],
        watch: false,
    })

    if (micros.data) {
        microInvolved = micros.data.toString()
    }

    const balance = useContractRead({
        addressOrName: add,
        contractInterface: donation.abi,
        functionName: 'getFundBalance',
        chainId: chainId,
        args: [pid],
        watch: false,
    })

    if (balance.data) {
        bal = balance.data.toString()
    }

    const deadline = useContractRead({
        addressOrName: add,
        contractInterface: donation.abi,
        functionName: 'getFundDeadline',
        chainId: chainId,
        args: [pid],
        watch: false,
    })

    if (deadline.data) {
        const d = deadline.data.toString()
        const test = new Date(d * 1000);
        days = test.getDate()
    }

    const cap = useContractRead({
        addressOrName: add,
        contractInterface: donation.abi,
        functionName: 'getFundCap',
        chainId: chainId,
        args: [pid],
        watch: false,
    })

    if (cap.data) {
        max = cap.data.toString()
    }

    const backers = useContractRead({
        addressOrName: add,
        contractInterface: donation.abi,
        functionName: 'getBackers',
        chainId: chainId,
        args: [pid],
        watch: false,
    })

    if (backers.data) {
        backing = backers.data.toString()
    }

    const Row = ({ title, desc, right, color }) => {
        return (
            <RowBox>
                <RowCol>
                    <RowTitle color={color}>{title}</RowTitle> <RowDesc>{desc}</RowDesc>
                </RowCol>
                {right}
            </RowBox>
        )
    }

    /// TBD backers will be moved elsewhere
    return <RightPart>
        {pType !== 'Stream' ?
        <div>
            <Row title={bal} desc={`pledged of ${max} goal`} color="#00FFA3" right={<Bookmark objectId={objectId} bookmarks={bookmarks} />} />
            <Row title={backing} desc={<Link href={`/stats/${objectId}`}><Backers>backers</Backers></Link>} 
            color="white" />
            <Row title={microInvolved} desc={`microfunds active`} color="white" />
            <FlexRow>
                <Row title={days} desc={`days to go`} color="white" />
                <Socials/>
            </FlexRow>
        </div> : <Stream recipient={owner} objectId={objectId}/>}
        <ButtonBox>
        {pType === 'Standard' &&  <ButtonAlt width={'100%'} text="Fund it!" onClick={() => router.push(`/donate/${objectId}`)}/> 
        }
        {pType === 'Stream' && owner !== address && <ButtonAlt width={'100%'} text="Stream!!" />}
        </ButtonBox>

    </RightPart>
}

export default ProjectDetailRight