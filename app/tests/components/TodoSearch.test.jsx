var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

//var TodoSearch = require('TodoSearch');
import { TodoSearch } from 'TodoSearch';

describe('TodoSearch', () => {
	it('Should exist', () => {
		expect(TodoSearch).toExist();
	});

	it('Should dispatch SET_SEARCH_TEXT with entered input text', () => {
		var searchText = 'Dog';
		var spy = expect.createSpy();
		var todoSearch = TestUtils.renderIntoDocument(
			<TodoSearch dispatch={spy} />
		);

		var action = {
			type: 'SET_SEARCH_TEXT',
			searchText
		};

		todoSearch.refs.searchText.value = searchText;
		TestUtils.Simulate.change(todoSearch.refs.searchText);
		expect(spy).toHaveBeenCalledWith(action);
	});

	it('Should dispatch TOGGLE_SHOW_COMPLETED with proper checked value', () => {
		var spy = expect.createSpy();
		var todoSearch = TestUtils.renderIntoDocument(
			<TodoSearch dispatch={spy} />
		);

		todoSearch.refs.showCompleted.checked = true;
		TestUtils.Simulate.change(todoSearch.refs.showCompleted);

		var action = {
			type: 'TOGGLE_SHOW_COMPLETED'
		};

		expect(spy).toHaveBeenCalledWith(action);
	});
});
