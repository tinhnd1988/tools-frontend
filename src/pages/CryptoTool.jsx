import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function CryptoTool() {
  const { http } = useApi();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [symbols, setSymbols] = useState(true);
  const [text, setText] = useState('hello');
  const [algo, setAlgo] = useState('sha256');
  const [key, setKey] = useState('');
  const [hash, setHash] = useState('');
  const [jwt, setJwt] = useState('');
  const [jwtOut, setJwtOut] = useState(null);
  const [tab, setTab] = useState('password');

  async function genPass() {
    const { data } = await http.post('/crypto/password', { length, symbols });
    setPassword(data.password);
  }
  async function doHash() {
    const { data } = await http.post('/crypto/hash', { algo, text, key: key || undefined });
    setHash(data.hash);
  }
  async function decodeJwt() {
    const { data } = await http.post('/crypto/jwt/decode', { token: jwt });
    setJwtOut(data);
  }

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-lg border bg-white overflow-hidden">
        {[
          { id: 'password', label: 'Password' },
          { id: 'hash', label: 'Hash' },
          { id: 'jwt', label: 'JWT' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 cursor-pointer text-sm ${tab === t.id ? 'bg-indigo-600 text-white' : 'hover:bg-zinc-100'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'password' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm">Length</label>
            <input type="number" min={6} max={128} className="w-24 rounded border px-3 py-2" value={length} onChange={(e) => setLength(Number(e.target.value))} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
              Symbols
            </label>
            <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={genPass}>Generate password</button>
          </div>
          <input className="w-full rounded border px-3 py-2" value={password} readOnly />
        </div>
      )}

      {tab === 'hash' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <select className="rounded border px-3 py-2" value={algo} onChange={(e) => setAlgo(e.target.value)}>
              {['md5','sha1','sha256','sha512'].map(a => <option key={a}>{a}</option>)}
            </select>
            <input className="flex-1 rounded border px-3 py-2" placeholder="Key (optional for HMAC)" value={key} onChange={(e) => setKey(e.target.value)} />
          </div>
          <textarea className="w-full rounded border p-2" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
          <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={doHash}>Hash</button>
          <input className="w-full rounded border px-3 py-2" value={hash} readOnly />
        </div>
      )}

      {tab === 'jwt' && (
        <div className="space-y-3">
          <textarea className="w-full rounded border p-2" rows={6} placeholder="JWT" value={jwt} onChange={(e) => setJwt(e.target.value)} />
          <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={decodeJwt}>Decode JWT</button>
          {jwtOut && <pre className="rounded border p-3 text-sm overflow-auto max-h-96">{JSON.stringify(jwtOut, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
}


