// Messenber Boat Class in Javascript
// This will be written in Vanila Javascript for compatibilty for any website
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
        return obj;
    };
    var _boatWindow = function(){return _bind(document.querySelector('.messenger-boat'))}
    var _toggle = function(){
        _boatWindow().toggleClass('expand');
    };
    return {
        toggle: _toggle
    };
})();