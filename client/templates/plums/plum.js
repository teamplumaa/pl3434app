var TAB_KEY = 'plumShowTab';

Template.plum.onCreated(function() {
  if (Router.current().params.activityId)
    Template.plum.setTab('feed');
  else
    Template.plum.setTab('plum');
});

Template.plum.onRendered(function () {
  this.$('.plum').touchwipe({
    wipeDown: function () {
      if (Session.equals(TAB_KEY, 'plum'))
        Template.plum.setTab('make')
    },
    preventDefaultEvents: false
  });
  this.$('.attribution-plum').touchwipe({
    wipeUp: function () {
      if (! Session.equals(TAB_KEY, 'plum'))
        Template.plum.setTab('plum')
    },
    preventDefaultEvents: false
  });
});

// CSS transitions can't tell the difference between e.g. reaching
//   the "make" tab from the expanded state or the "feed" tab
//   so we need to help the transition out by attaching another
//   class that indicates if the feed tab should slide out of the
//   way smoothly, right away, or after the transition is over
Template.plum.setTab = function(tab) {
  var lastTab = Session.get(TAB_KEY);
  Session.set(TAB_KEY, tab);
  
  var fromPlum = (lastTab === 'plum') && (tab !== 'plum');
  $('.feed-scrollable').toggleClass('instant', fromPlum);

  var toPlum = (lastTab !== 'plum') && (tab === 'plum');
  $('.feed-scrollable').toggleClass('delayed', toPlum);
}

Template.plum.helpers({
  isActiveTab: function(name) {
    return Session.equals(TAB_KEY, name);
  },
  activeTabClass: function() {
    return Session.get(TAB_KEY);
  },
  bookmarked: function() {
    return Meteor.user() && _.include(Meteor.user().bookmarkedPlumNames, this.title);
  },
  activities: function() {
    return Activities.find({plumName: this.title}, {sort: {date: -1}});
  }
});

Template.plum.events({
  'click .js-add-bookmark': function(event) {
    event.preventDefault();

    if (! Meteor.userId())
      return Overlay.open('authOverlay');
    
    Meteor.call('bookmarkPlum', this.title);
  },

  'click .js-remove-bookmark': function(event) {
    event.preventDefault();

    Meteor.call('unbookmarkPlum', this.title);
  },
  
  'click .js-show-plum': function(event) {
    event.stopPropagation();
    Template.plum.setTab('make')
  },
  
  'click .js-show-feed': function(event) {
    event.stopPropagation();
    Template.plum.setTab('feed')
  },
  
  'click .js-uncollapse': function() {
    Template.plum.setTab('plum')
  },

  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});