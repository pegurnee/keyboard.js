var Keyboard = (function() {
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
    
    var func = commands[e.key];

    if (func) {
      func();
    };
  }

  return Keyboard;
}());
