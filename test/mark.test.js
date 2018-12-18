var request = require('supertest')
var mark    = require('../routes/marks');

describe('GET Mark', function(){
    it("returns status 200", function(done) {
        request(mark).get("/")
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

describe('DELETE Marks', function(){
    it("returns status 200", function(done){
        request(mark).delete("/")
            .expect(200);
        done();
    })
})


describe('RESEARCH on Mark by Student Id', function(){
    it("returns status 500", function(done){
        request(mark).get("/aaaa")
            .expect(500);
        done();
    })
    it("returns status 200",function(done){
        request(mark).get("/5c07d66106ea3145c4b9bc1c")
            .expect(200);
        done();
    })
})
