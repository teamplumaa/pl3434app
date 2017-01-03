Contests = new Mongo.Collection('contests');

Contests.allow({
  insert: function(userId) {
    var user = Meteor.users.findOne(userId);
    return user && user.admin;
  }
});

ContestSchema = new SimpleSchema({
	contestimage: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'cloudinary'
      }
    }
	},

	title: {
		type: String,
		label: "Title"
	},

	description: {
		type: String,
		label: "Description"
	},

	sponsor: {
		type: String,
		label: "Sponsor"
	},

	aboutsponsor: {
		type: String,
		label: "About Sponsor"
	},

	sponsorswebsite: {
		type: String,
		label: "Website"
	},

	sponsorlogo: {
      type: String,
      autoform: {
        afFieldInput: {
          type: 'cloudinary'
        }
      }
	},

	deadline: {
		type: Date,
		label: "Deadline"
	}
});

Contests.attachSchema( ContestSchema );
