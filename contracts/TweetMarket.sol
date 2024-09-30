// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TweetMarket {
    struct Tweet {
        string content;            // Content of the tweet
        uint256 investment;        // Total investment in the tweet
        address investor;          // Address of the investor
        uint256 sentimentScore;    // Sentiment score of the tweet
        bool isActive;             // Status of the tweet (active or not)
    }

    mapping(uint256 => Tweet) public tweets; // Mapping from tweet ID to Tweet struct
    uint256 public tweetCount;                // Counter for the number of tweets

    event TweetCreated(uint256 tweetId, string content);
    event InvestmentMade(uint256 tweetId, address investor, uint256 amount);
    
    // Function to create a new tweet
    function createTweet(string memory _content) public {
        tweetCount++;
        tweets[tweetCount] = Tweet(_content, 0, address(0), 0, true);
        
        emit TweetCreated(tweetCount, _content); // Emit event for new tweet creation
    }

    // Function to invest in a specific tweet
    function investInTweet(uint256 _tweetId) public payable {
        require(tweets[_tweetId].isActive, "Tweet not active");
        require(msg.value > 0, "Investment must be greater than zero");

        tweets[_tweetId].investment += msg.value;
        tweets[_tweetId].investor = msg.sender;

        emit InvestmentMade(_tweetId, msg.sender, msg.value); // Emit event for investment

        // Further logic can be added here for handling payouts based on performance...
    }

    // Function to set the sentiment score for a specific tweet (can be called by an oracle or off-chain service)
    function setSentimentScore(uint256 _tweetId, uint256 _score) public {
        require(tweets[_tweetId].isActive, "Tweet not active");
        
        tweets[_tweetId].sentimentScore = _score;
    }

    // Function to deactivate a tweet (for example, if it is deemed inappropriate)
    function deactivateTweet(uint256 _tweetId) public {
        require(tweets[_tweetId].isActive, "Tweet already inactive");
        
        tweets[_tweetId].isActive = false;
    }

    // Function to get details of a specific tweet
    function getTweetDetails(uint256 _tweetId) public view returns (string memory content, uint256 investment, address investor, uint256 sentimentScore, bool isActive) {
        Tweet memory t = tweets[_tweetId];
        return (t.content, t.investment, t.investor, t.sentimentScore, t.isActive);
    }
}