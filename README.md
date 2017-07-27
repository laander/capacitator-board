# Capacitator - deployment status dashboard

> A deployment dashboard that gives status information on projects/environments, deployed by flux

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
