time
====
Parses time input with no relation to dates,
with the option to convert to the next immediate corresponding Date.

Built for [Promt](http://promtapp.com).

*Browser*

    <script src="time.js"></script>
    <script>
      var t = Time('2');
      t.hours      // 2
      t.minutes    // 0
      t.toString() // '2:00'
      t.nextDate() // Sep 10 2:00 (assuming it is 1 o'clock Sep 10)
    </script>

*Node*

    var time = require('time');
    time('2');

Examples
--------
Some example uses with input boxes can be viewed in examples.html.

Parses strings such as "8:20" into a Date-less Time.

    new Time('1')    // 1:00
    new Time('1:23') // 1:23

If you fancy it, you can use safely drop the 'new'.

    Time('1.23') // 1:23
    Time('123')  // 1:23

Converts Time into the next corresponding JavaScript Date.

    // assume it's 3:15 pm Aug 10
    Time('415').nextDate()  // 4:15 pm Aug 10
    Time('2').nextDate()    // 2:00 am Aug 11

Does validation statically...

    Time.isValid('8:00')  // true
    Time.isValid('12:60') // false
    Time.isValid('13:23') // false

... or after contruction.

    Time('1').isValid()      // true
    Time('12.0').isValid()   // false
    Time('12:202').isValid() // false

Accepts numbers too.

    Time(1).isValid() // true

Periods (am/pm) and military time are not supported, but probably will be.

Test
----

    $ npm test

