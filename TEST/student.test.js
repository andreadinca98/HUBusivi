/*const assert =require('chai').assert;
const student = require('../routes/students');

describe('Student', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(student(), 'qualcosa');
    });
});
*/
var request = require('supertest')
var student = require('../routes/students');

describe('GET Student', function(){
    it("returns status 200", function(done) {
        request(student).get("/")
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
