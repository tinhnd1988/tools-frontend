import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend);

export default function LinksTool() {
  const { http } = useApi();
  const [url, setUrl] = useState('https://example.com');
  const [code, setCode] = useState('');
  const [items, setItems] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  async function load() {
    const { data } = await http.get('/links');
    setItems(data.data || data);
  }
  useEffect(() => { load(); }, []);

  async function create() {
    await http.post('/links', { url, code: code || undefined });
    setCode('');
    load();
  }

  async function viewAnalytics(c) {
    const { data } = await http.get(`/links/${c}/analytics`);
    setAnalytics({ code: c, data });
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="flex-1 rounded border px-3 py-2" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL gốc" />
        <input className="w-40 rounded border px-3 py-2" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Mã (tuỳ chọn)" />
        <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={create}>Tạo link</button>
      </div>
      <div className="space-y-2">
        {items?.map((l) => (
          <div key={l.id} className="rounded border p-3 flex items-center justify-between gap-3">
            <div>
              <div className="font-medium">/{l.code}</div>
              <a href={l.original_url} target="_blank" className="text-sm text-indigo-600">{l.original_url}</a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div>Clicks: {l.clicks}</div>
              <a className="underline cursor-pointer" onClick={() => viewAnalytics(l.code)}>Analytics</a>
            </div>
          </div>
        ))}
      </div>

      {analytics && (
        <div className="rounded-xl border p-4">
          <div className="font-medium mb-2">Analytics: /{analytics.code}</div>
          <div className="text-sm">Total: {analytics.data.total}</div>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <Line
              data={{
                labels: analytics.data.daily?.map((d) => d.day) ?? [],
                datasets: [{ label: 'Clicks', data: analytics.data.daily?.map((d) => d.clicks) ?? [], borderColor: '#4f46e5', backgroundColor: 'rgba(79,70,229,0.2)' }],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
            <Doughnut
              data={{
                labels: analytics.data.byCountry?.map((c) => c.country) ?? [],
                datasets: [{ data: analytics.data.byCountry?.map((c) => c.clicks) ?? [], backgroundColor: ['#4f46e5','#06b6d4','#10b981','#f59e0b','#ef4444','#8b5cf6'] }],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
            />
          </div>
        </div>
      )}
    </div>
  );
}


