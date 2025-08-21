import { useEffect, useState } from 'react';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const load = async () => {
    const res = await fetch(`/api/comments/${postId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    load();
  }, [postId]);

  const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(`/api/comments/${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ text }),
    });
    if (res.status === 401) {
      alert('Inicia sesión para comentar');
      return;
    }
    setText('');
    load();
  };

  return (
    <div>
      <h3>Comentarios</h3>
      <form onSubmit={submit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
        />
        <button>Comentar</button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c._id}>
            <b>{c.userId?.name || 'Usuario'}</b>: {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
