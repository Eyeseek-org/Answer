import {useState, useEffect} from 'react';
import axios from 'axios';
import { useContractWrite, useContractEvent, usePrepareContractWrite } from 'wagmi';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import diamondAbi from '../../abi/diamondAbi.json';
import { diamond } from '../../data/contracts';

const CancelFund = () => {
    const [cancelTooltip, setCancelTooltip] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [add, setAdd] = useState();

    useEffect(() => {
      if (process.env.NEXT_PUBLIC_ENV !== 'production'){
        setAdd(diamond.mumbai)
      } else {
        setAdd(diamond.polygon);
      }
    }, []);
  
  
    const { config } = usePrepareContractWrite({
      address: add,
      abi: diamondAbi,
      functionName: 'cancelFund',
      chainId: chainId,
      args: [pid],
    });
  
    const { write } = useContractWrite(config);
  
    const useEv = async (e) => {
      await cancelMoralis(objectId);
      await handleCancelNotifications();
    };
  
    useContractEvent({
      address: add,
      abi: diamondAbi,
      chainId: chainId,
      eventName: 'Cancelled',
      listener: (e) => useEv(e),
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
              isRead: false,
            },
            moralisApiConfig
          );
        });
      }
    };
  
    const cancelMoralis = async (oid) => {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, { state: 4 }, moralisApiConfig);
        setCanceled(true);
      } catch (error) {
        console.log(error);
        setApiError(true);
      }
    };
    return <></>
}

export default CancelFund;