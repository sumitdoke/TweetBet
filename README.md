# Twitter Prediction Market

## Description
The **Twitter Prediction Market** is a decentralized application that allows users to create tweets, invest in them, and analyze their sentiment. By integrating social media interaction with blockchain technology, users can engage with content while also participating in a financial market based on public opinion.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact Information](#contact-information)

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/sumitdoke/TweetBet.git
   ```

2. Navigate to the project directory:
   ```bash
   cd TweetBet
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Twitter API credentials and smart contract address:
   ```
   TWITTER_API_KEY=your_api_key_here
   TWITTER_API_SECRET=your_api_secret_here
   TWITTER_ACCESS_TOKEN=your_access_token_here
   TWITTER_ACCESS_SECRET=your_access_secret_here
   CONTRACT_ADDRESS=your_contract_address_here
   ```

## Usage
1. Start the server:
   ```bash
   node src/server.js
   ```

2. Open your web browser and navigate to `http://localhost:3000`.

3. Use the application to:
   - Create tweets by entering content and submitting the form.
   - Invest in existing tweets by entering the tweet ID and investment amount.
   - Fetch tweets from Twitter by entering a hashtag.

## Features
- **Create Tweets**: Users can submit tweets, which are analyzed for sentiment before being stored on the blockchain.
- **Invest in Tweets**: Users can invest Ether in tweets, allowing them to participate in the market based on their predictions of tweet performance.
- **Fetch Tweets from Twitter**: Users can search for and display tweets from Twitter based on specific hashtags.
- **Sentiment Analysis**: Each tweet includes a sentiment score, providing insights into public sentiment.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Blockchain**: Ethereum (using Web3.js)
- **Twitter API**: twitter-api-v2 for fetching tweets
- **Sentiment Analysis**: vader-sentiment library for analyzing tweet content

## Project Structure
```
twitter-prediction-market/
├── src/
│   ├── public/
│   │   ├── index.html           # Main HTML file
│   │   ├── styles.css           # CSS file for styling
│   │   └── app.js               # Frontend JavaScript
│   ├── twitterClient.js          # Twitter API client
│   ├── sentimentAnalysis.js       # Sentiment analysis module
│   └── server.js                 # Express server setup
├── package.json                  # Project metadata and dependencies
├── .env                          # Environment variables (not tracked by Git)
└── .gitignore                    # Files and directories ignored by Git
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
