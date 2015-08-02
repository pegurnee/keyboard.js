var Keyboard = (function() {
  const CCCOMBO = {
    'nav-up'    : ['ArrowUp',     'i', 'w'],
    'nav-left'  : ['ArrowLeft',   'j', 'a'],
    'nav-down'  : ['ArrowDown',   'k', 's'],
    'nav-right' : ['ArrowRight',  'l', 'd'],
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
        var indivKeys = theKeys.split('+');
        if (indivKeys.length > 1) {
          assignOnAll(indivKeys, assignFunction);
        } else {
          if (CCCOMBO[theKeys]) {
            // console.log(`dafuq: ${JSON.stringify(theKeys)}`);
            this.set(CCCOMBO[theKeys], assignFunction);
          }
          assignWithJust(theKeys, assignFunction);
        }
        console.log(JSON.stringify(indivKeys));
      }
    }
  }

  function assignOnAll(keys, assignFunction) {

  }

  function assignWithJust(key, assignFunction) {
    commands[key] = assignFunction;
  }

  function keyHandler(e) {
    if (typeof e.key != 'string') {
      throw "screw everything";
    } else {
      console.log(e.key);
    }

    if (e.type === 'keypress') {
      var func = commands[e.key];

      if (func) {
        func();
      }
    }
  }

  return Keyboard;
}());
