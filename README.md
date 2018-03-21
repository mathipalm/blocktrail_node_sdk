# blocktrail_node_sdk
This is a super-slim version of the original Node.js sdk provided by [Blocktrail](https://github.com/blocktrail/blocktrail-sdk-nodejs). This by no means a replacment for their sdk, I just found their sdk to includ to much and have so many dependcies. And it did not wanna play well with Docker. And I did not need all of the functionallity they offerd.

To install, just use npm:

```bash
npm install blocktrail_node_sdk
```

This sdk is using [Promise](https://www.promisejs.org/)

Examples
--------

```javascript
const Blocktrail = require('blocktrail_node_sdk');

var key = 'your_api_key';
var secret = 'your_secret_key';

// Uncomment this if you want to tunnel through charles, att port 8888
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// tBTC for testnet
var blocktrail = new Blocktrail('BTC', key, secret);

var createAddress = blocktrail.createAddress('wallet_name')
createAddress.then((result) => {
    console.log(result);
}, function(err) {
    console.log(err);
})
```
