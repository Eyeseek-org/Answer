import {useState, useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import SectionTitle from '../../components/typography/SectionTitle'
import { UniService } from '../../services/DapAPIService'
import BookmarkTable from '../../components/tables/BookmarkTable'

const MyBookmarks = () => {
    const [apiError,setApiError] = useState()
    const {address} = useAccount()

    const query = `/classes/Project`
    const { data: bookmarks } = useQuery(['my-bookmarks'], () => UniService.getParseAll(query),{
        onError: () => {
            setApiError(true)
        },
    });

    useEffect(() => {
        if (bookmarks && bookmarks.length > 0) {
            setApiError(false)
        }
    }, [])

    // TBD table udělat z toho 
    // Go through all projects and display only those bookmarked by the $address
    return <>
        <SectionTitle title='My bookmarks' subtitle='Watched projects'/>
        <BookmarkTable/>
    </>
}

export default MyBookmarks