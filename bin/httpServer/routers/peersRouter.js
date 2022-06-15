import express from "express";

const router = express.Router();

router.get('/peers', (req, res) => {
    res.send('peers list');
});

router.post('/peers', (req, res) => {
    connectToPeers(req.body.peer);
    res.send(true);
});

export default router;