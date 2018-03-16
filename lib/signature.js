const crypto = require('crypto');

function sign(options) {
	options.headers = ['(request-target)', 'content-md5'];
    options.algorithm = 'hmac-sha256';

  	var i;
  	var stringToSign = '';
  	for (i = 0; i < options.headers.length; i++) {
    	var h = options.headers[i].toLowerCase();

    	if (h === '(request-target)') {
      		stringToSign += '(request-target): ' + 
      		options.method.toLowerCase() + ' ' + 
      		options.path;
    	} else if (options.md5) {
      		stringToSign += h + ': ' + options.md5;
    	}

    	if ((i + 1) < options.headers.length) {
      		stringToSign += '\n';
    	}
    }

  	let signature = createHmac(stringToSign, options.key);
	let authorization = 'Signature keyId="'+options.keyId
	+'",algorithm="'+options.algorithm+'",headers="'+
	options.headers.join(' ')+'",signature="'+signature+'"';
  	return authorization;
};

function createHmac(stringToSign, key) {
  	var hmac = crypto.createHmac('SHA256', key);
    	hmac.update(stringToSign);
    	signature = hmac.digest('base64');
  	return signature;
};


module.exports = function (options) {
	return sign(options)
}