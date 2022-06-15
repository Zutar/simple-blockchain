import { getBlockchain, generateNextBlock, getBlockchainLength, getLatestBlock } from '../../blockchain.js';
import express from "express";

const router = express.Router();

router.get('/blocks', (req, res) => {
    res.send(getBlockchain());
});

router.post('/blocks', (req, res) => {
    const newBlock = generateNextBlock(req.body.data);
    res.send(newBlock);
});

router.get('/length', (req, res) => {
    const blockchainLength = getBlockchainLength();
    res.send(blockchainLength);
});

router.get('/last', (req, res) => {
    const latestBlock = getLatestBlock();
    res.send(latestBlock);
});

export default router;