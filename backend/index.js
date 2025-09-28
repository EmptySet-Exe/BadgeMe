// Set up Express.js framework
const express = require('express');
const app = express();
const port = 4000;

// Enable CORS for frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Route(s)
app.get('/', (req,res) =>
{
    res.send(`BadgeMe Amadeus!`);
});

// KYC verification API endpoint - Simplified Frontend Branch Version
app.get('/api/status', (req, res) => {
    const wallet = req.query.wallet || 'default';
    
    const validWallet = /^0x[a-fA-F0-9]+$/.test(wallet);
    res.json({
        verified: validWallet,
        flags: validWallet ? ['OVER18', 'AML_OK'] : [],
        region: 'IN'
    });
});


// Start the Backend Server on `port`
app.listen(port,() =>
{
    console.log(`Connected on port ${port}`);
});