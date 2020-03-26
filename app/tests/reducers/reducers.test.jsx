var expect = require('expect');

// Deep Freeze - allows us to verify if something remains as a pure function (no variables changed)
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
	describe('searchTextReducer', () => {
		it('Should set searchText', () => {
			var action = {
				type: 'SET_SEARCH_TEXT',
				searchText: 'Search this'
			};

			var res = reducers.searchTextReducer(df(''), df(action));

			expect(res).toEqual(action.searchText);
		});
	});

	describe('showCompletedReducer', () => {
		it('Should toggle showCompleted', () => {
			var action = {
				type: 'TOGGLE_SHOW_COMPLETED'
			};

			var res = reducers.showCompletedReducer(df(false), df(action));
			expect(res).toEqual(true);
		});
	});

	describe('todosReducer', () => {
		it('Should add Todo', () => {
			var action = {
				type: 'ADD_TODO',
				todo: {
					id: '123',
					text: 'Read',
					completed: false,
					createdAt: 123154
				}
			};

			var res = reducers.todosReducer(df([]), df(action));
			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(action.todo);
		});

		it('Should update todo Completed', () => {
			var todos = [
				{
					id: '1',
					text: 'Run',
					completed: true,
					createdAt: 123,
					completedAt: 125
				}
			];

			var updates = {
				completed: false,
				completedAt: null
			};

			var action = {
				type: 'UPDATE_TODO',
				id: todos[0].id,
				updates
			};

			var res = reducers.todosReducer(df(todos), df(action));
			expect(res[0].completed).toEqual(updates.completed);
			expect(res[0].completedAt).toEqual(updates.completedAt);
			expect(res[0].text).toEqual(todos[0].text);
		});

		it('Should add existing Todos', () => {
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

			var res = reducers.todosReducer(df([]), df(action));
			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(todos[0]);
		});
	});
});
