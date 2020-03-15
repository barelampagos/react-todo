var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
	console.log('New State', store.getState());
});

store.dispatch(actions.addTodo('Read the yard'));
store.dispatch(actions.setSearchText('yard'));
store.dispatch(actions.toggleShowCompleted());

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
