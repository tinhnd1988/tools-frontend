import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function IpTool() {
  const { http } = useApi();
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);

  async function query(e) {
    e.preventDefault();
    const { data } = await http.post('/ip', ip ? { ip } : {});
    setData(data);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={query} className="flex gap-2">
        <input className="flex-1 rounded border px-3 py-2" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="IP (bỏ trống để lấy IP của bạn)" />
        <button className="rounded bg-indigo-600 text-white px-4 py-2">Kiểm tra</button>
      </form>
      {data && <pre className="rounded border p-3 text-sm overflow-auto max-h-96">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}


