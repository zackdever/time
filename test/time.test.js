time = require('../time');

var hours=[], minutes=[], periods=[];

for (var i = 1; i < 13; i++) hours.push(i.toString());
for (var i = 0; i < 60; i++) minutes.push(('0' + i).slice(-2));

describe('Time', function() {
  describe('#isValid', function() {
    it('should pass all the hours 1-12', function() {
      var hour, result;
      for (var i = 0; i < hours.length; i++) {
        hour = hours[i];
        result = time(hour);
        result.isValid().should.be.ok;
        result.hours.should.equal(parseInt(hour));
        result.minutes.should.equal(0);
      }
    });

    it('should fail made up hours e.g. 0, 13, 50', function() {
      time('0').isValid().should.not.be.ok;
      time('13').isValid().should.not.be.ok;
      time('50').isValid().should.not.be.ok;
    });

    it('should fail made up hours e.g. 0:20, 13:12, 50:00', function() {
      time('0:20').isValid().should.not.be.ok;
      time('13:12').isValid().should.not.be.ok;
      time('50:00').isValid().should.not.be.ok;
    });

    it('should pass all the hours with all the minutes 1:00 - 12:59', function() {
      var hour, minute, result, input;
      for (var i = 0; i < hours.length; i++) {
        for (var j = 0; j < minutes.length; j++) {
          hour = hours[i];
          minute = minutes[j];
          input = hour + ':' + minute;
          result = time(input);
          result.isValid().should.be.ok;
          result.hours.should.equal(parseInt(hour));
          result.minutes.should.equal(parseInt(minute));
        }
      }
    });

    it('should pass all the times without the colon 100 - 1259', function() {
      var hour, minute, result, input;
      for (var i = 0; i < hours.length; i++) {
        for (var j = 0; j < minutes.length; j++) {
          hour = hours[i];
          minute = minutes[j];
          result = time(hour + minute);
          result.isValid().should.be.ok;
          result.hours.should.equal(parseInt(hour));
          result.minutes.should.equal(parseInt(minute));
        }
      }
    });

    it('should fail made up minutes e.g. 1:3, 1:60, 1:122', function() {
      time('1:3').isValid().should.not.be.ok;
      time('1:60').isValid().should.not.be.ok;
      time('1:122').isValid().should.not.be.ok;
      time('12:99').isValid().should.not.be.ok;
      time('12:021').isValid().should.not.be.ok;
      time('12:218').isValid().should.not.be.ok;
    });

    it('should fail made up minutes without the colon e.g. 13, 160', function() {
      time('14').isValid().should.not.be.ok;
      time('160').isValid().should.not.be.ok;
      time('1299').isValid().should.not.be.ok;
      time('12021').isValid().should.not.be.ok;
      time('12218').isValid().should.not.be.ok;
    });
  });
});
