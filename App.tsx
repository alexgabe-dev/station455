
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Starfield from './components/Starfield';
import { getSiteConfig } from './services/stationService';
import { SiteConfig } from './types';
import { AlertTriangle, WifiOff, ZapOff } from 'lucide-react';

// Lazy Load Pages for Performance Optimization
const Home = lazy(() => import('./pages/Home'));
const TransmissionsPage = lazy(() => import('./pages/TransmissionsPage'));
const TransmissionPost = lazy(() => import('./pages/TransmissionPost'));
const StationLogPage = lazy(() => import('./pages/StationLogPage'));
const MusicPage = lazy(() => import('./pages/MusicPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const VisualLogsTerminal = lazy(() => import('./pages/VisualLogsTerminal'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LoadingScreen = () => (
    <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-alert font-mono animate-pulse text-xl">INITIALIZING_UPLINK...</div>
    </div>
);

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [status, setStatus] = useState<SiteConfig['stationStatus']>('ONLINE');
    const location = useLocation();

    useEffect(() => {
        getSiteConfig().then(config => setStatus(config.stationStatus));
    }, [location]);

    return (
        <div className={`min-h-screen bg-void text-signal font-inter selection:bg-alert selection:text-black flex flex-col relative transition-all duration-1000
            ${status === 'OFFLINE' ? 'grayscale brightness-50 contrast-125' : ''}
            ${status === 'SILENT' ? 'brightness-75 saturate-0' : ''}
        `}>
            {/* Status Overlays */}
            {status === 'CRITICAL' && (
                <div className="fixed inset-0 pointer-events-none z-[100] animate-pulse">
                    <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div>
                    <div className="absolute top-0 left-0 w-full h-2 bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.8)]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.8)]"></div>
                    <div className="absolute top-4 right-4 bg-red-600 text-black px-4 py-1 font-mono font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                        <AlertTriangle size={14} /> Critical Failure
                    </div>
                </div>
            )}

            {status === 'OFFLINE' && (
                <div className="fixed top-0 left-0 w-full bg-gray-900 text-gray-500 text-center text-xs font-mono py-1 z-[100] uppercase tracking-widest flex items-center justify-center gap-2">
                    <WifiOff size={12} /> Uplink Severed // Cached Mode
                </div>
            )}

            {status === 'SILENT' && (
                <div className="fixed top-0 left-0 w-full bg-black text-gray-800 text-center text-[10px] font-mono py-1 z-[100] uppercase tracking-widest flex items-center justify-center gap-2">
                    <ZapOff size={10} /> Dark Protocol Active
                </div>
            )}

            <Starfield />
            <Header />
            {children}
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                {/* Public Routes - Wrapped in Layout */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/blog" element={<Layout><TransmissionsPage /></Layout>} />
                <Route path="/blog/:slug" element={<Layout><TransmissionPost /></Layout>} />
                <Route path="/about" element={<Layout><StationLogPage /></Layout>} />
                <Route path="/music" element={<Layout><MusicPage /></Layout>} />
                <Route path="/transmissions" element={<Layout><TransmissionsPage /></Layout>} />
                <Route path="/transmissions/:slug" element={<Layout><TransmissionPost /></Layout>} />
                <Route path="/station-log" element={<Layout><StationLogPage /></Layout>} />
                
                {/* Visual Logs - Protected Terminal (Self-Contained Layout) */}
                <Route path="/visual-logs" element={<VisualLogsTerminal />} />

                {/* Admin Route - No Header/Footer/Starfield overlap (handled internally) */}
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Suspense>
    </Router>
  );
};

export default App;
