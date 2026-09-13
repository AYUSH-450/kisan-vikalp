import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, Search, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { mockService } from '../../services/mockDataService';
import { useOfficerContext } from '../../features/officer/OfficerContext';

export default function Scanner() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { setActiveTransaction } = useOfficerContext();
  const [txId, setTxId] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleVerify = async (id: string) => {
    try {
      // Use mock secure reference SP-TX938421-SECURE or plain TX938421
      const tx = await mockService.verifySecureToken(id);
      setActiveTransaction(tx);
      addToast({ type: 'success', title: 'Verified', message: 'Transaction verified successfully.' });
      navigate('/officer/transaction');
    } catch (err) {
      addToast({ type: 'error', title: 'Verification Failed', message: 'Invalid token or transaction not found.' });
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleVerify('SP-TX938421-SECURE');
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4 sm:space-y-6 w-full overflow-hidden">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-2 truncate">Scan Farmer Procurement Pass</h1>
        <p className="text-sm sm:text-base text-surface-500">Position the farmer's PDF417 pass inside the frame.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Camera Viewport Mock */}
        <Card className="bg-surface-900 border-0 shadow-xl overflow-hidden relative aspect-square md:aspect-auto md:h-[400px] flex items-center justify-center">
          {/* Scanning frame brackets */}
          <div className="absolute w-64 h-32 border-2 border-primary-500 rounded-xl">
             <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary-400 rounded-tl-xl bg-surface-900"></div>
             <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary-400 rounded-tr-xl bg-surface-900"></div>
             <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary-400 rounded-bl-xl bg-surface-900"></div>
             <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary-400 rounded-br-xl bg-surface-900"></div>
             
             {isScanning && (
               <div className="absolute top-0 left-0 w-full h-0.5 bg-primary-400 shadow-[0_0_8px_2px_#4ade80] animate-[scan_1.5s_ease-in-out_infinite]"></div>
             )}
          </div>
          
          <Button 
            className="absolute bottom-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm z-10"
            onClick={simulateScan}
            disabled={isScanning}
          >
            <ScanLine className="w-5 h-5 mr-2" />
            {isScanning ? 'Scanning...' : 'Simulate Scan Demo'}
          </Button>
        </Card>

        {/* Fallback Input */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border-surface-200">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-surface-900 mb-4">Manual Entry</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">Enter Transaction ID</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-surface-300 rounded-md leading-5 bg-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase font-mono"
                      placeholder="e.g. TX938421"
                      value={txId}
                      onChange={(e) => setTxId(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-primary-600 hover:bg-primary-700 h-12"
                  disabled={!txId}
                  onClick={() => handleVerify(txId)}
                >
                  Verify Transaction
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-blue-50 p-4 rounded-xl flex items-start border border-blue-100">
            <ShieldCheck className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 leading-tight">
              PDF417 scans securely verify the transaction reference token. No Aadhaar or banking data is stored in the barcode itself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
