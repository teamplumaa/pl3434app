var feedSubscription;

// Handle for launch screen possibly dismissed from app-body.js
dataReadyHold = null;

// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('news');
  Meteor.subscribe('bookmarkCounts');
  Meteor.subscribe('plums');
  Meteor.subscribe('users');
  Meteor.subscribe('contests');
  Meteor.subscribe('contestentries');
  Meteor.subscribe('images');
  feedSubscription = Meteor.subscribe('feed');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}


FeedController = RouteController.extend({
  onBeforeAction: function () {
    this.feedSubscription = feedSubscription;
  }
});

BookmarksController = RouteController.extend({
  onBeforeAction: function () {
    if (Meteor.user())
      Meteor.subscribe('bookmarks');
    else
      Overlay.open('authOverlay');
  },
  data: function () {
    if (Meteor.user())
      return _.values(_.pick(PlumsData, Meteor.user().bookmarkedPlumNames));
  }
});

// PlumController = RouteController.extend({
//   onBeforeAction: function () {
//     Meteor.subscribe('plum', this.params.name);
//   },
//   data: function () {
//     return PlumsData[this.params.name];
//   }
// });

// ContestsController = RouteController.extend({
//   onBeforeAction: function () {
//     return Meteor.subscribe('contests');
//   },
//   data: function () {
//    return _.values(Contests);
//   }
// })

AdminController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('news');
    Meteor.subscribe('contests');
  }
});

Router.route('plums', {
  path: '/',
  template: 'plums',
  data: function(){
    return Plums.findOne({_id: this.params._id});
  }
});

Router.route('feed');

Router.route('explore');

Router.route('bookmarks');

Router.route('contests', function () {
  this.render('contests', {
    data: function () {
      return Contests.findOne({_id: this.params._id});
    }
  })
});

Router.route('newplum');

Router.route('newcontest');

Router.route('contest', {
  path: '/contest/:_id',
  template: 'contest',
  data: function(){
    return Contests.findOne({_id: this.params._id});
  }
});


Router.route('about', {
  template: 'plumfeed',
  data: function(){
    return Plums.findOne({_id: this.params._id});
  }
  });

Router.route('plum', {
  path: '/plum/:title',
  template: 'plum',
  data: function(){
    return Plums.findOne({title: this.params.title});
  }
});

Router.route('admin', {
  layoutTemplate: null
});

Router.onBeforeAction('dataNotFound', {
  only: 'plum'
});
