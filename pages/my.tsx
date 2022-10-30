import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useAccount } from 'wagmi';
import { useMoralisQuery } from 'react-moralis'
import axios from "axios"
import styled from "styled-components";

import LatestProjects from "../sections/Landing/LatestProjects";
import Footer from "../sections/Footer";
import ProjectDetail from "../sections/ProjectDetail/ProjectDetail"
import NotAuth from '../sections/NotAuth'
import NotProject from '../sections/NotProject'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const BlankSpace = styled.div`
    margin-top: 8%;
    margin-bottom: 8%;
`

const My: NextPage = () => {
    const { address } = useAccount()
    const [imageUrl, setImageUrl] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)
    const [subcategory, setSubcategory] = useState(null)
    const [projects, setProjects] = useState([])
    const [projectId, setProjectId] = useState()
    const [objectId, setObjectId] = useState()
    const [bookmarks, setBookmarks] = useState([])
    const [status, setStatus] = useState()
    const [rewards, setRewards] = useState([])

    // Rerender my -> Debug, console

    // Query only user's active project (state 1)
    // By design we only allow one active project per user
    const { data } = useMoralisQuery("Project", (query) =>
        query
            .equalTo("owner", address)
            .equalTo("state", 1))

    const fetchDetail = JSON.parse(
        JSON.stringify(data, [
            "title",
            "description",
            "category",
            "subcategory",
            "pid",
            "bookmarks",
            "objectId",
            "rewards",
            "imageUrl",
            "state"
            // @ts-ignore
        ]), { autoFetch: true },
    );

    const getData = async () => {
        try {
            await setTitle(fetchDetail[0].title)
            await setDescription(fetchDetail[0].description)
            await setCategory(fetchDetail[0].category)
            await setSubcategory(fetchDetail[0].subcategory)
            await setProjectId(fetchDetail[0].pid)
            await setBookmarks(fetchDetail[0].bookmarks)
            await setObjectId(fetchDetail[0].objectId)
            await setStatus(fetchDetail[0].state)
            await setRewards(fetchDetail[0].rewards)
            await setImageUrl(fetchDetail[0].imageUrl)
        } catch (error) {
            console.log(error)
        }
    }

    const getProjects = async () => {
        const config = {
            headers: {
                "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`
            }
        }
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"owner":"${address}"}`, config)
            setProjects(res.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        getProjects()
    }, [!fetchDetail[0]])

    return <Container>
        {address ? <div>
    {/* @ts-ignore */}
          {objectId ?  <ProjectDetail 
                objectId={objectId} 
                pid={projectId} 
                description={description} 
                title={title} 
                category={category} 
                subcategory={subcategory} 
                imageUrl={imageUrl} 
                state={status}
                bookmarks={bookmarks}
                my /> : <NotProject/>}
            <BlankSpace />
            <LatestProjects data={projects} my />
        </div> : <NotAuth/>}
        <Footer />
    </Container>
}

export default My