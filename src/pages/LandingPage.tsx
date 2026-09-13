import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  ArrowRight, 
  Zap,
  Globe2,
  Menu,
  X,
  Send,
  CheckCircle2,
  MapPin,
  Barcode
} from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Colors
  const theme = {
    bg: 'bg-[#F8F7F3]', // Warm ivory
    textMain: 'text-[#1C2B23]', // Dark green-black
    textMuted: 'text-[#4A5D53]', // Muted sage/grey
    primary: 'text-[#0F3D26]', // Deep agricultural green
    primaryBg: 'bg-[#0F3D26]',
    secondary: 'text-[#15803D]', // Leaf green
    secondaryBg: 'bg-[#15803D]',
    accent: 'text-[#C2410C]', // Warm harvest orange
    accentBg: 'bg-[#C2410C]',
    border: 'border-[#E6E4DE]'
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textMain} font-sans selection:bg-[#15803D]/20 overflow-x-hidden`}>
      
      {/* 1. TOP GOVERNMENT STRIP */}
      <div className={`${theme.primaryBg} text-white/90 py-1.5 px-4 sm:px-6 lg:px-8 text-[10px] sm:text-xs font-medium tracking-wide flex flex-col sm:flex-row justify-between items-center relative z-50`}>
        <div className="flex items-center gap-2">
          <span>SMART INDIA HACKATHON 2026</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">DIGITAL AGRICULTURE & PROCUREMENT</span>
        </div>
        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <span>DEMONSTRATION ENVIRONMENT</span>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className={`sticky top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[#F8F7F3]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#E6E4DE]' : 'bg-[#F8F7F3] py-5 border-b border-transparent'}`}>
        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Group */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${theme.secondaryBg} flex items-center justify-center shadow-sm`}>
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none tracking-tight">Kisan Vikalp</span>
                <span className="text-[9px] font-bold text-[#83968B] tracking-widest mt-1 uppercase">कृषि • Procurement • Technology</span>
              </div>
            </div>
            
            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#farmer-journey" className={`text-sm font-semibold ${theme.textMuted} hover:${theme.primary} transition-colors`}>Farmer Journey</a>
              <a href="#intelligence" className={`text-sm font-semibold ${theme.textMuted} hover:${theme.primary} transition-colors`}>How It Works</a>
              <a href="#operations" className={`text-sm font-semibold ${theme.textMuted} hover:${theme.primary} transition-colors`}>Operations</a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/login/farmer" className={`text-sm font-semibold ${theme.textMain} hover:${theme.secondary} transition-colors`}>
                Login
              </Link>
              <Link to="/login/farmer" className={`text-sm font-bold px-5 py-2.5 rounded-lg ${theme.primaryBg} text-white hover:bg-[#0A291A] transition-colors flex items-center gap-2 shadow-sm`}>
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-[#E6E4DE]/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#F8F7F3] border-b border-[#E6E4DE] shadow-xl py-4 px-4 flex flex-col gap-2 z-40">
            <a href="#farmer-journey" className="font-semibold p-3 rounded hover:bg-[#E6E4DE]/50" onClick={() => setMobileMenuOpen(false)}>Farmer Journey</a>
            <a href="#intelligence" className="font-semibold p-3 rounded hover:bg-[#E6E4DE]/50" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#operations" className="font-semibold p-3 rounded hover:bg-[#E6E4DE]/50" onClick={() => setMobileMenuOpen(false)}>Operations</a>
            <div className="h-px bg-[#E6E4DE] my-2"></div>
            <Link to="/login/farmer" className={`font-bold p-3 rounded text-center ${theme.primaryBg} text-white mb-2`} onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
          </div>
        )}
      </nav>

      <main>
        {/* 3. HERO SECTION */}
        <section className="relative pt-8 pb-12 lg:pt-12 lg:pb-20 overflow-hidden">
          <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Typography & CTAs */}
              <div className="lg:col-span-5 flex flex-col items-start z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D1CFCA] bg-white/60 backdrop-blur-sm mb-8 shadow-sm">
                  <Zap className={`w-3 h-3 ${theme.secondary}`} />
                  <span className={`text-[10px] font-bold ${theme.primary} tracking-widest uppercase`}>
                    SMART INDIA HACKATHON 2026 • SIH26032
                  </span>
                </div>
                
                {/* Headline */}
                <h1 className={`text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight mb-6 leading-[1.05] ${theme.primary}`}>
                  From uncertainty<br/>to <span className={theme.accent}>predictable</span><br/>procurement.
                </h1>
                
                {/* Description */}
                <p className={`text-lg sm:text-xl ${theme.textMuted} mb-10 leading-relaxed max-w-lg font-medium`}>
                  Kisan Vikalp helps farmers know where to go, when to arrive, what is happening in the queue, and when they will be paid.
                </p>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <a href="#farmer-journey" className={`px-6 py-3.5 rounded-lg border-2 ${theme.primaryBg} border-[#0F3D26] text-white font-bold text-center hover:bg-[#0A291A] transition-colors shadow-sm`}>
                    EXPLORE FARMER JOURNEY
                  </a>
                  <Link to="/login/farmer" className={`px-6 py-3.5 rounded-lg border-2 border-[#D1CFCA] bg-white font-bold text-center hover:bg-[#F0EFEA] transition-colors flex items-center justify-center gap-2`}>
                    OPEN A PORTAL <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Composition */}
              <div className="lg:col-span-7 relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group bg-[#0F3D26]">
                {/* Authentic Agricultural Background Image (muted) */}
                <div className="absolute inset-0 opacity-[0.35]" 
                     style={{ 
                       backgroundImage: 'url("https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=2000")',
                       backgroundSize: 'cover',
                       backgroundPosition: 'center 30%',
                     }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D26] via-[#0F3D26]/20 to-transparent"></div>

                {/* Overlapping Product UI Cards */}
                <div className="relative z-10 w-full max-w-lg px-4 sm:px-0 flex flex-col gap-4 transform transition-transform duration-700 group-hover:scale-[1.02]">
                  
                  {/* Card 1: Active Procurement / Recommendation */}
                  <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/40 shadow-xl overflow-hidden">
                    <div className="p-4 sm:p-5 border-b border-[#E6E4DE] flex justify-between items-center bg-white">
                      <div>
                        <div className="text-[10px] font-bold text-[#83968B] tracking-widest uppercase mb-1">ACTIVE PROCUREMENT</div>
                        <div className="text-xl font-bold text-[#1C2B23]">Paddy · 30 Q</div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#15803D] text-xs font-bold border border-[#A7F3D0]">
                        <div className="w-2 h-2 bg-[#15803D] rounded-full animate-pulse"></div>
                        Live
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-5 bg-gradient-to-br from-[#F8F7F3] to-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-[10px] font-bold text-[#15803D] tracking-widest uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> RECOMMENDED CENTRE
                        </div>
                      </div>
                      
                      <div className="text-2xl font-bold text-[#1C2B23] mb-4">Centre B</div>
                      
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-[#E6E4DE] bg-white rounded-lg border border-[#E6E4DE] p-3 sm:p-4 shadow-sm">
                        <div className="text-center px-1">
                          <div className="text-[10px] font-bold text-[#83968B] uppercase tracking-wider mb-1">Travel</div>
                          <div className="text-lg font-bold text-[#1C2B23]">18<span className="text-sm text-[#4A5D53] ml-0.5">min</span></div>
                        </div>
                        <div className="text-center px-1">
                          <div className="text-[10px] font-bold text-[#83968B] uppercase tracking-wider mb-1">Queue</div>
                          <div className="text-lg font-bold text-[#1C2B23]">24<span className="text-sm text-[#4A5D53] ml-0.5">min</span></div>
                        </div>
                        <div className="text-center px-1">
                          <div className="text-[10px] font-bold text-[#15803D] uppercase tracking-wider mb-1">Total</div>
                          <div className="text-xl font-bold text-[#15803D]">48<span className="text-sm ml-0.5">min</span></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-[#E6E4DE] text-[10px] font-bold text-[#4A5D53] tracking-wide uppercase text-center">
                        Best overall journey · 97 min faster than nearest centre
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Departure Guidance */}
                  <div className={`w-4/5 sm:w-3/4 self-end ${theme.primaryBg} rounded-xl shadow-xl overflow-hidden border border-[#15803D]/30 relative`}>
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Send className="w-24 h-24" />
                    </div>
                    <div className="p-5 sm:p-6 relative z-10">
                      <div className="text-[10px] font-bold text-[#A7F3D0] tracking-widest uppercase mb-1">DEPARTURE GUIDANCE</div>
                      <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">11:01 AM</div>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#C2410C] text-white text-xs font-bold tracking-wider uppercase shadow-inner mb-4">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        LEAVE NOW
                      </div>
                      
                      <p className="text-xs text-[#A7F3D0]/80 font-medium border-t border-white/10 pt-3">
                        Expected service: <span className="text-white font-bold">11:35 AM</span>
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. VALUE PROPOSITION CARD */}
        <section className="pb-16 lg:pb-24 pt-4">
          <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`${theme.primaryBg} rounded-2xl p-10 sm:p-16 lg:p-20 shadow-xl border border-[#15803D]/20 flex flex-col lg:flex-row gap-16 lg:items-center relative overflow-hidden`}>
              {/* Subtle background texture */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
              
              <div className="lg:w-2/5 relative z-10">
                <div className="text-[10px] font-bold text-[#A7F3D0] uppercase tracking-widest mb-4">THE KISAN VIKALP PROMISE</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  <span className="block mb-2">Know <span className="text-[#A7F3D0]">WHERE</span> to go.</span>
                  <span className="block mb-2">Know <span className="text-[#A7F3D0]">WHEN</span> to go.</span>
                  <span className="block">Know <span className="text-[#A7F3D0]">WHAT</span> is happening.</span>
                </h2>
              </div>
              
              <div className="lg:w-3/5 flex flex-col justify-center gap-6 sm:gap-8 relative z-10 lg:pl-12 lg:border-l border-[#15803D]/50">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 sm:items-center">
                  <div className="w-16 text-[10px] font-bold text-[#A7F3D0]/70 tracking-widest uppercase shrink-0">WHERE</div>
                  <h3 className="text-white font-bold text-lg leading-tight">Smart Centre Recommendation</h3>
                </div>
                <div className="w-full h-px bg-[#15803D]/30"></div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 sm:items-center">
                  <div className="w-16 text-[10px] font-bold text-[#A7F3D0]/70 tracking-widest uppercase shrink-0">WHEN</div>
                  <h3 className="text-white font-bold text-lg leading-tight">Smart Slot + Departure Guidance</h3>
                </div>
                <div className="w-full h-px bg-[#15803D]/30"></div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 sm:items-center">
                  <div className="w-16 text-[10px] font-bold text-[#A7F3D0]/70 tracking-widest uppercase shrink-0">WHAT</div>
                  <h3 className="text-white font-bold text-lg leading-tight">Virtual Queue + Procurement Timeline</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHERE: SMART CENTRE RECOMMENDATION */}
        <section id="where" className="py-24 bg-white border-b border-[#E6E4DE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-[10px] font-bold text-[#15803D] uppercase tracking-widest mb-4">WHERE</div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2B23] mb-6 leading-tight">
                  Don't just find the nearest centre. <br/>
                  <span className={theme.secondary}>Find the better journey.</span>
                </h2>
                <p className="text-lg text-[#4A5D53] leading-relaxed font-medium">
                  Kisan Vikalp considers travel time, expected queue, centre capacity and service conditions—not distance alone. We evaluate the entire network to minimize total wait time.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 relative">
                {/* Centre A */}
                <div className="bg-[#F8F7F3] border border-[#D1CFCA] rounded-xl p-6 shadow-sm flex flex-col relative opacity-80">
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-[10px] font-bold text-[#83968B] uppercase shadow-sm">Closer</div>
                  <h3 className="text-xl font-bold text-[#1C2B23] mb-1">Centre A</h3>
                  <div className="text-sm text-[#4A5D53] mb-6 flex items-center gap-1"><MapPin className="w-3 h-3"/> 12 km</div>
                  
                  <div className="space-y-2 flex-grow">
                    <div className="text-[10px] uppercase font-bold text-[#83968B] tracking-wider">Expected Queue</div>
                    <div className="text-xl font-semibold text-[#1C2B23]">127 min</div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-[#D1CFCA]">
                    <div className="text-[10px] uppercase font-bold text-[#83968B] tracking-wider mb-1">Total Journey</div>
                    <div className="text-2xl font-bold text-[#C2410C]">145 min</div>
                  </div>
                </div>

                {/* Centre B */}
                <div className="bg-white border-2 border-[#15803D] rounded-xl p-6 shadow-lg flex flex-col relative transform sm:-translate-y-4">
                  <div className="absolute top-4 right-4 bg-[#ECFDF5] border border-[#15803D]/20 px-2 py-1 rounded text-[10px] font-bold text-[#15803D] uppercase shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Recommended
                  </div>
                  <h3 className="text-xl font-bold text-[#1C2B23] mb-1">Centre B</h3>
                  <div className="text-sm text-[#4A5D53] mb-6 flex items-center gap-1"><MapPin className="w-3 h-3"/> 18 km</div>
                  
                  <div className="space-y-2 flex-grow">
                    <div className="text-[10px] uppercase font-bold text-[#83968B] tracking-wider">Expected Queue</div>
                    <div className="text-xl font-semibold text-[#1C2B23]">24 min</div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-[#E6E4DE]">
                    <div className="text-[10px] uppercase font-bold text-[#15803D] tracking-wider mb-1">Total Journey</div>
                    <div className="text-3xl font-black text-[#15803D] mb-1">48 min</div>
                  </div>
                </div>
                
                <div className="sm:col-span-2 text-center text-xs font-bold text-[#4A5D53] mt-2">
                  Best overall journey — travel time + expected queue.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. WHEN: DEPARTURE GUIDANCE */}
        <section id="when" className="py-24 bg-[#F8F7F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              
              <div className="md:col-span-7 pr-8">
                <div className="text-[10px] font-bold text-[#15803D] uppercase tracking-widest mb-4">WHEN</div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2B23] mb-6 leading-tight">
                  Your slot is not <br className="hidden sm:block"/>the whole journey.
                </h2>
                <p className="text-xl text-[#4A5D53] font-medium leading-relaxed max-w-lg mb-8">
                  A booking tells you when. Kisan Vikalp helps you know when to leave.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D] mr-3 shrink-0 mt-0.5" />
                    <span className="text-[#1C2B23] font-semibold">Eliminate hours of waiting outside the gate.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D] mr-3 shrink-0 mt-0.5" />
                    <span className="text-[#1C2B23] font-semibold">Dynamic push notifications alert you when to depart.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D] mr-3 shrink-0 mt-0.5" />
                    <span className="text-[#1C2B23] font-semibold">Live recalculation based on actual centre processing speeds.</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-5">
                <div className="bg-white border border-[#E6E4DE] shadow-xl rounded-xl p-6 sm:p-8">
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 items-stretch">
                      <div className="flex flex-col items-center justify-between py-2">
                        <div className="w-2 h-2 rounded-full bg-[#1C2B23]"></div>
                        <div className="w-px h-full bg-[#E6E4DE] my-1"></div>
                        <div className="w-2 h-2 rounded-full bg-[#1C2B23]"></div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="bg-[#F8F7F3] rounded p-3 flex justify-between items-center border border-[#E6E4DE]">
                          <span className="text-xs font-bold text-[#83968B] uppercase tracking-wider">Travel</span>
                          <span className="font-bold text-[#1C2B23]">18 min</span>
                        </div>
                        <div className="bg-[#F8F7F3] rounded p-3 flex justify-between items-center border border-[#E6E4DE]">
                          <span className="text-xs font-bold text-[#83968B] uppercase tracking-wider">Queue</span>
                          <span className="font-bold text-[#1C2B23]">24 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-5 h-5 text-[#83968B] rotate-90 mb-2" />
                    </div>

                    <div className="text-center pb-6 border-b border-[#E6E4DE]">
                      <div className="text-[10px] font-bold text-[#83968B] uppercase tracking-widest mb-1">EXPECTED SERVICE</div>
                      <div className="text-3xl font-bold text-[#1C2B23]">11:35 AM</div>
                    </div>

                    <div className="text-center pt-2">
                      <div className="text-[10px] font-bold text-[#C2410C] uppercase tracking-widest mb-2">RECOMMENDED DEPARTURE</div>
                      <div className="text-4xl font-black text-[#C2410C] mb-4">11:01 AM</div>
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C2410C] text-white text-sm font-bold rounded shadow-sm uppercase tracking-wider">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        LEAVE NOW
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. WHAT: FARMER JOURNEY */}
        <section id="farmer-journey" className="py-32 bg-white relative border-t border-[#E6E4DE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <div className="text-[10px] font-bold text-[#15803D] uppercase tracking-widest mb-4">WHAT</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2B23] mb-6 leading-tight">One journey. <br/>Complete visibility.</h2>
              <p className="text-lg text-[#4A5D53] font-medium leading-relaxed">
                The farmer doesn't lose visibility after reaching the centre. Every stage is tracked transparently from booking to the final payment.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute left-[50%] top-[40px] bottom-[40px] w-px bg-[#E6E4DE] -translate-x-1/2"></div>
                
                {/* Step 01 */}
                <div className="flex flex-col md:text-right md:pr-12 relative">
                  <div className="md:hidden absolute left-4 top-10 bottom-[-48px] w-px bg-[#E6E4DE]"></div>
                  <div className="flex items-center md:justify-end gap-4 mb-3">
                    <div className="md:hidden w-8 h-8 rounded-full bg-[#0F3D26] text-white flex items-center justify-center font-bold text-xs shrink-0 relative z-10">01</div>
                    <h4 className="font-bold text-[#1C2B23] uppercase tracking-wide text-sm">CHOOSE</h4>
                    <div className="hidden md:flex absolute right-[-20px] w-10 h-10 rounded-full bg-[#0F3D26] text-white items-center justify-center font-bold text-sm shadow-sm z-10">01</div>
                  </div>
                  <p className="text-sm text-[#4A5D53] font-medium mb-4 pl-12 md:pl-0">Smart Centre Recommendation</p>
                  <div className="bg-[#F8F7F3] border border-[#E6E4DE] p-4 rounded-lg inline-block w-full max-w-[240px] md:ml-auto ml-12 shadow-sm text-left">
                    <div className="text-xs font-bold text-[#1C2B23] mb-1">Centre B</div>
                    <div className="text-[10px] font-bold text-[#15803D] uppercase">48 min total</div>
                  </div>
                </div>

                {/* Step 02 */}
                <div className="flex flex-col md:pl-12 relative md:mt-16">
                  <div className="md:hidden absolute left-4 top-10 bottom-[-48px] w-px bg-[#E6E4DE]"></div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="md:hidden w-8 h-8 rounded-full bg-[#0F3D26] text-white flex items-center justify-center font-bold text-xs shrink-0 relative z-10">02</div>
                    <div className="hidden md:flex absolute left-[-20px] w-10 h-10 rounded-full bg-[#0F3D26] text-white items-center justify-center font-bold text-sm shadow-sm z-10">02</div>
                    <h4 className="font-bold text-[#1C2B23] uppercase tracking-wide text-sm">BOOK</h4>
                  </div>
                  <p className="text-sm text-[#4A5D53] font-medium mb-4 pl-12 md:pl-0">Best available procurement slot</p>
                  <div className="bg-[#F8F7F3] border border-[#E6E4DE] p-4 rounded-lg inline-block w-full max-w-[240px] ml-12 md:ml-0 shadow-sm text-left">
                    <div className="text-[10px] font-bold text-[#83968B] uppercase mb-1">SLOT CONFIRMED</div>
                    <div className="text-sm font-bold text-[#1C2B23]">Nov 12 · 11:30 AM</div>
                  </div>
                </div>

                {/* Step 03 */}
                <div className="flex flex-col md:text-right md:pr-12 relative md:mt-[-32px]">
                  <div className="md:hidden absolute left-4 top-10 bottom-[-48px] w-px bg-[#E6E4DE]"></div>
                  <div className="flex items-center md:justify-end gap-4 mb-3">
                    <div className="md:hidden w-8 h-8 rounded-full bg-[#15803D] text-white flex items-center justify-center font-bold text-xs shrink-0 relative z-10">03</div>
                    <h4 className="font-bold text-[#1C2B23] uppercase tracking-wide text-sm">ARRIVE</h4>
                    <div className="hidden md:flex absolute right-[-20px] w-10 h-10 rounded-full bg-[#15803D] text-white items-center justify-center font-bold text-sm shadow-sm z-10">03</div>
                  </div>
                  <p className="text-sm text-[#4A5D53] font-medium mb-4 pl-12 md:pl-0">Secure PDF417 Procurement Pass</p>
                  <div className="bg-[#F8F7F3] border border-[#E6E4DE] p-4 rounded-lg inline-block w-full max-w-[240px] md:ml-auto ml-12 shadow-sm flex items-center gap-3">
                    <Barcode className="w-8 h-8 text-[#1C2B23] opacity-80" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-[#15803D] uppercase">PASS ACTIVE</div>
                      <div className="text-xs font-bold text-[#1C2B23]">Token: TK-992</div>
                    </div>
                  </div>
                </div>

                {/* Step 04 */}
                <div className="flex flex-col md:pl-12 relative md:mt-16">
                  <div className="md:hidden absolute left-4 top-10 bottom-[-48px] w-px bg-[#E6E4DE]"></div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="md:hidden w-8 h-8 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-bold text-xs shrink-0 relative z-10">04</div>
                    <div className="hidden md:flex absolute left-[-20px] w-10 h-10 rounded-full bg-[#C2410C] text-white items-center justify-center font-bold text-sm shadow-sm z-10">04</div>
                    <h4 className="font-bold text-[#1C2B23] uppercase tracking-wide text-sm">WAIT</h4>
                  </div>
                  <p className="text-sm text-[#4A5D53] font-medium mb-4 pl-12 md:pl-0">Live Virtual Queue + ETA</p>
                  <div className="bg-[#F8F7F3] border border-[#E6E4DE] p-4 rounded-lg inline-block w-full max-w-[240px] ml-12 md:ml-0 shadow-sm text-left">
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-lg font-bold text-[#1C2B23]">A042</div>
                      <div className="text-xs font-bold text-[#C2410C]">~24 min</div>
                    </div>
                    <div className="text-[10px] font-bold text-[#83968B] uppercase">7 farmers ahead</div>
                  </div>
                </div>

                {/* Step 05 */}
                <div className="flex flex-col md:text-right md:pr-12 relative md:mt-[-32px]">
                  <div className="md:hidden absolute left-4 top-10 bottom-[-48px] w-px bg-[#E6E4DE]"></div>
                  <div className="flex items-center md:justify-end gap-4 mb-3">
                    <div className="md:hidden w-8 h-8 rounded-full bg-[#15803D] text-white flex items-center justify-center font-bold text-xs shrink-0 relative z-10">05</div>
                    <h4 className="font-bold text-[#1C2B23] uppercase tracking-wide text-sm">PROCURE</h4>
                    <div className="hidden md:flex absolute right-[-20px] w-10 h-10 rounded-full bg-[#15803D] text-white items-center justify-center font-bold text-sm shadow-sm z-10">05</div>
                  </div>
                  <p className="text-sm text-[#4A5D53] font-medium mb-4 pl-12 md:pl-0">Quality + Weighing + Procurement</p>
                  <div className="bg-[#F8F7F3] border border-[#E6E4DE] p-4 rounded-lg inline-block w-full max-w-[240px] md:ml-auto ml-12 shadow-sm text-left">
                    <div className="text-[10px] font-bold text-[#83968B] uppercase mb-1">FINAL WEIGHMENT</div>
                    <div className="text-sm font-bold text-[#1C2B23]">29.6 Q Actual</div>
                  </div>
                </div>

                {/* Step 06 */}
                <div className="flex flex-col md:pl-12 relative md:mt-16">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="md:hidden w-8 h-8 rounded-full bg-[#15803D] text-white flex items-center justify-center font-bold text-xs shrink-0 relative z-10">06</div>
                    <div className="hidden md:flex absolute left-[-20px] w-10 h-10 rounded-full bg-[#15803D] text-white items-center justify-center font-bold text-sm shadow-sm z-10">06</div>
                    <h4 className="font-bold text-[#1C2B23] uppercase tracking-wide text-sm">GET PAID</h4>
                  </div>
                  <p className="text-sm text-[#4A5D53] font-medium mb-4 pl-12 md:pl-0">Payment status</p>
                  <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-lg inline-block w-full max-w-[240px] ml-12 md:ml-0 shadow-sm text-left">
                    <div className="text-[10px] font-bold text-[#15803D] uppercase flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3 h-3" /> PAYMENT PROCESSING
                    </div>
                    <div className="text-sm font-bold text-[#15803D]">₹64,528.00</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 8. NETWORK: GOVERNMENT OPERATIONS */}
        <section id="operations" className="py-24 bg-[#0F3D26] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="text-[10px] font-bold text-[#A7F3D0] uppercase tracking-widest mb-4">NETWORK</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                See the network before <br className="hidden sm:block"/>the queues become a problem.
              </h2>
              <p className="text-lg text-[#A7F3D0]/80 font-medium leading-relaxed max-w-xl mx-auto">
                What one farmer experiences at a centre, government teams can monitor across the network.
              </p>
            </div>

            {/* Dashboard Mockup */}
            <div className="bg-[#1C2B23] rounded-2xl border border-[#2D4537] shadow-2xl overflow-hidden flex flex-col max-w-5xl mx-auto relative">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#1C2B23] border border-[#2D4537] px-3 py-1 rounded-full text-[9px] font-bold tracking-widest text-[#FDBA74] uppercase z-20 shadow-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#FDBA74] rounded-full animate-pulse"></div> SIMULATED DEMO DATA
              </div>
              
              {/* Top Bar */}
              <div className="bg-[#0A1710] px-6 py-5 border-b border-[#2D4537] flex justify-between items-center relative z-10 mt-6 sm:mt-0">
                <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-white">
                  <Globe2 className="w-5 h-5 text-[#A7F3D0]" /> COMMAND CENTRE
                </div>
                <div className="text-xs font-bold bg-[#15803D]/20 text-[#A7F3D0] px-3 py-1 rounded border border-[#15803D]/30">LIVE</div>
              </div>

              <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#2D4537]">
                
                {/* Left Panel: KPIs */}
                <div className="p-6 grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:gap-6 bg-[#16221C]">
                  <div>
                    <div className="text-[10px] font-bold text-[#83968B] uppercase tracking-wider mb-1">Total Centres</div>
                    <div className="text-3xl font-bold text-white">128</div>
                    <div className="text-xs text-[#A7F3D0] mt-1">121 Active</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#83968B] uppercase tracking-wider mb-1">Farmers Today</div>
                    <div className="text-3xl font-bold text-white">18,420</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#83968B] uppercase tracking-wider mb-1">Network Capacity</div>
                    <div className="text-3xl font-bold text-white">76%</div>
                    <div className="w-full bg-[#2D4537] h-1.5 rounded mt-2">
                      <div className="bg-[#A7F3D0] h-1.5 rounded" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#FCA5A5] uppercase tracking-wider mb-1">High Risk Centres</div>
                    <div className="text-3xl font-bold text-[#F87171]">8</div>
                  </div>
                </div>

                {/* Center/Right Panel: Map/List visualization */}
                <div className="lg:col-span-2 p-6 bg-[#1C2B23] relative">
                  {/* Faint Map Pattern */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <h3 className="font-bold text-lg text-white">Congestion Alerts</h3>
                    <span className="text-sm font-semibold text-[#83968B]">Average Wait: 31 min</span>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="bg-[#2D4537]/40 border border-[#4A5D53]/50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white mb-1">Karnal Main Yard</div>
                        <div className="text-xs font-semibold text-[#83968B]">145 in queue • Est. Wait 180m</div>
                      </div>
                      <div className="bg-[#991B1B]/40 text-[#FCA5A5] border border-[#991B1B] text-xs font-bold px-3 py-1.5 rounded shadow-sm">CRITICAL</div>
                    </div>

                    <div className="bg-[#2D4537]/40 border border-[#4A5D53]/50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white mb-1">Taraori Sub-yard</div>
                        <div className="text-xs font-semibold text-[#83968B]">92 in queue • Est. Wait 95m</div>
                      </div>
                      <div className="bg-[#9A3412]/40 text-[#FDBA74] border border-[#9A3412] text-xs font-bold px-3 py-1.5 rounded shadow-sm">WARNING</div>
                    </div>

                    <div className="bg-[#2D4537]/40 border border-[#4A5D53]/50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white mb-1">Nilokheri Centre</div>
                        <div className="text-xs font-semibold text-[#83968B]">12 in queue • Est. Wait 15m</div>
                      </div>
                      <div className="bg-[#166534]/40 text-[#A7F3D0] border border-[#166534] text-xs font-bold px-3 py-1.5 rounded shadow-sm">OPTIMAL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. INTELLIGENCE & SECURITY */}
        <section id="intelligence" className="py-24 bg-[#F8F7F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-[10px] font-bold text-[#15803D] uppercase tracking-widest mb-4">INTELLIGENCE</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2B23] leading-tight">
                Operational intelligence.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              
              {/* Smart ETA */}
              <div className="bg-white rounded-xl border border-[#E6E4DE] p-6 sm:p-8 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-[#1C2B23] mb-2 text-lg">Smart ETA</h3>
                    <p className="text-sm font-medium text-[#4A5D53] leading-relaxed">Predict likely service time based on historical processing speeds and real-time queue lengths.</p>
                  </div>
                  <div className="bg-[#F8F7F3] rounded px-3 py-1.5 border border-[#D1CFCA] text-xs font-bold text-[#1C2B23] shadow-inner ml-4 shrink-0">
                    11:35 AM
                  </div>
                </div>
              </div>

              {/* Demand Forecast */}
              <div className="bg-white rounded-xl border border-[#E6E4DE] p-6 sm:p-8 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-[#1C2B23] mb-2 text-lg">Demand Forecast</h3>
                    <p className="text-sm font-medium text-[#4A5D53] leading-relaxed">Anticipate future centre workload to allocate resources before congestion occurs.</p>
                  </div>
                  <div className="flex items-end gap-1 h-8 ml-4 shrink-0">
                    <div className="w-2 h-4 bg-[#83968B] rounded-sm"></div>
                    <div className="w-2 h-6 bg-[#15803D] rounded-sm"></div>
                    <div className="w-2 h-8 bg-[#C2410C] rounded-sm"></div>
                  </div>
                </div>
              </div>

              {/* Centre Recommendation */}
              <div className="bg-white rounded-xl border border-[#E6E4DE] p-6 sm:p-8 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-[#1C2B23] mb-2 text-lg">Centre Recommendation</h3>
                    <p className="text-sm font-medium text-[#4A5D53] leading-relaxed">Recommend the better overall journey by calculating total time, not just geographical distance.</p>
                  </div>
                  <div className="bg-[#ECFDF5] rounded px-3 py-1.5 border border-[#A7F3D0] text-xs font-bold text-[#15803D] shadow-inner ml-4 shrink-0 whitespace-nowrap">
                    -97 min
                  </div>
                </div>
              </div>

              {/* Load Balancing */}
              <div className="bg-white rounded-xl border border-[#E6E4DE] p-6 sm:p-8 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="pr-4">
                    <h3 className="font-bold text-[#1C2B23] mb-2 text-lg">Load Balancing & Congestion</h3>
                    <p className="text-sm font-medium text-[#4A5D53] leading-relaxed">Identify pressure and redirect future demand toward available capacity.</p>
                  </div>
                  <div className="w-16 h-2 bg-[#E6E4DE] rounded-full overflow-hidden self-center shrink-0">
                    <div className="w-3/4 h-full bg-[#C2410C]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Security Block */}
            <div className="max-w-4xl mx-auto bg-white border border-[#E6E4DE] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="md:w-1/3 text-center md:text-left">
                <div className="text-[10px] font-bold text-[#15803D] uppercase tracking-widest mb-2">TRUST</div>
                <h3 className="text-xl font-bold text-[#1C2B23]">SECURE BY DESIGN</h3>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="flex items-center gap-3 text-sm font-semibold text-[#4A5D53]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> Secure Procurement Pass
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-[#4A5D53]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> Role-Based Access
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-[#4A5D53]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> No sensitive data in PDF417 barcode
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-[#4A5D53]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> Demonstration Environment
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-[#83968B] font-medium mt-6">
              The PDF417 pass contains only a secure transaction token.
            </p>
          </div>
        </section>

        {/* 10. USERS: THREE PORTALS */}
        <section className="py-24 bg-white border-t border-[#E6E4DE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-[10px] font-bold text-[#15803D] uppercase tracking-widest mb-4">USERS</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2B23] mb-6">One platform. <br className="sm:hidden"/>Three operational views.</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Farmer */}
              <div className="bg-[#F8F7F3] border border-[#E6E4DE] p-8 rounded-2xl flex flex-col items-start hover:border-[#D1CFCA] transition-colors shadow-sm">
                <h3 className="text-2xl font-bold text-[#1C2B23] mb-6">FARMER</h3>
                <ul className="space-y-4 mb-10 flex-grow text-[#4A5D53] font-medium text-sm">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span> Plan your visit.</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span> Track your queue.</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span> Follow procurement and payment.</li>
                </ul>
                <Link to="/login/farmer" className={`inline-flex items-center font-bold ${theme.primary} hover:underline w-full justify-between group`}>
                  Enter Farmer Portal <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Officer */}
              <div className="bg-[#F8F7F3] border border-[#E6E4DE] p-8 rounded-2xl flex flex-col items-start hover:border-[#D1CFCA] transition-colors shadow-sm">
                <h3 className="text-2xl font-bold text-[#1C2B23] mb-6">PROCUREMENT OFFICER</h3>
                <ul className="space-y-4 mb-10 flex-grow text-[#4A5D53] font-medium text-sm">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]"></span> Scan.</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]"></span> Verify.</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]"></span> Process.</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]"></span> Complete.</li>
                </ul>
                <Link to="/login/officer" className="inline-flex items-center font-bold text-[#C2410C] hover:underline w-full justify-between group">
                  Enter Officer Portal <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Admin */}
              <div className="bg-[#F8F7F3] border border-[#E6E4DE] p-8 rounded-2xl flex flex-col items-start hover:border-[#D1CFCA] transition-colors shadow-sm">
                <h3 className="text-2xl font-bold text-[#1C2B23] mb-6">GOVERNMENT ADMIN</h3>
                <ul className="space-y-4 mb-10 flex-grow text-[#4A5D53] font-medium text-sm">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span> Monitor centres.</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span> Forecast demand.</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span> Balance network capacity.</li>
                </ul>
                <Link to="/login/admin" className="inline-flex items-center font-bold text-[#15803D] hover:underline w-full justify-between group">
                  Enter Admin Portal <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <section className="py-32 bg-[#0F3D26] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-tight`}>
              Make procurement <br className="hidden sm:block"/>predictable.
            </h2>
            <p className="text-xl font-medium text-[#A7F3D0]/90 mb-12 leading-relaxed">
              From the first trip to the final payment, Kisan Vikalp connects farmers, procurement centres and government operations in one coordinated journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#farmer-journey" className="px-8 py-4 rounded-lg border-2 border-[#15803D] text-white font-bold text-lg hover:bg-[#15803D]/20 transition-colors shadow-sm">
                EXPLORE FARMER JOURNEY
              </a>
              <Link to="/login/farmer" className="px-8 py-4 rounded-lg border-2 border-white bg-white text-[#1C2B23] font-bold text-lg hover:bg-[#F8F7F3] transition-colors flex items-center justify-center gap-2 shadow-sm">
                OPEN A PORTAL <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 12. FOOTER */}
      <footer className={`${theme.primaryBg} pt-16 pb-8 border-t-4 border-[#15803D]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-[#A7F3D0]" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">Kisan Vikalp</span>
              </div>
              <p className="text-[#A7F3D0]/80 font-medium max-w-xs leading-relaxed text-sm">
                Agricultural procurement, made predictable. Intelligent coordination for farmers, centres, and government operations.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#83968B] mb-6">PORTALS</h4>
              <ul className="space-y-4 text-sm font-semibold text-white">
                <li><Link to="/login/farmer" className="hover:text-[#A7F3D0] transition-colors">Farmer Portal</Link></li>
                <li><Link to="/login/officer" className="hover:text-[#A7F3D0] transition-colors">Centre Officer Portal</Link></li>
                <li><Link to="/login/admin" className="hover:text-[#A7F3D0] transition-colors">Government Command</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#83968B] mb-6">CONTEXT</h4>
              <ul className="space-y-4 text-sm font-semibold text-white/80">
                <li>Smart India Hackathon 2026</li>
                <li>Demonstration Environment</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-white/40">
            <p>Kisan Vikalp is a prototype for evaluation. It does not represent an official government portal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
