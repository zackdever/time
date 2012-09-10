(function() {
  var root = (typeof exports == 'undefined' ? window : exports);
  var re = /^(10|11|12|[1-9])(?::|\.)?([0-5][0-9])?$/;

  function Time() { }
  root.Time = Time;

  Time.isValid = function(time) {
    return re.test(time);
  };

  Time.parse = function(time) {
    time.replace(' ', '');
    var result = re.exec(time);
    if (!result) return null;

    var minutes = result[2] ? parseInt(result[2]) : 0;
    return { hours: parseInt(result[1]), minutes: minutes};
  };

  Time.parseToDate = function(time) {
    var result = Time.parse(time);
    if (result == null) return null;
    return toDate(result.hours, result.minutes);
  }

  function toDate(hours, minutes) {
    if (hours === 12) hours = 0; // this lets us uniformly handle am/pm adjustments

    var d = new Date();
    d.setMinutes(minutes);
    d.setHours(hours);

    // if it has already passed, add 12 hours at a time until it's in the future
    while (new Date() > d) d.setHours(d.getHours() + 12);

    return d;
  }
})();
