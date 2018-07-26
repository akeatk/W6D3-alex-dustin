/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax({
      type: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'json'
    });
  },

  unfollowUser: id => {
    return $.ajax({
      type: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'json'
    });
  },
  
  searchUsers: (queryVal, success) => {
    const prom = $.ajax({
      type: 'GET',
      url: `/users/search`,
      dataType: 'json',
      data: {query: queryVal},
    });
    prom.then(success);
  },
  
  createTweet: (data) => {
    return $.ajax({
      type: 'POST',
      url: '/tweets',
      data: data,
      dataType: 'json'
    });
  }
};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

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

/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

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

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose.js */ "./frontend/tweet_compose.js");

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

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");

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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map