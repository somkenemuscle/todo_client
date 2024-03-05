import './App.css';
import axios from 'axios';
import { Axios } from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  //fetching data-tweets from json api
  useEffect(() => {
    async function getTodo() {
      try {
        const res = await axios.get("https://localhost:4000")
        setTodos(res.data)
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getTodo()
  }, []);


  return (
    <div className="App">
      {todos.map((todo : any, i) => (
        <h1>{todo.title}</h1>
      ))}
    </div>
  );
}

export default App;
