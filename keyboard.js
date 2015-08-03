var Keyboard = (function() {
  const CCCOMBO = {
    'nav-up': ['ArrowUp', 'i', 'w'],
    'nav-left': ['ArrowLeft', 'j', 'a'],
    'nav-down': ['ArrowDown', 'k', 's'],
    'nav-right': ['ArrowRight', 'l', 'd'],
    'konami': ['ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a Enter']
  };
  const REVERSE_REVERSE = {
    "0": ")",
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
    "`": "~",
    "-": "_",
    "=": "+",
    "[": "{",
    "]": "}",
    "\\": "|",
    ";": ":",
    "'": "\"",
    ",": "<",
    ".": ">",
    "/": "?"
  };
  const LOWER_NOT_LETTERS = {
    '~': '`',
    '!': '1',
    '@': '2',
    '#': '3',
    '$': '4',
    '%': '5',
    '^': '6',
    '&': '7',
    '*': '8',
    '(': '9',
    ')': '0',
    '_': '-',
    '+': '=',
    '{': '[',
    '}': ']',
    '|': '\\',
    ':': ';',
    '"': "'",
    '<': ',',
    '>': '.',
    '?': '/'
  };
  var commands = [];

  Keyboard = function() {
    document.addEventListener('keypress', keyHandler)
    document.addEventListener('keydown', keyHandler)
    document.addEventListener('keyup', keyHandler)
  };

  Keyboard.prototype.set = function(theKeys, assignFunction) {

    if (Array.isArray(theKeys)) {
      theKeys.forEach(function(key) {
        this.set(key, assignFunction);
      }, this);
    } else {
      var opts = theKeys.split(' ');
      if (opts.length > 1) {
        this.set(opts, assignFunction);

        // opts.forEach(function(key) {
        //   this.set(key, assignFunction);
        // }, this);
      } else {
        // var indivKeys = theKeys.split('+');
        // if (indivKeys.length > 1) {
        //   assignOnAll(indivKeys, assignFunction);
        // } else {
        if (CCCOMBO[theKeys]) {
          // console.log(`dafuq: ${JSON.stringify(theKeys)}`);
          this.set(CCCOMBO[theKeys], assignFunction);
        } else {
          assignWithJust(theKeys, assignFunction);
          // }
          console.log(JSON.stringify(theKeys));
        }
      }
    }
  }

  function assignOnAll(keys, assignFunction) {

  }

  function assignWithJust(key, assignFunction) {
    commands[key] = assignFunction;
  }

  function toMostlyUpperCase(key) {
    return REVERSE_REVERSE[key] || key.toUpperCase();
  }

  function keyHandler(e) {
    if (typeof e.key != 'string') {
      throw "screw everything";
    } else {
      // console.log(e.key);
    }

    if (e.type === 'keypress') {
      var funcIndex = e.key;

      if (e.ctrlKey) {
        funcIndex = `ctrl+${e.shiftKey ? toMostlyUpperCase(funcIndex) : funcIndex}`;
      }
      if (e.metaKey) {
        funcIndex = `meta+${funcIndex}`;
      }
      console.log(funcIndex);
      var func = commands[funcIndex];

      if (func) {
        func();
      }
    }
  }

  return Keyboard;
}());
