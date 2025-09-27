// Set up Express.js framework
const express = require('express');
const app = express();
const port = 4000;


// Route(s)
app.get('/', (req,res) =>
{
    res.send(`BadgeMe Amadeus!`);
});


// Start the Backend Server on `port`
app.listen(port,() =>
{
    console.log(`Connected on port ${port}`);
});