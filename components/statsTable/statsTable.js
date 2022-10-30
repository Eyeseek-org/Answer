import styled from "styled-components"
import { 
    getLatestBlockHeight,
    getLogEvents, 
} from "../../pages/api/covalent"
import { useEffect, useState } from "react"
import Button from "../buttons/Button"
import Title  from "../typography/Title"
import SectionTitle from "../typography/SectionTitle"
import Subtitle from "../typography/Subtitle"

const StatsTable = () => {
    const [showHottestTable, setShowHottestTable] = useState(false);
    const [showTopChainTable, setShowTopChainTable] = useState(false);

    const Container = styled.div`
        padding-bottom: 2%;
        padding-top: 2%;
        display: flex;
        flex-direction: column;
        align-items: center;
    `

    const I = styled.input`
      padding: 1%;
      padding-left: 2%;
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



    // ******DUMMY DATA FOR NOW******************************
    const HottestProjectsData = [
        {
            title: "Project 1",
            category: "Subcategory",
            logo: "https://cryptologos.cc/logos/thumbs/polygon.png?v=022",
            values: {
                "24hrTxns": 100,
                "Microfunds": 100,
                "Deadline": "2020-01-01"
            }
        },
        {
            title: "Project 2",
            category: "Subcategory",
            logo: "https://cryptologos.cc/logos/thumbs/bnb.png?v=022",
            values: {
                "24hrTxns": 200,
                "Microfunds": 200,
                "Deadline": "2020-01-02"
            }
        },
        {
            title: "Project 3",
            category: "Subcategory",
            logo: "https://cryptologos.cc/logos/thumbs/fantom.png?v=022",
            values: {
                "24hrTxns": 300,
                "Microfunds": 300,
                "Deadline": "2020-01-03"
            }
        }
    ]
    
    const TopChainReactionsData = [
        {
            title: "txn1",
            category: "Subcategory",
            logo: "https://cryptologos.cc/logos/thumbs/polygon.png?v=022",
            values: {
                "donation": 100,
                "impact": 100,
                "multiplier": 100,
                "date": "2020-01-01"
            }
        },
        {
            title: "txn2",
            category: "Subcategory",
            logo: "https://cryptologos.cc/logos/thumbs/bnb.png?v=022",
            values: {
                "donation": 200,
                "impact": 200,
                "multiplier": 200,
                "date": "2022-10-25T14:04:57Z"
            }
        },
        {
            title: "txn3",
            category: "Subcategory",
            logo: "https://cryptologos.cc/logos/thumbs/fantom.png?v=022",
            values: {
                "donation": 300,
                "impact": 300,
                "multiplier": 300,
                "date": "2022-10-25T14:04:57Z"
            }
        }
    ]
    //********************************* */


//     create function that formats date from 2022-10-25T14:04:57Z to Mar 23, 2022 12:04
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        const time = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return `${month} ${day}, ${year} ${time}`;
    }

    const getTable = () => {
        switch (true) {
            case showHottestTable:
                return (
                    <Container>
                        <Title text="Hottest Projects" />
                        <Table>
                            <thead>
                                <Row>
                                    <Header></Header>
                                    <Header>Project Info</Header>
                                    <Header>Transactions 24h</Header>
                                    <Header>Microfunds</Header>
                                    <Header>Deadline</Header>
                                </Row>
                            </thead>
                            <tbody>
                                {HottestProjectsData.map((project, index) => {
                                    return (
                                        <Row key={index}>
                                            <Logo src={project.logo} alt={'logo'} />
                                            <Cell>
                                                {project.title}
                                                <p style={{ fontStyle: "italic" }}>
                                                    {project.category}
                                                </p>
                                            </Cell>
                                            <Cell>{project.values["24hrTxns"]}x</Cell>
                                            <Cell style={{color: '#00EF8B'}}>{project.values["Microfunds"]}x</Cell>
                                            <Cell>{formatDate(project.values["Deadline"])}</Cell>
                                        </Row>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Container>
                )
            case showTopChainTable:
                return (
                    <Container>
                        <Title text="Top Chain Reactions"/>
                        <Table>
                            <thead>
                                <Row>
                                    
                                    <Header></Header>
                                    <Header>Transaction</Header>
                                    <Header>Donation</Header>
                                    <Header>Impact</Header>
                                    <Header>Multiplier</Header>
                                    <Header>Date</Header>
                                </Row>
                            </thead>
                            <tbody>
                                {TopChainReactionsData.map((transaction, index) => {
                                    return (
                                        <Row key={index}>
                                            <Logo src={transaction.logo} alt={'logo'} />
                                            <Cell>
                                                {transaction.title}
                                                <p style={{ fontStyle: "italic" }}>
                                                    {transaction.category}
                                                </p>
                                            </Cell>
                                            <Cell>${transaction.values["donation"]}</Cell>
                                            <Cell>${transaction.values["impact"]}</Cell>
                                            <Cell style={{color: '#00EF8B'}}>{transaction.values["multiplier"]}x</Cell>
                                            <Cell>{formatDate(transaction.values["date"])}</Cell>
                                        </Row>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Container>
                )

            default:
                return (
                    <></>
                )
        }
                 
    }
    

    useEffect(() => {
        const getData = async () => {

            const latestBlockHeight = await getLatestBlockHeight();
            console.log('latest blockheight',latestBlockHeight)
            
            const logEvents = await getLogEvents(latestBlockHeight - 1, latestBlockHeight);
            console.log('log events', logEvents)

        }
        getData();
    }, [])

    return (
        <div>
            <Button text={"Hottest Projects"} onClick={() => (setShowHottestTable(!showHottestTable), setShowTopChainTable(false))}/>
            <Button text={"Top Chain Reactions"} onClick={() => (setShowTopChainTable(!showTopChainTable), setShowHottestTable(false))}/>
            {getTable()}
        </div>
    )
}

export default StatsTable;

// Path: components/statsTable/statsTable.js
