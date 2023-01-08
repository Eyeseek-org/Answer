import AdminCard from "../cards/AdminCard";
import {usePrepareContractWrite, useContractWrite} from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import {diamond} from '../../data/contracts/core';


const CancelComponent = ({ch, fundId}) => {

    const { config, isError } = usePrepareContractWrite({
        address: diamond.mumbai,
        abi: diamondAbi,
        functionName: 'cancelFund',
        chainId: 80001,
        args: [fundId]
      });
    
      const { write } = useContractWrite(config);
    
      const handleContract = async () => {
        write?.();
      };

    return <>
            <AdminCard fn={'Cancel fund'} error={isError} handler={handleContract} />
    </>
}

export default CancelComponent