import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Receipt, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { useOfficerContext } from '../../features/officer/OfficerContext';
import { mockService } from '../../services/mockDataService';

export default function ProcurementCompletion() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { activeTransaction, setActiveTransaction } = useOfficerContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeTransaction) return <div className="p-6">No active transaction.</div>;

  const isAlreadyCompleted = activeTransaction.status === 'Completed';

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const updated = await mockService.completeProcurement(activeTransaction.id);
      setActiveTransaction(updated);
      addToast({ type: 'success', title: 'Procurement Complete', message: 'Transaction finalized and farmer notified.' });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to complete.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock rate for demonstration
  const mockRate = 1966.21; // MSP approx
  const totalAmount = activeTransaction.actualQuantity ? (activeTransaction.actualQuantity * mockRate).toFixed(2) : 58200;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/officer/procurement')} className="p-2 -ml-2 text-surface-600 mr-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Procurement Completion</h1>
          <p className="text-surface-500">Transaction: <span className="font-mono text-surface-700">{activeTransaction.id}</span></p>
        </div>
      </div>

      <Card className="bg-white shadow-lg border-surface-200 overflow-hidden">
        {isAlreadyCompleted && (
          <div className="bg-green-500 text-white p-4 flex items-center justify-center font-bold text-lg">
            <CheckCircle2 className="w-6 h-6 mr-2" />
            PROCUREMENT COMPLETED
          </div>
        )}
        <CardContent className="p-8">
          <div className="grid grid-cols-2 gap-y-6">
             <div>
               <div className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-1">Farmer</div>
               <div className="text-xl font-bold text-surface-900">{activeTransaction.farmerName}</div>
             </div>
             <div>
               <div className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-1">Crop</div>
               <div className="text-xl font-bold text-surface-900">{activeTransaction.crop}</div>
             </div>
             
             <div className="col-span-2 border-t border-surface-100 pt-6">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-surface-600">Final Quantity</span>
                 <span className="font-bold text-lg">{activeTransaction.actualQuantity || activeTransaction.expectedQuantity} Q</span>
               </div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-surface-600">Applicable Rate (MSP)</span>
                 <span className="font-bold">₹{mockRate} / Q</span>
               </div>
               <div className="flex justify-between items-center mt-4 pt-4 border-t border-surface-200">
                 <span className="text-lg font-bold text-surface-900">Total Amount</span>
                 <span className="text-3xl font-black text-primary-700">₹{parseFloat(totalAmount.toString()).toLocaleString('en-IN')}</span>
               </div>
             </div>
          </div>

          <div className="mt-10 flex gap-4">
            {!isAlreadyCompleted ? (
              <Button 
                className="flex-1 h-14 text-lg bg-green-600 hover:bg-green-700 shadow-md"
                onClick={handleComplete}
                disabled={isSubmitting}
              >
                Complete Transaction
              </Button>
            ) : (
              <Button 
                className="flex-1 h-14 text-lg bg-surface-900 hover:bg-surface-800 text-white shadow-md"
                onClick={() => addToast({ type: 'info', title: 'Receipt Generated', message: 'Digital receipt sent to farmer and ready for print.' })}
              >
                <Receipt className="w-5 h-5 mr-2" />
                Generate Receipt
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
