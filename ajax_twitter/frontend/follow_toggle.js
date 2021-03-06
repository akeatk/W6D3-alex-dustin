const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor($el) {
    this.$el = $el;
    this.userId = $el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.disabled = false;
    this.render();
    this.handleClick();
  }
  render() {
    if(!this.disabled) {
      if (this.followState) {
        this.$el.text('Unfollow!');
      } else {
        this.$el.text('Follow!');
      }
    }
  }
  changeState() {
    this.followState = !this.followState;
    this.disabled = false;
    this.$el.removeProp('disabled');
    this.render();
  }
  handleClick() {
    this.$el.on('click', (e) => {
      this.disabled = true;
      this.$el.prop('disabled', 'disabled');
      e.preventDefault();
      if(this.followState) {
        APIUtil.unfollowUser(this.userId).then(()=>this.changeState());
      } else {
        APIUtil.followUser(this.userId).then(()=>this.changeState());
      }
    });
  }
}

module.exports = FollowToggle;