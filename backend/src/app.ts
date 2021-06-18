// node module imports
import express from "express";

// local imports
import MasterRouter from './routers/MasterRouter';

// set the default port (will go into .env later)
const port = 8080; 

// create a server class
class Server {

    // create a public express instance
    public app = express();

    // set the router of the application
    public router = MasterRouter;
}

// initialize the server
const server = new Server();

// have the server listen on the associated port
server.app.listen( port, () => {

    // comment to allow for the console log
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );