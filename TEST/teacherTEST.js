const assert =require('chai').assert;
const teacher = require('../routes/students');

describe('Teacher', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(teacher(), 'qualcosa');
    });
});