BookmarkCounts = new Mongo.Collection('bookmarkCounts');

Meteor.methods({
  'bookmarkPlum': function(plumName) {
    check(this.userId, String);
    check(plumName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      bookmarkedPlumNames: {$ne: plumName}
    }, {
      $addToSet: {bookmarkedPlumNames: plumName}
    });

    if (affected)
      BookmarkCounts.update({plumName: plumName}, {$inc: {count: 1}});
  },

  'unbookmarkPlum': function(plumName) {
    check(this.userId, String);
    check(plumName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      bookmarkedPlumNames: plumName
    }, {
      $pull: {bookmarkedPlumNames: plumName}
    });

    if (affected)
      BookmarkCounts.update({plumName: plumName}, {$inc: {count: -1}});
  }
});

// Initialize bookmark counts. We could use upsert instead.
if (Meteor.isServer && BookmarkCounts.find().count() === 0) {
  Meteor.startup(function() {
    _.each(Plums, function(plums, plumName) {
      BookmarkCounts.insert({plumName: plumName, count: 0});
    });
  });
}
