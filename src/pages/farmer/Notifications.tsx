import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Leave Now',
      message: 'It is time to leave for Centre B. Travel time is approximately 24 minutes.',
      time: '11:01 AM',
      read: false,
      type: 'warning'
    },
    {
      id: 2,
      title: 'Queue Updated',
      message: 'Your token A042 is moving up. There are now 7 farmers ahead of you.',
      time: '10:45 AM',
      read: true,
      type: 'info'
    },
    {
      id: 3,
      title: 'Booking Confirmed',
      message: 'Your procurement slot for Paddy (30 Q) is confirmed for 10:40 AM.',
      time: '08:15 AM',
      read: true,
      type: 'success'
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-surface-50">
      <header className="bg-white border-b border-surface-200 px-4 py-3 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate('/farmer')} className="p-2 -ml-2 text-surface-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold ml-2">Notifications</h1>
        </div>
        <button className="p-2 text-surface-600">
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <div className="divide-y divide-surface-200">
        {notifications.map(n => (
          <div key={n.id} className={`p-4 flex gap-4 ${n.read ? 'bg-surface-50' : 'bg-white'}`}>
            <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${n.read ? 'bg-transparent' : 'bg-primary-500'}`}></div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-semibold ${n.read ? 'text-surface-700' : 'text-surface-900'}`}>{n.title}</h3>
                <span className="text-xs text-surface-400 font-medium whitespace-nowrap ml-2">{n.time}</span>
              </div>
              <p className={`text-sm ${n.read ? 'text-surface-500' : 'text-surface-700'}`}>{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
