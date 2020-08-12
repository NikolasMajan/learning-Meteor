Template.profileArea.helpers({
  following : function(){
    var user = Meteor.user();    
    return user.profile.follow;
    
  },
  followers : function(){
    var user = Meteor.user();
    var followers = Meteor.users.find({'profile.follow': {$in : [user.username] }});
    return followers;
  }
});
Template.profileArea.events({
  "click .filter-user" : function(event){
    event.preventDefault();
    var selectedUser  = event.target.text;
    Session.set('username' , selectedUser);  
  },
  "click .community" : function(event){
    event.preventDefault();
    Session.set('username' , null);
  }
});
