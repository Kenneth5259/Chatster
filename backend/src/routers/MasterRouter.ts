import { Router, Request, Response, NextFunction } from "express";

// create a master router class for connecting all thematic routers
class MasterRouter {

    // create a private router object
    private _router = Router();

    // create a getter
    get router() {
        return this._router;
    }

    // run configure on construction
    constructor() {
        this._configure();
    }

    // private configuration for setting route types
    private _configure() {

        // add default get route to the router
        this.router.get( "/", ( req: Request, res: Response, next: NextFunction ) => {
            res.send( "Hello world!" );
        } );
    }
}

// export the router from the class
export = new MasterRouter().router;