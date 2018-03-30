const path = require('path');

const express = require('express');

const app = express();

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

// Serve static files

app.use(express.static(publicPath));





app.listen(port, () => console.log(`Server up and running on port ${port}...`));