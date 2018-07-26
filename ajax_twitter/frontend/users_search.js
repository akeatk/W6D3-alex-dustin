const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor($el) {
    this.ul = $el.find('ul').eq(0);
    this.input = $el.find('input').eq(0);
    this.handleInput();
  }
  renderResults(jsonReturn) {
    this.ul.children().each((_,  el) => $(el).remove());
    $(jsonReturn).each((_, user) => {
      const button = $(`<button class="follow-toggle" data-user-id="${user.id}" data-initial-follow-state="${user.followed}" type="submit">`);
      const li = $('<li></li>');
      this.ul.append(li);
      li.append(`<a href="../users/${user.id}">${user.username}</a>`);
      li.append(button);
      new FollowToggle(button);
    });
  }
  handleInput() {
    this.input.keyup((e) => {
      APIUtil.searchUsers(this.input.val(), (el) => this.renderResults(el));
    });
  }
}

module.exports = UsersSearch;