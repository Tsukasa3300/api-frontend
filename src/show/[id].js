import React from 'react'
import  { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

// GETリクエスト(show)
const Todo = () => {
  const [todo, setTodo] = useState([])
  const params = useParams();
    
  useEffect(() => { 
      async function fetchData(){
      const res = await axios.get(`http://localhost:3000/api/v1/todos/${params.id}`);
      const data = res.data
    setTodo(data);
  }
  fetchData();
        
  }, [params.id]);
  // 


  // GETリクエスト[comments]
  const [comment, setComment] = useState([])

  useEffect(() => { 
    async function fetchData(){
      const res = await axios.get(`http://localhost:3000/api/v1/todos/${params.id}/comments`);
      const data = res.data
      setComment(data);
    }
    fetchData(); 
  }, [params.id]);
  // 


  // POSTリクエスト[Comment]
  const [content, setContent] = useState('')

  const addComment = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:3000/api/v1/todos/${params.id}/comments`, {
      content: content,
      todo_id: params.id,
    });
    setContent(''); 
    window.location.reload();
  }
  //  



  return (
    <div className="App">
      {todo.content}

      {/* POSTリクエスト[Comment] */}
      <form onSubmit={addComment}>
        <textarea onChange = {(e) => setContent(e.target.value)} />
        <button type="submit">投稿</button>
      </form>
      
      {comment.map((c) => (
        <div key={c.id}>{c.content}</div>
      ))}
    </div>
  );
};
// 

export default Todo;