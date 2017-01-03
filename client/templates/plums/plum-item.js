Template.plumItem.helpers({
  // path: function () {
  //   return Router.path('plum', this.plum);
  // },

  plum: function() {
		return Plums.findOne({_id:this.params._id});
	},

  highlightedClass: function () {
    // if (this.size === 'large')
    if (this.featuredtag === 'asdf')
      return 'highlighted';
  },

  bookmarkCount: function () {
    var count = BookmarkCounts.findOne({plumName: this.title});
    return count && count.count;
  }
});
