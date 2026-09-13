import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { useOfficerContext } from '../../features/officer/OfficerContext';
import { mockService } from '../../services/mockDataService';

export default function Weighing() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { activeTransaction, setActiveTransaction } = useOfficerContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Default to the mock scenario target
  const [weight, setWeight] = useState('29.6');

  if (!activeTransaction) return <div className="p-6">No active transaction.</div>;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const numWeight = parseFloat(weight);
      if (isNaN(numWeight)) throw new Error("Invalid weight");
      
      const updated = await mockService.updateWeight(activeTransaction.id, numWeight);
      setActiveTransaction(updated);
      addToast({ type: 'success', title: 'Weight Recorded', message: `${numWeight} Q successfully recorded.` });
      navigate('/officer/procurement');
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to record weight.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/officer/procurement')} className="p-2 -ml-2 text-surface-600 mr-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Weighing</h1>
          <p className="text-surface-500">Transaction: <span className="font-mono text-surface-700">{activeTransaction.id}</span></p>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-surface-200">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-10">
             <div>
               <div className="text-sm font-bold text-surface-500 uppercase tracking-wider mb-1">Expected Quantity</div>
               <div className="text-4xl font-bold text-surface-900">{activeTransaction.expectedQuantity} Q</div>
             </div>
             <Scale className="w-16 h-16 text-surface-200" />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-primary-700 uppercase tracking-wider">Actual Weight (Quintals)</label>
            <div className="flex items-center">
              <input 
                type="number" 
                step="0.1"
                className="w-full text-5xl font-black p-4 border-2 border-primary-500 rounded-l-xl focus:outline-none focus:ring-0" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <div className="bg-primary-50 text-primary-700 text-3xl font-bold px-8 py-4 border-y-2 border-r-2 border-primary-500 rounded-r-xl h-full flex items-center">
                Q
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              {[28, 29, 29.6, 30].map(w => (
                <button 
                  key={w}
                  className="px-3 py-1 bg-surface-100 hover:bg-surface-200 rounded-md text-sm font-medium text-surface-700"
                  onClick={() => setWeight(w.toString())}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full h-16 mt-10 text-lg bg-primary-600 hover:bg-primary-700 shadow-md"
            onClick={handleSubmit}
            disabled={isSubmitting || !weight}
          >
            Confirm Weight
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
