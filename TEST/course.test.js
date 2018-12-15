var request = require('supertest')
var course = require('../routes/courses');

describe('GET Course', function(){
    it("returns status 200", function(done) {
        request(course).get("/")
            .expect(200);
        done();
      });
});

describe('POST Course', function(){
    it("returns status 201", function(done){
        request(course).post("/")
            .expect(201);
        done();
    })
})

describe('DELETE Course', function(){
    it("returns status 200", function(done){
        request(course).delete("/")
            .expect(200);
        done();
    })
})