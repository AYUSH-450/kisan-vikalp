import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, User, Package, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';
import { useOfficerContext } from '../../features/officer/OfficerContext';
import { mockService } from '../../services/mockDataService';

export default function TransactionDetails() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { activeTransaction, setActiveTransaction } = useOfficerContext();
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  if (!activeTransaction) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">No Transaction Selected</h2>
        <Button onClick={() => navigate('/officer/scanner')}>Go to Scanner</Button>
      </div>
    );
  }

  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    try {
      const updated = await mockService.checkInFarmer(activeTransaction.id);
      setActiveTransaction(updated);
      addToast({ 
        type: 'success', 
        title: 'Check-In Successful', 
        message: `${activeTransaction.farmerName} has been checked in.` 
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to check in.' });
    } finally {
      setIsCheckingIn(false);
    }
  };

  const isConfirmed = activeTransaction.status === 'Confirmed';

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {isConfirmed ? (
             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
               <CheckCircle2 className="w-6 h-6 text-green-600" />
             </div>
          ) : (
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
               {activeTransaction.tokenNumber}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-surface-900">
              {isConfirmed ? 'Transaction Verified' : `Transaction: ${activeTransaction.id}`}
            </h1>
            <p className="text-surface-500 font-mono text-sm">{activeTransaction.id}</p>
          </div>
        </div>
        <Badge variant={isConfirmed ? 'outline' : 'success'} className="text-sm px-3 py-1">
          {activeTransaction.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border-surface-200">
          <div className="px-5 py-3 border-b border-surface-100 bg-surface-50 flex items-center">
            <User className="w-4 h-4 mr-2 text-surface-500" />
            <h3 className="font-semibold text-surface-700 text-sm uppercase tracking-wider">Farmer Details</h3>
          </div>
          <CardContent className="p-5 space-y-4">
            <div>
              <div className="text-xs text-surface-500 mb-1">Name</div>
              <div className="font-bold text-surface-900 text-lg">{activeTransaction.farmerName}</div>
            </div>
            <div>
              <div className="text-xs text-surface-500 mb-1">Farmer ID</div>
              <div className="font-medium text-surface-700 font-mono">{activeTransaction.farmerId}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-surface-200">
          <div className="px-5 py-3 border-b border-surface-100 bg-surface-50 flex items-center">
            <Package className="w-4 h-4 mr-2 text-surface-500" />
            <h3 className="font-semibold text-surface-700 text-sm uppercase tracking-wider">Procurement Details</h3>
          </div>
          <CardContent className="p-5 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-surface-500 mb-1">Crop</div>
              <div className="font-bold text-surface-900 text-lg">{activeTransaction.crop}</div>
            </div>
            <div>
              <div className="text-xs text-surface-500 mb-1">Expected Quantity</div>
              <div className="font-bold text-surface-900 text-lg">{activeTransaction.expectedQuantity} Q</div>
            </div>
            <div className="col-span-2 pt-2 border-t border-surface-100 flex gap-6">
              <div>
                <div className="text-xs text-surface-500 mb-1">Token Number</div>
                <div className="font-bold text-primary-700 text-xl">{activeTransaction.tokenNumber}</div>
              </div>
              <div>
                <div className="text-xs text-surface-500 mb-1 flex items-center"><Clock className="w-3 h-3 mr-1" /> Slot</div>
                <div className="font-bold text-surface-900 text-lg">{activeTransaction.slot}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 pt-4 border-t border-surface-200">
        {isConfirmed && (
          <Button 
            className="flex-1 bg-primary-600 hover:bg-primary-700 h-14 text-lg shadow-md"
            onClick={handleCheckIn}
            disabled={isCheckingIn}
          >
            {isCheckingIn ? 'Checking In...' : 'Check In Farmer'}
          </Button>
        )}
        
        {!isConfirmed && (
          <Button 
            className="flex-1 bg-surface-900 text-white hover:bg-surface-800 h-14 text-lg shadow-md"
            onClick={() => navigate('/officer/procurement')}
          >
            Continue Workflow <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}
        
        <Button 
          variant="outline" 
          className="flex-1 h-14 text-lg bg-white"
          onClick={() => navigate('/officer')}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
