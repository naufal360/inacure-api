const express = require('express');
const dotenv = require('dotenv');

const app = express();

// ENDPOINT
const authRouter = require('./routes/authRoute');
const articleRouter = require('./routes/articleRoute');

// MIDDLEWARE
const requireAuth = require('./middleware/requireAuth');
const pageNotFound = require('./utils/pageNotFound');

// CONFIGURE DOTENV
dotenv.config();

// CONFIGURE DATABASE
require('./database/mongodb');

// PORT AND PATH
const PORT = process.env.PORT || 8080;
const VERSION_API = '/api/v1';
const appendUrl = (url) => `${VERSION_API}${url}`;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth
app.use(appendUrl('/auth'), authRouter);

app.use(appendUrl('/articles'), articleRouter);

// ENDPOINT NOT CREATED
app.use('/', pageNotFound);

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
