time = require('../time');

describe('Time', function() {
  describe('#format', function() {
    it('should work with no params', function() {
      var t = time('1:23p');
      t.format().should.equal('1:23 pm');
    });

    it('should always require hours', function() {
      var t = time('1.23');
      t.format(':mm').should.equal('invalid format');
    });

    it('should not require a separator', function() {
      var t = time('7:23');
      t.format('hmm').should.equal('723');
      t.format('hhmm').should.equal('0723');
    });

    it('should respect h vs hh', function() {
      var t = time('3:20');
      t.format('h:mm').should.equal('3:20');
      t.format('hh:mm').should.equal('03:20');
    });

    it('should still show hh when hour is > 9', function() {
      var t = time('12:20');
      t.format('h:mm').should.equal('12:20');
    });

    it('should not be case sensitive for hours and minutes', function() {
      var t = time('03:23 pm');
      var expected = '03:23';
      t.format('hh:mm').should.equal(expected);
      t.format('HH:mm').should.equal(expected);
      t.format('Hh:Mm').should.equal(expected);
      t.format('hH:MM').should.equal(expected);
      t.format('H:MM').should.equal('3:23');
    });

    it('should not care if a or p is used for period', function() {
      var t = time('9p');
      t.format('h:mm p.m.').should.equal('9:00 p.m.');
      t.format('h:mm a.m.').should.equal('9:00 p.m.');
    });

    it('should respect case for period', function() {
      var t = time('9p');
      t.format('h p').should.equal('9 p');
      t.format('h P').should.equal('9 P');
      t.format('h Pm').should.equal('9 Pm');
      t.format('h a.m.').should.equal('9 p.m.');
    });

    it('should respect space between period', function() {
      var t = time('12am');
      t.format('h:mm pm').should.equal('12:00 am');
      t.format('h:mmam').should.equal('12:00am');
      t.format('h a.').should.equal('12 a.');
      t.format('hP').should.equal('12A');
    });

    it('should ignore period if not originally parsed', function() {
      var t = time('1');
      t.format('hpm').should.equal('1');
      t.format('h:mm PM').should.equal('1:00');
    });

    it('should hide period if not requested', function() {
      var t = time('1p');
      t.format('h').should.equal('1');
      t.format('h:mm').should.equal('1:00');
    });

    it('should hide minutes if just an hour is given', function() {
      var t = time('12');
      t.format('h').should.equal('12');
      t = time('12:23');
      t.format('h').should.equal('12');
    });

    it('should show auto-hide minutes if they are omitted but a middlebit \
       is supplied', function() {
      var t = time('12 pm');
      t.format('h:').should.equal('12');
      t.format('h:A').should.equal('12P');
      t = time('12:23 pm');
      t.format('h:').should.equal('12:23');
      t.format('h.').should.equal('12.23');
      t.format('h.P').should.equal('12.23P');
    });

    it('should respect periods on period e.g. a.m. vs am', function() {
      var t = time('7p');
      t.format('h:mm a').should.equal('7:00 p');
      t.format('h:mm a.').should.equal('7:00 p.');
      t.format('h:mm a.m.').should.equal('7:00 p.m.');
      t.format('h:mm am').should.equal('7:00 pm');
      t.format('h:mm am.').should.equal('7:00 pm.');
      t.format('h:mm a.m').should.equal('7:00 p.m');
    });

    it('should allow for only first letter of period', function() {
      var t = time('10:55 PM');
      t.format('hh:mm A').should.equal('10:55 P');
      t.format('hh:mm AM').should.equal('10:55 PM');
    });

    it('should only allow blank, period, or colon for seperator', function() {
      var t = time('323');
      t.format('hmm').should.equal('323');
      t.format('h:mm').should.equal('3:23');
      t.format('h.mm').should.equal('3.23');
      t.format('h,mm').should.equal('invalid format');
    });

    it('should not allow a single minute', function() {
      var t = time('12:30');
      t.format('h:m').should.equal('invalid format');
    });
  });
});
