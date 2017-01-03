var TAB_KEY = 'contestShowTab';

Template.contest.onCreated(function() {
  this.state = -1;
  if (Router.current().params.activityId)
    Template.contest.setTab('feed');
  else
    Template.contest.setTab('contest');

});

Template.contest.onRendered(function () {
  this.$('.contest').touchwipe({
    wipeDown: function () {
      if (Session.equals(TAB_KEY, 'contest'))
        Template.contest.setTab('make')
    },
    preventDefaultEvents: false
  });
  this.$('.attribution-contest').touchwipe({
    wipeUp: function () {
      if (! Session.equals(TAB_KEY, 'contest'))
        Template.contest.setTab('contest')
    },
    preventDefaultEvents: false
  });
});

// CSS transitions can't tell the difference between e.g. reaching
//   the "make" tab from the expanded state or the "feed" tab
//   so we need to help the transition out by attaching another
//   class that indicates if the feed tab should slide out of the
//   way smoothly, right away, or after the transition is over
Template.contest.setTab = function(tab) {
  var lastTab = Session.get(TAB_KEY);
  Session.set(TAB_KEY, tab);

  var fromContest = (lastTab === 'contest') && (tab !== 'contest');
  $('.feed-scrollable').toggleClass('instant', fromContest);

  var toContest = (lastTab !== 'contest') && (tab === 'contest');
  $('.feed-scrollable').toggleClass('delayed', toContest);
}

Template.contest.helpers({
  isActiveTab: function(name) {
    return Session.equals(TAB_KEY, name);
  },
  activeTabClass: function() {
    return Session.get(TAB_KEY);
  },

  bookmarkCount: function () {
    var count = BookmarkCounts.findOne({plumName: this.title});
    return count && count.count;
  },

  commententries: function() {
    return ContestEntries.find({name: this.title}, {sort: {date: -1}});
  },
  ctitle: function () {
    var s = Contests.findOne({_id: this.params._id}, {fields: {title: 1}});
    Template.instance().state = s;
    return s;
  }

});

Template.contest.events({
  'click .js-add-bookmark': function(event) {
    event.preventDefault();

    if (! Meteor.userId())
      return Overlay.open('authOverlay');

    Meteor.call('bookmarkPlum', this.title);
  },

  'click .js-show-contest': function(event) {
    event.stopPropagation();
    Template.contest.setTab('make')
  },

  'click .js-show-feed': function(event) {
    event.stopPropagation();
    Template.contest.setTab('feed')
  },

  'click .js-uncollapse': function() {
    Template.contest.setTab('contest')
  },

  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  },

  'submit form': function(event){
    event.preventDefault();
    var ContestEntryVar = event.target.myentry.value;
    var ctitle = Template.instance().state;

    Meteor.call('enterContest', ctitle);
    event.target.myentry.value = "";
  }
});
