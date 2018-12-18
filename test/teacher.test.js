var request = require('supertest')
var teacher = require('../routes/students');
var jwt = require('jsonwebtoken')
const config  = require('../config.js'); // get our config file

describe('GET Teacher', function(){
    it("returns status 200", function(done) {
        request(teacher).get("/")
            .expect(200);
        done();
      });
});

describe('POST Teacher', function(){
    it("returns status 201", function(done){
        request(teacher).post("/")
            .expect(201);
        done();
    })
})

describe('RESEARCH on Teacher by Teacher Id', function(){
  it("returns status 500", function(done){
      request(teacher).get("/aaaa")
          .expect(500);
      done();
  })
  it("returns status 200",function(done){
      request(teacher).get("/5c07d66106ea3145c4b9bc1c")
          .expect(200);
      done();
  })
})

describe('DELETE Teacher', function(){
    it("returns status 200", function(done){
        request(teacher).delete("/")
            .expect(200);
        done();
    })
    after(function(){
        process.exit(0)
    })

})