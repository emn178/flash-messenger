# flash-messenger
A jQuery plugin provides a simple flash messages and interface.

## Demo
[Default](https://emn178.github.io/flash-messenger/samples/default/)  
[Custom](https://emn178.github.io/flash-messenger/samples/bootstrap/)  
[Switch Methods](https://emn178.github.io/flash-messenger/samples/methods/)

## Download
[Compress JS](https://raw.github.com/emn178/flash-messenger/master/build/flash-messenger.min.js)  
[Compress CSS](https://raw.github.com/emn178/flash-messenger/master/build/flash-messenger.min.css)  
[Uncompress JS](https://raw.github.com/emn178/flash-messenger/master/src/flash-messenger.js)  
[Uncompress CSS](https://raw.github.com/emn178/flash-messenger/master/src/flash-messenger.css)

## Installation
You can also install flash-messenger by using Bower.
```
bower install flash-messenger
```

## Requirements

[jQuery 1.8+](http://jquery.com/)

## Usage
```JavaScript
flash('Messange');
flash('Messange', options);
```

### Options
#### *type: string (default: `success`)*

Sets the message type, it could be: 'error', 'danger', 'info', 'notice', 'success', 'warning', 'alert' in default theme. You can call methods with the same name like `flash.error()`, `flash.alert()`...

#### *time: number (default: `3000`)*

Sets how long the message stay in seconds.

#### *sticky: boolean (default: `false`)*

Sets if the message should be sticky. The default value will be true if type is 'error' or 'danger'.

#### *fadeOut: number (default: `1000`)*

Sets the duration to fade out in seconds.

#### *closable: boolean (default: `true`)*

Sets the message can be closed or not.

#### *scrollTo: boolean (default: `true`)*

Scroll to message position if true.

### Default Setting
You can change default setting.
```JavaScript
flash.setting = {
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
    scrollTo: true
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
```

## Example
```JavaScript
flash('Messange');
flash('Messange', {type: 'error'});
flash.error('Message');
flash.info('Message', {sticky: true});
```

## Custom
```JavaScript
flash.setting.method = function (message, options) {
  // overwrite implementation
};
```

## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/flash-messenger  
Author: Chen, Yi-Cyuan (emn178@gmail.com)
