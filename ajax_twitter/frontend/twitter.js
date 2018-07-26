const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$( () => {
  const buttons = $('button.follow-toggle');
  
  buttons.each((idx, el)=> {
    new FollowToggle($(el));
  });
  
  const searchBar = $('nav.users-search');
  new UsersSearch(searchBar.eq(0));
  
  const tweetForm = $('form.tweet-compose');
  new TweetCompose(tweetForm.eq(0));
});