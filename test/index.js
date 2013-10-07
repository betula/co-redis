
var co = require('co');
var redis = require('..');
var assert = require('assert');

describe('get/set', function() {
  var client;

  beforeEach(function() {
    client = redis.createClient();
  });
  afterEach(function() {
    client.quit();
  });

  it('should work', function(done) {
    co(function *() {

      yield client.set('foo_rand000000000000', 'some fantastic value');
      var ret = yield client.get('foo_rand000000000000');
      assert(ret === 'some fantastic value');

      done();
    });
  });
});