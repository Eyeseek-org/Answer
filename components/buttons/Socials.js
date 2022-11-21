import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import {motion} from 'framer-motion';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3px;
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: 2%;
`;

const ImageBox = styled(motion.div)`
`

const Socials = ({title}) => {
  const router = useRouter();
  const url = `https://www.fund.eyeseek.com${router.asPath}`;
  const hashtags_facebook = '#EyeSeek, #Crowdfunding, #Blockchain';
  const hashtags_twitter = ['EyeSeek', 'Crowdfunding', 'Blockchain'];

  return (
    <Row>
      <FacebookShareButton url={url} quote={title} hashtag={hashtags_facebook}>
        <ImageBox whileHover={{ scale: 0.98, opacity: 0.8 }} transition={{duration: 0.1}} ><FacebookIcon size={35} round /></ImageBox>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} hashtags={hashtags_twitter}>
       <ImageBox whileHover={{ scale: 0.98, opacity: 0.8 }} transition={{duration: 0.1}} ><TwitterIcon size={35} round /></ImageBox>
      </TwitterShareButton>
      <RedditShareButton url={url} title={title}>
        <ImageBox whileHover={{ scale: 0.98, opacity: 0.8 }} transition={{duration: 0.1}} ><RedditIcon size={35} round /></ImageBox>
      </RedditShareButton>
      <TelegramShareButton url={url} title={title}>
       <ImageBox whileHover={{ scale: 0.98, opacity: 0.8 }} transition={{duration: 0.1}} ><TelegramIcon size={35} round /></ImageBox>
      </TelegramShareButton>
      <WhatsappShareButton url={url} title={title}>
       <ImageBox whileHover={{ scale: 0.98, opacity: 0.8 }} transition={{duration: 0.1}} ><WhatsappIcon size={35} round /></ImageBox>
      </WhatsappShareButton>
    </Row>
  );
};

export default Socials;
