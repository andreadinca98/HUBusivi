var request = require('supertest')
var mark = require('../routes/marks');

describe('GET Mark', function(){
    it("returns status 200", function(done) {
        request(mark).get("/")
            .expect(200);
        done();
      });
});

