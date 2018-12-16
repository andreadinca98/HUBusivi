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
    /*
var payload = {
    id: 1212,
    name: 'John',
    admin: true
}
var options = {
    expiresIn: 86400 // expires in 24 hours
}
var token = jwt.sign(payload, config.superSecret, options);
    

describe('GET /api/v1/users/me?token=<valid> should return 200', function(){
it("returns status 200", function(done){
    const response = request(app).get('/api/v2/users/me?token='+token);
    expect(response.statusCode).toBe(200);
    done();
})
});

test('GET /api/v1/users/me?token=<valid> should return user information', async () => {
    const response = await request(app).get('/api/v1/users/me?token='+token);
    const user = response.body;
    expect(user).toBeDefined();
    expect(user.id).toBe(1212);
    expect(user.name).toBe('John');
});
*/