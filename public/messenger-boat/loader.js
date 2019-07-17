// Loader of Messenger boat
// This will be written in Vanilla Javascript for compatibilty in any website

var xhr = new XMLHttpRequest();
xhr.open('GET', '/messenger-boat-load');
xhr.send(null);

xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        
        var messenger_boat_script = document.createElement('script');
        messenger_boat_script.src = '/messenger-boat/scripts.js';
        document.getElementsByTagName('head')[0].appendChild(messenger_boat_script);

        document.body.innerHTML += (xhr.responseText); // 'This is the returned text.'
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  };