import React, { useState, useEffect } from 'react';

export default function App() {
  const [prompts, setPrompts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('ai_prompts');
    if (saved) setPrompts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ai_prompts', JSON.stringify(prompts));
  }, [prompts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Alanları boş bırakma!");

    if (editId) {
      setPrompts(prompts.map(p => p.id === editId ? { ...p, title, content } : p));
      setEditId(null);
    } else {
      setPrompts([...prompts, { id: Date.now(), title, content }]);
    }
    setTitle(''); setContent('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>🤖 Yapay Zeka Promptlarım</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <input placeholder="Prompt Başlığı" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: '8px' }} />
        <textarea placeholder="Prompt içeriği..." value={content} onChange={e => setContent(e.target.value)} style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>{editId ? 'Güncelle' : 'Ekle'}</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {prompts.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <h3>{p.title}</h3>
            <p>{p.content}</p>
            <button onClick={() => {setEditId(p.id); setTitle(p.title); setContent(p.content);}}>Düzenle</button>
            <button onClick={() => setPrompts(prompts.filter(item => item.id !== p.id))} style={{ marginLeft: '10px' }}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}