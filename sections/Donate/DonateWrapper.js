import styled from 'styled-components'
import { usePrepareContractWrite, useContractWrite, useAccount, useContractEvent, useNetwork, useSwitchNetwork, useContractRead } from "wagmi";
import {useState, useEffect} from 'react'
import axios from 'axios';
import BalanceComponent from '../../components/functional/BalanceComponent'
import ApprovedComponent from '../../components/functional/ApprovedComponent'
import Button from "../../components/buttons/Button";
import ApproveButton from "../../components/buttons/ApproveButton";
import { SuccessIcon } from "../../components/icons/Common";
import donation from "../../abi/donation.json";
import token from "../../abi/token.json";
import { useRouter } from 'next/router';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import { GetTokenAddress } from '../../components/functional/GetContractAddress';

const DonateButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 3%;
  gap: 1rem;
`;

const Err = styled.div`
    position: absolute;
    color: red;
    font-family: 'Neucha';
    letter-spacing: 0.5px;
    bottom: -25px;
    font-size: 0.9em;
`

const Metrics = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`


const DonateWrapper = ({amountM, amountD, pid, bookmarks, currencyAddress,curr, add, home, rid}) => {
    const { address } = useAccount();
    const [explorer, setExplorer] = useState('https://mumbai.polygonscan.com/tx/')
    const [success, setSuccess] = useState(false)
    const {chain} = useNetwork()
    const { switchNetwork } = useSwitchNetwork()

    const router = useRouter()
    const { objectId } = router.query

    const [tokenAdd, setTokenAdd] = useState(process.env.NEXT_PUBLIC_AD_TOKEN)

    useEffect(() => {
        setTokenAdd(GetTokenAddress(home))
    },[])

    var all = 0;

    const allowance = useContractRead({
        address: tokenAdd,
        abi: token.abi,
        functionName: 'allowance',
        chainId: home,
        args: [address, add],
        watch: true,
      })

      if (allowance.data){
        all = Number(allowance.data.toString())
      }
    

    const useEv = (event) => {
        setSuccess(true);
        updateBookmark(bookmarks)
    }

    useContractEvent({
        address: add,
        abi: donation.abi,
        chainId: home,
        eventName: 'Donated',
        listener: (event) => useEv(event),
        once: true
    })

    useContractEvent({
        address: add,
        abi: donation.abi,
        chainId: home,
        eventName: 'MicroCreated',
        listener: (event) => useEv(event),
        once: true
    })




    const { config, error } = usePrepareContractWrite({
        address: add,
        abi: donation.abi,
        chainId: home,
        functionName: 'contribute',
        args: [amountM, amountD, pid, curr, rid],
    });

    const { write, data } = useContractWrite(config);


    const handleSubmit = async () => {
        await write?.()
        if (home === 80001) {
            setExplorer('https://mumbai.polygonscan.com/tx/')
        } else if (home === 97) {
            setExplorer('https://bscscan.com/tx/')
        } else if (home === 4002){
            setExplorer('https://testnet.ftmscan.com/tx')
        }
    }
    const sum = (parseInt(amountM) + parseInt(amountD));


    const updateBookmark = async (bookmarks) => {
        const newBookmarks = [...bookmarks, address];
        try {
          await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${objectId}`, { 'bookmarks': newBookmarks }, moralisApiConfig)
        } catch (error) {
          console.log(error)
        }
    }

    return <div> 
        {chain && home === chain.id ? 
        <DonateButtonWrapper>
            {success ? <SuccessIcon width={50}/> : (
                <>
                    {address &&
                    <Metrics>
                        <BalanceComponent address={address} token={currencyAddress} />
                        <ApprovedComponent address={address} />
                    </Metrics>}
                    <ApproveButton sum={sum} />
                </>
            )}
            <div>
                {!success && (
                    <>
                        {all < sum ? <Button text='Donate' width={'200px'} onClick={() => handleSubmit()}  error /> : <Button onClick={() => handleSubmit()} text='Donate' width={'200px'} />}
                    </>
                )}{(!error && success) && <a href={`${explorer}${data.hash}`} target="_blank" rel="noopener noreferrer"><Button text="Transaction detail" /></a>}
            </div>
            {error ? <Err>Insufficient balance or allowance</Err> : null}
        </DonateButtonWrapper> : <Button text='Wrong network' onClick={() => switchNetwork(home)} width={'200px'} /> }
    </div>
}

export default DonateWrapper