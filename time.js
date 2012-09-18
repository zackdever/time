(function() {

  var am = 'am'
    , pm = 'pm'
    , periodRegex = new RegExp('([ap]\\.?(m\\.?)?)', 'i')
    , timeRegex = new RegExp('^(10|11|12|[1-9])(?::|\\.)?([0-5][0-9])?'
                            + periodRegex.source + '?$', 'i');

  // play nice with both node.js and browser
  if (typeof module !== 'undefined' && module.exports) module.exports = Time;
  else window.Time = Time;

  /*
   * Time constructor works with(out) 'new'
   *
   * @time (optional) string or number representing a time.
   *   e.g. 7, 1234, '7', '7:00', '12.14'
   *
   *   If not provided, current time is used.
   */
  function Time(time) {
    if (!(this instanceof Time)) return new Time(time);

    var hours, minutes, period = null;

    if (time) {
      var result = timeRegex.exec(sanitize(time));
      if (result) {
        hours = parseInt(result[1]);
        minutes = result[2] ? parseInt(result[2]) : 0;
        period = parsePeriod(result[3]);
      }
    } else {
      // set to current time
      var d = new Date();
      hours = d.getHours();
      period = hours > 11 ? pm : am;
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      minutes = d.getMinutes();
    }

    // gets or sets hours
    this.hours = function(newHours) {
      if (!newHours) return hours;
      hours = parseInt(newHours);
    }

    // gets or sets minutes
    this.minutes = function(newMinutes) {
      if (!newMinutes) return minutes;
      minutes = parseInt(newMinutes);
    }

    // gets or sets period
    this.period = function(newPeriod) {
      if (!newPeriod) return period;
      period = parsePeriod(newPeriod);
    }
  }

  /*
   * Find the next immediate corresponding Date.
   *
   * Assume it's 3:15 pm Aug 10:
   * Time('3:15').nextDate() // 3:15 pm Aug 10
   * Time('415').nextDate()  // 4:15 pm Aug 10
   * Time('2').nextDate()    // 2:00 am Aug 11
   */
  Time.prototype.nextDate = function () {
    if (!this.isValid()) return null;

    var hours = this.hours() === 12 ? 0 : this.hours(); // uniformly handle am/pm adjustments
    if (this.period() === pm) hours += 12;
    var d = new Date();
    d.setHours(hours);
    d.setMinutes(this.minutes());
    d.setSeconds(0);
    d.setMilliseconds(0);

    // if it has already passed, add 12 hours at a time until it's in the future
    while (new Date() > d) d.setHours(d.getHours() + 12);

    // make sure we're in the correct period
    if (d.getHours() > 11 && this.period() === am) d.setHours(d.getHours() + 12)
    else if (d.getHours() < 12 && this.period() === pm) d.setHours(d.getHours() + 12)

    return d;
  }

  Time.isValid = function(time) {
    return timeRegex.test(sanitize(time));
  }

  Time.prototype.isValid = function() {
    return Time.isValid(toString(this));
  }

  /*
   * h:mm
   */
  Time.prototype.toString = function() {
    if (!this.isValid()) return 'invalid time'
    return toString(this);
  }

  /*
   * (private) Format Time into hh:mm for validation test.
   *
   * @time Time instance
   * @retun hh:mm e.g. 3:00, 12:23, undefined:undefined
   */
  function toString(time) {
    var minutes = time.minutes() < 10 ? '0' + time.minutes() : time.minutes()
      , result = time.hours() + ':' + minutes;

    return (time.period() == undefined) ? result : result + ' ' + time.period();
  }

  /*
   * (private) Force @time to a string and remove all whitespace.
   *
   * @time input
   * @retun input as a string, with all white space removed
   */
  function sanitize(time) {
    return time.toString().replace(/\s/g, '');
  }

  /*
   * (private)
   */
  function parsePeriod(period) {
    if (!period || !period.match(periodRegex)) return null;
    else if (period.match(/^p/i) != null) return pm;
    return (period.match(/^a/i) != null) ? am : null;
  }
})();
