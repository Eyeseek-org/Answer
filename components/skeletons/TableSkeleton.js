import {Table, HeadRow, Header} from '../tables/TableStyles'
import Lottie from 'react-lottie'
import { skelAnim } from '../animated/Animations'
import { RewardDesc } from '../typography/Descriptions'

const TableRow = () => {
    return <>
        <Header><Lottie  width={10} options={skelAnim} /> </Header>   
        <Header><Lottie  width={10} options={skelAnim} /> </Header>   
        <Header><Lottie  width={10} options={skelAnim} /> </Header>   
        <Header><Lottie width={10} options={skelAnim} /> </Header>
        </>
}

const TableSkeleton = () => {
    return <><RewardDesc>Server slept, table is loading...</RewardDesc>
    <Table>
      <thead>
          <HeadRow >
               <TableRow/>
          </HeadRow> 
      </thead>
      <tbody>
           <tr><TableRow/></tr>
           <tr><TableRow/></tr>
           <tr><TableRow/></tr>
           <tr><TableRow/></tr>
       </tbody>
    </Table>
    </>
}

export default TableSkeleton

