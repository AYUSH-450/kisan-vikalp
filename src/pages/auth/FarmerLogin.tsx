import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layers, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';

export default function FarmerLogin() {
  const { login, demoLoginFarmer } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [mobile, setMobile] = useState('');
  const [farmerId, setFarmerId] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) return;
    setShowOtp(true);
    addToast({ type: 'info', title: 'OTP Sent', message: 'Demo OTP: 123456' });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp !== '123456') {
      addToast({ type: 'error', title: 'Invalid OTP', message: 'Please enter the correct verification code.' });
      return;
    }
    
    setIsVerifying(true);
    setTimeout(() => {
      login({ id: "F12345", name: "Ramesh Kumar", role: "farmer" });
      navigate('/farmer');
    }, 600);
  };

  const handleFarmerIdLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (farmerId.toUpperCase() === 'F12345') {
      setIsVerifying(true);
      setTimeout(() => {
        login({ id: "F12345", name: "Ramesh Kumar", role: "farmer" });
        navigate('/farmer');
      }, 600);
    } else {
      addToast({ type: 'error', title: 'Invalid Credentials', message: 'Please try again.' });
    }
  };

  const handleDemo = () => {
    demoLoginFarmer();
    navigate('/farmer');
  };

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col font-sans w-full overflow-hidden">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border-b border-surface-200 shrink-0">
        <Link to="/" className="text-surface-500 hover:text-surface-900 flex items-center text-sm font-medium self-start sm:self-auto">
          <ArrowLeft className="w-4 h-4 mr-2" /> <span className="hidden sm:inline">Switch Portal</span><span className="sm:hidden">Back</span>
        </Link>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-bold text-surface-400 uppercase tracking-widest w-full sm:w-auto">
          <span className="text-primary-600 border-b-2 border-primary-600 pb-1">Farmer</span>
          <Link to="/login/officer" className="hover:text-surface-900 pb-1">Officer</Link>
          <Link to="/login/admin" className="hover:text-surface-900 pb-1">Govt</Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-sm sm:max-w-md mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-sm">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div className="inline-block bg-primary-100 text-primary-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-4">
              FARMER PORTAL
            </div>
            <h1 className="text-2xl font-bold text-surface-900 mb-2">Welcome back</h1>
            <p className="text-surface-600 text-sm">Sign in to manage your procurement journey.</p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-surface-200">
            {!showOtp ? (
              <form onSubmit={handleSendOtp} className="space-y-4 mb-6">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-surface-700 mb-1">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-surface-300 bg-surface-50 text-surface-500 text-sm shrink-0">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="mobile"
                      required
                      className="flex-1 block w-full rounded-none rounded-r-lg border-surface-300 px-3 py-2 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm min-w-0"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 rounded-lg transition text-sm">
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-surface-600 mb-4">Enter the 6-digit OTP sent to your registered mobile number.</p>
                  <div className="flex justify-center gap-1 sm:gap-2 mb-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        className="w-10 sm:w-12 h-12 text-center border border-surface-300 rounded-lg text-lg font-bold focus:ring-primary-500 focus:border-primary-500"
                        value={digit}
                        onChange={(e) => {
                          const newOtp = [...otp];
                          newOtp[idx] = e.target.value;
                          setOtp(newOtp);
                          if (e.target.value && idx < 5) {
                            const next = document.getElementById(`otp-${idx + 1}`);
                            if (next) next.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                            const prev = document.getElementById(`otp-${idx - 1}`);
                            if (prev) prev.focus();
                          }
                        }}
                        id={`otp-${idx}`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-amber-600 font-bold bg-amber-50 inline-block px-2 py-1 rounded mt-2">
                    Demo OTP: 123456
                  </div>
                </div>
                <div className="space-y-3">
                  <button type="submit" disabled={isVerifying} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 rounded-lg transition text-sm disabled:opacity-70">
                    {isVerifying ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button type="button" onClick={() => setShowOtp(false)} className="w-full bg-white border border-surface-300 text-surface-700 font-medium py-2.5 rounded-lg transition text-sm hover:bg-surface-50">
                    Resend OTP
                  </button>
                </div>
              </form>
            )}

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-surface-500">Or continue with Farmer ID</span>
              </div>
            </div>

            <form onSubmit={handleFarmerIdLogin} className="space-y-4">
              <div>
                <label htmlFor="farmerId" className="sr-only">Farmer ID</label>
                <input
                  type="text"
                  id="farmerId"
                  className="block w-full rounded-lg border-surface-300 px-3 py-2 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="F12345"
                  value={farmerId}
                  onChange={(e) => setFarmerId(e.target.value)}
                />
              </div>
              <button type="submit" disabled={isVerifying} className="w-full bg-white border border-primary-600 text-primary-700 font-bold py-2.5 rounded-lg transition text-sm hover:bg-primary-50">
                Continue
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-surface-100 space-y-3">
               <button onClick={handleDemo} className="w-full bg-surface-900 hover:bg-surface-800 text-white font-bold py-3 rounded-lg transition text-sm shadow-md">
                 Continue as Demo Farmer
               </button>
               <div className="flex justify-between items-center text-xs text-surface-500 mt-4 px-2">
                 <div className="flex gap-3">
                   <span className="text-surface-900 font-bold">English</span>
                   <span className="cursor-pointer hover:text-surface-900">हिन्दी</span>
                 </div>
                 <span className="cursor-pointer hover:text-surface-900 underline">Need help?</span>
               </div>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-surface-400 pb-8">
            <span className="uppercase tracking-widest font-bold">Demo Mode</span>
            <p className="mt-1">Prototype authentication — production deployment would use secure server-side identity verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
