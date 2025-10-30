import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function EncodeTool() {
  const { http } = useApi();
  const [text, setText] = useState('hello world');
  const [result, setResult] = useState('');

  async function call(path) {
    const { data } = await http.post(`/tools/${path}`, { text });
    setResult(data.result ?? '');
  }

  return (
    <div className="space-y-3">
      <textarea className="w-full rounded border p-3 min-h-28" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={() => call('urlencode')}>URL Encode</button>
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={() => call('urldecode')}>URL Decode</button>
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={() => call('b64encode')}>Base64 Encode</button>
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={() => call('b64decode')}>Base64 Decode</button>
      </div>
      <textarea className="w-full rounded border p-3 min-h-28" value={result} readOnly />
    </div>
  );
}


