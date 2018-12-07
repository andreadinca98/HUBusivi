const assert =require('chai').assert;
const student = require('../student');

describe('Student', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(student(), 'qualcosa');
    });
});