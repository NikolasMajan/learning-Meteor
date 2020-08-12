Accounts.onCreateUser (function(options, user){
  //make sure that the user has a profile object
  user.profile  = user.profile || {};

  //initiate follow to keep tracj of who they Follow
  user.profile.follow = [];

  return user;
});
