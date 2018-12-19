var request = require('supertest')
var admin = require('../routes/admins');
const jwt = require('jsonwebtoken'); 

describe('GET Admin', function(){
    it("returns status 200", function(done) {
        request(admin).get("/")
            .expect(200);
        done();
      });
});

describe('POST Admin', function(){
    it("returns status 201", function(done){
        request(admin).post("/")
            .expect(201);
        done();
    })
})

describe('DELETE Admin', function(){
    it("returns status 200", function(done){
        request(admin).delete("/")
            .expect(200);
        done();
    })
})

describe('RESEARCH on Admin by Admin Id', function(){
    it("returns status 500", function(done){
        request(admin).get("/aaaa")
            .expect(500);
        done();
    })
    it("returns status 200",function(done){
        request(admin).get("/5c17aa32c540ff2834f8ec15")
            .expect(200);
        done();
    })
})
