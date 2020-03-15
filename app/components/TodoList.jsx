var React = require('react');
var { connect } = require('react-redux');
import Todo from 'Todo';

export var TodoList = React.createClass({
	render: function() {
		var { todos } = this.props;

		var renderTodos = () => {
			if (todos.length == 0) {
				return <p className='container__message'>Nothing to do :)</p>;
			}
			return todos.map(todo => {
				// ... spread syntax allows us to pass all attributes as it's own prop
				return <Todo key={todo.id} {...todo} />;
			});
		};

		return <div>{renderTodos()}</div>;
	}
});

// connect() - allows us to access data from the Redux store
export default connect(state => {
	// Sets props.todos = state.todos
	return { todos: state.todos };
})(TodoList);
