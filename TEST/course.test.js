var request = require('supertest')
var course = require('../routes/courses');

describe('GET Course', function(){
    it("returns status 200", function(done) {
        request(course).get("/")
            .expect(200);
        done();
      });
});

describe('POST Marks', function(){
    it("returns status 201", function(done){
        request(mark).post("/")
            .expect(201);
        done();
    })
})
