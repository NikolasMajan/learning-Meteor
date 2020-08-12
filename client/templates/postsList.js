Template.postsList.helpers({
  posts : function(){
    var result;
    if(Session.get('username')){
       result = Post.find({username: Session.get('username')}, {sort :{created: -1}});      
    }else{
        result = Post.find({}, {sort :{created: -1}});

            
    }    
    return result;

  },
  isFollowing : function(post){
    var user = Meteor.user();
    //var isThere = post.count(); 
    var posts = Post.find({postFollowers: {$exists : true}}).fetch();
    for (let i = 0; i< posts.length; i++) {
    var postFollowers = posts[i].postFollowers;
    //console.log(isThere);
    return postFollowers.includes(user.username);    
  }
  }
});

Template.postsList.events({
  "click .follow-link" : function(event){
    event.preventDefault();    
    Meteor.call('follow', this);

  },
  "click .unfollow-link" : function(event){
    event.preventDefault();
    Meteor.call('unfollow', this);
    
  },
  " this.rendered" : function() {
    if(!this._rendered) {
      this._rendered = true;
      console.log('Template onLoad');
    }
}
});
