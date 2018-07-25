const FollowToggle = require('./follow_toggle.js');

$( () => {
  const buttons = $('button');

  buttons.each((idx, el)=> {
    new FollowToggle($(el));
  });
});