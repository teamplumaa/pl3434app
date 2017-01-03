// Images = new FS.Collection("images", {
//   stores: [new FS.Store.FileSystem("images", {path: "~/public/img/uploads"})],
//   filter: {
//     maxSize: 1048576, // in bytes
//     allow: {
//       download: function () {
//       return true;
//       },
//       fetch: null
//       contentTypes: ['image/*'],
//       extensions: ['png']
//     },
//     deny: {
//       contentTypes: ['image/*'],
//       extensions: ['png']
//     },
//     onInvalid: function (message) {
//       if (Meteor.isClient) {
//         alert(message);
//       } else {
//         console.log(message);
//       }
//     }
//   }
// });

// Images = new FS.Collection("images", {
// 	stores: [new FS.Store.FileSystem("images", {path: "~/public/img/uploads"})]
// });


// Images = new FS.Collection("images", {
//   stores: [new FS.Store.GridFS("images", {})]
// 	}
// );


var ImagesFS = new FS.Store.FileSystem("images", {
  path: "~/public/img/uploads/"
});

Images = new FS.Collection("images", {
  stores: [ImagesFS],
  filter: {
    maxSize: 3145728,
    allow: {
  		contentTypes: ['image/*'],
  		extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
	}
   }
});

Images.allow({
  insert: function(userId, doc) {
    var user = Meteor.users.findOne(userId);
    return user;
  },
  download: function(userId, doc) {
    var user = Meteor.users.findOne(userId);
    return user;
  },
  update: function(userId, doc) {
    var user = Meteor.users.findOne(userId);
    return user;
  }
});

ContestsImages = new FS.Collection("contestsImages", {
    stores: [new FS.Store.FileSystem("contestsImages")]
});
ContestsImages.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return true;
    },
    download: function(userId) {
        return true;
    },
    fetch: null
});
