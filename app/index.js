const express = require('express');
const dotenv = require('dotenv');

const app = express();

// ENDPOINT
const authRouter = require('./routes/authRoute');
const articleRouter = require('./routes/articleRoute');
const userRoute = require('./routes/userRoute');

// MIDDLEWARE
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

// ROUTER
app.use(appendUrl('/auth'), authRouter);
app.use(appendUrl('/articles'), articleRouter);
app.use(appendUrl('/users'), userRoute);

// ENDPOINT NOT CREATED
app.use('/', pageNotFound);

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
