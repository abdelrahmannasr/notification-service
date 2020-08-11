import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as swaggerUi from 'swagger-ui-express';

dotenv.config({
    path: `env/${process.env.ENV_TYPE}.env`,
});

import express from 'express';

import { AppLogger } from './utils';
import { App } from './app';

const port = process.env.PORT || '4000';
const PORT: number = parseInt(port as string, 10);

const application: express.Application = express();
/**
 * Server Activation
 */
new App(application)
    .start()
    .then((_) =>
        application.listen(PORT, () => {
            (process.env.API_VERSION) ?
                AppLogger.info(`Server Listening on 🚀  http://localhost:${port}/${process.env.API_VERSION}/api`) :
                AppLogger.info(`Server Listening on 🚀  http://localhost:${port}/api`);
            const swaggerDocument = require('./../swagger.json');
            application.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        })
    )
    .catch((error) => AppLogger.fatal(`Failed to start application: ${error}`));
