Template.bookmarks.helpers({
  plumCount: function() {
    return pluralize(this.length, 'plum');
  }
});