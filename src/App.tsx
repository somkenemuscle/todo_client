import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Define an interface for the todo object
interface Todo {
  id: number;
  task: string;
}

function App() {
  //use state reference the interface of todo
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  //Get all todos
  useEffect(() => {
    async function getTodo() {
      try {
        const res = await axios.get("http://localhost:4000/");
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getTodo();
  }, []);

  //For the functions we determine the type of event that is to be referenced 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault(); // Prevent default form submission behavior
      await axios.post("http://localhost:4000/add", { task: inputValue });
      // Clear the input value after successful form submission
      setInputValue('');
      //get all todos again
      const res = await axios.get("http://localhost:4000/");
      setTodos(res.data);
    } catch (error) {
      console.log('error adding todo :', error)
    }
  };

  //Handle change from input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  //Handle delete from input
  async function handleDelete(id: number) {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`);
      //get all todos and render them
      const res = await axios.get("http://localhost:4000/");
      setTodos(res.data);
    } catch (error) {
      console.log('error adding todo :', error)
    }
  }

  return (
    <div className="App">
      <h3>Todo- List</h3>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputValue} type="text" placeholder='Add a new todo' required />
        <button type="submit">+</button>
      </form>

      <section>
        {todos.map((todo, i) => (
          <ul key={todo.id}>
            <li>{todo.task} <span onClick={() => handleDelete(todo.id)}>delete</span></li>
          </ul>
        ))}
      </section>

    </div>
  );
}

export default App;
