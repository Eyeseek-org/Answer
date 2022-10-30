import React, { useState } from "react";
import { ethers } from 'ethers'
import type { NextPage } from "next";
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import {
  EvmChain,
  GasToken,
  AxelarQueryAPI, AxelarGMPRecoveryAPI,
  Environment
} from "@axelar-network/axelarjs-sdk";

interface GMPStatusResponse {
  status: GMPStatus;
  gasPaidInfo?: GasPaidInfo;
  errors?: any;
  callData?: any;
}
enum GMPStatus {
  SRC_GATEWAY_CALLED = "source_gateway_called",
  DEST_GATEWAY_APPROVED = "destination_gateway_approved",
  DEST_EXECUTED = "destination_executed",
  DEST_ERROR = "error",
  ERROR_FETCHING_STATUS = "error_fetching_status",
}
interface GasPaidInfo {
  status: GasPaidStatus;
  details?: any;
}
enum GasPaidStatus {
  GAS_UNPAID = "gas_unpaid",
  GAS_PAID = "gas_paid",
  GAS_PAID_NOT_ENOUGH_GAS = "gas_paid_not_enough_gas",
  GAS_PAID_ENOUGH_GAS = "gas_paid_enough_gas",
}


function truncatedAddress(address: string): string {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
}

const Cross: NextPage = () => {
  const [loading, setLoading] = useState(false);


  // Query pending transaction for recovery
  const sdkRecovery = new AxelarGMPRecoveryAPI({
    environment: Environment.TESTNET,
  });

  const txHash: string = "Some transaction hash";


  /// Crosschain functionality playground, separated from core scope
  /// Under development

  // Get token address from the gateway contract
 // const tokenAddress = await srcGatewayContract.tokenAddresses("aUSDC");

  // 1. Approve contract spending for the srouce contract
  // string calldata destinationChain,// Mumbai
  // string calldata destinationAddress,
  // string calldata symbol,
  // uint256 amount // Amoubnt M + Amount D
  // Payload / Ratio for amountM, amountD

  // 2. Take USDC abi and approve 
  const { config } = usePrepareContractWrite({
    // @ts-ignore
    address: '0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B', // Axelar gateway contract. different for each chain
    functionName: 'callContractWithToken',
    args: [EvmChain.POLYGON, 'destinationContract', 'payload(bytes)', 'MATIC', 5000] //Payload is critical to differentiate Micro/Donate pledges + owner
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)


  const sdk = new AxelarQueryAPI({
    // @ts-ignore
    environment: "testnet",
  });

  // 1. Gas estimation for crosschain transfers
  // (Optional) An estimated gas amount required to execute `executeWithToken` function. The default value is 700000 which sufficients for most transaction.
  const estimateGasUsed = 400000;

  const estimateGas = async () => {
    // Returns avax amount to pay gas from one side to another
    const gasFee = await sdk.estimateGasFee(
      EvmChain.POLYGON,
      EvmChain.FANTOM,
      // @ts-ignore
      GasToken.POLYGON,
      estimateGasUsed
    );

    console.log(gasFee)
  }

  /// Neeeded to create sending/receiving infrastructure - https://xchainbox.axelar.dev/


  // encoding a string
  const payload = ethers.utils.defaultAbiCoder.encode(
    ["string"],
    ["Hello from contract A"]
  );

  console.log(payload)

  return <>
    <h1>  General Message Passing (GMP)</h1>
    <div>
      <h3>Token amount</h3>
      <button onClick={() => { estimateGas() }}>Estimate gas</button>
      <div>
        <button disabled={!write} onClick={() => write?.()}>
          Call external contract
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
      <input
        disabled={loading}
        required
        name="amount"
        type="number"
        placeholder="Enter amount to send"
      />
    </div>
  </>
}

export default Cross