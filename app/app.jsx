var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');

import './../playground/firebase/index';

store.subscribe(() => {
	var state = store.getState();
	console.log('New State', state);

	TodoAPI.setTodos(state.todos);
});

// Initialize existing Todos
var initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));

// Load foundation
$(document).foundation();

// app.css
require('style!css!sass!applicationStyles');

// JSX Code --> JS XML
ReactDOM.render(
	// Provider Component - enables any children components to have access to the store
	<Provider store={store}>
		<TodoApp />
	</Provider>,
	document.getElementById('app')
);
