/**
 * Created by kinneretzin on 7/26/15.
 */

//var assert = require("assert");

var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');

var Person = require('../src/person');
var PersonApi = require('../src/PersonApi');


describe('Person tests', function() {

    it('should return check that full name is correct', function () {
        var person = new Person('John','Doe');

        assert.equal(person.getFullName(), 'John Doe','Person\'s full name should be John Doe');
    });

    describe('Person fetchAll',function(){
        var mock;

        beforeEach(function() {
            // Define a spy on the method 'getById' in PersonApi
            mock = sinon.mock(PersonApi).expects("getAll").once().callsArgWith(0,[
                    {firstName: 'Jane',lastName: 'Doe', age: 33},
                    {firstName: 'John',lastName: 'Doe', age: 32},
                    {firstName: 'John',lastName: 'Smith', age: 31}
                ]
            );
        });

        afterEach(function() {
            // Restore the function
            PersonApi.getAll.restore();
        });


        it('should check that getAll was called once when calling fetchAll',function(done){
            Person.fetchAll(function(peopleList){

                // Test that everything we expected from the mock happened
                mock.verify();

                done();
            });
        });

    });

    it('should fetch a list of people from the server, and check that the data is ok',function(done){
        Person.fetchAll(function(peopleList){

            assert.lengthOf(peopleList, 5, 'People\'s list length should be 3');
            expect(peopleList[0].age).to.be.a('number','Person\'s age should be a number');

            done();
        });
    });


    describe('Person fetch', function(){
        beforeEach(function() {
            // Define a spy on the method 'getById' in PersonApi
            sinon.spy(PersonApi, "getById");
        });

        afterEach(function() {
            // Restore the function
            PersonApi.getById.restore();
        });

        it('should get person data from server, and check its right name', function (done) {

            Person.fetchPerson(1,function(person){
                assert.equal(person.getFullName(), 'Jane Doe','Fetched person\'s full name should be Jane Doe');


                // Test that getById was called once
                expect(PersonApi.getById.calledOnce).to.be.true;
                expect(PersonApi.getById.getCall(0).args[0]).to.be.a('number');
                expect(PersonApi.getById.getCall(0).args[0]).to.equal(1,'PersonAPI.getById should have been called with first parameter(id) that equals 1');

                done();
            });
        });
    });

    describe('Person save',function(){
        var saveStub;

        beforeEach(function() {
            // Define a spy on the method 'getById' in PersonApi
            saveStub = sinon.stub(PersonApi, "save");
        });
        afterEach(function() {
            // Restore the function
            saveStub.restore();
        });


        it('should save a person\'s data in the server, and check the response message', function () {
            saveStub.callsArgWith(1,{
                message: 'Data was saved successfully'
            });
            var person = new Person('John','Smith');

            return person.save().then(function(response){
                assert.equal(response.message, 'Data was saved successfully','Save message from the server should be "Data was saved successfully"');
            });
        });

        it('Should check what happens if an error is thrown', function () {
            // Set the stub to throw an error
            saveStub.throws(new Error('error'));

            var person = new Person('John','Smith');

            return person.save().then(
                function() {
                    throw(new Error('shouldn\'t reach here'));
                },
                function(err){
                    expect(err).to.exist;
                    expect(err).to.be.an.instanceof(Error);
                }
            ).fail(function(){
                throw(new Error('shouldn\'t reach here'));
            });
        });

    });
});
