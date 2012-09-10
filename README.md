time
====
Parses time input with no relation to dates,
with the option to convert to the next immediate corresponding Date.

Built for [Promt](http://promtapp.com).

Parses strings such as "8:20" into a Date-less Time.

    new Time('1')    // 1:00
    new Time('1:23') // 1:23

If you fancy it, you can use safely drop the 'new'.

    Time('1.23') // 1:23
    Time('123')  // 1:23

Converts Time into the next corresponding JavaScript Date.

    // assume it's 3:15 pm Aug 10
    Time('3:15').nextDate() // 3:15 pm Aug 10
    Time('415').nextDate()  // 4:15 pm Aug 10
    Time('2').nextDate()    // 2:00 am Aug 11

Does validation statically...

    Time.isValid('8:00')  // true
    Time.isValid('12:60') // false
    Time.isValid('13:23') // false

... or after contruction.

    Time('1').isValid()       // true
    Time('12.0').isValid()    // false
    Time('12:202').isValid()  // false


Periods (am/pm) and military time are not supported, but probably will be.

Test
----

    $ npm test

