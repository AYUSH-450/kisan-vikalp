import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FarmerLayout } from './layouts/FarmerLayout';
import { OfficerLayout } from './layouts/OfficerLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ToastProvider, useToast } from './components/ui/Toast';
import { FarmerProvider } from './features/farmer/FarmerContext';
import { OfficerProvider } from './features/officer/OfficerContext';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import FarmerLogin from './pages/auth/FarmerLogin';
import OfficerLogin from './pages/auth/OfficerLogin';
import AdminLogin from './pages/auth/AdminLogin';
import * as Farmer from './pages/farmer';
import * as Officer from './pages/officer';
import * as Admin from './pages/admin';

const Placeholder = ({ title }: { title: string }) => {
  const { addToast } = useToast();
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <button 
        onClick={() => addToast({ type: 'info', title: 'Action recorded', message: `You interacted with ${title}` })}
        className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm"
      >
        Test Notification
      </button>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <FarmerProvider>
          <OfficerProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login/farmer" element={<FarmerLogin />} />
                <Route path="/login/officer" element={<OfficerLogin />} />
                <Route path="/login/admin" element={<AdminLogin />} />

                {/* Farmer Routes */}
                <Route element={<ProtectedRoute requiredRole="farmer" />}>
                  <Route path="/farmer" element={<FarmerLayout />}>
                <Route index element={<Farmer.FarmerHome />} />
                <Route path="book" element={<Farmer.BookProcurement />} />
                <Route path="centres" element={<Placeholder title="Centres List (Not Required in Phase 1 flow)" />} />
                <Route path="slots" element={<Placeholder title="Slots List" />} />
                <Route path="booking-confirmation" element={<Farmer.BookingConfirmation />} />
                <Route path="pass" element={<Farmer.DigitalPass />} />
                <Route path="queue" element={<Farmer.VirtualQueue />} />
                <Route path="travel" element={<Farmer.TravelMap />} />
                <Route path="procurement" element={<Farmer.ProcurementStatus />} />
                <Route path="payment" element={<Farmer.PaymentStatus />} />
                <Route path="history" element={<Farmer.History />} />
                <Route path="notifications" element={<Farmer.Notifications />} />
                <Route path="profile" element={<Farmer.Profile />} />
                  </Route>
                </Route>

                {/* Officer Routes */}
                <Route element={<ProtectedRoute requiredRole="officer" />}>
                  <Route path="/officer" element={<OfficerLayout />}>
                <Route index element={<Officer.OfficerDashboard />} />
                <Route path="scanner" element={<Officer.Scanner />} />
                <Route path="queue" element={<Officer.QueueManagement />} />
                <Route path="transaction" element={<Officer.TransactionDetails />} />
                <Route path="procurement" element={<Officer.ProcurementWorkflow />} />
                <Route path="quality" element={<Officer.QualityInspection />} />
                <Route path="weighing" element={<Officer.Weighing />} />
                <Route path="completed" element={<Officer.ProcurementCompletion />} />
                <Route path="settings" element={<Officer.Settings />} />
                  </Route>
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute requiredRole="admin" />}>
                  <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Admin.AdminDashboard />} />
                <Route path="map" element={<Admin.GISMap />} />
                <Route path="forecast" element={<Admin.DemandForecast />} />
                <Route path="centres" element={<Admin.CentrePerformance />} />
                <Route path="alerts" element={<Admin.Alerts />} />
                <Route path="reports" element={<Admin.Reports />} />
                <Route path="settings" element={<Admin.AdminSettings />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </OfficerProvider>
        </FarmerProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
