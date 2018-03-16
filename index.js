const Blocktrail = require('./lib/blocktrail');

var key = '02aac819da9f59ddf7cd911763c16799e02f829f';
var secret = '1a5ebdb846cd1aa18bac4c60824a49e936559888';

// Set to 0 for Charles, att port 8888
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

var test = new Blocktrail('BTC', key, secret);

var adsf = test.createAddress()
adsf.then((result) => {
	console.log(result);
}, function(err) {
    console.log(err);
})
// test.performRequest("wallet/inacbojasplix_wallet", "GET");