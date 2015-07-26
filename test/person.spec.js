/**
 * Created by kinneretzin on 7/26/15.
 */

var assert = require("assert");
var Person = require('../src/person');

describe('Person tests', function() {
    it('should return check that full name is correct', function () {
        var person = new Person('John','Doe');

        assert.equal(person.getFullName(), 'John Doe');
    });

    it('should get person data from server, and check its right name', function (done) {

        Person.fetchPerson(1,function(person){
            assert.equal(person.getFullName(), 'Jane Doe');
            done();
        });
    });

    it('should save a person\'s data in the server, and check the response message', function () {
        var person = new Person('John','Smith');

        return person.save().then(function(response){
            assert.equal(response.message, 'Data was saved successfully');
        });
    });

});
