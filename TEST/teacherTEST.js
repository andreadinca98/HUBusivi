const assert =require('chai').assert;
const teacher = require('../teacher');

describe('Teacher', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(teacher(), 'qualcosa');
    });
});