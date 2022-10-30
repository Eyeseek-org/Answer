
import styled from "styled-components"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAccount } from "wagmi"

// Common source of categories/subcategories
import {categories} from "../data/categories"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const Preferences = () => {
    const [profile, setProfile] = useState([])
    const {address} = useAccount()


    const getData = async () => {
        const config = {
          headers: {
            "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
            "x-Parse-Master-Key": `${process.env.MORALIS}`
          },
        };
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/_User?where={"ethAddress":"${address.toLowerCase()}"}`, config);
            await setProfile(res.data.results);
        } catch (error) {
          console.log(error);
        }
      };

      // https://app.clickup.com/t/321nwca
      
    useEffect(() => {
        getData()
    },[])

    return <Container>
        {profile.map((p) => <div key={p.objectId}>            
            <div>Profile Row</div>
        </div>)}

    </Container>
}

export default Preferences