import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { ArrowLeft, Building2, Clock, CheckCircle, Wheat, Sprout, Leaf, CircleDot, Check } from 'lucide-react';
import { useFarmerContext } from '../../features/farmer/FarmerContext';
import { mockService } from '../../services/mockDataService';
import { cn } from '../../utils/cn';

export default function BookProcurement() {
  const navigate = useNavigate();
  const { setActiveTransaction } = useFarmerContext();
  
  const [step, setStep] = useState(1);
  const [crop, setCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [centre, setCentre] = useState('');
  const [slot, setSlot] = useState('');

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => {
    if (step === 1) navigate('/farmer');
    else setStep(s => s - 1);
  };

  const handleConfirm = async () => {
    // Generate a booking via mock service
    const booking = await mockService.createBooking({
      crop,
      expectedQuantity: Number(quantity),
      centreId: centre,
      centreName: centre === 'C_B' ? 'Centre B' : centre,
      slot,
      bookingDate: '2026-09-10',
      expectedServiceTime: '11:35 AM',
      recommendedDepartureTime: '11:01 AM',
      status: 'Confirmed'
    });
    
    setActiveTransaction(booking);
    navigate('/farmer/booking-confirmation');
  };

  const cropIcons: Record<string, React.ReactNode> = {
    Paddy: <Sprout className="w-8 h-8" />,
    Wheat: <Wheat className="w-8 h-8" />,
    Maize: <Leaf className="w-8 h-8" />,
    Onion: <CircleDot className="w-8 h-8" />
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[#f9f8f6]">
      <header className="bg-white border-b border-surface-200 px-4 py-3 flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={handleBack} className="p-2 -ml-2 text-surface-600 hover:text-surface-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="ml-2 flex flex-col">
          <h1 className="text-lg font-bold text-surface-900 leading-tight">Book Procurement</h1>
          <span className="text-xs font-medium text-surface-500">Plan your procurement visit in a few simple steps.</span>
        </div>
      </header>

      <div className="px-4 py-6 md:py-8 w-full max-w-3xl mx-auto flex-1 flex flex-col">
        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center relative max-w-xl mx-auto">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-200 z-0 rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-600 z-0 transition-all duration-500 rounded-full" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
            
            {['Crop', 'Quantity', 'Centre', 'Slot', 'Confirm'].map((label, index) => {
              const i = index + 1;
              const isCompleted = step > i;
              const isCurrent = step === i;
              
              return (
                <div key={i} className="flex flex-col items-center relative z-10">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors shadow-sm ring-4 ring-[#f9f8f6]", 
                    isCurrent ? "bg-primary-600 text-white scale-110" : 
                    isCompleted ? "bg-primary-600 text-white" : "bg-surface-200 text-surface-500"
                  )}>
                    {isCompleted ? <Check className="w-5 h-5" /> : i}
                  </div>
                  <span className={cn(
                    "absolute top-10 text-[10px] font-bold uppercase tracking-wider hidden sm:block whitespace-nowrap transition-colors",
                    isCurrent ? "text-primary-700" : isCompleted ? "text-primary-600/80" : "text-surface-400"
                  )}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Crop */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 flex-1 flex flex-col">
            <div className="text-center sm:text-left mb-2">
              <h2 className="text-2xl font-bold text-surface-900">What are you bringing today?</h2>
              <p className="text-surface-600 font-medium mt-1.5">Select the crop you want to take for procurement.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-start">
              {['Paddy', 'Wheat', 'Maize', 'Onion'].map(c => {
                const isSelected = crop === c;
                return (
                  <Card 
                    key={c} 
                    className={cn(
                      "cursor-pointer transition-all duration-200 border-2", 
                      isSelected ? "border-primary-600 bg-primary-50 shadow-md" : "border-surface-200 hover:border-primary-300 hover:bg-white bg-white shadow-sm"
                    )}
                    onClick={() => setCrop(c)}
                  >
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-full transition-colors", isSelected ? "bg-primary-100 text-primary-700" : "bg-surface-100 text-surface-500")}>
                          {cropIcons[c]}
                        </div>
                        <span className={cn("font-bold text-lg", isSelected ? "text-primary-900" : "text-surface-700")}>{c}</span>
                      </div>
                      <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", isSelected ? "border-primary-600 bg-primary-600 text-white" : "border-surface-300")}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="pt-6 mt-auto border-t border-surface-200/60">
              <Button 
                className="w-full h-14 text-lg font-bold bg-primary-600 hover:bg-primary-700 shadow-sm" 
                disabled={!crop}
                onClick={handleNext}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Quantity */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 flex-1 flex flex-col">
            <div className="text-center sm:text-left mb-2">
              <h2 className="text-2xl font-bold text-surface-900">How much are you bringing?</h2>
              <p className="text-surface-600 font-medium mt-1.5">Estimated quantity of {crop} (in Quintals).</p>
            </div>
            
            <div className="bg-white border-2 border-surface-200 rounded-xl flex items-center overflow-hidden focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-100 transition-all shadow-sm">
              <input 
                type="number" 
                className="flex-1 p-6 text-3xl font-bold outline-none w-full text-surface-900"
                placeholder="e.g. 30"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                autoFocus
              />
              <div className="bg-surface-50 px-6 py-6 font-bold text-surface-600 border-l-2 border-surface-200 text-lg">
                Quintals (Q)
              </div>
            </div>
            
            <div className="pt-6 mt-auto border-t border-surface-200/60">
              <Button 
                className="w-full h-14 text-lg font-bold bg-primary-600 hover:bg-primary-700 shadow-sm" 
                disabled={!quantity || isNaN(Number(quantity))}
                onClick={handleNext}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Centre Recommendation */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 pb-10 flex-1 flex flex-col">
            <div className="text-center sm:text-left mb-2">
              <h2 className="text-2xl font-bold text-surface-900">Select Procurement Centre</h2>
              <p className="text-surface-600 font-medium mt-1.5">We recommend the centre with the best overall journey time.</p>
            </div>

            <div className="space-y-4 flex-1 content-start">
              <Card 
                className={cn(
                  "border-2 overflow-hidden relative shadow-md cursor-pointer transition-transform hover:scale-[1.01]",
                  centre === 'C_B' ? "border-primary-600 bg-primary-50" : "border-primary-400 bg-white"
                )} 
                onClick={() => setCentre('C_B')}
              >
                <div className="bg-primary-600 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 w-fit rounded-br-xl absolute top-0 left-0 shadow-sm">
                  RECOMMENDED
                </div>
                <CardContent className="p-6 pt-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-primary-900 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary-600" />
                      Centre B
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary-800 bg-primary-100 px-3 py-1.5 rounded-full border border-primary-200">45 min total</span>
                      <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", centre === 'C_B' ? "border-primary-600 bg-primary-600 text-white" : "border-surface-300")}>
                        {centre === 'C_B' && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 divide-x divide-primary-200 text-sm bg-white rounded-lg p-3 border border-primary-100 shadow-sm">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-primary-600/80 font-bold text-[10px] uppercase tracking-wider mb-0.5">Distance</span>
                      <span className="font-bold text-primary-900 text-base">7 km</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-primary-600/80 font-bold text-[10px] uppercase tracking-wider mb-0.5">Travel</span>
                      <span className="font-bold text-primary-900 text-base">20 min</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-primary-600/80 font-bold text-[10px] uppercase tracking-wider mb-0.5">Wait</span>
                      <span className="font-bold text-primary-900 text-base">25 min</span>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-primary-200/60 text-xs text-primary-800 font-medium flex items-start bg-primary-50/50">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 text-primary-600 mt-0.5" />
                    Best overall journey. Lowest expected total time despite being farther away.
                  </div>
                </CardContent>
              </Card>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#f9f8f6] text-surface-500 font-bold text-xs uppercase tracking-wider">Other nearby options</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className={cn("cursor-pointer transition-all border-2", centre === 'C_A' ? "border-primary-600 bg-primary-50" : "border-surface-200 hover:border-primary-300 bg-white shadow-sm")} onClick={() => setCentre('C_A')}>
                  <CardContent className="p-5 relative">
                    <div className="absolute top-5 right-5">
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors", centre === 'C_A' ? "border-primary-600 bg-primary-600 text-white" : "border-surface-300")}>
                        {centre === 'C_A' && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                    <div className="flex flex-col mb-3">
                      <h3 className="font-bold text-surface-900 text-lg mb-1">Centre A</h3>
                      <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-100 px-2 py-1 rounded w-fit">145 min total</span>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-surface-600 mt-3 pt-3 border-t border-surface-100">
                      <div className="flex justify-between"><span>Distance</span><span className="font-semibold text-surface-900">3 km</span></div>
                      <div className="flex justify-between"><span>Travel</span><span className="font-semibold text-surface-900">15 min</span></div>
                      <div className="flex justify-between"><span>Wait</span><span className="font-semibold text-red-600">130 min (High)</span></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={cn("cursor-pointer transition-all border-2", centre === 'C_C' ? "border-primary-600 bg-primary-50" : "border-surface-200 hover:border-primary-300 bg-white shadow-sm")} onClick={() => setCentre('C_C')}>
                  <CardContent className="p-5 relative">
                    <div className="absolute top-5 right-5">
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors", centre === 'C_C' ? "border-primary-600 bg-primary-600 text-white" : "border-surface-300")}>
                        {centre === 'C_C' && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                    <div className="flex flex-col mb-3">
                      <h3 className="font-bold text-surface-900 text-lg mb-1">Centre C</h3>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-1 rounded w-fit">75 min total</span>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-surface-600 mt-3 pt-3 border-t border-surface-100">
                      <div className="flex justify-between"><span>Distance</span><span className="font-semibold text-surface-900">9 km</span></div>
                      <div className="flex justify-between"><span>Travel</span><span className="font-semibold text-surface-900">30 min</span></div>
                      <div className="flex justify-between"><span>Wait</span><span className="font-semibold text-amber-600">45 min</span></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="pt-6 mt-auto border-t border-surface-200/60">
              <Button 
                className="w-full h-14 text-lg font-bold bg-primary-600 hover:bg-primary-700 shadow-sm" 
                disabled={!centre}
                onClick={handleNext}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Smart Slot Selection */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 flex-1 flex flex-col pb-10">
            <div className="text-center sm:text-left mb-2">
              <h2 className="text-2xl font-bold text-surface-900">Select Arrival Slot</h2>
              <p className="text-surface-600 font-medium mt-1.5 flex items-center justify-center sm:justify-start gap-1.5">
                <Clock className="w-4 h-4 text-surface-400" />
                10 September 2026
              </p>
            </div>

            <div className="space-y-3 flex-1 content-start">
              {[
                { time: '09:00 AM', status: 'Almost full', style: 'opacity-60 bg-surface-50 border-surface-200' },
                { time: '09:40 AM', status: 'Moderate', style: 'border-surface-200 bg-white hover:border-primary-300' },
                { time: '10:40 AM', status: 'Recommended', style: 'border-primary-500 bg-primary-50', highlight: true },
                { time: '11:40 AM', status: 'Available', style: 'border-surface-200 bg-white hover:border-primary-300' },
                { time: '12:20 PM', status: 'Available', style: 'border-surface-200 bg-white hover:border-primary-300' },
              ].map(s => {
                const isSelected = slot === s.time;
                return (
                  <Card 
                    key={s.time} 
                    className={cn(
                      "cursor-pointer transition-all border-2 shadow-sm", 
                      s.style, 
                      isSelected ? "border-primary-600 bg-primary-50 ring-2 ring-primary-100" : ""
                    )}
                    onClick={() => setSlot(s.time)}
                  >
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className={cn("w-6 h-6 mr-4", s.highlight || isSelected ? "text-primary-600" : "text-surface-400")} />
                        <div className="flex flex-col">
                          <span className={cn("font-bold text-lg leading-tight", isSelected ? "text-primary-900" : "text-surface-900")}>{s.time}</span>
                          {s.highlight && <span className="text-[11px] font-medium text-primary-700 mt-0.5">Recommended based on centre workload</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {s.highlight && !isSelected && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-100 px-2.5 py-1 rounded-full hidden sm:block">Recommended</span>
                        )}
                        {!s.highlight && (
                          <span className={cn("text-xs font-bold uppercase tracking-wider hidden sm:block", s.status === 'Almost full' ? 'text-red-500' : 'text-surface-400')}>{s.status}</span>
                        )}
                        
                        <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0", isSelected ? "border-primary-600 bg-primary-600 text-white" : "border-surface-300")}>
                          {isSelected && <Check className="w-4 h-4" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="pt-6 mt-auto border-t border-surface-200/60">
              <Button 
                className="w-full h-14 text-lg font-bold bg-primary-600 hover:bg-primary-700 shadow-sm" 
                disabled={!slot}
                onClick={handleNext}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Confirm */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 flex-1 flex flex-col pb-10">
            <div className="text-center sm:text-left mb-2">
              <h2 className="text-2xl font-bold text-surface-900">Confirm Booking</h2>
              <p className="text-surface-600 font-medium mt-1.5">Please review your procurement details.</p>
            </div>

            <Card className="bg-white border-2 border-surface-200 shadow-md rounded-xl overflow-hidden">
              <div className="bg-primary-700 px-6 py-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary-200" />
                <h3 className="text-white font-bold text-lg">Ready to confirm</h3>
              </div>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-surface-100 border-b border-surface-100">
                  <div className="p-6 flex flex-col col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-surface-500 uppercase tracking-wider font-bold mb-1.5">Crop</span>
                    <span className="font-bold text-surface-900 text-lg flex items-center gap-2">
                      {cropIcons[crop]} {crop}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-surface-500 uppercase tracking-wider font-bold mb-1.5">Quantity</span>
                    <span className="font-bold text-surface-900 text-lg">{quantity} Quintals</span>
                  </div>
                </div>
                
                <div className="p-6 border-b border-surface-100">
                  <span className="text-[10px] text-surface-500 uppercase tracking-wider font-bold mb-1.5 block">Centre</span>
                  <div className="font-bold text-surface-900 text-lg flex items-center gap-3">
                    <div className="bg-surface-100 p-2.5 rounded-lg">
                      <Building2 className="w-5 h-5 text-surface-600" />
                    </div>
                    {centre === 'C_B' ? 'Centre B' : centre}
                  </div>
                </div>
                
                <div className="p-6 bg-surface-50">
                  <span className="text-[10px] text-surface-500 uppercase tracking-wider font-bold mb-1.5 block">Date & Slot</span>
                  <div className="font-bold text-surface-900 text-lg flex items-center gap-3">
                    <div className="bg-white p-2.5 rounded-lg border border-surface-200 shadow-sm">
                      <Clock className="w-5 h-5 text-surface-600" />
                    </div>
                    <div>
                      <div>10 Sep 2026</div>
                      <div className="text-primary-700">{slot}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pt-6 mt-auto">
              <Button 
                className="w-full h-14 text-lg font-bold bg-primary-600 hover:bg-primary-700 shadow-md" 
                onClick={handleConfirm}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
