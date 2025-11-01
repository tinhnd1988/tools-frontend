import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function WhoisTool() {
  const { http } = useApi();
  const [domain, setDomain] = useState('utiltools.asia');
  const [result, setResult] = useState(null);

  async function lookup(e) {
    e.preventDefault();
    const { data } = await http.post('/whois', { domain });
    setResult(data);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={lookup} className="flex gap-2">
        <input className="flex-1 rounded border px-3 py-2" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Domain" />
        <button className="rounded bg-indigo-600 text-white px-4 py-2">Tra cứu</button>
      </form>
      {result && (
        <pre className="rounded border p-3 text-sm overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}


