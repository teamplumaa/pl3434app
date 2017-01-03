ContestEntries = new Mongo.Collection('contestentries');

Meteor.methods({
    'enterContest': function(ctitle, ContestEntryVar) {

    var contestentry = ContestEntryVar;
    var giveaway = ctitle;
    var user = Meteor.users.find(this.userId);
    var username = Meteor.user().profile.name;
    var useravatar = Meteor.user().services.twitter.profile_image_url_https;

    if (user) {
      ContestEntries.insert({
        contestname: giveaway,
        entry: contestentry,
        contestant: username,
        contestantavatar: useravatar,
        submittedAt: new Date(),
      });
      }
    }
});
