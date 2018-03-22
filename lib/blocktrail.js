const request = require('./request');

var blocktrail = {
    COIN: 100000000,
    PRECISION: 8,
    DUST: 2730,
    BASE_FEE: 10000
};


/**
 * Helper for doing HTTP requests
 *
 * @param network       string  BTC/tBTC
 * @param apiKey        string  Blocktrail api key
 * @param apiSecret     string  Blocktrail api secret
 * @constructor
 */
 function Blocktrail(network, apiKey, apiSecret) {
    request.apiKey = apiKey;
    request.apiSecret = apiSecret;
    request.network = network;
}

/**
 * convert a BTC value to Satoshi *

 * @param btc   float       BTC value
 * @returns int             Satoshi value (int)
 */
Blocktrail.toSatoshi = function(btc) {
    return parseInt((btc * blocktrail.COIN).toFixed(0), 10);
};

/**
 * convert a Satoshi value to BTC
 *
 * @param satoshi   int     Satoshi value
 * @returns {string}        BTC value (float)
 */
Blocktrail.toBTC = function(satoshi) {
    return (satoshi / blocktrail.COIN).toFixed(blocktrail.PRECISION);
};

/**
 * Create a new wallet address
 *
 * @returns Promise{address: some_address}        a new address
 */
Blocktrail.prototype.createAddress = function(wallet) {
	return request.performRequest('wallet/' + wallet + '/path', 'POST', {path: "M/0'/0"}, "address")
}

/**
 * Create a webhook and listen to incomming cash for a particular address
 *
 * @param identifier   string     userID (or some other identifier you can store)
 * @param url          string     webhook url
 * @returns Promise
 */
Blocktrail.prototype.createWebhook = function(identifier, url) {
	var postData = {
        'url': url,
        'identifier': identifier
    };
	return request.performRequest('webhook', 'POST', postData)
}

/**
 * Create a webhook and listen to incomming cash for a particular address
 *
 * @param identifier   string     userID (or some other identifier you can store)
 * @param address      string     user btc address
 * @returns Promise
 */
Blocktrail.prototype.subscribeToTransactions = function(identifier, address) {
    var postData = {
        'event_type': 'address-transactions',
        'address': address,
        'confirmations': 6
    };
    return request.performRequest('webhook/' + identifier + '/events', 'POST', postData)
}

module.exports = Blocktrail;