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

	describe('setTodos', () => {
		it('Should set valid todos array', () => {
			var todos = [
				{
					id: 123,
					text: 'Do something',
					completed: false
				}
			];

			TodoAPI.setTodos(todos);
			var actualTodos = JSON.parse(localStorage.getItem('todos'));

			expect(actualTodos).toEqual(todos);
		});

		it('Should NOT set invalid todos array', () => {
			var badTodosArray = { a: 'b' };

			TodoAPI.setTodos(badTodosArray);

			expect(localStorage.getItem('todos')).toBe(null);
		});
	});

	// Keep function tests work irrespective of each other
	describe('getTodos', () => {
		it('Should return empty array for bad localStorage data', () => {
			expect(TodoAPI.getTodos()).toEqual([]);
		});

		it('Should return todos with valid array in localstorage', () => {
			var todos = [{ id: 123, text: 'Do something', completed: false }];

			localStorage.setItem('todos', JSON.stringify(todos));
			var actualTodos = TodoAPI.getTodos();

			expect(actualTodos).toEqual(todos);
		});
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
