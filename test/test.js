/*jshint strict:false,maxlen:1000*/

var assert = require('assert');
var device = require('../device');

var test = function test(input, deviceName) {
	// application object
	var self = {
		session: {}
	  , request: {
			header: {
				'user-agent': input
			}
		}
	  , response: {}
	};

	var g = device.apply(self);
	while(true) {
		if (g.next().done) {
			break;
		}
	}

	assert(deviceName === self.session.device, '"' + input + '" device: ' + deviceName + '!==' + self.session.device);

};

test('GoogleTV', 'tv');
test('Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1C28 Safari/419.3', 'phone');

console.log('test ok');
