import firebase, { firebaseRef } from 'app/firebase/';
import moment from 'moment';

// ACTION GENERATORS
export var setSearchText = searchText => {
	return {
		type: 'SET_SEARCH_TEXT',
		searchText
	};
};

export var toggleShowCompleted = () => {
	return {
		type: 'TOGGLE_SHOW_COMPLETED'
	};
};

export var addTodo = todo => {
	return {
		type: 'ADD_TODO',
		todo
	};
};

export var addTodos = todos => {
	return {
		type: 'ADD_TODOS',
		todos
	};
};

export var startAddTodos = () => {
	return (dispatch, getState) => {
		var todoRef = firebaseRef.child('todos');

		return todoRef.once('value').then(snapshot => {
			// Give us all ID keys
			var todos = snapshot.val() || {};
			var parsedTodos = [];

			Object.keys(todos).forEach(key => {
				parsedTodos.push({
					id: key,
					...snapshot.val()[key]
				});
			});

			dispatch(addTodos(parsedTodos));
		});
	};
};

export var updateTodo = (id, updates) => {
	return {
		type: 'UPDATE_TODO',
		id,
		updates
	};
};

export var startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		var todoRef = firebaseRef.child(`todos/${id}`);

		var updates = {
			completed,
			completedAt: completed ? moment().unix() : null
		};

		return todoRef.update(updates).then(() => {
			dispatch(updateTodo(id, updates));
		});
	};
};

export var startAddTodo = text => {
	return (dispatch, getState) => {
		// Create TODO
		var todo = {
			text,
			completed: false,
			createdAt: moment().unix(),
			completedAt: null
		};

		// Save on firebase
		var todoRef = firebaseRef.child('todos').push(todo);

		// Dispatch TODO to browser
		return todoRef.then(() => {
			dispatch(
				addTodo({
					...todo,
					id: todoRef.key
				})
			);
		});
	};
};
