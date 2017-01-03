Plums = new Mongo.Collection( 'plums' );

Plums.allow({
  insert: function(userId) {
		var user = Meteor.users.find(userId);
    return user;
  },
  // update: function(userId, doc) {
		// var user = Meteor.users.findOne(userId);
  //   return user;
  // },
  // remove: function(userId, doc) {
		// var user = Meteor.users.findOne(userId);
  //   return user;
  // },

});

PlumSchema = new SimpleSchema({
  published: {
    type: Boolean,
    label: "Is this plum published?",
    autoValue: function() {
      if ( this.isInsert ) {
        return true;
      }
    },
    autoform: {
      type: "hidden",
    },
  },

  featuredtag: {
    type: String,
    label: "Admin Use",
    max: 40,
  },

  plumImage: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'cloudinary'
      }
    }
	},

  author: {
		type: String,
		label: "Author of the plum",
		autoValue: function(userId) {
      var user = Meteor.users.find(this.userId);
      return Meteor.user().profile.name;
		},
		autoform: {
			type: "hidden",
		}
	},

  updated: {
    type: String,
    label: "The date this plum was last updated on.",
    autoValue: function() {
      return ( new Date() ).toISOString();
    },
    autoform: {
      type: "hidden",
    },
  },

  title: {
    type: String,
    label: "Title",
    max: 40,
  },

  content: {
    type: String,
    label: "Content",
    autoform: {
      rows: 10,
    },
  },

  tags: {
    type: String,
    label: "Tags",
    autoform: {
      type: 'tags',
      // afFieldInput:
      //     # bootstrap-tagsinput,
    },
  }
});

Plums.attachSchema( PlumSchema );
