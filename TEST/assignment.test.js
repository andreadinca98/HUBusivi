var request = require('supertest')
var assignment = require('../routes/assignment');

describe('GET Assignment', function(){
    it("returns status 200", function(done) {
        request(assignment).get("/")
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
