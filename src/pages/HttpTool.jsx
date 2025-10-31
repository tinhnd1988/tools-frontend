import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function HttpTool() {
  const { http } = useApi();
  const [url, setUrl] = useState('https://www.utiltools.asia');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);

  async function checkStatus() {
    const { data } = await http.get('/http/status', { params: { url, method } });
    setResult(data);
  }

  async function sendRequest() {
    let hdrObj = {};
    try { hdrObj = headers ? JSON.parse(headers) : {}; } catch { hdrObj = {}; }
    const { data } = await http.post('/http/request', { url, method, headers: hdrObj, body });
    setResult(data);
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <select className="rounded border px-3 py-2" value={method} onChange={(e) => setMethod(e.target.value)}>
          {['GET','POST','PUT','PATCH','DELETE','HEAD'].map(m => <option key={m}>{m}</option>)}
        </select>
        <input className="flex-1 rounded border px-3 py-2" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <textarea className="w-full rounded border p-2 text-sm" rows={4} placeholder="JSON headers" value={headers} onChange={(e) => setHeaders(e.target.value)} />
      <textarea className="w-full rounded border p-2 text-sm" rows={6} placeholder="Request body" value={body} onChange={(e) => setBody(e.target.value)} />
      <div className="flex gap-2">
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={checkStatus}>Check status</button>
        <button className="rounded bg-green-600 text-white px-3 py-2" onClick={sendRequest}>Send request</button>
      </div>
      {result && <pre className="rounded border p-3 text-sm overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}


