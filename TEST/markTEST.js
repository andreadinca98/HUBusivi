const assert =require('chai').assert;
const mark = require('../mark');

describe('Mark', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(mark(), 'qualcosa');
    });
});