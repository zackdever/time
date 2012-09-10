time
====
Parses time input with no relation to dates,
with the option to convert to the next immediate corresponding Date.

Built for [Promt](http://promtapp.com).

Parses strings such as "8:20" into a Date-less Time.

    Time.parse('1')    // { hours: 1, minutes: 0 }
    Time.parse('1:23') // { hours: 1, minutes: 23 }
    Time.parse('1.23') // { hours: 1, minutes: 23 }
    Time.parse('123')  // { hours: 1, minutes: 23 }

Converts Time into the next corresponding JavaScript Date.

    // assume it's 3:15 pm Aug 10
    Time.parseToDate('3:15') // 3:15 pm Aug 10
    Time.parseToDate('415')  // 4:15 pm Aug 10
    Time.parseToDate('2')    // 2:00 am Aug 11

Does simple validation.

    Time.isValid('1')       // true
    Time.isValid('1.20')    // true
    Time.isValid('8:00')    // true
    Time.isValid('12.0')    // false
    Time.isValid('12:202')  // false
    Time.isValid('12:60')   // false
    Time.isValid('13:23')   // false

Periods (am/pm) and military time are not supported, but probably will be.

Test
----

    $ npm test

