import { useRouter } from "next/router"
import type { NextPage } from "next";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { useMoralisQuery } from 'react-moralis'

import ProjectDetail from "../../sections/ProjectDetail/ProjectDetail"

const Container = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`

const Project: NextPage = () => {
  const router = useRouter()
  const { objectId } = router.query 
  const { data } = useMoralisQuery("Project", (query) => query.equalTo("objectId", objectId));
  const fetchDetail = JSON.parse(
    JSON.stringify(data, [
      "title",
      "description",
      "category",
      "subcategory",
      "bookmarks",
      "verified",
      "state",
      "imageUrl",
      "pid"
      //@ts-ignore
    ]), [], { autoFetch: true },
  );

  const [imageUrl, setImageUrl] = useState(null)
  const [verified, setVerified] = useState(false)
  const [title, setTitle] = useState("Default Title")
  const [description, setDescription] = useState("Default Description")
  const [category, setCategory] = useState(null)
  const [subcategory, setSubcategory] = useState(null)
  const [pid, setPid] = useState()
  const [bookmarks, setBookmarks] = useState([])
  const [status, setStatus] = useState(0)

  const getData = async () => {
    try {
      await setTitle(fetchDetail[0].title)
      await setDescription(fetchDetail[0].description)
      await setCategory(fetchDetail[0].category)
      await setSubcategory(fetchDetail[0].subcategory)
      await setPid(fetchDetail[0].pid)
      await setBookmarks(fetchDetail[0].bookmarks)
      await setVerified(fetchDetail[0].verified)
      await setStatus(fetchDetail[0].state)
      await setImageUrl(fetchDetail[0].imageUrl)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [!fetchDetail[0]])


  return (
    <>
      <Container>
      {/* @ts-ignore */}
        <ProjectDetail 
          description={description} 
          title={title} 
          category={category} 
          subcategory={subcategory} 
          imageUrl={imageUrl} 
          bookmarks={bookmarks}
          verified={verified}
          state={status}
          pid={pid}
          objectId={objectId}
        />
      </Container>
    </>
  )
}

export default Project
