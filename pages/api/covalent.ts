import axios from "axios";
import { ethers } from "ethers";

//Ethers functions
const utils = ethers.utils;

// covalent key
const key = 'ckey_da302f1c19694bdbbab1f7ae1ce';

// contract addresses
const eye_seek_contract_address = '0xFfF3B40f7905704ce5Ae876b59B6E1C30fBEa995';
const multi_chain_swap_address = '0xaf28cb0d9E045170E1642321B964740784E7dC64'

// Chain : ChainID
const polygonChainId = 137;
const polygonMumbaiChainId = 80001;
const bnbChainId = 56;
const fantomChainId = 250;

// GET TOPIC HASHES (EXAMPLE BELOW IS FOR A TRANSFER)
const transfer_sig = 'Transfer(address,address,uint256)';

const transfer_topic = utils.toUtf8Bytes(transfer_sig);
console.log('transfer topic', transfer_topic);

const transfer_keccak256 = utils.keccak256(transfer_topic);
console.log('transfer keccak256', transfer_keccak256);

// DECODE LOGS (EXAMPLE BELOW IS FOR A TRANSFER)
const decodedLog = utils.defaultAbiCoder.decode(['uint256'], '0x0000000000000000000000000000000000000000000000003db758145ca5d960');
console.log('this is the decodedLog', decodedLog);

const decodedLogString = utils.defaultAbiCoder.decode(['uint256'], '0x0000000000000000000000000000000000000000000000003db758145ca5d960')[0].toString();
console.log('this is the decodedLogString', decodedLogString);


// GET LATEST BLOCK HEIGHT FOR A CHAIN
export const getLatestBlockHeight = async () => {
    try {
        const response = await axios.get(
        `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/block_v2/latest/?key=${key}`
        );
        console.log('response: ', response);
        return response.data.data.items[0].height;
    } catch (error) {
        console.log(error);
    }
}

// GET LOG EVENTS FOR A CONTRACT
export const getLogEvents = async (startingBlock: number , endingBlock: number) => {
    try {
        console.log('passing in these params: ', polygonMumbaiChainId, multi_chain_swap_address, startingBlock, endingBlock);
        console.log('covalent link with params:', `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/events/address/${multi_chain_swap_address}/?quote-currency=USD&format=JSON&starting-block=${startingBlock}&ending-block=${endingBlock}&key=${key}`)
        const response = await axios.get(
            //Test Link w/ params filled in (limited to page size of 25)
            `https://api.covalenthq.com/v1/80001/events/address/0xaf28cb0d9E045170E1642321B964740784E7dC64/?quote-currency=USD&format=JSON&starting-block=28824286&ending-block=28824287&page-size=100&key=ckey_da302f1c19694bdbbab1f7ae1ce`

            //Dynamic Link
            // `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/events/address/${multi_chain_swap_address}/?quote-currency=USD&format=JSON&starting-block=${startingBlock}&ending-block=${endingBlock}&key=${key}`
        );
        console.log('log events response: ', response.data.data);
 
    let total_log_data = [];
    let total_amount_transferred = 0;

    for (let i = 0; i < response.data.data.items.length; i++) {
        if(response.data.data.items[i].raw_log_topics[0] === transfer_keccak256) {

            const decoded_raw_log_data = utils.defaultAbiCoder.decode(['uint256'], response.data.data.items[i].raw_log_data).toString();
            console.log('decoded_raw_log_data: ',decoded_raw_log_data);
        

            // format the decoded_raw_log_data to a readable number
            const formatted_decoded_raw_log_data = utils.formatUnits(decoded_raw_log_data, 18);
            

            console.log('formatted_decoded_raw_log_data',formatted_decoded_raw_log_data);

            total_log_data.push({
                "tx_hash" : `https://mumbai.polygonscan.com/tx/${response.data.data.items[i].tx_hash}`,
                "tx_amount_transferred" : formatted_decoded_raw_log_data
            });
        }
    }

    console.log('total_log_data:',total_log_data);
    console.log('total_amount_transferred:',total_amount_transferred);

    return total_amount_transferred;

    } catch (error) {
        console.log(error);
    }
}

// GET ERC20 TRANSFERS
export const getERC20Transfers = async () => {
    try {
        const response = await axios.get(
        //https://api.covalenthq.com/v1/80001/address/0xaf28cb0d9E045170E1642321B964740784E7dC64/transfers_v2/?&key=ckey_da302f1c19694bdbbab1f7ae1ce
        `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/address/${multi_chain_swap_address}/transfers_v2/?&key=${key}`
        );
        console.log('erc20 transfers: ', response);
        return response
    } catch (error) {
        console.log(error);
    }
}
