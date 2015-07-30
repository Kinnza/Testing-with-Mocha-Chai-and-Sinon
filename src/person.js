/**
 * Created by kinneretzin on 7/26/15.
 */

var Q = require('q');
var PersonApi = require('./PersonApi');

var Person = function(firstName,lastName,age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age || 12;
};


Person.prototype.getFullName = function() {
    return this.firstName+ ' ' + this.lastName;
};

Person.fetchPerson = function(id,callback) {
    // Will simulate fetching person data from server
    PersonApi.getById(id,function(data){
        callback(new Person(data.firstName,data.lastName,data.age));
    });
};

Person.fetchAll = function(callback) {
    PersonApi.getAll(function(data){
        var list = [];
        for (var i=0;i<data.length;++i){
            list.push(new Person(data.firstName,data.lastName,data.age));
        }
        callback(list);

    });
};

Person.prototype.save = function() {
    return Q.Promise(function(resolve, reject, notify) {
        PersonApi.save(this.id,function(response){
            resolve({message: response.message});
        });
    });
};


module.exports = Person;

