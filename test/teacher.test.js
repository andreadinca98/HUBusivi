const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config  = require('../config.js'); // get our config file
const app     = require('../app');

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


// create a token
var payload = {
    id: 'fadsa',
    name: 'Bruno Villa'
}
var options = {
    expiresIn: 86400 // expires in 24 hours
}

var token = jwt.sign(payload, config.superSecret, options);

describe('GET /api/v2/teachers/:idTeacher?token=<valid>', function(){
    it("returns status 200", function(done){
        request(teacher).get("/api/v2/teachers/5c17b343e9bb211bd4e3403?token="+token)
            .expect(200);
        done();
    })
    after(function(){
        process.exit(0)
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