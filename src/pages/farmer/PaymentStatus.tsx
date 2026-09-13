import { ArrowLeft, CheckCircle2, IndianRupee, Clock, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFarmerContext } from '../../features/farmer/FarmerContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function PaymentStatus() {
  const navigate = useNavigate();
  const { activeTransaction } = useFarmerContext();

  if (!activeTransaction) {
    return <div className="p-4 text-center mt-10">No active procurement found.</div>;
  }

  const isCompleted = activeTransaction.paymentStatus === 'Completed';

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-surface-50">
      <header className="bg-white border-b border-surface-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate('/farmer')} className="p-2 -ml-2 text-surface-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold ml-2">Payment Status</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <Card className="bg-white border-0 shadow-lg relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-2 ${isCompleted ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
              <IndianRupee className="w-8 h-8" />
            </div>
            
            <h2 className="text-sm font-medium text-surface-500 uppercase tracking-wider mb-1">Procurement Amount</h2>
            <div className="text-4xl font-black text-surface-900 mb-6 flex items-center justify-center">
              ₹58,200
            </div>

            <div className={`inline-flex items-center px-4 py-2 rounded-full font-bold text-sm ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              {isCompleted ? (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Completed</>
              ) : (
                <><Clock className="w-4 h-4 mr-2" /> Processing</>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-surface-200">
          <CardContent className="p-0 divide-y divide-surface-100">
            <div className="px-5 py-4 flex justify-between">
              <span className="text-surface-500 font-medium text-sm">Payment Ref</span>
              <span className="text-surface-900 font-mono font-bold text-sm">{activeTransaction.paymentTransactionId || 'PAY92831'}</span>
            </div>
            <div className="px-5 py-4 flex justify-between">
              <span className="text-surface-500 font-medium text-sm">Procurement Ref</span>
              <span className="text-surface-900 font-mono font-bold text-sm">{activeTransaction.id}</span>
            </div>
            <div className="px-5 py-4 flex justify-between">
              <span className="text-surface-500 font-medium text-sm">Date</span>
              <span className="text-surface-900 font-medium text-sm">10 Sep 2026</span>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 leading-tight">
            This status is retrieved directly from the connected government payment gateway. Funds usually reflect in your linked bank account within 24-48 hours of completion.
          </p>
        </div>

        {!isCompleted && (
           <Button variant="outline" className="w-full bg-white text-surface-700">
             <RefreshCcw className="w-4 h-4 mr-2" />
             Check Status
           </Button>
        )}
      </div>
    </div>
  );
}

import { Info } from 'lucide-react';
