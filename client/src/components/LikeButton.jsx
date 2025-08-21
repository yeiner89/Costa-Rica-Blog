import { useState, useEffect } from 'react';

export default function LikeButton({ postId }) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`/api/likes/count/${postId}`)
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, [postId]);

  const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const toggle = async () => {
    const res = await fetch(`/api/likes/${postId}/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
    });
    if (res.status === 401) {
      alert('Inicia sesión para dar like');
      return;
    }
    const data = await res.json();
    const newLiked = data.liked;
    setLiked(newLiked);
    setCount((c) => (newLiked ? c + 1 : c - 1));
  };

  return (
    <button onClick={toggle}>
      {liked ? '💙' : '🔷'} {count}
    </button>
  );
}
