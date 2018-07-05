import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import api from './api';
import config from './config.json';
import mongoose from 'mongoose';

/*
Database information
*/
let user = 'mrccorrea'
let password = 'voicebunny1'
let database = 'speedy'

/*
Starts mongoose and connects to the MongoDB 'speedy' project.
*/
mongoose.connect('mongodb://' + user + ':' + password + '@ds127811.mlab.com:27811/' + database);
mongoose.Promise = global.Promise;

/*
Starts express and creates a new server.
*/
let app = express();
app.server = http.createServer(app);

/*
Attaches bodyParser to take care of JSONs.
*/
app.use(bodyParser.json({
	limit: config.bodyLimit
}));

/*
Router endpoints
*/
app.use('/api', api({ config }));

/*
Starts the app
*/
app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
