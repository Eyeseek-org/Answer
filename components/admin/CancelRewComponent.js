import AdminCard from "../cards/AdminCard";
import {usePrepareContractWrite, useContractWrite} from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import {diamond} from '../../data/contracts/core';


const CancelRewComponent = ({ch, fundId}) => {

    const { config, isError } = usePrepareContractWrite({
        address: diamond.mumbai,
        abi: diamondAbi,
        functionName: 'distributeRewards',
        chainId: ch,
        args: [fundId]
      });
    
      const { write } = useContractWrite(config);
    
      const handleContract = async () => {
        write?.();
      };

    return <>
            <AdminCard fn={'Canceled Rewards'} error={isError} handler={handleContract} />
    </>
}

export default CancelRewComponent