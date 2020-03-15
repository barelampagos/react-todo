var expect = require('expect');
var actions = require('actions');

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
			text: 'Some todo Text'
		};

		var res = actions.addTodo(action.text);

		expect(res).toEqual(action);
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
