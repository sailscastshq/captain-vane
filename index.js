module.exports = function (sails) {
  return {
    initialize: function (done) {
      if (!sails.hooks.helpers) {
        return done(
          new Error(
            'Cannot load captain-vane hook without enabling the "helpers" hook!'
          )
        );
      }

      sails.after("hook:helpers:loaded", function () {
        try {
          if (!sails.hooks.helpers["vane"]) {
            sails.hooks.helpers.furnishHelper("vane", require("./helper/vane"));
            return done();
          }
        } catch (error) {
          return done(error);
        }
        return done();
      });
    },
  };
};

const fake = require("@ngneat/falso");

module.exports.fake = fake;
