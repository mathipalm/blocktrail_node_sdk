const http = require('https'),
    crypto = require('crypto'),
    signature = require('./signature');

/**
 * Helper for doing HTTP requests
 *
 * @param network       string  BTC/tBTC
 * @param apiKey        string  Blocktrail api key
 * @param apiSecret     string  Blocktrail api secret
 * @constructor
 */
var Request = {
    baseURL: 'api.blocktrail.com'
}

Request.performRequest = function(path, method, payload, filter) {
    // Setting URL and headers for request
    const options = {
        protocol: 'https:',
        hostname: this.baseURL,
        method: method,
        port: 443,
        // With any request to the API you need to include the ?api_key= query parameter.
        path: '/v1/' + this.network + '/' + path + '?api_key=' + this.apiKey,
        headers: {
            'User-Agent': 'node-mathipalm',
            'Content-Type': 'application/json'
        },
        // agent: tunnelingAgent
    }

    // Tunnel for charles
    if (process.env['NODE_TLS_REJECT_UNAUTHORIZED'] == 0) {
        var tunnel = require('tunnel');
        var tunnelingAgent = tunnel.httpsOverHttp({
            proxy: {
                host: 'localhost',
                port: 8888
            }
        })
        options['agent'] = tunnelingAgent;
    }

    // All POST and PUT endpoints require you to add a 'Content-MD5' HTTP-Header, 
    // the value of which is the MD5 hash of the body of the request.
    if (method == 'POST' || method == 'PUT') {
        // options.headers['Content-Type'] = 'application/json';
        payload = JSON.stringify(payload);
        options.headers['Content-MD5'] = crypto.createHash('md5').update(payload).digest().toString('hex');
        options.headers['Authorization'] = signature({
            key: this.apiSecret,
            keyId: this.apiKey,
            path: options.path,
            method: method,
            md5: options.headers['Content-MD5']
        });
    }

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            var data = '';
            res.on('data', (chunk) => {
                data += chunk;
            })

            res.on('end', () => {
                data = JSON.parse(data)
                if (res.statusCode < 200 || res.statusCode > 299) {
                    reject(data)
                    return
                }
                if (filter) {
                    if (filter instanceof Array == false) {
                        filter = [filter];
                    }
                    var newData = {};
                    filter.forEach((val) => {
                        newData[val] = data[val];
                    })
                    data = newData;
                }
                resolve(data);
            })
        })

        if (payload) {
            req.write(payload)
        }

        req.on('error', (err) => {
            reject(err);
        })

        req.end()
    })
}

module.exports = Request;


function test() {
    var stringToSign = '';
    for (i = 0; i < options.headers.length; i++) {

    }
}







