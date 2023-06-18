import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

// PUTリクエスト
const Edit = () => {
  const [content, setContent] = useState('')
  const params = useParams();

  const EditTodo = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/v1/todos/${params.id}`, {
      content: content,  
    });
    window.location.reload();
  }

  return (
    <div>
      <div className="App">
        <form onSubmit={EditTodo}>
          <textarea value={content} onChange = {(e) => setContent(e.target.value)} />
          <button type="submit">編集</button>
        </form>      
      </div>
    </div>  
  )
}
// 

export default Edit
