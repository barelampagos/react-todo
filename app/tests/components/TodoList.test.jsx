var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var { Provider } = require('react-redux');
var TestUtils = require('react-addons-test-utils');

import { configure } from 'configureStore';
import ConnectedTodoList, { TodoList } from 'TodoList';
import ConnectedTodo, { Todo } from 'Todo';

describe('TodoList', () => {
	it('Should exist', () => {
		expect(TodoList).toExist();
	});

	it('Should render one Todo component for each Todo Item', () => {
		var todos = [
			{
				id: 1,
				text: 'Do a first thing',
				completed: false,
				completedAt: undefined,
				createdAt: 500
			},
			{
				id: 2,
				text: 'Do another thing',
				completed: false,
				completedAt: undefined,
				createdAt: 500
			}
		];

		var store = configure({ todos });
		var provider = TestUtils.renderIntoDocument(
			<Provider store={store}>
				<ConnectedTodoList />
			</Provider>
		);

		var todoList = TestUtils.scryRenderedComponentsWithType(
			provider,
			ConnectedTodoList
		)[0];

		var todosComponents = TestUtils.scryRenderedComponentsWithType(
			todoList,
			ConnectedTodo
		);

		expect(todosComponents.length).toBe(todos.length);
	});

	it('Should render empty message if no Todo Items', () => {
		var todos = [];
		var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
		var $el = $(ReactDOM.findDOMNode(todoList));

		expect($el.find('.container__message').length).toBe(1);
	});
});
