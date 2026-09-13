import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function History() {
  const navigate = useNavigate();

  const historyItems = [
    {
      id: 'TX938421',
      date: '10 Sep 2026',
      crop: 'Paddy',
      qty: '29.6 Q',
      centre: 'Centre B',
      amount: '₹58,200',
      status: 'Completed',
      paid: true
    },
    {
      id: 'TX482910',
      date: '14 Apr 2026',
      crop: 'Wheat',
      qty: '42.0 Q',
      centre: 'Centre A',
      amount: '₹95,550',
      status: 'Completed',
      paid: true
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-surface-50">
      <header className="bg-white border-b border-surface-200 px-4 py-3 flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate('/farmer')} className="p-2 -ml-2 text-surface-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold ml-2">History</h1>
      </header>

      <div className="p-4 space-y-4">
        {historyItems.map((item) => (
          <Card key={item.id} className="bg-white shadow-sm border-surface-200 hover:border-primary-300 transition cursor-pointer">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3 border-b border-surface-100 pb-3">
                <div>
                  <div className="text-xs text-surface-500 font-medium mb-1 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.date}
                  </div>
                  <h3 className="font-bold text-surface-900">{item.crop} • {item.qty}</h3>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-surface-900">{item.amount}</div>
                  <Badge variant="success" className="mt-1 text-[10px]">{item.paid ? 'Paid' : 'Processing'}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-600">{item.centre}</span>
                <span className="font-mono text-xs text-surface-400">Ref: {item.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
