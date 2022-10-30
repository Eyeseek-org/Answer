import styled from 'styled-components'
import donation from '../../abi/donation.json'
import { useContractRead } from 'wagmi'
import Link from 'next/link'

import ButtonAlt from "../../components/buttons/ButtonAlt"
import Socials from '../../components/buttons/Socials'
import Bookmark from '../../components/functional/Bookmark'


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

const ProjectDetailRight = ({pid, objectId, bookmarks}) => {

    var bal = '0'
    var microInvolved = '0'
    var days = '0'
    var max = '0'
    var backing ='0'

    const micros = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'getConnectedMicroFunds',
        chainId: 80001,
        args: [pid],
        watch: false,
    })

    if (micros.data) {
        microInvolved = micros.data.toString()
    }

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

    const backers = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'getBackers',
        chainId: 80001,
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

    return <RightPart>
        <div>
            <Row title={bal} desc={`pledged of ${max} goal`} color="#00FFA3" right={<Bookmark objectId={objectId} bookmarks={bookmarks} />} />
            <Row title={backing} desc={`backers`} color="white" />
            <Row title={microInvolved} desc={`microfunds active`} color="white" />
            <FlexRow>
                <Row title={days} desc={`days to go`} color="white" />
                <Socials/>
            </FlexRow>
        </div>
        <ButtonBox>
        <Link href={`/donate/${pid}`}>
            <ButtonAlt
                width={'100%'}
                text="Fund it!"
            /></Link> 
        </ButtonBox>
    </RightPart>
}

export default ProjectDetailRight