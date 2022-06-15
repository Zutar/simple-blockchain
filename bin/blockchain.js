import Block from './classes/Block.js';
import {error, warning} from './utils/console.js';


const genesisBlock = new Block(
    0, 'af232dc10f181e298232ec008c051a7e2dd0d122e44403cf825b609b9e711a23', null, 1655317976, 'cookie!'
);

const localBlockchain = [genesisBlock];

const calculateHash = (index, previousHash, timestamp, data) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};

const getLatestBlock = (blockchain) => {
    return blockchain[blockchain.length - 1];
}

const getBlockchainLength = () => {
    return localBlockchain.length;
}

const getBlockchain = () => {
    return localBlockchain;
}

const generateNextBlock = (blockData) => {
    const previousBlock = getLatestBlock(localBlockchain);
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData)
    const newBlock = new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
    return newBlock;
}

const isValidateBLock = (newBlock, previousBlock) => {
    if(previousBlock.index + 1 !== newBlock.index){
        error('Error: Invalid index');
        return false;
    }else if(previousBlock.hash !== newBlock.previousHash){
        error('Error: Invalid previous hash');
        return false;
    }else if(calculateHashForBlock(newBlock) !== newBlock.hash){
        error('Error: Invalid hash of block');
    }else if(!isValidBlockStructure(newBlock)){
        error('Error: Invalid new block structure');
    }
    return true;
}

const isValidBlockStructure = (block) => {
    return typeof block.index === 'number'
    && typeof block.hash === 'string'
    && typeof block.previousHash === 'string'
    && typeof block.timestamp === 'number'
    && typeof block.data === 'string';
}

const calculateHashForBlock = (block) => {
    if(!isValidBlockStructure(block)) return null;
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
}

const isValidGenesis = (block) => {
    return JSON.stringify(block) === JSON.stringify(genesisBlock);
}

const isValidChain = (blockchain = []) => {
    const genesisBlock = blockchain[0];
    if(!isValidGenesis(genesisBlock)){
        return false;
    }

    for(let i = 1; i < blockchain.length; i++){
        if(!isValidateBLock(blockchain[i], blockchain[i - 1])){
            return false;
        }
    }

    return true;
}
// TODO use this method when our node connected to blockchain
const replaceChain = (blockchain = []) => {
    if(isValidChain(blockchain) && blockchain.length  > getBlockchain().length){
        warning('Received blockchain is valid. Replacing current blockchain...');
        localBlockchain = blockchain;
        // broadcastLatest();
    }else{
        error('Received blockchain invalid');
    }
}

export {generateNextBlock, getBlockchain, getLatestBlock, getBlockchainLength};
// TODO add PoS algo
// TODO add merkle tree
// TODO sending blockchain block for sync using parts
// TODO Write blockchain blocks to file in folder "data"

/*

How it's working:
* We have two or more nodes (in this case nodeA and nodeB)
* NodeB is working. Our node - NodeA

1) NodeA connected to NodeB
2) NodeA check last block
3) If NodeA have old data we request all blocks from NodeB
4) NodeB send to NodeA all blocks from local blockchain
5) Check if blockchain from NodeB is correct and replace our local blockchain (use replaceChain)
6) NodeA ready to work

*/