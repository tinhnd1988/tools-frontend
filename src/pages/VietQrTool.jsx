import { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useAuth } from '../contexts/AuthContext';
import { Download, History } from 'lucide-react';

export default function VietQrTool() {
  const { http } = useApi();
  const { isAuthenticated } = useAuth();
  const [bank, setBank] = useState('VCB');
  const [account, setAccount] = useState('0061001191224');
  const [amount, setAmount] = useState('20000');
  const [info, setInfo] = useState('SUPPORT WEBSITE');
  const [img, setImg] = useState('');
  const [imgBlob, setImgBlob] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  async function generate(e) {
    e.preventDefault();
    const res = await http.post('/vietqr/image', { 
      bank, 
      account, 
      amount: amount || undefined, 
      info: info || undefined 
    }, { 
      responseType: 'blob' 
    });
    const blob = res.data;
    setImgBlob(blob);
    setImg(URL.createObjectURL(blob));
    if (isAuthenticated) {
      loadHistory();
    }
  }

  function download() {
    if (!imgBlob) return;
    const url = URL.createObjectURL(imgBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vietqr.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function loadHistory() {
    if (!isAuthenticated) return;
    try {
      const res = await http.get('/vietqr/history');
      setHistory(res.data.data || []);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  }

  useEffect(() => {
    if (isAuthenticated && showHistory) {
      loadHistory();
    }
  }, [isAuthenticated, showHistory]);

  return (
    <div className="space-y-4">
      <form onSubmit={generate} className="grid gap-2 grid-cols-1 md:grid-cols-4">
        <input className="rounded border px-3 py-2" value={bank} onChange={(e) => setBank(e.target.value)} placeholder="Mã ngân hàng" />
        <input className="rounded border px-3 py-2" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Số tài khoản" />
        <input className="rounded border px-3 py-2" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Số tiền (tuỳ chọn)" />
        <input className="rounded border px-3 py-2" value={info} onChange={(e) => setInfo(e.target.value)} placeholder="Nội dung (tuỳ chọn)" />
        <div className="md:col-span-4 flex gap-2">
          <button className="flex-1 rounded bg-indigo-600 text-white px-4 py-2">Tạo VietQR</button>
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="rounded border px-4 py-2 flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              Lịch sử
            </button>
          )}
        </div>
      </form>

      {showHistory && isAuthenticated && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Lịch sử VietQR</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {history.map((item) => {
              const data = typeof item.content === 'string' ? JSON.parse(item.content) : item.content;
              return (
                <div key={item.id} className="border rounded p-2">
                  <img 
                    src={http.defaults.baseURL.replace('/api', '') + item.image_url} 
                    alt="VietQR" 
                    className="w-full aspect-square object-contain mb-2"
                  />
                  <p className="text-xs truncate">{data.bank} - {data.account}</p>
                  {data.amount && <p className="text-xs">{Number(data.amount).toLocaleString()} đ</p>}
                  <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              );
            })}
            {history.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-4">Chưa có lịch sử</p>
            )}
          </div>
        </div>
      )}

      {img && (
        <div className="space-y-4 flex flex-col items-center">
          <img src={img} alt="vietqr" className="w-1/2 border rounded" />
          <button
            onClick={download}
            className="flex items-center gap-2 rounded bg-green-600 text-white px-4 py-2"
          >
            <Download className="w-4 h-4" />
            Tải xuống
          </button>
        </div>
      )}
    </div>
  );
}


