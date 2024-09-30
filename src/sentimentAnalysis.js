// Import the Sentiment library
const Sentiment = require('sentiment');

// Create a new instance of Sentiment
const sentiment = new Sentiment();

/**
 * Function to analyze sentiment of a given tweet content.
 * @param {string} tweetContent - The content of the tweet to analyze.
 * @returns {number} - The sentiment score ranging from -5 (very negative) to +5 (very positive).
 */
function analyzeSentiment(tweetContent) {
    const result = sentiment.analyze(tweetContent);
    return result.score; // Return the overall sentiment score
}

/**
 * Example usage of the analyzeSentiment function.
 */
function exampleUsage() {
    const tweets = [
        "I love using this platform! It's amazing.",
        "This is the worst experience ever.",
        "I'm feeling neutral about this.",
        "What a fantastic day!",
        "I hate waiting in long lines."
    ];

    tweets.forEach(tweet => {
        const score = analyzeSentiment(tweet);
        console.log(`Tweet: "${tweet}"\nSentiment Score: ${score}\n`);
    });
}

// Uncomment to run example usage
// exampleUsage();

// Export the analyzeSentiment function for use in other modules
module.exports = { analyzeSentiment };