const assert =require('chai').assert;
const student = require('../routes/students');

describe('Student', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(student(), 'qualcosa');
    });
});