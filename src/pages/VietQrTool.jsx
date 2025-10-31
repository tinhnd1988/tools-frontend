import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function VietQrTool() {
  const { http } = useApi();
  const [bank, setBank] = useState('VCB');
  const [account, setAccount] = useState('0061001191224');
  const [amount, setAmount] = useState('20000');
  const [info, setInfo] = useState('SUPPORT WEBSITE');
  const [img, setImg] = useState('');

  async function generate(e) {
    e.preventDefault();
    const res = await http.get('/vietqr/image', { params: { bank, account, amount: amount || undefined, info: info || undefined }, responseType: 'blob' });
    setImg(URL.createObjectURL(res.data));
  }

  return (
    <div className="space-y-4">
      <form onSubmit={generate} className="grid gap-2 grid-cols-1 md:grid-cols-4">
        <input className="rounded border px-3 py-2" value={bank} onChange={(e) => setBank(e.target.value)} placeholder="Mã ngân hàng" />
        <input className="rounded border px-3 py-2" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Số tài khoản" />
        <input className="rounded border px-3 py-2" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Số tiền (tuỳ chọn)" />
        <input className="rounded border px-3 py-2" value={info} onChange={(e) => setInfo(e.target.value)} placeholder="Nội dung (tuỳ chọn)" />
        <button className="md:col-span-4 rounded bg-indigo-600 text-white px-4 py-2">Tạo VietQR</button>
      </form>
      {img && <img src={img} alt="vietqr" className="w-72" />}
    </div>
  );
}


