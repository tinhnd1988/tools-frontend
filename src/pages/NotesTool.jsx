import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function NotesTool() {
  const { http } = useApi();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [items, setItems] = useState([]);

  async function load() {
    const { data } = await http.get('/notes');
    setItems(data.data || data);
  }
  useEffect(() => { load(); }, []);

  async function create() {
    await http.post('/notes', { title, content });
    setTitle(''); setContent('');
    load();
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <input className="w-full rounded border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" />
        <textarea className="w-full rounded border p-3 min-h-40" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Nội dung" />
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={create}>Tạo ghi chú</button>
      </div>
      <div className="space-y-3">
        {items?.map((n) => (
          <div key={n.id} className="rounded border p-3">
            <div className="font-medium">{n.title || '(Không tiêu đề)'} <span className="text-xs">[{n.public_key}]</span></div>
            <div className="whitespace-pre-wrap text-sm mt-2">{n.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


