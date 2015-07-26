/**
 * Created by kinneretzin on 7/26/15.
 */

var Q = require('q');

var Person = function(firstName,lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
};


Person.prototype.getFullName = function() {
    return this.firstName+ ' ' + this.lastName;
};

Person.fetchPerson = function(id,callback) {
    // Will simulate fetching person data from server
    setTimeout(function(){
        var fetchedPerson = new Person('Jane','Doe');
        callback(fetchedPerson);
    },100);
};

Person.prototype.save = function() {
    return Q.Promise(function(resolve, reject, notify) {
        // Will simulate saving this person's data in the server, will return a success method
        setTimeout(function(){
            resolve({message: 'Data was saved successfully'});
        },100);

    });
};
module.exports = Person;

