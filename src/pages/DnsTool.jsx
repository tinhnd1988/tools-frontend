import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function DnsTool() {
  const { http } = useApi();
  const [host, setHost] = useState('utiltools.asia');
  const [type, setType] = useState('ANY');
  const [result, setResult] = useState(null);

  async function lookup(e) {
    e.preventDefault();
    const { data } = await http.post('/dns', { host, type });
    setResult(data);
  }

  return (
    <div className="space-y-3">
      <form onSubmit={lookup} className="flex flex-wrap gap-2">
        <input className="flex-1 rounded border px-3 py-2" value={host} onChange={(e) => setHost(e.target.value)} />
        <select className="rounded border px-3 py-2" value={type} onChange={(e) => setType(e.target.value)}>
          {['ANY','A','AAAA','CNAME','MX','NS','TXT','SOA','SRV'].map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button className="rounded bg-indigo-600 text-white px-3 py-2">Lookup</button>
      </form>
      {result && <pre className="rounded border p-3 text-sm overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}


