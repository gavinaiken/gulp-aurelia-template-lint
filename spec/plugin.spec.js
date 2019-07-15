var PassThrough = require('stream').PassThrough
var Vinyl = require('vinyl');

var linter = require('../');

describe('gulp-aurelia-template-lint', function () {
  describe('in streaming mode', function () {

    var html = "<template><require/></template>"

    it('should return exact input', function (done) {
      var stream = linter();
      var fakeStream = new PassThrough();
      var fakeFile = new Vinyl({
        contents: fakeStream
      });
      
      fakeStream.write(new Buffer(html));
      fakeStream.end();
      
      self = this;
      
      stream.on('data', function (file) {  
        expect(file).toBe(fakeFile);                      
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });
  });
});
