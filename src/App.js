import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Todo from './todos/[id].js';
import EditTodo from './edit_todos/[id].js';

import { Amplify } from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_31d3GGmCC',
    userPoolWebClientId: 'b243lhpn3ct9lh6fb3non1br',
    identityPoolId: 'us-east-1:ed68cda5-65c8-4308-aac9-354df79e8f16',
    oauth: {
      domain: 'todocog.auth.us-east-1.amazoncognito.com',
      scope: ['openid'],
      redirectSignIn: 'http://localhost:3001/',
      redirectSignOut: 'http://localhost:3001/',
      responseType: 'code'
    }
  }
})


function App() {

  // GETリクエスト
  const [todos, setTodos] = useState([])

  useEffect(() => { 
    async function fetchData(){
      const res = await axios.get('http://localhost:3000/api/v1/todos');
      const data = res.data
      setTodos(data);
    }
    fetchData(); 
  }, []);
  // 




  // POSTリクエスト
  const [content, setContent] = useState('')

  const addTodo = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:3000/api/v1/todos`, {
      content: content,
    });
    window.location.reload();
  }
  // 


  // DELETEリクエスト
  const deleteTodo = async (postId) => {
    await axios.delete(`http://localhost:3000/api/v1/todos/${postId}`);
    window.location.reload();
  }
  //


  return (
    <Router>
      <div className="App">

        {todos.map((todo) => (
          <div key={todo.id}>


            {/* GETリクエスト(show) */}
            <div class = "GET">
              <Link to={`/todos/${todo.id}`}>{todo.content}</Link>
            </div>


            {/* PUTリクエスト */}
            <div class = "PUT">
              <Link to={`/edit_todos/${todo.id}`}>編集</Link>
            </div>


            {/* DELETEリクエスト */}
            <div class = "DELETE">
              <button onClick={() => deleteTodo(todo.id)}>削除</button>
            </div>

          </div>
        ))}
        

        {/* POSTリクエスト */}
        <form onSubmit={addTodo}>
          <textarea onChange = {(e) => setContent(e.target.value)} />
          <button type="submit">投稿</button>
        </form>


      </div>
      

      {/* routing設定 */}
      <Routes>
        <Route path="/todos/:id" element={<Todo />} />
        <Route path="/edit_todos/:id" element={<EditTodo />} />
      </Routes>
    
  </Router>
  );
}

export default withAuthenticator(App, {
        signUpAttributes: ['email'],
 })