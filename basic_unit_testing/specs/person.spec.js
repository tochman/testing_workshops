const { use, expect } = require("chai");
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const Person = require('../src/person')
use(sinonChai)
global.expect = expect;


describe('instance of Person', () => {
  subject(() => new Person($options))

  describe('properties on instantiation', () => {

    def('options', () => ({ firstName: 'Jane', lastName: 'Doe', age: 25 }))
    
    it('is expected to be an instance of Person class', () => {
      expect($subject).to.be.instanceOf(Person)
    });

    it(() => is.expected.to.haveOwnProperty('firstName').which.equal('Jane'))
    
    its('firstName', () => is.expected.to.equal('Jane'))

    it('is expected to have property firstName', () => {
      expect($subject)
        .to.haveOwnProperty('firstName')
        .and.equal('Jane')
    });

    it('is expected to have property lastName', () => {
      expect($subject)
        .to.haveOwnProperty('lastName')
        .and.equal('Doe')
    });

    it('is expected to have property age', () => {
      expect($subject)
        .to.haveOwnProperty('age')
        .and.equal(25)
    });
  });

  describe('property setters', () => {
    def('options', () => ({}))

    describe('setFirstName', () => {
      it('is expected to respond to setFirstName', () => {
        expect($subject).to.respondTo('setFirstName')
      });

      it('is expected to change the firstName property', () => {
        $subject.setFirstName('Mike')
        expect($subject.firstName).to.equal('Mike')
      });
    });

    describe('setLastName', () => {
      it('is expected to respond to setLastName', () => {
        expect($subject).to.respondTo('setLastName')
      });

      it('is expected to change the firstName property', () => {
        $subject.setLastName('Ochman')
        expect($subject.lastName).to.equal('Ochman')
      });

    });
  });

  describe('dynamic getters', () => {
    describe('fullName', () => {
      def('options', () => ({}))

      it('is expected to respond to fullName', () => {
        expect($subject).to.respondTo('fullName')
      });

      it('is expected to combine firstName with lastName', () => {
        $subject.firstName = "Thomas"
        $subject.lastName = "Ochman"
        expect($subject.fullName()).to.equal('Thomas Ochman')
      });
    });

    describe('fullDetails', () => {
      def('options', () => ({ firstName: 'Jane', lastName: 'Doe', age: 25 }))

      let fullNameSpy, response

      before(() => {
        // 1. set up an observable on the fullName function
        fullNameSpy = sinon.spy($subject, 'fullName')
        response = $subject.fullDetails()
      });
      
      it('is expected to call on fullName', () => {
        // 2. Assert the fullName is being used by fullDetails
        expect(fullNameSpy).to.have.been.calledOnce
      });
      
      it('is expected to return text', () => {
        expect(response).to.equal('Jane Doe, 25 years old')
      });
    });
  });

});