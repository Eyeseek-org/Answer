import Image from 'next/image';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContractWrite, useContractEvent, usePrepareContractWrite, useAccount } from 'wagmi';

import Tag from '../../components/typography/Tag';
import ErrText from '../../components/typography/ErrText';
import ImgSkeleton from '../../components/skeletons/ImgSkeleton';
import { CancelIcon, VerifiedIcon, NonVerifiedIcon, UrlIcon, UrlSocialsIcon } from '../../components/icons/Common';
import Tooltip from '../../components/Tooltip';
import { CanceledTypo } from '../../components/icons/Typography';
import donation from '../../abi/donation.json';
import ProjectDetailRight from './ProjectDetailRight';
import ProjectDescription from './ProjectDescription';
import { BlockchainIcon, StreamIcon } from '../../components/icons/Landing';
import { GetProjectFundingAddress } from '../../helpers/GetContractAddress';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import polygon from '../../public/icons/donate/polygon.png';
import bnb from '../../public/icons/donate/bnb.png';
import ftm from '../../public/icons/donate/ftm.png';

const Container = styled.div`
  position: relative;
  margin-top: 5%;
`;

const DetailBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: ${(props) => props.theme.colors.transparent};
  border: 1px solid #2f2f2f;
  padding: 3%;
  padding-left: 5%;
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 15%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin: 1%;
    padding: 1%;
    padding-left: 3%;
    padding-right: 3%;
  }
  @media (min-width: 2100px) {
    margin-left: 25%;
    margin-right: 25%;
  }
`;

const ProjectType = styled.div`
  position: absolute;
  left: -20px;
  font-family: 'Neucha';
  top: 0;
  display: flex;
  flex-direction: column;
`;

const Categories = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Desc = styled.div`
  margin-top: 2%;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 1em;
  line-height: 20px;
  color: #ffffff;
`;

const LeftPart = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5%;
    margin-top: 5%;
  }
`;

const ActionPanel = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0;
  top: -70px;
  right: 4%;
`;

const IconWrapper = styled.button`
  position: relative;
  background: inherit;
  border: none;
  padding-left: 10px;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const CanceledBox = styled.div`
  position: absolute;
  z-index: 1;
  top: -25%;
  right: 0;
  @media (max-width: 1068px) {
    top: 25%;
  }
`;

const Inactive = styled.div`
  position: absolute;
  display: flex;
  font-size: 2em;
  font-family: 'Neucha';
  color: #d90000;
`;

const LeftTopTooltip = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const ProjectDetail = ({
  objectId,
  pid,
  title,
  description,
  category,
  subcategory,
  imageUrl,
  bookmarks,
  verified,
  state,
  pType,
  owner,
  chainId,
  urlSocial,
  urlProject,
  descM,
}) => {
  const { address } = useAccount();
  const [cancelTooltip, setCancelTooltip] = useState(false);
  const [verifiedTooltip, setVerifiedTooltip] = useState(false);
  const [nonVerifiedTooltip, setNonVerifiedTooltip] = useState(false);
  const [streamTypeTooltip, setStreamTypeTooltip] = useState(false);
  const [standardTypeTooltip, setStandardTypeTooltip] = useState(false);
  const [chainTooltip, setChainTooltip] = useState(false);
  const [urlWebTooltip, setUrlWebTooltip] = useState(false);
  const [urlSocialsTooltip, setUrlSocialsTooltip] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [apiError, setApiError] = useState(false);

  const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);

  useEffect(() => {
    setAdd(GetProjectFundingAddress(chainId));
  }, []);

  const { config } = usePrepareContractWrite({
    address: add,
    abi: donation.abi,
    functionName: 'cancelFund',
    chainId: chainId,
    args: [pid],
  });

  const { write } = useContractWrite(config);

  const useEv = async (e) => {
    await cancelMoralis(objectId);
    await handleCancelNotifications();
    console.log(e);
  };

  useContractEvent({
    address: add,
    abi: donation.abi,
    chainId: chainId,
    eventName: 'Cancelled',
    listener: () => useEv(e),
    once: true,
  });

  const cancel = async () => {
    await write?.();
  };

  const handleCancelNotifications = async () => {
    if (bookmarks) {
      bookmarks.forEach(async (bookmark) => {
        await axios.post(
          `${process.env.NEXT_PUBLIC_DAPP}/classes/Notification`,
          {
            title: 'Project Canceled',
            description: `Project ${title} was cancelled before the deadline by the owner. All resources were refunded to the backers.`,
            type: 'projectCanceled',
            project: `${objectId}`,
            user: bookmark,
          },
          moralisApiConfig
        );
      });
    }
  };

  const cancelMoralis = async (oid) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, { state: 4 }, moralisApiConfig);
      await setCanceled(true);
    } catch (error) {
      console.log(error);
      setApiError(true);
    }
  };

  return <>
      <Container>
        {apiError && <ErrText text={'Error with Moralis connection, please try again later'} />}
        <DetailBox>
          <LeftTopTooltip>
            {verifiedTooltip && <Tooltip text={'Verified by Eyeseek team'} />}
            {nonVerifiedTooltip && <Tooltip text={'Project not verified'} />}
            {standardTypeTooltip && <Tooltip text={'Funding type: Standard crowdfunnding'} />}
            {streamTypeTooltip && <Tooltip text={'Funding type: Money streaming'} />}
            {chainTooltip && (
              <Tooltip
                text={
                  <>
                    Project chain:
                    {chainId === 80001 && <> Polygon Mumbai</>}
                    {chainId === 97 && <> BNB Chain testnet</>}
                    {chainId === 4002 && <> Fantom testnet</>}
                  </>
                }
              />
            )}
          </LeftTopTooltip>
          <ProjectType>
            {verified ? (
              <IconWrapper onMouseEnter={() => { setVerifiedTooltip(true);}} onMouseLeave={() => { setVerifiedTooltip(false);}}>
                <VerifiedIcon width={30} height={30} />
              </IconWrapper>
            ) : (
              <IconWrapper onMouseEnter={() => { setNonVerifiedTooltip(true);}} onMouseLeave={() => {setNonVerifiedTooltip(false);}}>
                <NonVerifiedIcon width={70} height={70} />
              </IconWrapper>
            )}
            {pType === 'Stream' ? (
              <IconWrapper onMouseEnter={() => { setStreamTypeTooltip(true);}} onMouseLeave={() => { setStreamTypeTooltip(false);}}>
                <StreamIcon width={30} />
              </IconWrapper>
            ) : (
              <IconWrapper onMouseEnter={() => { setStandardTypeTooltip(true);}} onMouseLeave={() => { setStandardTypeTooltip(false);}}>
                <BlockchainIcon width={30} />
              </IconWrapper>
            )}
            <IconWrapper onMouseEnter={() => { setChainTooltip(true); }}onMouseLeave={() => { setChainTooltip(false);}} >
              {chainId === 80001 && (<><Image src={polygon} alt={'matic'} width={30} height={30} /></>)}
              {chainId === 97 && (<><Image src={bnb} alt={'bnb'} width={30} height={30} /></> )}
              {chainId === 4002 && ( <> <Image src={ftm} alt={'ftm'} width={30} height={30} /> </> )}
            </IconWrapper>
          </ProjectType>

          {canceled && (
            <CanceledBox>
              <CanceledTypo width={400} />
            </CanceledBox>
          )}
          {address === owner && 
            <ActionPanel>
              {cancelTooltip && <Tooltip margin={'-35px'} text="Cancel project" />}
              {urlWebTooltip && <Tooltip margin={'-35px'} text="External link to project website" />}
              {urlSocialsTooltip && <Tooltip margin={'-35px'} text="External link to project primary socials" />}
              <IconWrapper onMouseEnter={() => {setUrlWebTooltip(true);}} onMouseLeave={() => {setUrlWebTooltip(false);}}  >
                <a href={urlSocial} target="_blank" rel="noreferrer"><UrlSocialsIcon width={30} /> </a>
              </IconWrapper>
              <a href={urlProject} target="_blank" rel="noreferrer">
                <IconWrapper onMouseEnter={() => {setUrlSocialsTooltip(true); }} onMouseLeave={() => {setUrlSocialsTooltip(false);}}>
                  <UrlIcon width={30} />
                </IconWrapper>
              </a>
              <IconWrapper onClick={() => { cancel();}} onMouseEnter={() => { setCancelTooltip(true);}} onMouseLeave={() => { setCancelTooltip(false); }}>
                <CancelIcon width={30} />
              </IconWrapper>
        </ActionPanel>}
        <LeftPart>
          {!imageUrl ? <ImgSkeleton /> : <Image src={imageUrl} alt={title} width={'320px'} height={'260px'}/>}
          <Categories>
            {category && <>
              {category === 'Art' && <Tag tag={category} color={"#7E0000"} />}
              {category === 'Games' && <Tag tag={category} color={"#7E3D00"} />}
              {category === 'OpenSource' && <Tag tag={category} color={"#7C007E"} />}
              {category === 'Science' && <Tag tag={category} color={"#00502E"} />}
              {category === 'Technology' && <Tag tag={category} color={"#2B2B2B"} />}
              {category === 'Web3' && <Tag tag={category} color={"#687900"} />}
              
            </>}
            {subcategory && <Tag tag={subcategory} color={"#035201"} />}
          </Categories>
          <Desc>{description}</Desc>
        </LeftPart>
        {state === 4 ? <Inactive>Inactive</Inactive> : <ProjectDetailRight pid={pid} objectId={objectId} bookmarks={bookmarks} pType={pType} owner={owner} add={add} chainId={chainId}/> }
      </DetailBox>
      {pType !== 'Stream' && <ProjectDescription descM={descM} pid={pid} add={add} chainId={chainId}/>}
    </Container>
    </>
};

export default ProjectDetail;
