time.js
=======

Parses time input with no relation to dates,
with the option to convert to the next immediate corresponding Date.

Built for [Promt](http://promtapp.com), to solve [this problem](http://stackoverflow.com/q/141348/962091).

**Browser**
 
```
$ bower install time-js # or just manually download time.js
```
```html
<script src="component/time-js/time.js"></script>
```
```js
var t = Time('2p');
t.hours();             // 2
t.minutes();           // 0
t.period();            // 'pm'
t.toString();          // '2:00 pm'
t.nextDate();          // Sep 10 2:00 (assuming it is 1 o'clock Sep 10)
t.format('hh:mm AM')   // '02:00 PM'
t.isValid();           // true
Time.isValid('99:12'); // false
```

**Node**

```
$ npm install time-js
```
```js
var time = require('time');
time('2');
// you get the idea, or see below for more ideas
```

Examples
--------
Some example uses can be viewed in examples.html.

Parses strings such as "8:20" into a Date-less Time.

```js
new Time('1')    // 1:00
new Time('1:23') // 1:23
```

If you fancy it, you can use safely drop the 'new'.

```js
Time('1.23') // 1:23
Time('123')  // 1:23
```

am/pm can optionally be specified.

```js
Time('8:30 pm') // 8:30 pm
Time('3p')      // 3:00 pm
Time('3 A.M.')  // 3:00 am
```

Converts Time into the next corresponding JavaScript Date.

```js
// assume it's 3:15 pm Aug 10
Time('415').nextDate()  // 4:15 pm Aug 10
Time('2').nextDate()    // 2:00 am Aug 11
Time('2 pm').nextDate() // 2:00 pm Aug 11
```

Does validation statically...

```js
Time.isValid('8:00')  // true
Time.isValid('12:60') // false
Time.isValid('13:23') // false
```

... or after construction.

```js
Time('1').isValid()      // true
Time('12.0').isValid()   // false
Time('12:202').isValid() // false
```

There's basic formatting

```js
Time('2:30p').format('hh:mm A'); // '02:30 P'
Time('12 am').format('h: p');    // '12 a'
Time('220 a').format('h: p');    // '2:20 a'
Time('7').format('h: p');        // '7'
```

Accepts numbers too.

```js
Time(1).isValid() // true
```

*Military time is not supported, but may be in the future (or not).*

Test
----

```
$ npm test
```

