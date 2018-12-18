var request = require('supertest')
var student = require('../routes/students');
const jwt = require('jsonwebtoken'); 


describe('GET Student', function(){
    it("returns status 200", function(done) {
        request(student).get("/")
            .expect(200);
        done();
      });
});

describe('POST Student', function(){
    it("returns status 201", function(done){
        request(student).post("/")
            .expect(201);
        done();
    })
})

describe('DELETE Student', function(){
    it("returns status 200", function(done){
        request(student).delete("/")
            .expect(200);
        done();
    })
})
 

describe('RESEARCH on Student by Student Id', function(){
    it("returns status 500", function(done){
        request(student).get("/aaaa")
            .expect(500);
        done();
    })
    it("returns status 200",function(done){
        request(student).get("/5c07d66106ea3145c4b9bc1c")
            .expect(200);
        done();
    })
})
