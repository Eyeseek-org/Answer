import styled, { css } from "styled-components"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAccount } from "wagmi"
import Loading from "../components/Loading"
import {categories} from "../data/categories"
import defaultProfile from "../data/profile"
import { moralisApiConfig } from "../data/moralisApiConfig"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 70px;
    padding-left: 2%;
`

const Section = styled.div`
  margin-top: 1%;
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

const Title = styled.div`
    font-family: 'Neucha';
    letter-spacing: 0.3px;
    font-size: 1.2em;
    width: 100%;
    padding-bottom: 10px;

    border-bottom: 1px solid #585858;
    @media (min-width: 1768px) {
      font-size: 1.5em;
    }
`

const Label = styled.label`
   font-family: "Montserrat";
    font-size: 1em;
    margin: 2px;
    border-radius: 15px;
    color: white;
    padding: 5px;
    padding-left: 3%;
    padding-right: 3%;
    margin-right: 6px;
    cursor: pointer;
    transition: 0.2s;
    border: 1px solid grey;
    @media (min-width: 1968px) {
      font-size: 1.2em;
    } 
    &:hover {
      background-color: #585858;
    }
    ${props => props.selected && css`
      background-color: #474747;
    `}
`

/// TBD update does not work correctly

const Preferences = () => {
  const [loading, setLoading] = useState(true)
  const [objectId, setObjectId] = useState(null)
  const {address} = useAccount()
  const [profile, setProfile] = useState(defaultProfile)
  
  const getProfile = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/_User?where={"ethAddress":"${address.toLowerCase()}"}`, moralisApiConfig);
      setProfile(res.data.results[0].pref[0]);
      setObjectId(res.data.results[0].objectId)
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (e) => {
    // update profile in database
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/_User/${objectId}`, {'pref' : [profile]}, moralisApiConfig);
      localStorage.setItem('localProfile', JSON.stringify(profile))
    } catch (error) {
      console.log(error);
    }
  };


  const handleSelect = async(category, subcategory) => {
    const newProfile = {...profile};
    newProfile[category][subcategory] = !newProfile[category][subcategory]
    setProfile(newProfile)
    updateProfile()
  }

  // Check local storage for profile, if not there, then create one
  useEffect(() => {
    const localProfile = localStorage.getItem('localProfile');
    if (localProfile) {
      setProfile(JSON.parse(localProfile))
      setLoading(false)
    } else {
      localStorage.setItem('localProfile', JSON.stringify(profile))
      setLoading(false)
    }
    getProfile();
  }, [])

    return (
    <Container>
      {loading ? <Loading /> : null}
      {/* map out categories and their corresponding subcategories, if the user selects one then add the category and corresponding subcategory to the profile */}
      {!loading && Object.keys(categories).sort().map((category, index) => {
          return (
            <Section key={index}>
              <Title>{category}</Title>
              <Subcategory >
                {categories[category].sort().map((subcategory, index) => {
                    return( 
                      <Label
                        key={index}
                        onClick={() => handleSelect(category, subcategory)}
                        name={`${category}-${subcategory}`}
                        selected={profile[category ?? ""][subcategory ?? ""]}
                      >
                        {subcategory}
                      </Label>
                    )
                })}
              </Subcategory>
            </Section>
          )
      })}
    </Container>
    )
}

export default Preferences