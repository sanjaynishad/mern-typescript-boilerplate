import 'dotenv/config';
import express, { Response, Request } from 'express';
import compression from 'compression';
import cors from 'cors';
import { appRouteNotFound, handleAppRouteError, limiter } from './middlewares';
import helmet from 'helmet';
import { logger } from './utils/loggers';
import bodyParser from 'body-parser';
import { authorize } from './middlewares/auth';
import path from 'path';
import fs from 'fs';
import appRoutes from './routes';
import { AppConst } from './app-const';
import { connectToMongoDb } from './utils/mongo';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
    helmet(),
    compression(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cors(),

    // limit repeated requests
    limiter,

    // serve static files
    express.static(path.join(__dirname, './react-app/build')),
    express.static(path.join(__dirname, './public')),

    // autherize all request
    authorize
);

app.use('/', appRoutes);

// serve react app
// app.get('/*', (req, res) => {
//     const index = path.join(__dirname, './react-app/build', 'index.html');
//     if (fs.existsSync(index)) {
//         res
//             // .set("Content-Security-Policy", AppConst.contentSecurityPolicy)
//             .sendFile(index);
//     } else {
//         res.sendFile(path.join(__dirname, './public/maintenance.html'));
//     }
// });

// handle route errors
app.use(
    appRouteNotFound,
    handleAppRouteError,
)

// connect to database and start server
connectToMongoDb(err => {
    if (err) {
        logger.error(err);
        logger.info(`App is not starting due to mongo connect failure`);
    }

    // listen to port
    const port = process.env.PORT || 3000;
    app.listen(port, async () => {
        logger.info(`🚀 Server ready at: http://localhost:${port} in ${process.env.NODE_ENV} mode.`);
    });
});
