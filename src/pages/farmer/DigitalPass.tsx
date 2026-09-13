import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bwipjs from 'bwip-js/browser';
import { ArrowLeft, Download, Share2, ShieldCheck, Wallet, Leaf } from 'lucide-react';
import { useFarmerContext } from '../../features/farmer/FarmerContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export default function DigitalPass() {
  const navigate = useNavigate();
  const { activeTransaction } = useFarmerContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (activeTransaction && canvasRef.current) {
      try {
        bwipjs.toCanvas(canvasRef.current, {
          bcid: 'pdf417',
          text: activeTransaction.secureToken,
          scale: 2.5,
          height: 12,
          includetext: false,
          textxalign: 'center',
        });
      } catch (e) {
        console.error('Barcode rendering failed', e);
      }
    }
  }, [activeTransaction]);

  if (!activeTransaction) {
    return <div className="p-4 flex flex-col items-center mt-10">No active pass found. <Button onClick={() => navigate('/farmer')} className="mt-4">Go Home</Button></div>;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[#f9f8f6]">
      <header className="bg-white border-b border-surface-200 px-4 py-3 flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate('/farmer')} className="p-2 -ml-2 text-surface-600 hover:text-surface-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="ml-2 flex flex-col">
          <h1 className="text-lg font-bold text-surface-900 leading-tight">Digital Pass</h1>
          <span className="text-xs font-medium text-surface-500">Your confirmed procurement appointment</span>
        </div>
      </header>

      <div className="p-4 md:py-8 flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg bg-white shadow-md border border-surface-200 overflow-hidden relative animate-in slide-in-from-bottom-4 duration-500 rounded-xl">
          
          {/* Brand Header */}
          <div className="bg-primary-700 px-6 py-5 flex items-center justify-center border-b-[3px] border-primary-800">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-5 h-5 text-primary-200" />
                <h2 className="text-white font-bold text-xl tracking-tight">Kisan Vikalp</h2>
              </div>
              <p className="text-primary-100 text-[11px] font-semibold tracking-widest uppercase">PDF417 Procurement Pass</p>
            </div>
          </div>
          
          <CardContent className="p-0">
            {/* Pass details */}
            <div className="px-6 py-7 border-b border-surface-200">
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-[10px] uppercase tracking-wider text-surface-500 font-bold mb-1">Farmer</div>
                  <div className="font-semibold text-surface-900 text-lg">{activeTransaction.farmerName}</div>
                </div>
                <div className="col-span-2 sm:col-span-1 sm:text-right">
                  <div className="text-[10px] uppercase tracking-wider text-surface-500 font-bold mb-1">Transaction</div>
                  <div className="font-mono font-semibold text-surface-900 text-lg">{activeTransaction.id}</div>
                </div>
                
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-[10px] uppercase tracking-wider text-surface-500 font-bold mb-1">Crop & Quantity</div>
                  <div className="font-semibold text-surface-900 text-lg">{activeTransaction.crop} <span className="text-surface-300 font-normal mx-1">|</span> {activeTransaction.expectedQuantity} Q</div>
                </div>
                <div className="col-span-2 sm:col-span-1 sm:text-right">
                  <div className="text-[10px] uppercase tracking-wider text-surface-500 font-bold mb-1">Token</div>
                  <div className="font-black text-3xl text-primary-700 leading-none">{activeTransaction.tokenNumber}</div>
                </div>
                
                <div className="col-span-2">
                  <div className="text-[10px] uppercase tracking-wider text-surface-500 font-bold mb-1">Centre</div>
                  <div className="font-semibold text-surface-900 text-lg">{activeTransaction.centreName}</div>
                </div>
                
                <div className="col-span-1">
                  <div className="text-[10px] uppercase tracking-wider text-surface-500 font-bold mb-1">Date</div>
                  <div className="font-semibold text-surface-900 text-lg">10 Sep 2026</div>
                </div>
                <div className="col-span-1 sm:text-right">
                  <div className="text-[10px] uppercase tracking-wider text-surface-500 font-bold mb-1">Slot</div>
                  <div className="font-semibold text-surface-900 text-lg">{activeTransaction.slot}</div>
                </div>
              </div>
            </div>

            {/* Barcode section */}
            <div className="px-6 py-8 flex flex-col items-center bg-white">
              <div className="bg-white p-6 rounded-lg border border-surface-200 mb-5 flex flex-col items-center w-full max-w-sm justify-center shadow-sm">
                <canvas ref={canvasRef} className="max-w-full h-auto object-contain"></canvas>
                <div className="mt-4 text-sm font-mono font-bold text-surface-600 tracking-[0.2em] uppercase">{activeTransaction.id}</div>
              </div>
              <p className="text-sm font-medium text-surface-700 text-center max-w-[280px]">
                Show this pass at the procurement centre counter.
              </p>
            </div>
            
            {/* Security notice */}
            <div className="bg-primary-50/50 px-6 py-4 flex items-start gap-3 border-t border-primary-100">
              <ShieldCheck className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary-800 mb-0.5">Secure Pass</span>
                <p className="text-[11px] text-primary-700/80 font-medium leading-relaxed">
                  This PDF417 barcode contains only a secure transaction reference. It does not contain Aadhaar or bank-account information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="w-full max-w-lg mt-8 flex flex-col gap-3">
          <Button className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            SAVE PASS
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 bg-white hover:bg-surface-50 border-surface-200 font-bold text-sm text-surface-700 flex items-center justify-center gap-2 shadow-sm">
              <Share2 className="w-4 h-4 text-surface-500" />
              SHARE
            </Button>
            <Button variant="outline" className="h-12 bg-white hover:bg-surface-50 border-surface-200 font-bold text-sm text-surface-600 flex items-center justify-center gap-2 shadow-sm">
              <Wallet className="w-4 h-4 text-surface-400" />
              ADD TO WALLET
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
