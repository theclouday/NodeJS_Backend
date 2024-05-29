import express from 'express';
import routers from './routers';

export default async () => {
    const app = express();
    const port = 3000;

    app.use('/', routers);

    app.listen(port, () => {
        console.log(`Starting on port - ${port}`);
    });

    return app;
};
