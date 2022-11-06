import styled from "styled-components"
import { 
    getLatestBlockHeight,
    getLogEvents, 
} from "../../pages/api/covalent"
import { useEffect, useState } from "react"
import Title from "../typography/Title"
import Loading from "../Loading"

const StatsTable = ({objectId, pid, chain}) => {
    const [loading, setLoading] = useState(true)
    const [microCreatedLogs, setMicroCreatedLogs] = useState([]);
    const [transactionLogs, setTransactionLogs] = useState([]);
    const [filteredTransactionLogs, setFilteredTransactionLogs] = useState([]);
    const [filteredMicroCreatedLogs, setFilteredMicroCreatedLogs] = useState([]);

    const Container = styled.div`
        padding-bottom: 2%;
        padding-top: 2%;
        display: flex;
        background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
        flex-direction: column;
        align-items: center;
        padding-left: 10%;
        padding-right: 10%;
    `
    const Table = styled.table`
        width: 100%;
        border-collapse: collapse;
        border: none;
        text-align: center;
    `
    const Header = styled.th`
        border: none;
        padding: 1%;
        background-color: transparent;
        font-family: "Roboto";
    `
    const Row = styled.tr`
        padding: 1%;
        border-bottom: 1px solid grey;
    `
    const Cell = styled.td`
        padding: 1%;
        font-family: "Roboto";

    `
    const Logo = styled.img`
        width: 50px;
        height: 50px;
        border-radius: 50%;
    `

    //create function that maps data into a table using keys as headers
    const mapDataToTable = (data) => {
        return (
            <Table>
                <thead>
                    <Row>
                        {Object.keys(data[0]).map((key, index) => {
                            if(key != "fund_id"){
                                const formattedKey = key.split("_").map((word) => {
                                    return word.charAt(0).toUpperCase() + word.slice(1);
                                }
                                ).join(" ");
                                return <Header key={index}>{formattedKey}</Header>
                            }
                        })}
                    </Row>
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        return (
                            <Row key={index}>
                                {Object.keys(row).map((key, index) => {
                                    if (key != "fund_id") {
                                        if (key === "donator_address" || key === "owner") {
                                            return <Cell key={index}>{row[key].slice(0, 3) + "..." + row[key].slice(-3)}</Cell>
                                        }
                                        if (key === "currency_id"){
                                            return <Cell key={index}>{row[key] == 1 ? "USDC" : "USDT"}</Cell>
                                        }
                                        else{
                                            return <Cell key={index}>{row[key]}</Cell>
                                        }
                                    }
                                })}
                            </Row>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    useEffect(() => {
        const getData = async () => {
            //Grab latest block height to determine how many blocks to go back
            const latestBlockHeight = await getLatestBlockHeight(chain);
            console.log('latest blockheight',latestBlockHeight)

            // Covalent goes back 999 blocks, so we set the starting block back 999
            const startingBlock = latestBlockHeight - 999;

            // Get all Log Events and then sort them into two event categories, MicroCreated and Transaction
            const logEvents = await getLogEvents(startingBlock, chain);
            const microCreatedEvents = logEvents.micro_created_log_data;
            const transactionEvents = logEvents.total_txn_log_data;
            setMicroCreatedLogs(microCreatedEvents);
            setTransactionLogs(transactionEvents);

            // filter data to render by the finding the logs that match the fund id to the incoming pid
            const filteredMicroCreatedLogs = microCreatedEvents.filter((log) => {
                return log.fund_id === pid;
            }
            )
            const filteredTransactionLogs = transactionEvents.filter((log) => {
                return log.fund_id === pid;
            }
            )
            // setFilteredMicroCreatedLogs(filteredMicroCreatedLogs);
            setFilteredTransactionLogs(filteredTransactionLogs);
            setFilteredMicroCreatedLogs(filteredMicroCreatedLogs);

            setLoading(false);
        }
        getData();
    }, [])

    return (
        <Container>
            {loading && <Loading />}
            <Title text="Total Transactions" />
            {!loading && filteredTransactionLogs.length > 0 && mapDataToTable(filteredTransactionLogs)}
            {!loading && filteredTransactionLogs.length === 0 && <p>No transactions have been made in last 999 blocks</p>}
            <br />
            <Title text="Micro Funds" />
            {!loading && filteredMicroCreatedLogs.length > 0 && mapDataToTable(filteredMicroCreatedLogs)}
            {!loading && filteredMicroCreatedLogs.length === 0 && <p>No micro created events have been made in last 999 blocks</p>}
        </Container>
    )
}

export default StatsTable;