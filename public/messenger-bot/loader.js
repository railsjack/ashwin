// Loader of Messenger boat
// This will be written in Vanilla Javascript for compatibilty in any website

var ajax = function () {
  var DONE = 4; // readyState 4 means the request is done.
  var OK = 200; // status 200 is a successful return.
  var xhr = new XMLHttpRequest();

  var _get = function (url, callback, error_callback) {
    xhr.open('GET', url);
    xhr.send(null);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          if(typeof callback === 'function') callback(xhr.responseText);
        } else {
          if(typeof callback === 'function') error_callback(xhr.status);
        }
      }
    };
  };

  var _post = function (url, params, callback, error_callback) {
    xhr.open('POST', url);
    if (params.dataType === 'json') {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
    xhr.send(JSON.stringify(params.data));
    xhr.onreadystatechange = function () {
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          if(typeof callback === 'function') callback(xhr.responseText);
        } else {
          if(typeof callback === 'function') error_callback(xhr.status);
        }
      }
    };
  };

  return {
    get: _get,
    post: _post
  };
}();



ajax.get('/messenger-bot-load', function(response){
  var messenger_bot_script = document.createElement('script');
  messenger_bot_script.src = '/messenger-bot/scripts.js';
  document.getElementsByTagName('head')[0].appendChild(messenger_bot_script);
  document.body.innerHTML += response; // 'This is the returned text.'
});

