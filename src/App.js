import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Todo from './show/[id].js';
import EditTodo from './edit/[id].js';


// 4:auth,provider,popupをimportする
import { auth, googleProvider, githubProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
// 


// 6:useAuthStateをimportする
import { useAuthState } from 'react-firebase-hooks/auth';
// 


function App() {


  // 5:プロバイダーの数だけ関数を記述(引数にauthと各プロバイダー)
  const signInWithGoogle = () => {
      signInWithPopup(auth, googleProvider);
    }; 
  
  const signInWithGithub = () => {
      signInWithPopup(auth, githubProvider);
    };
  // 

  
  // 7:以下を記述する
  const [user] = useAuthState(auth);
  // 
  


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
        <div>
          {/* 8:viewを選別 */}
          {user ? (

            <div>
              {/* 10:ログアウトボタン(onClick)を一つ記述 */}
              <button onClick={() => auth.signOut()}>ログアウトする</button>
              <img src = {auth.currentUser.photoURL}></img>
              <p>{auth.currentUser.displayName}</p>
            </div>

          ) : (

            <div>
              {/* 9:サインインボタン(onClick)をプロバイダーの数だけ記述 */}
              <button onClick={signInWithGoogle}>Googleでサインイン</button>
              <button onClick={signInWithGithub}>Githubでサインイン</button>       
            </div>   

          ) }
        
        </div>



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

export default App;
