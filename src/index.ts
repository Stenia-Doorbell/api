import * as path from "path";

const webpush = require('web-push')
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from './routes/index';

const publicVapidKey = "BE6hIOREKP_hcVjUEVGX7Q56Spena7DdPl2gpRELuMtSKDai4DwY7Oapi7U2GCl2O_zClyILRRFK7bFrsd0nlsE";
const privateVapidKey = "-_vMEjKMcPnvoD-aPBLpA89GyY3vW3pZ64zk03VrdtM";

webpush.setVapidDetails(
    'mailto:offabio@outlook.com',
    publicVapidKey,
    privateVapidKey
);

//Connects to the Database -> then starts the express
createConnection()
    .then(async connection => {
        //Generate tables
        await connection.synchronize();
        // Create a new express application instance
        const app = express();

        // Call midlewares
        app.use(cors());
        app.use(helmet());
        app.use(express.json());
        app.use(express.static(path.join(__dirname, 'public')))

        //Set all routes from routes folder
        app.use("/", routes);

        app.listen(3000, () => {
            console.log("Server started on port 3000!");
        });
    })
    .catch(error => console.log(error));
