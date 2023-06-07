import React from 'react'
import  { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

// GETリクエスト(show)
const Todo = () => {
  const [todo, setTodos] = useState([])
  const params = useParams();
    
  useEffect(() => { 
      async function fetchData(){
      const res = await axios.get(`http://localhost:3000/api/v1/todos/${params.id}`);
      const data = res.data
    setTodos(data);
  }
  fetchData();
        
  }, [params.id]);
    
  return (
    <div className="App">
      {todo.content}
    </div>
  );
};
// 

export default Todo;