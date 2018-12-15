var request = require('supertest')
var course = require('../routes/courses');

describe('GET Course', function(){
    it("returns status 200", function(done) {
        request(course).get("/")
            .expect(200);
        done();
      });
});