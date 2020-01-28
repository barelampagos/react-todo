var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
	it('Should exist', () => {
		expect(AddTodo).toExist();
	});

	it('Should call onAddTodo if valid Todo entered', () => {
		var todoText = 'Walk dog';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />);

		var $el = $(ReactDOM.findDOMNode(addTodo));
		addTodo.refs.todoText.value = todoText;

		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toHaveBeenCalledWith(todoText);
	});

	it('Should NOT call onAddTodo if invalid Todo entered', () => {
		var todoText = '';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />);

		var $el = $(ReactDOM.findDOMNode(addTodo));
		addTodo.refs.todoText.value = todoText;

		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	});
});
