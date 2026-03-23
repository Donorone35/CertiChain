import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext } from 'react';

import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import AdminDashboard from './pages/AdminDashboard';
import VerifyCertificate from './pages/VerifyCertificate';

import useToast from './hooks/useToast';
import ToastContainer from './components/ToastContainer';

// ✅ Create global toast context
export const ToastContext = createContext<{
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
} | null>(null);

function App() {
  const { toast, showToast, hideToast } = useToast();

  return (
    <Router>
      {/* ✅ Provide showToast globally */}
      <ToastContext.Provider value={{ showToast }}>

        <ToastContainer toast={toast} onClose={hideToast} />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/verify" element={<VerifyCertificate />} />
        </Routes>

      </ToastContext.Provider>
    </Router>
  );
}

export default App;