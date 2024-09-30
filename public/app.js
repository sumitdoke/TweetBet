// Import necessary libraries and modules
const Web3 = require('web3');
const { analyzeSentiment } = require('./sentimentAnalysis');
const { fetchTweets } = require('./twitterClient');

// Initialize web3 and contract variables
let web3;
let contract;
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const contractABI = [ /* ABI array goes here */ ]; // Replace with your contract's ABI

// Initialize the application
async function init() {
    // Check if Web3 is injected (MetaMask)
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
        loadContract();
    } else {
        alert("Please install MetaMask to use this app.");
    }
}

// Load the smart contract
function loadContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    loadActiveTweets(); // Load active tweets on initialization
}

// Create a new tweet
document.getElementById('tweetForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const tweetContent = document.getElementById('tweetContent').value;
    const accounts = await web3.eth.getAccounts();

    // Analyze sentiment before creating the tweet
    const sentimentScore = analyzeSentiment(tweetContent);

    try {
        // Create the tweet and include sentiment score
        await contract.methods.createTweet(tweetContent, sentimentScore).send({ from: accounts[0] });
        document.getElementById('tweetContent').value = ''; // Clear input field
        loadActiveTweets(); // Reload active tweets after creation
    } catch (error) {
        console.error("Error creating tweet:", error);
    }
});

// Invest in a tweet
document.getElementById('investmentForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const tweetId = document.getElementById('tweetId').value;
    const investmentAmount = document.getElementById('investmentAmount').value;
    const accounts = await web3.eth.getAccounts();

    try {
        await contract.methods.investInTweet(tweetId).send({
            from: accounts[0],
            value: web3.utils.toWei(investmentAmount, 'ether') // Convert ETH to Wei
        });
        document.getElementById('tweetId').value = ''; // Clear input field
        document.getElementById('investmentAmount').value = ''; // Clear input field
        loadActiveTweets(); // Reload active tweets after investment
    } catch (error) {
        console.error("Error investing in tweet:", error);
    }
});

// Fetch tweets based on user input
document.getElementById('fetchTweetsForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const hashtag = document.getElementById('hashtagInput').value;
    const fetchedTweets = await fetchTweets(hashtag);

    displayFetchedTweets(fetchedTweets); // Display fetched tweets in the UI
});

// Load active tweets from the blockchain and display them
async function loadActiveTweets() {
    const tweetsContainer = document.getElementById('tweetsContainer');
    tweetsContainer.innerHTML = ''; // Clear previous tweets

    const tweetCount = await contract.methods.tweetCount().call(); // Get total number of tweets

    for (let i = 1; i <= tweetCount; i++) {
        const tweet = await contract.methods.tweets(i).call(); // Fetch each tweet by ID

        if (tweet.isActive) { // Only display active tweets
            const tweetCard = document.createElement('div');
            tweetCard.className = 'tweet-card';
            tweetCard.innerHTML = `
                <h3>Tweet ID: ${i}</h3>
                <p>${tweet.content}</p>
                <p><strong>Investment:</strong> ${web3.utils.fromWei(tweet.investment, 'ether')} ETH</p>
                <p><strong>Sentiment Score:</strong> ${tweet.sentimentScore}</p>
            `;
            tweetsContainer.appendChild(tweetCard); // Append tweet card to container
        }
    }
}

// Function to display fetched tweets in the UI
function displayFetchedTweets(tweets) {
    const fetchedTweetsContainer = document.getElementById('fetchedTweetsContainer');
    fetchedTweetsContainer.innerHTML = ''; // Clear previous fetched tweets

    tweets.forEach(tweet => {
        const tweetCard = document.createElement('div');
        tweetCard.className = 'tweet-card';
        tweetCard.innerHTML = `
            <h3>${tweet.text}</h3>
            <p><strong>Author:</strong> ${tweet.author_id}</p>
        `;
        fetchedTweetsContainer.appendChild(tweetCard); // Append fetched tweet card to container
    });
}

// Initialize the application when the page loads
window.onload = init;