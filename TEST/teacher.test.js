var request = require('supertest')
var teacher = require('../routes/students');

describe('GET Teacher', function(){
    it("returns status 200", function(done) {
        request(teacher).get("/")
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
