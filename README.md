This is a small example service intended to work along side https://github.com/jblance/mpp-solar. You can send mpp-solar commands and get a response returned in a JSON format.

## Setup
* Setup mpp-solar to run in daemon mode with the config found in this project [mpp-solar.config](mpp-solar.config)
* Have a MQTT broker running locally
* This service must also be running on the same host as the mpp-solar but that can be changed by modifying the MQTT broker settings

### Node steps
#### Install dependencies

npm install

#### Run service

node ./index.js
