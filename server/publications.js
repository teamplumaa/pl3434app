Meteor.publish('bookmarkCounts', function() {
  return BookmarkCounts.find();
});

Meteor.publish('news', function() {
  return News.find({}, {sort: {date: -1}, limit: 1});
});

Meteor.publish('latestActivity', function () {
  return Activities.latest();
});

Meteor.publish('feed', function() {
  return Activities.find({}, {sort: {date: -1}, limit: 10});
});

Meteor.publish('plum', function(title) {
  check(title, String);
  return [
    BookmarkCounts.find({plumName: title}),
    Activities.find({plumName: title})
  ];
});

// Meteor.publish('plums', function(){
//   return Plums.find();
// });

Meteor.publish('plums', function(){
  return Plums.find();
});

Meteor.publish('contests', function(){
  return Contests.find({}, {sort: {date: -1}, limit: 10});
});

Meteor.publish('images', function(){
  return Images.find();
});

Meteor.publish('users', function(){
  return Meteor.users.find();
});
// Meteor.publish('contest', function(title) {
//   // check(title, String);
//   return  [
//   Contests.find(title),
//   ContestEntries.find({contestname:title})
//   ];

//   // return [
//   //   SubmissionCounts.find({contestName: title}),
//   //   Activities.find({plumName: name})
//   // ];
// });

Meteor.publish('contestentries', function() {
  return ContestEntries.find();
});

Meteor.publish('plumComments', function(postId) {
    return Comments.find({plumId: plumId});
});

// autopublish the user's bookmarks and admin status
Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {
    fields: {
      admin: 1,
      bookmarkedPlumNames: 1,
      'services.twitter.profile_image_url_https': 1
    }
  });
})
