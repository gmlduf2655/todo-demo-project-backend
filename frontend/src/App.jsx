import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    console.log("test");
    const res = await axios.get("http://localhost:8080/api/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post("http://localhost:8080/api/todos", {
      title,
      completed: false
    });
    setTitle("");
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/api/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      <input
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        추가
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <span
              className={todo.completed ? "line-through" : ""}
              onClick={() => toggleComplete(todo)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
