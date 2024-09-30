// Import necessary modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example route for handling tweet fetching (can be expanded later)
app.post('/api/fetch-tweets', async (req, res) => {
    const { hashtag } = req.body;

    // Here you would call your Twitter client to fetch tweets using the hashtag
    // For example:
    // const tweets = await fetchTweets(hashtag);
    
    // Simulating fetched tweets for demonstration purposes
    const tweets = [
        { text: "This is a sample tweet about #" + hashtag, author_id: "12345" },
        { text: "Another tweet mentioning #" + hashtag, author_id: "67890" }
    ];

    res.json(tweets); // Send fetched tweets as JSON response
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});