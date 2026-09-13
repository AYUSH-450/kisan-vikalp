import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Eye, EyeOff, Barcode, Clock, Activity, CheckSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';

export default function OfficerLogin() {
  const { login, demoLoginOfficer } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (empId === 'OP-10284' && password === 'demo123') {
      setShowOtp(true);
      addToast({ type: 'info', title: 'Security Check', message: 'Enter demo OTP: 123456' });
    } else {
      addToast({ type: 'error', title: 'Invalid Credentials', message: 'Please try again.' });
    }
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
      login({ id: "OP-10284", name: "Procurement Officer", role: "officer", centre: "Centre B" });
      navigate('/officer');
    }, 600);
  };

  const handleDemo = () => {
    demoLoginOfficer();
    navigate('/officer');
  };

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col lg:flex-row font-sans w-full overflow-hidden">
      {/* Left Sidebar - Desktop Only */}
      <div className="hidden lg:flex flex-col justify-between w-[400px] xl:w-1/3 bg-surface-900 text-white p-10 border-r border-surface-800 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            <span className="font-bold text-2xl tracking-tight">Kisan Vikalp</span>
          </div>
          
          <div className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 border border-amber-500/30">
            PROCUREMENT CENTRE PORTAL
          </div>
          
          <h1 className="text-4xl font-black mb-8 leading-tight">Keep the queue moving.</h1>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-surface-300">
              <Barcode className="w-6 h-6 text-amber-500" />
              <span className="text-lg">Secure PDF417 Verification</span>
            </div>
            <div className="flex items-center gap-4 text-surface-300">
              <Clock className="w-6 h-6 text-amber-500" />
              <span className="text-lg">Live Queue Management</span>
            </div>
            <div className="flex items-center gap-4 text-surface-300">
              <CheckSquare className="w-6 h-6 text-amber-500" />
              <span className="text-lg">Quality & Weighing</span>
            </div>
            <div className="flex items-center gap-4 text-surface-300">
              <Activity className="w-6 h-6 text-amber-500" />
              <span className="text-lg">Procurement Workflow</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-surface-500">
          Prototype authentication — production deployment would use secure server-side identity verification.
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header / Portal Switcher */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-surface-500 hover:text-surface-900 flex items-center text-sm font-medium self-start sm:self-auto">
            <ArrowLeft className="w-4 h-4 mr-2" /> <span className="hidden sm:inline">Switch Portal</span><span className="sm:hidden">Back</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-bold text-surface-400 uppercase tracking-widest w-full sm:w-auto">
            <Link to="/login/farmer" className="hover:text-surface-900 pb-1">Farmer</Link>
            <span className="text-amber-600 border-b-2 border-amber-600 pb-1">Officer</span>
            <Link to="/login/admin" className="hover:text-surface-900 pb-1">Govt</Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-sm sm:max-w-md mx-auto">
            <div className="lg:hidden text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 bg-amber-100 rounded-xl mx-auto flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-amber-700" />
              </div>
              <div className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-4">
                PROCUREMENT CENTRE
              </div>
              <h1 className="text-2xl font-bold text-surface-900 mb-2">Officer Sign In</h1>
              <p className="text-surface-600 text-sm">Secure access to centre operations.</p>
            </div>

            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl font-bold text-surface-900 mb-2">Officer Sign In</h2>
              <p className="text-surface-600">Secure access to centre operations.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-surface-200">
              {!showOtp ? (
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                  <div>
                    <label htmlFor="empId" className="block text-sm font-medium text-surface-700 mb-1">Employee ID</label>
                    <input
                      type="text"
                      id="empId"
                      required
                      className="block w-full rounded-lg border-surface-300 px-3 py-2 border focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      placeholder="OP-10284"
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-surface-700 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        required
                        className="block w-full rounded-lg border-surface-300 px-3 py-2 border focus:ring-amber-500 focus:border-amber-500 sm:text-sm pr-10"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-surface-400 hover:text-surface-600"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2 sm:gap-0">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-surface-300 text-amber-600 focus:ring-amber-500" />
                      <span className="ml-2 text-surface-600">Remember this device</span>
                    </label>
                    <span className="text-amber-600 hover:text-amber-700 font-medium cursor-pointer self-start sm:self-auto">Forgot password?</span>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full bg-surface-900 hover:bg-surface-800 text-white font-bold py-2.5 rounded-lg transition text-sm">
                      Sign In
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-surface-900 mb-2">Verify your identity</h3>
                    <p className="text-sm text-surface-600 mb-6">Enter the verification code sent to your registered device.</p>
                    
                    <div className="flex justify-center gap-1 sm:gap-2 mb-4">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          className="w-10 sm:w-12 h-12 text-center border border-surface-300 rounded-lg text-lg font-bold focus:ring-amber-500 focus:border-amber-500"
                          value={digit}
                          onChange={(e) => {
                            const newOtp = [...otp];
                            newOtp[idx] = e.target.value;
                            setOtp(newOtp);
                            if (e.target.value && idx < 5) {
                              const next = document.getElementById(`officer-otp-${idx + 1}`);
                              if (next) next.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                              const prev = document.getElementById(`officer-otp-${idx - 1}`);
                              if (prev) prev.focus();
                            }
                          }}
                          id={`officer-otp-${idx}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-amber-600 font-bold bg-amber-50 inline-block px-2 py-1 rounded">
                      Demo OTP: 123456
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button type="submit" disabled={isVerifying} className="w-full bg-surface-900 hover:bg-surface-800 text-white font-bold py-2.5 rounded-lg transition text-sm disabled:opacity-70">
                      {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                    </button>
                    <button type="button" onClick={() => setShowOtp(false)} className="w-full bg-white border border-surface-300 text-surface-700 font-medium py-2.5 rounded-lg transition text-sm hover:bg-surface-50">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 sm:mt-8 pt-6 border-t border-surface-100">
                 <button onClick={handleDemo} className="w-full bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 font-bold py-3 rounded-lg transition text-sm shadow-sm">
                   Continue as Demo Officer
                 </button>
                 <div className="text-center mt-3 text-[10px] text-surface-400 font-bold uppercase tracking-widest">
                   Demo Mode
                 </div>
              </div>
            </div>
            
            <div className="lg:hidden text-center mt-6 text-xs text-surface-400 pb-8">
              Prototype authentication — production deployment would use secure server-side identity verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
