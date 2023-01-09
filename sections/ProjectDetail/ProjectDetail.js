import Image from 'next/image';
import {useTheme} from 'styled-components';
import { useState } from 'react';
import Tag from '../../components/typography/Tag';
import ErrText from '../../components/typography/ErrText';
import ImgSkeleton from '../../components/skeletons/ImgSkeleton';
import { VerifiedIcon, NonVerifiedIcon, UrlIcon, UrlSocialsIcon } from '../../components/icons/Common';
import Tooltip from '../../components/Tooltip';
import ProjectDetailRight from './ProjectDetailRight';
import { BlockchainIcon, StreamIcon } from '../../components/icons/Landing';
import { AbsoluteLeft, MainContainer } from '../../components/format/Box';
import {ProjectDesc} from '../../components/typography/Descriptions'
import { ChainIconComponent } from '../../helpers/MultichainHelpers';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import {IconWrapper, Inactive, DetailBox, ProjectType, Categories, LeftPart, ActionPanel} from '../../components/cards/CardStyles'
import { FeatureTitle } from '../../components/typography/Titles';
import ProjectDescription from './ProjectDescription';

const ProjectDetail = ({objectId, pid, title, description,category,subcategory,imageUrl,bookmarks,verified,state,pType,owner,chainId,urlSocials,urlProject,descM,youtube}) => {

  const [verifiedTooltip, setVerifiedTooltip] = useState(false);
  const [nonVerifiedTooltip, setNonVerifiedTooltip] = useState(false);
  const [streamTypeTooltip, setStreamTypeTooltip] = useState(false);
  const [standardTypeTooltip, setStandardTypeTooltip] = useState(false);
  const [chainTooltip, setChainTooltip] = useState(false);
  const [urlWebTooltip, setUrlWebTooltip] = useState(false);
  const [urlSocialsTooltip, setUrlSocialsTooltip] = useState(false);
  const [apiError, setApiError] = useState(false);
  const theme = useTheme();

  return (
    <>
      <MainContainer>
        {apiError && <ErrText text={'Error with Moralis connection, please try again later'} />}
        <DetailBox>
          <AbsoluteLeft>
            {verifiedTooltip && <Tooltip text={'Verified by Eyeseek team'} />}
            {nonVerifiedTooltip && <Tooltip text={'Project not verified'} />}
            {standardTypeTooltip && <Tooltip text={'Funding type: Standard crowdfunnding'} />}
            {streamTypeTooltip && <Tooltip text={'Funding type: Money streaming'} />}
            {chainTooltip &&  <Tooltip text={`Chain ID: ${chainId}`}  />}
          </AbsoluteLeft>
          <ProjectType>
            {verified ? (
              <IconWrapper onMouseEnter={() => { setVerifiedTooltip(true)}} onMouseLeave={() => {setVerifiedTooltip(false)}}>
                <VerifiedIcon color={theme.colors.icon} width={30} height={30} />
              </IconWrapper>
            ) : (
              <IconWrapper onMouseEnter={() => { setNonVerifiedTooltip(true)}} onMouseLeave={() => {setNonVerifiedTooltip(false) }}>
                <NonVerifiedIcon width={70} height={70} />
              </IconWrapper>
            )}
            {pType === 'Stream' ? (
              <IconWrapper onMouseEnter={() => {setStreamTypeTooltip(true)}} onMouseLeave={() => {setStreamTypeTooltip(false) }}>
                <StreamIcon color={theme.colors.icon} width={30} />
              </IconWrapper>
            ) : (
              <IconWrapper onMouseEnter={() => {setStandardTypeTooltip(true)}} onMouseLeave={() => {setStandardTypeTooltip(false) }}>
                <BlockchainIcon color={theme.colors.primary}  width={30} />
              </IconWrapper>
            )}
              <IconWrapper onMouseEnter={() => {setChainTooltip(true)}} onMouseLeave={() => {setChainTooltip(false) }} >
                <ChainIconComponent ch={chainId} />
              </IconWrapper>
          </ProjectType>

            <ActionPanel>
              {urlWebTooltip && <Tooltip margin={'-35px'} text="Go to project website" />}
              {urlSocialsTooltip && <Tooltip margin={'-35px'} text="Go to project primary socials" />}
          {urlSocials &&  <IconWrapper onMouseEnter={() => {setUrlWebTooltip(true)}} onMouseLeave={() => {setUrlWebTooltip(false)}}>
                <a href={urlSocials} target="_blank" rel="noreferrer">
                  <UrlSocialsIcon color={theme.colors.icon} width={30} />{' '}
                </a>
              </IconWrapper>}
           {urlProject &&  <IconWrapper onMouseEnter={() => {setUrlSocialsTooltip(true)}} onMouseLeave={() => {setUrlSocialsTooltip(false) }}>
                <a href={urlProject} target="_blank" rel="noreferrer">
                  <UrlIcon color={theme.colors.icon} width={30} />
                  </a>
                </IconWrapper>}
            </ActionPanel>
         <LeftPart>
            {youtube ? 
              <LiteYouTubeEmbed id={youtube} title={title}/> : 
              <>
                  {!imageUrl ? <ImgSkeleton /> : <Image src={imageUrl} alt={title} width={'320px'} height={'260px'} />}
                </>}
            <Categories>
              {category && (
                <>
                  {category === 'Art' && <Tag tag={category} color={'#7E0000'} />}
                  {category === 'Games' && <Tag tag={category} color={'#7E3D00'} />}
                  {category === 'OpenSource' && <Tag tag={category} color={'#7C007E'} />}
                  {category === 'Science' && <Tag tag={category} color={'#00502E'} />}
                  {category === 'Technology' && <Tag tag={category} color={'#2B2B2B'} />}
                  {category === 'Web3' && <Tag tag={category} color={'#687900'} />}
                </>
              )}
              {subcategory && <Tag tag={subcategory} color={'#035201'} />}
            </Categories>
            <FeatureTitle>{title}</FeatureTitle>
            <ProjectDesc>{description}</ProjectDesc>
          </LeftPart>
          {state === 4 ? (
            <Inactive>Inactive</Inactive>
          ) : (
            <ProjectDetailRight
              pid={pid}
              objectId={objectId}
              bookmarks={bookmarks}
              pType={pType}
              owner={owner}
              chainId={chainId}
            />
          )}
        </DetailBox>
        <ProjectDescription desc={descM} />
        {/* <Markdown text={'ahoj'}/> */}
      </MainContainer>
    </>
  );
};

export default ProjectDetail;
