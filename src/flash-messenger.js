/*!
 * [flash-messenger]{@link https://github.com/emn178/flash-messenger}
 *
 * @version 0.1.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2016
 * @license MIT
 */
(function ($) {
  'use strict';

  var OPTIONS = ['type', 'time', 'sticky', 'fadeOut', 'closable'];
  var TYPES = ['error', 'danger', 'info', 'notice', 'success', 'warning', 'alert'];

  var setting = {
    appendTo: 'body',
    container: '<div class="flash-messages"></div>',
    message: '<div class="flash-message {type}">{message}<span class="flash-message-close">&#10006</span></div>',
    closeHandler: '.flash-message-close',
    default: {
      type: 'success',
      time: 3000,
      sticky: false,
      fadeOut: 1000,
      closable: true
    },
    typesDefault: {
      error: {
        sticky: true
      },
      danger: {
        sticky: true
      }
    }
  };

  var container, encorder = $('<div/>');
  function htmlEncode (message) {
    return encorder.text(message).html();
  }

  function formatOptions(options) {
    var typesDefault = setting.typesDefault[options.type];
    if (typesDefault) {
      $.extend(options, $.extend({}, typesDefault, options));
    }
    OPTIONS.forEach(function (key) {
      var value = options[key];
      options[key] = value === undefined ? setting.default[key] : value;
    });
    if (setting.convert) {
      setting.convert(options);
    }
  }

  function show(message, options) {
    options = options || {};
    formatOptions(options);
    var div = $(setting.message.replace('{message}', htmlEncode(message)).replace('{type}', options.type)).appendTo(container);
    var close = function () {
      div.remove();
    };
    if (!options.sticky) {
      div.delay(options.time).fadeOut(options.fadeOut, close);
    }
    if (options.closable) {
      div.find(setting.closeHandler).addBack(setting.closeHandler).bind('click', close);
    } else {
      div.addClass('nonclosable');
    }
  } 

  var flash = function () {
    setting.method.apply(this, arguments);
  };
  flash.setting = setting;
  flash.formatOptions = formatOptions;
  setting.method = flash.defaultMethod = show;
  window.flash = flash;

  TYPES.forEach(function (type) {
    flash[type] = function (message, options) {
      options = options || {};
      options.type = type;
      flash(message, options);
    }
  });

  $(document).on('ready page:load', function () {
    if (!container) {
      container = $(setting.container);
    }
    $(setting.appendTo).append(container);
    if (setting.window) {
      window.flash = setting.window.flash;
    }
  });
})(jQuery);