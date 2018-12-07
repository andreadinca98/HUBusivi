const assert =require('chai').assert;
const course = require('../course');

describe('Course', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(course(), 'qualcosa');
    });
});