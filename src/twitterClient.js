// Import the TwitterApi class from the twitter-api-v2 library
const { TwitterApi } = require('twitter-api-v2');

// Create a new instance of TwitterApi with your credentials
const client = new TwitterApi({
    appKey: '<YOUR_API_KEY>', // Replace with your API key
    appSecret: '<YOUR_API_SECRET>', // Replace with your API secret
    accessToken: '<YOUR_ACCESS_TOKEN>', // Replace with your access token
    accessSecret: '<YOUR_ACCESS_SECRET>' // Replace with your access secret
});

/**
 * Function to fetch tweets based on a specific hashtag.
 * @param {string} hashtag - The hashtag to search for.
 * @returns {Promise<Array>} - A promise that resolves to an array of tweets.
 */
async function fetchTweets(hashtag) {
    try {
        const response = await client.v2.search(`#${hashtag}`, { max_results: 10 });
        return response.data; // Return fetched tweets
    } catch (error) {
        console.error("Error fetching tweets:", error);
        return [];
    }
}

// Export the client and fetchTweets function for use in other modules
module.exports = { client, fetchTweets };