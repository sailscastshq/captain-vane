module.exports = function(sails) {
  return {
    initialize: function(done) {
      if (!sails.hooks.helpers) {
        return done(new Error('Cannot load captain-vane hook without enabling the "helpers" hook!'));
      }

      sails.after('hook:helpers:loaded', function() {
        try {
          if(!sails.hooks.helpers['vane']) {
            sails.hooks.helpers.furnishHelper('fetch', require('./private/vane'));
            return done();
          }
        } catch (error) {
          return done(error);
        }

        return done();
      })
    }
  }
}
