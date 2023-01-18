import ListItem from '../../components/list/ListItem';
import styled from 'styled-components';
import { useState } from 'react';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 100vh;
  background: inherit;
  border: 1px solid white;
  position: relative;
  border-radius: 10px;
  padding: 3%;
  @media (max-width: 1168px) {
    width: 100%;
  }
`

const ListItemsWrapper = styled.div`
  padding-top: 5%;
`

const Search = styled.div`
    display: flex;
    padding: 2%;
    border: 1px solid  ${props => props.theme.colors.border};
    border-radius: 10px;
    margin-top: 3%;
    width: 60%;
`

const Filter = styled.div`
    display: flex;
    padding: 2%;
    border: 1px solid  ${props => props.theme.colors.border};
    border-radius: 10px;
    margin-top: 3%;
`

const FilterRow = styled.div` 
    display: flex;
    justify-content: space-between;
    padding: 2%;
`  

const Question = styled.div`
    position: absolute;
    bottom: 0;
    width: 80%;
    display: flex;
    padding: 2%;
    margin: 2%;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 10px;
`

const Diff = styled.div`
  font-size: 1.1em;
  font-family: 'Neucha';
  font-style: normal;
  letter-spacing: 0.5px;
  font-weight: 300;
  padding-bottom: 2%;
`

const AskForm = styled.div`
    background: black;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    top: 250px;
    height: 150px;
    margin-left: 10%;
    margin-right: 10%;
    z-index: 100;
`

const List = ({collection, data}) => {
    const [filtered, setFilterd] = useState([])
    const [ask, setAsk] = useState(false)

    const handleSubmit = () => {
        console.log('submit')
        setAsk(false)
    }

    const Ask = ({collection}) => {
        return <AskForm>
            <h1>Ask</h1>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </AskForm>
    }

    return <>
        <ListWrapper>
            <h1>Display</h1>
            <p>{collection}</p>
            <FilterRow>
                <Search>Search..</Search>
                <Filter>Filter</Filter>
                <Filter>Filter</Filter>
            </FilterRow>
            {collection !== '' && 
                <ListItemsWrapper>
                    <Diff>Beginner</Diff>
                    <ListItem text='Item 1' delay={0.1}/>
                    <ListItem text='Item 1' delay={0.1}/>
                    <ListItem text='Item 1' delay={0.1}/>
                    <ListItem text='Item 1' delay={0.1}/>
                </ListItemsWrapper>
            }
            <Question onClick={()=>{setAsk(true)}}>
                Ask
            </Question>
        </ListWrapper>
        {ask && <Ask collection={collection}/>}
    </>
}

export default List