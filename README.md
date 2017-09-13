# Capacitator

> A minimalistic deployment dashboard, console style

## Highlights

- Shows your most recent deploys
- Grid view, with environment as columns and projects as row
- Single API call to fetch data (setup)

## Install

The easy way; deploy and host it directly on Netlify in one click (almost):  

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/laander/capacitator)

Want to host it somewhere else?

```bash
# Checkout from git
git clone git@github.com:laander/capacitator.git && cd capacitator
# Copy the default config and edit it to your preference
cp config.default.js config.js && pico config.js
# Build it, bundle will be saved to /dist dir
yarn build
```

## Setup

```bash
# Make sure you have yarn installed
# (alternatively: npm install --global yarn)
brew update
brew install yarn

# install dependencies
# (alternatively: npm install)
yarn install --pure-lockfile

# serve with hot reload at localhost:8080
yarn run dev

# make a production build
yarn run build
```

## About

This simple dashboard fetches data from a webtask.io server that our Flux deployment script pings each time a deployment is triggered. It then renders the payload in a table view.

The purpose is to give a brief overview of what version/releases/branches currently are deployed on which environments (e.g. prod, staging, staging2) for different projects (e.g. api, admin, booking-js/cdn)

It's hosted on:  
https://capacitator.timekit.io

The Webtask.io server endpoint:  
https://wt-3bd7299d97400fd5655b883c44d233ab-0.run.webtask.io/capacitator
