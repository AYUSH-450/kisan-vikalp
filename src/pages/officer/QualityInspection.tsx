import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { useOfficerContext } from '../../features/officer/OfficerContext';
import { mockService } from '../../services/mockDataService';

export default function QualityInspection() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { activeTransaction, setActiveTransaction } = useOfficerContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeTransaction) return <div className="p-6">No active transaction.</div>;

  const handleSubmit = async (result: 'Accepted' | 'Rejected' | 'Needs Review') => {
    setIsSubmitting(true);
    try {
      const updated = await mockService.updateQuality(activeTransaction.id, { result });
      setActiveTransaction(updated);
      addToast({ 
        type: result === 'Accepted' ? 'success' : 'warning', 
        title: `Quality ${result}`, 
        message: 'Quality inspection recorded successfully.' 
      });
      navigate('/officer/procurement');
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to record quality.' });
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
          <h1 className="text-2xl font-bold text-surface-900">Quality Inspection</h1>
          <p className="text-surface-500">Transaction: <span className="font-mono text-surface-700">{activeTransaction.id}</span></p>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-surface-200">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4 bg-surface-50 p-4 rounded-lg border border-surface-200">
            <ClipboardCheck className="w-8 h-8 text-primary-600" />
            <div>
              <h2 className="font-bold text-surface-900">{activeTransaction.crop} Inspection</h2>
              <p className="text-sm text-surface-500">Record configurable quality metrics below.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-surface-700 mb-2">Moisture Content (%)</label>
              <input type="number" className="w-full p-3 border border-surface-300 rounded-md" defaultValue={14} />
            </div>
            <div>
              <label className="block text-sm font-bold text-surface-700 mb-2">Foreign Matter (%)</label>
              <input type="number" className="w-full p-3 border border-surface-300 rounded-md" defaultValue={1.5} />
            </div>
            <div>
              <label className="block text-sm font-bold text-surface-700 mb-2">Grade</label>
              <select className="w-full p-3 border border-surface-300 rounded-md bg-white">
                <option>Grade A</option>
                <option>Grade B</option>
                <option>Grade C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-surface-700 mb-2">Damaged Produce (%)</label>
              <input type="number" className="w-full p-3 border border-surface-300 rounded-md" defaultValue={2} />
            </div>
          </div>

          <div className="pt-6 border-t border-surface-200">
            <h3 className="text-sm font-bold text-surface-700 uppercase tracking-wider mb-4">Inspection Result</h3>
            <div className="grid grid-cols-3 gap-4">
              <Button 
                className="h-16 bg-green-50 hover:bg-green-100 text-green-700 border-2 border-green-600 shadow-sm"
                onClick={() => handleSubmit('Accepted')}
                disabled={isSubmitting}
              >
                Accept
              </Button>
              <Button 
                className="h-16 bg-amber-50 hover:bg-amber-100 text-amber-700 border-2 border-amber-500 shadow-sm"
                onClick={() => handleSubmit('Needs Review')}
                disabled={isSubmitting}
              >
                Needs Review
              </Button>
              <Button 
                className="h-16 bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-600 shadow-sm"
                onClick={() => handleSubmit('Rejected')}
                disabled={isSubmitting}
              >
                Reject
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-surface-50 p-4 rounded-xl flex items-start border border-surface-200">
        <AlertCircle className="w-5 h-5 text-surface-500 mr-3 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-surface-600 leading-tight">
          These fields are configurable per crop and state policy. For the prototype, standard fallback values are populated.
        </p>
      </div>
    </div>
  );
}
