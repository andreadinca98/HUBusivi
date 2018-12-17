var request = require('supertest')
var assignment = require('../routes/assignment');

describe('GET Assignment', function(){
    it("returns status 200", function(done) {
        request(assignment).get("/")
            .expect(200);
        done();
      });
});

describe('POST Assignment', function(){
    it("returns status 201", function(done){
        request(assignment).post("/")
            .expect(201);
        done();
    })
})

describe('DELETE Assignment', function(){
    it("returns status 200", function(done){
        request(assignment).delete("/")
            .expect(200);
        done();
    })
})