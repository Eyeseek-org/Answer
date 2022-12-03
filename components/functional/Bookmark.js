import styled, {useTheme} from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BookmarkIcon, BookmarkFilledIcon } from '../icons/Common';
import { useAccount } from 'wagmi';
import { moralisApiConfig } from '../../data/moralisApiConfig';

const Bkmrk = styled.div`
  display: flex;
  min-height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const Bookmark = ({ objectId, bookmarks }) => {
  const [marked, setMarked] = useState(false);
  const { address, isDisconnected } = useAccount();
  const theme = useTheme();

  const updateBookmark = async (oid, newBookmarks) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, { bookmarks: newBookmarks }, moralisApiConfig);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bookmarks.includes(address)) {
      setMarked(true);
    }
  }, [address, bookmarks]);

  const handleBookmark = () => {
    if (!marked) {
      // Add address to bookmarks array
      const newBookmarks = [...bookmarks, address];
      // Update Project with new bookmarks array
      updateBookmark(objectId, newBookmarks);
      setMarked(true);
    } else {
      // Remove address from bookmarks array
      const newBookmarks = bookmarks.filter((item) => item !== address);
      // Update Project with new bookmarks array
      updateBookmark(objectId, newBookmarks);
      setMarked(false);
    }
  };

  return (
    <>
      {isDisconnected ? (
        <></>
      ) : (
        <Bkmrk
          onClick={() => {
            handleBookmark();
          }}
        >
          {!marked ? <BookmarkIcon color={theme.colors.icon} width={20} /> : <BookmarkFilledIcon width={20} />}
        </Bkmrk>
      )}
    </>
  );
};

export default Bookmark;
