const { join } = require('path');
const express = require('express');
const app = express();

app.use(express.static(join(__dirname, 'public')));
app.listen(3000, () => console.info('Open http://localhost:3000/ in your browser.'));
