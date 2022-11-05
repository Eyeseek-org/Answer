// https://app.clickup.com/t/321nwca
import styled from "styled-components"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAccount } from "wagmi"
import Loading from "../components/Loading"
import Title from "../components/typography/Title"
import {categories} from "../data/categories"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;
`

const Subcategory = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    overflow: wrap;
    margin: 5px;
    border-radius: 5px;
    background-color: transparent;
`

const Label = styled.label`
font-family: "Roboto";
    font-size: 1em;
    margin: 2px;
    border-radius: 15px;
    color: white;
    padding: 5px;
    cursor: pointer;
    border: 1px solid grey;
`

const Preferences = () => {
  const [loading, setLoading] = useState(true)
  const [objectId, setObjectId] = useState(null)
  const {address} = useAccount()
  const [profile, setProfile] = useState({
     "Technology": {
         "Gadgets": false,
          "Robots": false,
          "Wearables": false,
          "Other": false,
      },
      "Games": {
          "Mobile": false,
          "Board": false,
          "Card": false,
          "Other": false,
      },
      "Art": {
          "Painting": false,
          "Sculpture": false,
          "Photography": false,
          "Other": false,
      },
      "Web3": {
          "Defi": false,
          "DAO": false,
          "Gamefi": false,
          "NFT": false,
          "Social-fi": false,
          "Infrastrucute": false,
          "Dev tooling": false,
          "Other": false,
      },
      "Science": {
          "Biology": false,
          "Ecologogy": false,
          "Psychology": false,
          "Chemistry": false,
          "Physics": false,
          "Engineering": false,
          "Medicine": false,
          "Neuroscience": false,
          "Other": false,
      },
      "Open_Source": {
          "AI": false,
          "Big Data": false,
          "Cloud": false,
          "Cybersecurity": false,
          "IoT": false,
          "Machine Learning": false,
          "Dev tools": false,
          "Other": false,
      }
  })
  
  const getProfile = async () => {
    const config = {
      headers: {
        "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
        "x-Parse-Master-Key": `${process.env.NEXT_PUBLIC_MORALIS}`,
      },
    };
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/_User?where={"ethAddress":"${address.toLowerCase()}"}`, config);
      setProfile(res.data.results[0].pref[0]);
      setObjectId(res.data.results[0].objectId)

    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (e) => {
    // update profile in database
    const config = {
      headers: {
        "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
        "x-Parse-Master-Key": `${process.env.NEXT_PUBLIC_MORALIS}`,
      },
    };
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/_User/${objectId}`, {'pref' : [profile]}, config);
      localStorage.setItem('localProfile', JSON.stringify(profile))
    } catch (error) {
      console.log(error);
    }
  };


  const handleSelect = async(category, subcategory) => {
    const newProfile = {...profile}
    newProfile[category][subcategory] = !newProfile[category][subcategory]
    setProfile(newProfile)
    updateProfile()
  }

  // Check local storage for profile, if not there, then create one
  useEffect(() => {
    if (localStorage.getItem('localProfile') === null) {
        localStorage.setItem('localProfile', JSON.stringify(profile))
        setLoading(false)
    } else {
        setProfile(JSON.parse(localStorage.getItem('localProfile')))
        setLoading(false)
    }
    getProfile()
  }, [])

    return (
    <Container>
      {loading ? <Loading /> : null}
      {/* map out categories and their corresponding subcategories, if the user selects one then add the category and corresponding subcategory to the profile */}
      {!loading && Object.keys(categories).map((category, index) => {
          return (
            <div key={index}>
              <Title text={category}/>
              <Subcategory >
                {categories[category].map((subcategory, index) => {
                    return( 
                      <Label
                        key={index}
                        onClick={() => handleSelect(category, subcategory)}
                        name={`${category}-${subcategory}`}
                        style={{backgroundColor: profile[category][subcategory] ? 'green' : 'black'}}
                      >
                        {subcategory}
                      </Label>
                    )
                })}
              </Subcategory>
            </div>
          )
      })}
    </Container>
    )
}

export default Preferences