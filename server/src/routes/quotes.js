const express = require('express');
const router = express.Router();
const fetchModule = import('node-fetch');


router.get('/getQuote', async (req, res) => {
    try {
      const fetch = await fetchModule;
      const url = 'https://zenquotes.io/api/random';
      const response = await fetch.default(url);
      const data = await response.json();
      
      // Extract the quote text from the data
      const quote = data[0].q;
      const author = data[0].a;
      
      res.json({ quote, author }); // Send the quote as JSON to the frontend
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });


module.exports = router;
