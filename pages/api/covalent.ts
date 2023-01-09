import axios from 'axios';
import { ethers } from 'ethers';
import { diamond } from '../../data/contracts/core';

//Ethers functions
const utils = ethers.utils;

// covalent key
const key = process.env.NEXT_PUBLIC_COVALENT;

// GET TOPIC HASHES (Events: Micro Created, Donation)
const micro_created_sig = 'MicroCreated(address,uint256,uint256,uint256,uint256)'; //0x982b08aefe79525577026fc60aa3d85b642f6336a5078e50f2836434719770a5
const micro_created_topic = utils.toUtf8Bytes(micro_created_sig);
const micro_created_hash = utils.keccak256(micro_created_topic);

const donated_sig = 'Donated(address,uint256,uint256,uint256,uint256)'; //0x8d09c6745838fd32e92a7aec9e4c21f8fcc0ddf4300881dcffdbf060ba8bcff2
const donated_topic = utils.toUtf8Bytes(donated_sig);
const donated_hash = utils.keccak256(donated_topic);

// GET LATEST BLOCK HEIGHT FOR A CHAIN
export const getLatestBlockHeight = async (chain: number) => {
  try {
    const response = await axios.get(`https://api.covalenthq.com/v1/${chain}/block_v2/latest/?key=${key}`);
    return response.data.data.items[0].height;
  } catch (error) {
    console.log(error);
  }
};

// GET LOG EVENTS FOR A CONTRACT
export const getLogEvents = async (startingBlock: number, chain: number, latest: number): Promise<any> => {
  let eye_seek_contract_address = '';
  if (process.env.NEXT_PUBLIC_ENV !== 'production'){
    eye_seek_contract_address = diamond.mumbai
  } else {
    eye_seek_contract_address = diamond.polygon
  }
  try {
    // console.log('covalent link with params:', `https://api.covalenthq.com/v1/${chain}/events/address/${eye_seek_contract_address}/?starting-block=${startingBlock}&ending-block=${latest}&key=${key}`)
    // console.log('link we are using for now:', `https://api.covalenthq.com/v1/${chain}/events/address/${eye_seek_contract_address}/?starting-block=28946294&ending-block=latest&key=${key}`)
    const response = await axios.get(
      //Test Link w/ block height hardcoded
      `https://api.covalenthq.com/v1/${chain}/events/address/${eye_seek_contract_address}/?starting-block=${startingBlock}&ending-block=${latest}&key=${key}`
      //Dynamic Link
      // `https://api.covalenthq.com/v1/${chain}/events/address/${eye_seek_contract_address}/?starting-block=${startingBlock}&ending-block=latest&key=${key}`
    );

    let total_txn_log_data = [];
    let micro_created_log_data = [];

    for (let i = 0; i < response.data.data.items.length; i++) {
      // Parse Data for Donation Events
      if (response.data.data.items[i].raw_log_topics[0] === donated_hash) {
        const decoded_raw_log_data = utils.defaultAbiCoder.decode(
          ['uint256', 'uint256', 'uint256', 'uint256', 'uint256'],
          response.data.data.items[i].raw_log_data
        );
        const date = new Date(response.data.data.items[i].block_signed_at).toDateString();
        const backer = decoded_raw_log_data[0]._hex;
        const amount = parseInt(decoded_raw_log_data[1]._hex);
        const fund_id = parseInt(decoded_raw_log_data[2]._hex);
        const currency_id = parseInt(decoded_raw_log_data[3]._hex);
        const drainedMicro = parseInt(decoded_raw_log_data[4]._hex);
        const txn_hash = response.data.data.items[i].tx_hash;

        total_txn_log_data.push({
          chain: chain,
          backer: backer,
          amount: amount,
          currency_id: currency_id,
          date: date,
          fund_id: fund_id,
          drained: drainedMicro,
          txn_hash: txn_hash,
        });
      }

      // Parse Data for Micro Created Events
      if (response.data.data.items[i].raw_log_topics[0] === micro_created_hash) {
        const decoded_raw_log_data = utils.defaultAbiCoder.decode(
          ['uint256', 'uint256', 'uint256', 'uint256', 'uint256'],
          response.data.data.items[i].raw_log_data
        );
        const date = new Date(response.data.data.items[i].block_signed_at).toDateString();
        const backer = decoded_raw_log_data[0]._hex;
        const cap = parseInt(decoded_raw_log_data[1]._hex);
        const fund_id = parseInt(decoded_raw_log_data[2]._hex);
        const currency_id = parseInt(decoded_raw_log_data[3]._hex);
        const txn_hash = response.data.data.items[i].tx_hash;

        micro_created_log_data.push({
          chain: chain,
          backer: backer,
          amount: cap,
          currency_id: currency_id,
          date: date,
          fund_id: fund_id,
          txn_hash: txn_hash,
        });
      }
    }

    // console.log('total_txn_log_data:',total_txn_log_data);
     //console.log('micro_created_log_data:',micro_created_log_data);

    return {
      total_txn_log_data,
      micro_created_log_data,
    };
  } catch (error) {
    console.log(error);
  }
};
