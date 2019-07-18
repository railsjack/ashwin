// Messenber Boat Class in Javascript
// This will be written in Vanilla Javascript for compatibilty in any website
var MB = (function () {
    var _bind = function (obj) {
        obj.removeClass = function (className) {
            this.className = this.className.replace(new RegExp(className, 'gi'), '');
            return this;
        }.bind(obj);
        obj.addClass = function (className) {
            if (this.className.indexOf(className) === -1) {
                this.className += ' ' + className;
            }
            return this;
        }.bind(obj);
        obj.toggleClass = function (className) {
            if (this.className.indexOf(className) === -1) {
                this.className += ' ' + className;
            } else {
                this.removeClass(className);
            }
            return this;
        }.bind(obj);
        obj.hasClass = function (className) {
            return this.className.indexOf(className) > -1;
        }.bind(obj);
        obj.bindEvents = function (eventName, handler) {
            this.addEventListener(eventName, handler, false);
        }.bind(obj);
        return obj;
    };
    var _botWindow = function () { return _bind(document.querySelector('.messenger-bot')) }
    var _botForm = function () { return _bind(document.querySelector('.messenger-bot form')) }
    var _contentBox = function () { return _bind(document.querySelector('.messenger-bot .content')) }
    var _messageBox = function () { return _bind(document.querySelector('.messenger-bot .content .messages')) }
    var _toggle = function () {
        var _win = _botWindow();
        _win.toggleClass('expand');
        if (_win.hasClass('expand')) {
            if (!onceStarted) _startChat();
        }
    };
    var onceStarted = false;
    var messageStatus = '';
    var _startChat = function () {
        onceStarted = true;
        _botForm().elements['text'].focus();
        ajax.post('/messenger-bot-message',
            {
                dataType: 'json',
                data: { message_type: 'start', message: '' }
            }
            , function (xhr) {
                var xhr = JSON.parse(xhr);
                var messageNode = document.createElement('li');
                messageNode.innerHTML = '<span class="bot">' + xhr.response + '</span><span class=clearfix></span>';
                _messageBox().appendChild(messageNode);
                messageStatus = 'ASKING_NAME';
            });
    };

    var _handleSubmit = function (event) {
        var message = this.text.value;
        var messageNode = document.createElement('li');
        messageNode.innerHTML = '<span class="me">' + message + '</span><span class=clearfix></span>';
        _messageBox().appendChild(messageNode);
        _contentBox().scrollTo(0, 100000);


        var message_callback = function (xhr) {
            var xhr = JSON.parse(xhr);
            var messageNode = document.createElement('li');
            if (xhr.response) {
                messageNode.innerHTML = '<span class="bot">' + xhr.response + '</span><span class=clearfix></span>';
                _messageBox().appendChild(messageNode);
                _contentBox().scrollTo(0, 100000);
            }
            messageStatus = this.status;
        };

        switch (messageStatus) {
            case 'ASKING_NAME':
                ajax.post('/messenger-bot-message',
                    {
                        dataType: 'json',
                        data: { message_type: 'ANSWER_NAME', message: message }
                    }
                    , message_callback.bind({ status: 'ASKING_BIRTHDAY' }));
                break;
            case 'ASKING_BIRTHDAY':
                ajax.post('/messenger-bot-message',
                    {
                        dataType: 'json',
                        data: { message_type: 'ANSWER_BIRTHDAY', message: message }
                    }
                    , message_callback.bind({ status: 'ASKING_TILLDAYS' }));
                break;
            case 'ASKING_TILLDAYS':
                ajax.post('/messenger-bot-message',
                    {
                        dataType: 'json',
                        data: { message_type: 'ANSWER_TILLDAYS', message: message }
                    }
                    , message_callback.bind({ status: '' }));
                break;
            default:
                ajax.post('/messenger-bot-message',
                    {
                        dataType: 'json',
                        data: { message_type: 'SEND_MESSAGE', message: message }
                    }
                    , message_callback.bind({ status: 'SENDING_MESSAGE' }));
                break;
        }

        this.reset();

        event.preventDefault(); return false;
    };
    var _init = function () {
        _botForm().bindEvents('submit', _handleSubmit);
    };
    return {
        toggle: _toggle,
        init: _init
    };
})();
MB.init();