import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function UuidTool() {
  const { http } = useApi();
  const [version, setVersion] = useState(4);
  const [uuid, setUuid] = useState('');

  async function generate() {
    const { data } = await http.post('/uuid/generate', { version });
    setUuid(data.uuid);
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <select className="rounded border px-3 py-2" value={version} onChange={(e) => setVersion(Number(e.target.value))}>
          {[1,4,7].map(v => <option key={v} value={v}>UUID v{v}</option>)}
        </select>
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={generate}>Generate</button>
      </div>
      <input className="w-full rounded border px-3 py-2" value={uuid} readOnly />
    </div>
  );
}


