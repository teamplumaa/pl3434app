Template.activity.onRendered(function() {
  var self = this;

  // If the activity is in a list, scroll it into view. Note, we can't just use
  // element.scrollIntoView() because it attempts to scroll in the X direction
  // messing up our animations
  if (Router.current().params.activityId === self.data._id) {
    var $activity = $(self.firstNode);
    var top = $activity.offset().top;
    var $parent = $(self.firstNode).closest('.content-scrollable');
    var parentTop = $parent.offset().top;
    $parent.scrollTop(top - parentTop);
  }
});

Template.activity.helpers({
  firstName: function() {
    return this.userName.split(' ')[0];
  },
  plumTitle: function() {
    return PlumsData[this.plumName].title;
  },
  path: function() {
    return Router.path('plum', { name: this.plumName },
      { query: { activityId: this._id } })
  }
})
