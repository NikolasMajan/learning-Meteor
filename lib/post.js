Post = new Mongo.Collection("post");
Meteor.methods({
    addPost: function(content){
    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized', 'you are not signed in');
    }
    var username = Meteor.user().username;
    Post.insert({
      content: content,
      username: username,
      postFollowers: [] , //keeps track of who's following the post
      created: new Date()});
  },
  follow: function(post){
    user = Meteor.user();

    if(!user){
      throw new Meteor.Error('not-authorized', 'you are not signed in');
    }
    // you can't follow yourself
    // you can't follow someone twice
    if (user.username != post.username && user.profile.follow.indexOf(post.username) == -1){

      Meteor.users.update({_id: user._id}, {$push :{'profile.follow': post.username}});
      Post.update({_id: post._id},{$push: {'postFollowers': user.username}});// Insert user's username into postsFollowers array

    }
  },
  unfollow: function(post){
    user = Meteor.user();

    if(!user){
      throw new Meteor.Error('not-authorized', 'you are not signed in');
    }

    Meteor.users.update({_id: user._id }, { $pull: {'profile.follow': { $in: [ post.username] } } });
    Post.update({_id: post._id},{$pull: {'postFollowers': {$in: [user.username]}}});


  }
})
