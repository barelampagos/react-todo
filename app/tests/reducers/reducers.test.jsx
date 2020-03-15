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
				text: 'Read'
			};

			var res = reducers.todosReducer(df([]), df(action));
			expect(res.length).toEqual(1);
			expect(res[0].text).toEqual(action.text);
		});

		it('Should toggle todo Completed', () => {
			var todos = [
				{
					id: '1',
					text: 'Run',
					completed: true,
					createdAt: 123,
					completedAt: 125
				}
			];

			var action = {
				type: 'TOGGLE_TODO',
				id: '1'
			};

			var res = reducers.todosReducer(df(todos), df(action));
			expect(res[0].completed).toEqual(false);
			expect(res[0].completedAt).toEqual(undefined);
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
