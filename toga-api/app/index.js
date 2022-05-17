const express = require('express');
const app = express();
const pageNotFound = require('./utils/pageNotFound');

// ENDPOINT
const authRouter = require('./routes/authRoute');
const articleRouter = require('./routes/articleRoute');

// MIDDLEWARE
const requireAuth = require('./middleware/requireAuth');

const PORT = process.env.PORT || 8080;
const VERSION_API = '/api/v1';

const appendUrl = (url) => `${VERSION_API}${url}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(appendUrl('/auth'), authRouter);

// must be authentication
app.use(requireAuth);
app.use(appendUrl('/articles'), articleRouter);

app.use('/', pageNotFound);
app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
