const assert =require('chai').assert;
const mark = require('../routes/marks');

describe('Mark', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(mark(), 'qualcosa');
    });
});