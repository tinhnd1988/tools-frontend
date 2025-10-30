import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function QrTool() {
  const { http } = useApi();
  const [text, setText] = useState('https://example.com');
  const [img, setImg] = useState('');

  async function generate(e) {
    e.preventDefault();
    const res = await http.post('/qr', { text }, { responseType: 'blob' });
    setImg(URL.createObjectURL(res.data));
  }

  return (
    <div className="space-y-4">
      <form onSubmit={generate} className="flex gap-2">
        <input className="flex-1 rounded border px-3 py-2" value={text} onChange={(e) => setText(e.target.value)} placeholder="Nội dung QR" />
        <button className="rounded bg-indigo-600 text-white px-4 py-2">Tạo QR</button>
      </form>
      {img && <img src={img} alt="qr" className="w-48 h-48" />}
    </div>
  );
}


