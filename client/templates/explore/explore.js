var FEATURED_COUNT = 4;

Template.explore.helpers({
  // selects FEATURED_COUNT number of plums at random
  featuredPlums: function() {
    var plums = _.values(PlumsData);
    var selection = [];
    
    for (var i = 0;i < FEATURED_COUNT;i++)
      selection.push(plums.splice(_.random(plums.length - 1), 1)[0]);

    return selection;
  },
  
  activities: function() {
    return Activities.latest();
  },
  
  latestNews: function() {
    return News.latest();
  }
});