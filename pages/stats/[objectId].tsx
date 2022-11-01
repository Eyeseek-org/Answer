
import type { NextPage } from "next";
import { useRouter } from "next/router"
import styled from 'styled-components'
import StatsTable from '../../components/statsTable/StatsTable'

const Stats: NextPage = () => {
    const router = useRouter()
    const { objectId } = router.query 


  return <>
    <StatsTable/>
  </>
}

export default Stats;