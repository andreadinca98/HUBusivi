var request = require('supertest')
var course = require('../routes/courses');
var student = require('../routes/students');

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
/*
describe('RESEARCH on Course by Student Id', function(){
    it("returns status 200", function(done){
        request(course).delete("/")
            .expect(200);
        done();
    })
})
*/

describe('RESEARCH on Course by User Id', function(){
    it("returns status 500", function(done){
        request(course).get("/aaaa")
            .expect(500);
        done();
    })
    it("returns status 200",function(done){
        request(course).get("/5c07d66106ea3145c4b9bc1c")
            .expect(200);
        done();
    })
})
