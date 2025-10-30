import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function CronTool() {
  const { http } = useApi();
  const [expr, setExpr] = useState('*/5 * * * *');
  const [list, setList] = useState([]);

  async function preview() {
    const { data } = await http.get('/cron/preview', { params: { expr, count: 5 } });
    setList(data.next || []);
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input className="flex-1 rounded border px-3 py-2" value={expr} onChange={(e) => setExpr(e.target.value)} />
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={preview}>Preview</button>
      </div>
      <ul className="list-disc pl-5 text-sm">
        {list.map((d) => (<li key={d}>{d}</li>))}
      </ul>
    </div>
  );
}


