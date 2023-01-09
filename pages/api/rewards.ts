import axios from 'axios';
import { ethers } from 'ethers';
import { diamond } from '../../data/contracts/core';

//Ethers functions
const utils = ethers.utils;

// covalent key
const key = process.env.NEXT_PUBLIC_COVALENT;

const reward_sig = 'RewardCreated(uint256,address,address,uint256,uint256,uint256)'; 
const reward_topic = utils.toUtf8Bytes(reward_sig);
const reward_hash = utils.keccak256(reward_topic);

// GET LOG EVENTS FOR A CONTRACT
export const getRewardEvents = async (startingBlock: number, chain: number, latest: number): Promise<any> => {
  let eye_seek_contract_address = '';
  if (process.env.NEXT_PUBLIC_ENV !== 'production'){
    eye_seek_contract_address = diamond.mumbai
  } else {
    eye_seek_contract_address = diamond.polygon
  }
  
  try {
    const response = await axios.get(
      `https://api.covalenthq.com/v1/${chain}/events/address/${eye_seek_contract_address}/?starting-block=${startingBlock}&ending-block=${latest}&key=${key}`
    );

    let total_txn_log_data = [];

    for (let i = 0; i < response.data.data.items.length; i++) {
      // Parse Data for Donation Events
      if (response.data.data.items[i].raw_log_topics[0] === reward_hash) {
        const decoded_raw_log_data = utils.defaultAbiCoder.decode(
          ['uint256', 'address', 'address', 'uint256', 'uint256', 'uint256'],
          response.data.data.items[i].raw_log_data
        );
        const date = new Date(response.data.data.items[i].block_signed_at).toDateString();
        const owner = decoded_raw_log_data[1];
        const tokenContract = decoded_raw_log_data[2];
        const amount = parseInt(decoded_raw_log_data[3]._hex);
        const fund_id = parseInt(decoded_raw_log_data[4]._hex);
        const rewardType = parseInt(decoded_raw_log_data[5]._hex);
        const txn_hash = response.data.data.items[i].tx_hash;

        total_txn_log_data.push({
          chain: chain,
          owner: owner,
          amount: amount,
          fund_id: fund_id,
          date: date,
          tokenContract: tokenContract,
          rewardType: rewardType,
          txn_hash: txn_hash,
        });
      }
    }


    return {
      total_txn_log_data,
    };
  } catch (error) {
    console.log(error);
  }
};
