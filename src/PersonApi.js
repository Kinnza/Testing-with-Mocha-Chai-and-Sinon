/**
 * Created by kinneretzin on 7/29/15.
 */


var PersonApi = {
    getById: function(id,callback) {
        setTimeout(function(){
            var fetchedPerson = {firstName: 'Jane',lastName: 'Doe', age: 42};
            callback(fetchedPerson);
        },100);
    },
    getAll: function(callback) {
        setTimeout(function(){
            var list = [];
            list.push({firstName: 'Jane',lastName: 'Doe', age: 33});
            list.push({firstName: 'John',lastName: 'Doe', age: 32});
            list.push({firstName: 'John',lastName: 'Smith', age: 31});
            list.push({firstName: 'James',lastName: 'Bond', age: 30});
            list.push({firstName: 'Jane',lastName: 'Austin', age: 29});
            callback(list);
        },100);
    },
    save: function(id,callback){
        setTimeout(function(){
            callback({message: 'Data was saved successfully'});
        },100);
    }
};

module.exports = PersonApi;

