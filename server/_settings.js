// Provide defaults for Meteor.settings
//


if (typeof Meteor.settings === 'undefined')
  Meteor.settings = {};

_.defaults(Meteor.settings, {
  twitter: {
    consumerKey: "EErCBIEPYcTQPDGWw5SXNDCFJ",
    secret: "lUEAfYBcPHpDCYM8GX3l4zboAXLpOGvyLXYKL6iR3T6RsumoKr"
  },
  
});

ServiceConfiguration.configurations.upsert(
  { service: "twitter" },
  {
    $set: {
      consumerKey: Meteor.settings.twitter.consumerKey,
      secret: Meteor.settings.twitter.secret
    }
  }
);
