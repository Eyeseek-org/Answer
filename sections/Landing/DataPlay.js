import { defaultAbiCoder } from "ethers/lib/utils";

/// Module to play with event decoding - In order to use Covalent API for data display
const DataPlay = () => {

    const topics = [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72",
      "0x000000000000000000000000ab7c8803962c0f2f5bbbe3fa8bf41cd82aa1923c"
    ];

    const data = "0x00000000000000000000000000000000000000000000000000000000000004d20000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000";
    
    const decode = () => {
        const res = defaultAbiCoder.decode([ "uint", "string" ], data);
        console.log(res);
    }

    
    return <>
      <button onClick={()=>{decode()}}>Decode</button>
    </>
}

export default DataPlay