import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, { firebaseRef } from 'app/firebase';
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

	it('Should generate update todo action', () => {
		var action = {
			type: 'UPDATE_TODO',
			id: 2,
			updates: { completed: false }
		};

		var res = actions.updateTodo(action.id, action.updates);

		expect(res).toEqual(action);
	});

	describe('Tests with Firebase todos', () => {
		var testTodoRef;

		// Runs before each test
		beforeEach(done => {
			var todosRef = firebaseRef.child('todos');
			todosRef
				.remove()
				.then(() => {
					testTodoRef = firebaseRef.child('todos').push();

					return testTodoRef.set({
						text: 'Something to do',
						completed: false,
						createdAt: 4206969
					});
				})
				.then(() => done())
				.catch(done);
		});

		// Runs after each test
		afterEach(done => {
			testTodoRef.remove().then(() => done());
		});

		it('should toggle todo and dispatch UPDATE_TODO action', done => {
			const store = createMockStore({});
			const action = actions.startToggleTodo(testTodoRef.key, true);

			store.dispatch(action).then(() => {
				const mockActions = store.getActions();

				// expect(mockActions[0]).toInclude({
				// 	type: 'UPDATE_TODO',
				// 	id: testTodoRef.key
				// });

				// expect(mockActions[0].updates).toInclude({
				// 	completed: true
				// });

				expect(mockActions[0].updates.completedAt).toExist();

				done();
			}, done);
		});

		it('should populate todos and dispatch ADD_TODOS action', done => {
			const store = createMockStore({});
			const action = actions.startAddTodos();

			store.dispatch(action).then(() => {
				const mockActions = store.getActions();

				expect(mockActions[0].type).toEqual('ADD_TODOS');
				expect(mockActions[0].todos.length).toEqual(1);
				expect(mockActions[0].todos[0].text).toEqual('Something to do');

				done();
			}, done);
		});
	});
});
