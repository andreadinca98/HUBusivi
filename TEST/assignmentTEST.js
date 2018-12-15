const assert =require('chai').assert;
const assignment = require('../routes/assignment');

describe('Assignment', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(assignment(), 'qualcosa');
    });
});