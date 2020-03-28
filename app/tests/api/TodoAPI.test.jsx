var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
	// Mocha method, runs before each test
	beforeEach(() => {
		localStorage.removeItem('todos');
	});

	it('Should exist', () => {
		expect(TodoAPI).toExist();
	});

	describe('filterTodos', () => {
		var todos = [
			{ id: 1, text: 'Do something', completed: true },
			{ id: 2, text: 'Do something else', completed: false },
			{ id: 3, text: 'Do that thing', completed: true }
		];

		it('Should return all items if showCompleted is true', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, true, '');
			expect(filteredTodos.length).toBe(3);
		});

		it('Should return one items if showCompleted is false', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, false, '');
			expect(filteredTodos.length).toBe(1);
		});

		it('Should sort by completed status', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, true, '');
			expect(filteredTodos[0].completed).toBe(false);
		});

		it('Should return all todos when searchText empty', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, true, '');
			expect(filteredTodos.length).toBe(3);
		});

		it('Should return only todos that match searchText', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, true, 'that');
			expect(filteredTodos.length).toBe(1);
		});
	});
});
