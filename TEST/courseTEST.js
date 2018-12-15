const assert =require('chai').assert;
const course = require('../routes/courses');

describe('Course', function(){
    it('Dovrebbe ritornare....', function(){
        assert.equal(course(), 'qualcosa');
    });
});

//rispondono tutti 200
