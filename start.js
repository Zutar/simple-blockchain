import initHttpServer from './bin/httpServer/index.js';
import 'dotenv/config';


const port = process.env.HTTP_SERVER_PORT;
//TODO add WS peer to peer connection init
initHttpServer(port);

//TODO add global error handler