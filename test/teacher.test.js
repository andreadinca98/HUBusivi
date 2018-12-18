const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config  = require('../config.js'); // get our config file
const app     = require('../app');

test('app module should be defined', () => {
  expect(app).toBeDefined();
});

/*describe('Protected API /api/v2/teachers', () => {

  // Moking User.findOne method
  let userSpy;

  beforeAll(() => {
    const User = require('');
    userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
      return {
        id: 1212,
        name: 'John'
      };
    });
  });

  afterAll(() => {
    userSpy.mockRestore();
  });
  */
  test('GET /api/v2/teachers/:teacherId should return 200', async () => {
    const response = await request(app).get('/api/v2/teachers');
    expect(response.statusCode).toBe(200);
  });
/*
  test('GET /api/v1/users/me?token=<invalid> should return 403', async () => {
    const response = await request(app).get('/api/v1/users/me?token=123456');
    expect(response.statusCode).toBe(403);
  });

  // create a valid token
  var payload = {
    id: 1212,
    name: 'John',
    admin: true
  }
  var options = {
    expiresIn: 86400 // expires in 24 hours
  }
  var token = jwt.sign(payload, config.superSecret, options);
      
  test('GET /api/v1/users/me?token=<valid> should return 200', async () => {
    const response = await request(app).get('/api/v1/users/me?token='+token);
    expect(response.statusCode).toBe(200);
  });

  test('GET /api/v1/users/me?token=<valid> should return user information', async () => {
    const response = await request(app).get('/api/v1/users/me?token='+token);
    const user = response.body;
    expect(user).toBeDefined();
    expect(user.id).toBe(1212);
    expect(user.name).toBe('John');
  });
});



/*var request = require('supertest')
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

})*/