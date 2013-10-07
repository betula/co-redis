var redis = require('redis');
var commands = require('redis/lib/commands');

exports.createClient = function() {
  var args = [].slice.call(arguments);
  var client = redis.createClient.apply(redis, args);

  var decorator = {};
  decorator.__proto__ = client; // @TODO: Object.setPrototypeOf(decorator, client);

  commands.forEach(function(name) {
    decorator[name] = function() {
      var args = [].slice.call(arguments);
      return function(done) {
        client[name].apply(client, args.concat(done));
      }
    };
  });

  return decorator;
};

['print'].forEach(function(name) {
  exports[name] = redis[name];
});
