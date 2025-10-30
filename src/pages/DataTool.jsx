import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function DataTool() {
  const { http } = useApi();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  async function call(path) {
    const { data } = await http.post(path, { text: input });
    setOutput(data.result || '');
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <textarea className="w-full rounded border p-2 min-h-60" value={input} onChange={(e) => setInput(e.target.value)} />
      <textarea className="w-full rounded border p-2 min-h-60" value={output} readOnly />
      <div className="flex flex-wrap gap-2 md:col-span-2">
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={() => call('/data/json/pretty')}>JSON Pretty</button>
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={() => call('/data/json/yaml')}>JSON → YAML</button>
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={() => call('/data/yaml/json')}>YAML → JSON</button>
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={() => call('/data/csv/json')}>CSV → JSON</button>
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={() => call('/data/json/csv')}>JSON → CSV</button>
      </div>
    </div>
  );
}


