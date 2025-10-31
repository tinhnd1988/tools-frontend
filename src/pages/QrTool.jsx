import { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useAuth } from '../contexts/AuthContext';
import { Download, History } from 'lucide-react';

export default function QrTool() {
  const { http } = useApi();
  const { isAuthenticated } = useAuth();
  const [text, setText] = useState('https://www.utiltools.asia');
  const [img, setImg] = useState('');
  const [imgBlob, setImgBlob] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  async function generate(e) {
    e.preventDefault();
    const res = await http.post('/qr', { text }, { responseType: 'blob' });
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
    a.download = 'qr-code.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function loadHistory() {
    if (!isAuthenticated) return;
    try {
      const res = await http.get('/qr/history');
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
      <form onSubmit={generate} className="flex gap-2">
        <input 
          className="flex-1 rounded border px-3 py-2" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Nội dung QR" 
        />
        <button className="rounded bg-indigo-600 text-white px-4 py-2">Tạo QR</button>
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
      </form>

      {showHistory && isAuthenticated && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Lịch sử QR Code</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {history.map((item) => (
              <div key={item.id} className="border rounded p-2">
                <img 
                  src={http.defaults.baseURL.replace('/api', '') + item.image_url} 
                  alt="QR" 
                  className="w-full aspect-square object-contain mb-2"
                />
                <p className="text-xs truncate" title={item.content}>{item.content}</p>
                <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            ))}
            {history.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-4">Chưa có lịch sử</p>
            )}
          </div>
        </div>
      )}

      {img && (
        <div className="space-y-2">
          <img src={img} alt="qr" className="w-48 h-48 border rounded" />
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


