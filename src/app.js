const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const todosRouter = require('./routes/todos');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

const proxyDepth = parseInt(process.env.ADAPTABLE_TRUST_PROXY_DEPTH);
console.log("Proxy Depth", proxyDepth);

if (proxyDepth > 0) {
    app.set('trust proxy', proxyDepth + 1);
}

// Routes
app.use('/todos', todosRouter);


module.exports = app;
