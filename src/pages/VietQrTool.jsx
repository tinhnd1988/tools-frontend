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
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Lịch sử VietQR</h3>
            <button
              onClick={loadHistory}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Làm mới
            </button>
          </div>
          {history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Chưa có lịch sử VietQR</p>
              <p className="text-xs text-gray-400 mt-2">Tạo VietQR để lưu vào lịch sử</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {history.map((item) => {
                const data = typeof item.content === 'string' ? JSON.parse(item.content) : item.content;
                const imageUrl = http.defaults.baseURL.replace('/api', '') + item.image_url;
                return (
                  <div key={item.id} className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow">
                    <div className="aspect-square mb-3 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt="VietQR" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium truncate">
                          {data.bank} - {data.account}
                        </p>
                        {data.amount && (
                          <p className="text-xs text-green-600 font-semibold mt-1">
                            {Number(data.amount).toLocaleString('vi-VN')} đ
                          </p>
                        )}
                        {data.info && (
                          <p className="text-xs text-gray-600 truncate mt-1" title={data.info}>
                            {data.info}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleString('vi-VN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <button
                        onClick={() => {
                          window.open(imageUrl, '_blank');
                        }}
                        className="w-full text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 transition-colors"
                      >
                        Xem
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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


