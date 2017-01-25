const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const app = express();

// parser for post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// static path do dist
app.use(express.static(path.join(__dirname, '../dist')));

// set api routes
app.use('/api', api);

// return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// get port from env
const port = process.env.PORT || '3000';
app.set('port', port);

// create http server
const server = http.createServer(app);

server.listen(port, () => console.log(`API runninh on localhost: ${port}`));
