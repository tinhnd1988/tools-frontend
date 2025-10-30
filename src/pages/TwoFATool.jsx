import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function TwoFATool() {
  const { http } = useApi();
  const [issuer, setIssuer] = useState('MMO Tools');
  const [account, setAccount] = useState('user@example.com');
  const [secret, setSecret] = useState('');
  const [otpauth, setOtpauth] = useState('');
  const [qr, setQr] = useState('');
  const [code, setCode] = useState('');
  const [valid, setValid] = useState(null);

  async function generate(e) {
    e.preventDefault();
    const { data } = await http.post('/2fa/generate', { issuer, account });
    setSecret(data.secret); setOtpauth(data.otpauth);
  }

  async function qrImg() {
    const res = await http.post('/2fa/qr', { otpauth }, { responseType: 'blob' });
    setQr(URL.createObjectURL(res.data));
  }

  async function verify() {
    const { data } = await http.post('/2fa/verify', { secret, code });
    setValid(data.valid);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={generate} className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <input className="rounded border px-3 py-2" value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="Issuer" />
        <input className="rounded border px-3 py-2" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account" />
        <button className="rounded bg-indigo-600 text-white px-4 py-2">Tạo secret</button>
      </form>
      {secret && (
        <div className="space-y-2">
          <div className="text-sm">Secret: <code className="font-mono">{secret}</code></div>
          <div className="flex gap-2 items-center">
            <button className="rounded bg-indigo-600 text-white px-3 py-2" onClick={qrImg}>Hiện QR</button>
            {qr && <img src={qr} alt="2fa" className="w-40" />}
          </div>
          <div className="flex gap-2 items-center">
            <input className="rounded border px-3 py-2" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Mã 6 số" />
            <button className="rounded bg-green-600 text-white px-3 py-2" onClick={verify} type="button">Verify</button>
            {valid !== null && <span className={valid ? 'text-green-600' : 'text-red-600'}>{valid ? 'Hợp lệ' : 'Sai mã'}</span>}
          </div>
        </div>
      )}
    </div>
  );
}


