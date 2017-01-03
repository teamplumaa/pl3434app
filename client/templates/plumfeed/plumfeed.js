Template.plumfeed.helpers({
	plums: function() {
		return Plums.find();
	},

  // userAvatar: function() {
  //   avatar = Meteor.users.findOne(this.userId, {fields: {'services.twitter.profile_image_url_https'}});
  //   return avatar;
  // }
});
