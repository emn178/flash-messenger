/*!
 * [flash-messenger]{@link https://github.com/emn178/flash-messenger}
 *
 * @version 0.2.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2016
 * @license MIT
 */
(function ($) {
  'use strict';

  var OPTIONS = ['type', 'time', 'sticky', 'fadeOut', 'closable', 'scrollTo', 'html'];
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
      closable: true,
      scrollTo: true,
      html: false
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

  var container, encorder = $('<div/>'), screenHeight, screenWidth;
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
    if (!options.html) {
      message = htmlEncode(message);
    }
    var div = $(setting.message.replace('{message}', message).replace('{type}', options.type)).appendTo(container);
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
    if (options.scrollTo) {
      var rect = div[0].getBoundingClientRect();
      if (rect.top < 0 || rect.top > screenHeight) {
        div[0].scrollIntoView();
      }
    }
  }

  function resize() {
    screenHeight = window.innerHeight || document.documentElement.clientHeight;
    screenWidth = window.innerWidth || document.documentElement.clientWidth;
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

  $(window).resize(resize);

  $(document).ready(resize).bind('ready page:load', function () {
    if (!container) {
      container = $(setting.container);
    }
    $(setting.appendTo).append(container);
    if (setting.window) {
      window.flash = setting.window.flash;
    }
  });
})(jQuery);
