import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => { 
    async function fetchData(){
      const res = await axios.get('http://localhost:3000/api/v1/todos');
      const data = res.data
      setTodos(data);
    }
    fetchData();
    
  }, []);

  return (
    <div className="App">
      {todos.map((todo) => (
      <div key={todo.id}>{todo.content}</div>
    ))}
    </div>
  );
}

export default App;
