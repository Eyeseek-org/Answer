import AdminCard from "../cards/AdminCard";
import {usePrepareContractWrite, useContractWrite} from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import {diamond} from '../../data/contracts/core';


const ZeroComponent = ({ch}) => {

    const { config, isError } = usePrepareContractWrite({
        address: diamond.mumbai,
        abi: diamondAbi,
        functionName: 'createZeroData',
        chainId: ch
      });
    
      const { write } = useContractWrite(config);
    
      const handleContract = async () => {
        write?.();
      };

    return <>
            <AdminCard fn={'Create zero'} error={isError} handler={handleContract} />
    </>
}

export default ZeroComponent