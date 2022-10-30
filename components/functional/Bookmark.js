import styled from 'styled-components'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { BookmarkIcon, BookmarkFilledIcon } from '../icons/Common'
import {useAccount} from 'wagmi'

const Bkmrk = styled.div`
  display: flex;
  min-height: 30px;
  &:hover {
    cursor: pointer;
  }
`

const Bookmark = ({ objectId, bookmarks }) => {
    const [marked, setMarked] = useState(false)
    const {address, isDisconnected} = useAccount()

    const updateBookmark = async (oid, newBookmarks) => {
        const config = {
          headers: {
            "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
            "Content-Type": "application/json"
          }
        }
        try {
          await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, { 'bookmarks': newBookmarks }, config)
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        if (bookmarks.includes(address)) {
            setMarked(true)
        }
    }, [address, bookmarks])

    const handleBookmark = () => {
        if (!marked){
            // Add address to bookmarks array
            const newBookmarks = [...bookmarks, address];
            // Update Project with new bookmarks array
            updateBookmark(objectId, newBookmarks)
            setMarked(true)
        } else {
            // Remove address from bookmarks array
            const newBookmarks = bookmarks.filter((item) => item !== address);
            // Update Project with new bookmarks array
            updateBookmark(objectId, newBookmarks)
            setMarked(false)
        }
      }

    return <>
     {isDisconnected ? <></> :
     <Bkmrk onClick={() => { handleBookmark() }}>
        {!marked ? <BookmarkIcon width={20} /> : <BookmarkFilledIcon width={20} />}
    </Bkmrk>}
    </>
}

export default Bookmark