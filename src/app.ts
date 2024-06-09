import express from 'express';
import routers from './routers';
import mongoose, { ConnectOptions } from 'mongoose';

export default async () => {
    const app = express();
    const port = 3000;
    const mongoAdress = 'mongodb+srv://admin:**some adress**';

    app.use('/', routers);

    app.listen(port, () => {
        console.log(`Starting on port - ${port}`);
    });

    mongoose.connect(mongoAdress, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    } as ConnectOptions);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("We're connected!");
    });

    return app;
};
