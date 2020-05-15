This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage Instructions

In order to use, run yarn start.  This will run the app in development mode at localhost:3000.

Tests can be run with yarn test

## Extra Features

I have added the ability for the game to be played automatically.  In order to simulate human like interaction, I generate clicks and let the click handler play out, sleeping in between clicks to allow state to catch up/for people to follow what's happening.  This has potential to be creaky, but seemed like the most straightforward solution.

This assumes that the lookup table in the Light Chasing section of [Lights Out](https://en.wikipedia.org/wiki/Lights_Out_(game)) is the complete set of solvable patterns.
