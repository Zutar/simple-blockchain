import { getBlockchain, generateNextBlock } from '../../blockchain.js';
import express from "express";

const router = express.Router();

router.get('/version', (req, res) => {
    res.send(getBlockchain());
});

export default router;