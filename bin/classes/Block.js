class Block {
    constructor(index, hash, previousHash, timestamp, data){
        this.index = index;
        this.hash = hash ? hash.toString() : '';
        this.previousHash = previousHash ? previousHash.toString() : '';
        this.timestamp = timestamp;
        this.data = data;
    
    }
}

export default Block;