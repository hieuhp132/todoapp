import React from "react";

class TodoItem extends React.Component {
  render() {
    const { todo, handleChange, deleteTodo } = this.props;
    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleChange(todo.id)}
        />
        <span className={todo.completed ? "completed" : ""}>
          {todo.title}
        </span>
        <button className="btn-style" onClick={() => deleteTodo(todo.id)}>
          X
        </button>
      </li>
    );
  }
}

export default TodoItem;
