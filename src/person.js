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
    //setTimeout(function(){
    //    var fetchedPerson = new Person('Jane','Doe');
    //    callback(fetchedPerson);
    //},100);
};

Person.fetchAll = function(callback) {
    PersonApi.getAll(function(data){
        var list = [];
        for (var i=0;i<data.length;++i){
            list.push(new Person(data.firstName,data.lastName,data.age));
        }
        callback(list);

    });
    //// Will simulate fetching person data from server
    //setTimeout(function(){
    //    var list = [];
    //    list.push(new Person('Jane','Doe',33));
    //    list.push(new Person('John','Doe',32));
    //    list.push(new Person('John','Smith',31));
    //    list.push(new Person('James','Bond',30));
    //    list.push(new Person('Jane','Austin',29));
    //    callback(list);
    //},100);
};

Person.prototype.save = function() {
    return Q.Promise(function(resolve, reject, notify) {
        PersonApi.save(this.id,function(response){
            resolve({message: response.message});
        });
        //// Will simulate saving this person's data in the server, will return a success method
        //setTimeout(function(){
        //    resolve({message: 'Data was saved successfully'});
        //},100);

    });
};


module.exports = Person;

