import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
	it('Should generate search text action', () => {
		var action = {
			type: 'SET_SEARCH_TEXT',
			searchText: 'Some Search Text'
		};

		var res = actions.setSearchText(action.searchText);

		expect(res).toEqual(action);
	});

	it('Should generate add todo action', () => {
		var action = {
			type: 'ADD_TODO',
			todo: {
				id: '123',
				text: 'Some todo Text',
				completed: false,
				createdAt: 0
			}
		};

		var res = actions.addTodo(action.todo);

		expect(res).toEqual(action);
	});

	// done - lets mocha know about async function, will not finish execution until
	// done gets called
	it('Should create todo and dispatch ADD_TODO', done => {
		const store = createMockStore({});
		const todoText = 'My todo item';

		store
			.dispatch(actions.startAddTodo(todoText))
			.then(() => {
				// getActions() - returns array of all actions fired on Mock store
				const actions = store.getActions();
				console.log(actions[0]);

				// toInclude() - returns true if expected object includes some fields from input obj
				expect(actions[0].type).toBe('ADD_TODO');

				expect(actions[0].todo.text).toBe(todoText);

				done();
			})
			.catch(done);
	});

	it('Should generate add todos action', () => {
		var todos = [
			{
				id: '1',
				text: 'Anything',
				completed: false,
				completedAt: undefined,
				createdAt: 3330000
			}
		];
		var action = {
			type: 'ADD_TODOS',
			todos
		};

		var res = actions.addTodos(todos);
		expect(res).toEqual(action);
	});

	it('Should generate toggle show completed action', () => {
		var action = {
			type: 'TOGGLE_SHOW_COMPLETED'
		};

		var res = actions.toggleShowCompleted();

		expect(res).toEqual(action);
	});

	it('Should generate toggle todo action', () => {
		var action = {
			type: 'TOGGLE_TODO',
			id: 2
		};

		var res = actions.toggleTodo(action.id);

		expect(res).toEqual(action);
	});
});
