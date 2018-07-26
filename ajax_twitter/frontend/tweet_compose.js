const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor ($el) {
    this.$el = $el;
    this.input = $el.find('input[type="submit"]').eq(0);
    this.textArea = $el.find('textarea').eq(0);
  }
  
  submit () {
    this.input.on("submit", (e) => {
      e.preventDefault();
      const data = {
        content: this.textArea.val(),
        mentioned_user_ids: [this.$el.find(`option[selected]`).eq(0)]
      };
      
    });
  }
}

module.exports = TweetCompose;