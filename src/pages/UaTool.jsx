import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function UaTool() {
  const { http } = useApi();
  const [ua, setUa] = useState('');

  async function random() {
    const { data } = await http.get('/ua/random');
    setUa(data.userAgent);
  }

  return (
    <div className="space-y-3">
      <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={random}>Random User Agent</button>
      <textarea className="w-full rounded border p-3" rows={4} value={ua} readOnly />
    </div>
  );
}


