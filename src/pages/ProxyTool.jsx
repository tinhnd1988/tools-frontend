import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function ProxyTool() {
  const { http } = useApi();
  const [proxy, setProxy] = useState('http://user:pass@host:port');
  const [result, setResult] = useState(null);

  async function check(e) {
    e.preventDefault();
    const { data } = await http.post('/proxy/check', { proxy });
    setResult(data);
  }

  return (
    <div className="space-y-3">
      <form onSubmit={check} className="flex gap-2">
        <input className="flex-1 rounded border px-3 py-2" value={proxy} onChange={(e) => setProxy(e.target.value)} />
        <button className="rounded bg-indigo-600 text-white px-3 py-2">Check</button>
      </form>
      {result && <pre className="rounded border p-3 text-sm overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}


