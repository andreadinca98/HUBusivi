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


describe('RESEARCH on Assignment by User Id', function(){
    it("returns status 500", function(done){
        request(assignment).get("/aaaa")
            .expect(500);
        done();
    })
    it("returns status 200",function(done){
        request(assignment).get("/5c07d66106ea3145c4b9bc1c")
            .expect(200);
        done();
    })
})
