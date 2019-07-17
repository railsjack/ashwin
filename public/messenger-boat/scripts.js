// Messenber Boat Class in Javascript
// This will be written in Vanilla Javascript for compatibilty in any website
var MB = (function(){
    var _bind = function(obj){
        obj.removeClass = function(className){
            this.className = this.className.replace(new RegExp(className, 'gi'), '');
            return this;
        }.bind(obj);
        obj.addClass = function(className){
            if (this.className.indexOf(className) === -1 ){
                this.className += ' ' + className;
            }
            return this;
        }.bind(obj);
        obj.toggleClass = function(className){
            if (this.className.indexOf(className) === -1 ){
                this.className += ' ' + className;
            } else {
                this.removeClass(className);
            }
            return this;
        }.bind(obj);
        obj.hasClass = function(className){
            return this.className.indexOf(className) > -1;
        }.bind(obj);
        obj.bindEvents = function(eventName, handler){
            this.addEventListener(eventName, handler, false);
        }.bind(obj);
        return obj;
    };
    var _boatWindow = function(){return _bind(document.querySelector('.messenger-boat'))}
    var _boatForm = function(){return _bind(document.querySelector('.messenger-boat form'))}
    var _toggle = function(){
        var _win = _boatWindow();
        _win.toggleClass('expand');
        if (_win.hasClass('expand')){
            _startChat();
        }
    };
    var _startChat = function(){  };
    var _init = function(){
        _boatForm().bindEvents('submit', function(event){ event.preventDefault(); return false; });
    };
    return {
        toggle: _toggle,
        init: _init
    };
})();
MB.init();