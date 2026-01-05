
import React, { useState, useEffect } from 'react';
import { Lock, Terminal, X, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PasswordModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (isOpen) {
        setPassword('');
        setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setError('');

    // Simulate network delay for effect
    setTimeout(() => {
        if (password === 'netws112') {
            onSuccess();
        } else {
            setError('ACCESS_DENIED: INVALID_CREDENTIALS');
            setIsChecking(false);
        }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-black border border-alert shadow-[0_0_50px_rgba(255,69,0,0.2)] relative overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-alert/10 border-b border-alert/30 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-alert font-mono text-sm uppercase tracking-widest">
                <Lock size={16} /> Restricted Area
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="p-8">
            <div className="mb-6 text-center">
                <Terminal size={48} className="text-alert mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-black text-white uppercase mb-2">Security Clearance Required</h3>
                <p className="text-xs font-mono text-gray-400">
                    This archive contains classified visual data from Sector 7G. Enter your operator passcode to proceed.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-void-gray border border-gray-700 text-white font-mono text-center text-lg py-4 focus:outline-none focus:border-alert focus:ring-1 focus:ring-alert transition-all uppercase placeholder-gray-800"
                        placeholder="••••••••"
                        autoFocus
                    />
                    <div className="absolute inset-0 border border-alert/0 group-hover:border-alert/30 pointer-events-none transition-colors"></div>
                </div>

                {error && (
                    <div className="text-red-500 font-mono text-xs text-center flex items-center justify-center gap-2 animate-pulse">
                        <AlertTriangle size={12} /> {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={isChecking}
                    className="w-full bg-alert text-black font-bold font-mono py-4 uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isChecking ? 'Verifying...' : 'Authenticate'}
                </button>
            </form>
        </div>

        {/* Footer */}
        <div className="bg-black border-t border-gray-900 p-2 text-center">
            <span className="text-[9px] font-mono text-gray-600 uppercase">Station445 Secure Protocol // v4.0.2</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
