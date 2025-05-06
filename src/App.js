import React, { Suspense, lazy } from "react";
import Header from "./components/layout/Header";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import Footer from "./store/containers/Footer";

// Lazy load components
const Todos = lazy(() => import("./components/Todos"));
const AddTodo = lazy(() => import("./components/AddTodo"));

class TodoApp extends React.Component {
  state = {
    todos: [
      {
        id: uuidv4(),
        title: "Setup development environment",
        completed: false
      },
      {
        id: uuidv4(),
        title: "Develop website and add content",
        completed: true
      },
      {
        id: uuidv4(),
        title: "Deploy to live server",
        completed: false
      },
      {
        id: uuidv4(),
        title: "Mua vợt muỗi",
        completed: false
      },
      {
        id: uuidv4(),
        title: "Sửa lại phòng tầng 3",
        completed: false
      }
    ]
  };

  componentDidMount() {
    // Debounce the API call
    const fetchTodos = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then(res => {
          const remoteTodos = res.data.map(todo => ({
            ...todo,
            id: uuidv4()
          }));
          this.setState({ todos: [...this.state.todos, ...remoteTodos] });
        })
        .catch(err => console.log(err));
    };

    // Use requestIdleCallback for better performance
    if (window.requestIdleCallback) {
      window.requestIdleCallback(fetchTodos);
    } else {
      setTimeout(fetchTodos, 0);
    }
  }

  handleCheckboxChange = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  };

  addTodo = (title) => {
    if (title.trim() === "") return;

    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    };

    // Optimistic update
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo]
    }));

    // Simulate a POST request
    axios
      .post("https://jsonplaceholder.typicode.com/todos", newTodo)
      .catch(err => {
        console.log(err);
        // Revert optimistic update on error
        this.setState(prevState => ({
          todos: prevState.todos.filter(todo => todo.id !== newTodo.id)
        }));
      });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <AddTodo addTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            handleChange={this.handleCheckboxChange}
            deleteTodo={this.deleteTodo}
          />
        </Suspense>
        <Footer />
      </div>
    );
  }
}

export default TodoApp;
