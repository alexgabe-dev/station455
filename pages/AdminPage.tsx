
import React, { useState, useEffect, useRef } from 'react';
import { 
    LayoutDashboard, 
    Music, 
    Settings, 
    Shield, 
    Terminal as TerminalIcon, 
    LogOut, 
    Save, 
    Plus, 
    Trash2, 
    Activity, 
    Eye,
    Upload,
    Video,
    X,
    Cpu,
    Fingerprint,
    Command,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import { 
    getEchoes, saveEchoes, 
    getSiteConfig, saveSiteConfig,
    getMustSeeMoments, saveMustSeeMoments
} from '../services/stationService';
import { EchoSignal, SiteConfig, BurstMoment } from '../types';

// --- ANIMATED LOGIN COMPONENT ---
const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [pass, setPass] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'VERIFYING' | 'ACCESS_GRANTED' | 'DENIED'>('IDLE');
    const [logs, setLogs] = useState<string[]>([]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('VERIFYING');
        setLogs([]);

        // Animated Sequence
        const sequence = [
            "INITIATING HANDSHAKE...",
            "VERIFYING BIOMETRICS...",
            "DECRYPTING KEY...",
            "CHECKING CLEARANCE LEVEL..."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                setLogs(prev => [...prev, sequence[i]]);
                i++;
            } else {
                clearInterval(interval);
                // Final Check
                if (pass === 'VOID') {
                    setLogs(prev => [...prev, "ACCESS GRANTED."]);
                    setStatus('ACCESS_GRANTED');
                    setTimeout(onLogin, 1500);
                } else {
                    setLogs(prev => [...prev, "ACCESS DENIED: INVALID KEY"]);
                    setStatus('DENIED');
                    setTimeout(() => {
                        setStatus('IDLE');
                        setLogs([]);
                        setPass('');
                    }, 2000);
                }
            }
        }, 500);
    };

    if (status === 'ACCESS_GRANTED') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Fingerprint className="w-24 h-24 text-green-500 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Welcome, Administrator</h1>
                    <div className="h-1 w-64 bg-gray-800 mx-auto rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 animate-[loading_1s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-void flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="w-full max-w-md bg-black border border-gray-800 p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-alert"></div>
                
                <div className="mb-8 text-center">
                    <Shield className={`w-12 h-12 mx-auto mb-4 transition-colors ${status === 'DENIED' ? 'text-red-500' : 'text-alert'}`} />
                    <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Station Command</h1>
                    <p className="font-mono text-xs text-gray-500 mt-2">SECURE UPLINK // V.4.0</p>
                </div>
                
                {status === 'VERIFYING' || status === 'DENIED' ? (
                    <div className="font-mono text-xs space-y-2 h-48 p-4 bg-gray-900 border border-gray-700 text-green-400 overflow-y-auto">
                        {logs.map((log, i) => (
                            <div key={i} className={log.includes("DENIED") ? "text-red-500" : ""}>{`> ${log}`}</div>
                        ))}
                        {status === 'VERIFYING' && <div className="animate-pulse">_</div>}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-mono text-xs text-alert uppercase tracking-widest mb-2">Clearance Code</label>
                            <div className="relative">
                                <TerminalIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                                <input 
                                    type="password" 
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    className="w-full bg-void-dark border border-gray-800 text-white font-mono px-10 py-3 focus:border-alert focus:outline-none focus:ring-1 focus:ring-alert placeholder-gray-800 uppercase"
                                    placeholder="ENTER_PASSCODE"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-alert text-black font-bold py-3 uppercase hover:bg-white transition-all tracking-widest text-sm">
                            Authenticate
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

// --- INTERACTIVE TERMINAL COMPONENT ---
const InteractiveTerminal = () => {
    const [logs, setLogs] = useState<{type: 'sys' | 'user' | 'res', text: string}[]>([
        {type: 'sys', text: 'SYSTEM_READY'},
        {type: 'sys', text: 'LISTENING ON PORT 445...'},
        {type: 'sys', text: 'PRESS ALT+1 TO TOGGLE TERMINAL FOCUS'}
    ]);
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // Global Key Listener
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.altKey && e.key === '1') {
                e.preventDefault();
                setIsFocused(prev => {
                    const next = !prev;
                    if (next) setTimeout(() => inputRef.current?.focus(), 50);
                    return next;
                });
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    const handleCommand = (cmd: string) => {
        const args = cmd.trim().toLowerCase().split(' ');
        const main = args[0];

        switch(main) {
            case 'help':
                return "COMMANDS: status, clear, reboot, ls, whoami, date";
            case 'clear':
                setLogs([]);
                return null;
            case 'status':
                return "SYSTEM STATUS: ONLINE // UPLINK: STABLE // CPU: 34%";
            case 'reboot':
                window.location.reload();
                return "INITIATING REBOOT SEQUENCE...";
            case 'ls':
                return "DIR: /var/logs/station  /sys/config  /usr/admin";
            case 'whoami':
                return "USER: SYS_ADMIN // CLEARANCE: LEVEL 5";
            case 'date':
                return new Date().toUTCString();
            default:
                return `ERR: UNKNOWN COMMAND '${main}'`;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLogs(prev => [...prev, {type: 'user', text: input}]);
        const response = handleCommand(input);
        if (response) {
            setTimeout(() => {
                setLogs(prev => [...prev, {type: 'res', text: response}]);
            }, 200);
        }
        setInput('');
    };

    return (
        <div 
            className={`bg-black border border-gray-800 font-mono text-xs relative flex flex-col transition-all duration-300 ${isFocused ? 'h-96 border-alert shadow-[0_0_20px_rgba(255,69,0,0.2)]' : 'h-64'}`}
            onClick={() => inputRef.current?.focus()}
        >
             {/* Header */}
             <div className={`flex justify-between items-center p-2 border-b ${isFocused ? 'border-alert bg-alert/10' : 'border-gray-800 bg-gray-900'} transition-colors`}>
                <div className="flex items-center gap-2">
                    <Command size={12} className={isFocused ? 'text-alert' : 'text-gray-500'} />
                    <span className={isFocused ? 'text-white' : 'text-gray-500'}>TERMINAL_V1.0 {isFocused && '[ACTIVE]'}</span>
                </div>
                <div className="text-[10px] text-gray-600">ALT+1</div>
             </div>

             {/* Output Area */}
             <div className="flex-1 overflow-y-auto p-4 space-y-1">
                 {logs.map((log, i) => (
                     <div key={i} className={`
                        ${log.type === 'user' ? 'text-white font-bold' : ''}
                        ${log.type === 'res' ? 'text-gray-400 ml-4' : ''}
                        ${log.type === 'sys' ? 'text-alert' : ''}
                     `}>
                         {log.type === 'user' ? '> ' : ''}{log.text}
                     </div>
                 ))}
                 <div ref={bottomRef}></div>
             </div>

             {/* Input Area */}
             <form onSubmit={handleSubmit} className="border-t border-gray-800 p-2 flex items-center bg-black">
                <span className="text-alert mr-2">{'>'}</span>
                <input 
                    ref={inputRef}
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-800"
                    placeholder={isFocused ? "Enter command..." : "Terminal inactive (Press Alt+1)"}
                    disabled={!isFocused}
                    autoComplete="off"
                />
             </form>
        </div>
    );
};

// --- SUB-COMPONENTS (Keep Stats, Managers same but update Dashboard Layout) ---

const DashboardStats = ({ config }: { config: SiteConfig }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-black border border-gray-800 p-6 relative overflow-hidden group hover:border-alert/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-900 rounded-sm"><Activity className="text-alert" size={20} /></div>
                <span className="text-[10px] font-mono text-gray-500 uppercase">System Status</span>
            </div>
            <div className={`text-3xl font-black uppercase ${
                config.stationStatus === 'CRITICAL' ? 'text-red-500 animate-pulse' : 
                config.stationStatus === 'OFFLINE' ? 'text-gray-500' : 'text-white'
            }`}>{config.stationStatus}</div>
            <div className="mt-2 text-xs font-mono text-green-500 flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${config.stationStatus === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                {config.stationStatus === 'ONLINE' ? 'Optimal' : 'Check Logs'}
            </div>
        </div>
        {/* ... Keep other stats same ... */}
        <div className="bg-black border border-gray-800 p-6 relative overflow-hidden group hover:border-alert/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-900 rounded-sm"><Cpu className="text-blue-500" size={20} /></div>
                <span className="text-[10px] font-mono text-gray-500 uppercase">CPU Load</span>
            </div>
            <div className="text-3xl font-black text-white uppercase">34%</div>
            <div className="mt-2 text-xs font-mono text-gray-500">
                Temp: 45°C
            </div>
        </div>
    </div>
);

// ... VisualsManager, MusicManager, SeoManager remain the same ...
const VisualsManager = () => {
    const [moments, setMoments] = useState<BurstMoment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<BurstMoment>>({ mediaType: 'image' });

    useEffect(() => {
        getMustSeeMoments().then(data => {
            setMoments(data);
            setLoading(false);
        });
    }, []);

    const handleDelete = (id: string) => {
        if(window.confirm('CONFIRM PURGE: Visual data will be lost.')) {
            const newMoments = moments.filter(m => m.id !== id);
            setMoments(newMoments);
            saveMustSeeMoments(newMoments);
        }
    };

    const handleSave = () => {
        if (!editForm.title || !editForm.image) return;
        
        let newMoments = [...moments];
        // Cast tags to any to handle both string input (from form) and array (from loaded data)
        const tagsInput = editForm.tags as any;
        const tags = typeof tagsInput === 'string' ? tagsInput.split(',').map((t: string) => t.trim()) : tagsInput || [];

        if (editForm.id) {
            newMoments = newMoments.map(m => m.id === editForm.id ? { ...m, ...editForm, tags } as BurstMoment : m);
        } else {
            const newId = `b-${Date.now()}`;
            newMoments.unshift({ 
                ...editForm, 
                id: newId, 
                tags,
                readTime: editForm.readTime || '01:00',
                date: new Date().toLocaleDateString()
            } as BurstMoment);
        }
        setMoments(newMoments);
        saveMustSeeMoments(newMoments);
        setIsEditing(false);
        setEditForm({ mediaType: 'image' });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm({
                    ...editForm,
                    image: reader.result as string, // Store Base64
                    mediaType: file.type.startsWith('video') ? 'video' : 'image'
                });
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) return <div className="text-alert font-mono animate-pulse">Decrypting Visuals...</div>;

    return (
        <div className="bg-void-dark border border-gray-800 p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white uppercase">Visual Archives</h2>
                <button 
                    onClick={() => { setIsEditing(true); setEditForm({ mediaType: 'image' }); }}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 font-mono text-xs uppercase hover:bg-alert transition-colors"
                >
                    <Plus size={16} /> Upload Asset
                </button>
            </div>

            {isEditing && (
                <div className="mb-8 p-6 bg-gray-900 border border-gray-700 animate-fade-in">
                    <h3 className="font-mono text-alert text-xs mb-4 uppercase">Asset Configuration</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        {/* File Upload Area */}
                        <div className="col-span-1 md:col-span-2">
                             <label className="block text-gray-500 font-mono text-xs uppercase mb-2">Upload Media (Image or Video)</label>
                             <div className="border-2 border-dashed border-gray-700 hover:border-alert p-8 text-center cursor-pointer relative group transition-colors">
                                <input 
                                    type="file" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileUpload}
                                    accept="image/*,video/*"
                                />
                                {editForm.image ? (
                                    editForm.mediaType === 'video' ? 
                                        <div className="text-alert font-mono text-xs"><Video className="mx-auto mb-2" />Video Selected</div> :
                                        <img src={editForm.image} alt="Preview" className="h-32 mx-auto object-cover border border-gray-600" />
                                ) : (
                                    <div className="text-gray-500 group-hover:text-white transition-colors">
                                        <Upload className="mx-auto mb-2" />
                                        <span className="font-mono text-xs">Drop file or click to upload</span>
                                    </div>
                                )}
                             </div>
                             <div className="mt-2 text-[10px] text-gray-500 font-mono">
                                 Or paste URL below. Warning: Large files (Base64) may exceed browser storage limits.
                             </div>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                             <input 
                                placeholder="MEDIA URL (Backup)" 
                                className="w-full bg-black border border-gray-700 p-3 text-white font-mono text-sm"
                                value={editForm.image || ''}
                                onChange={e => setEditForm({...editForm, image: e.target.value})}
                            />
                        </div>

                        <input 
                            placeholder="TITLE" 
                            className="bg-black border border-gray-700 p-3 text-white font-mono text-sm"
                            value={editForm.title || ''}
                            onChange={e => setEditForm({...editForm, title: e.target.value})}
                        />
                         <input 
                            placeholder="CAPTION" 
                            className="bg-black border border-gray-700 p-3 text-white font-mono text-sm"
                            value={editForm.caption || ''}
                            onChange={e => setEditForm({...editForm, caption: e.target.value})}
                        />
                         <input 
                            placeholder="TAGS (comma separated)" 
                            className="bg-black border border-gray-700 p-3 text-white font-mono text-sm"
                            value={Array.isArray(editForm.tags) ? editForm.tags.join(', ') : editForm.tags || ''}
                            onChange={e => setEditForm({...editForm, tags: e.target.value as any})}
                        />
                         <select 
                            className="bg-black border border-gray-700 p-3 text-white font-mono text-sm"
                            value={editForm.mediaType || 'image'}
                            onChange={e => setEditForm({...editForm, mediaType: e.target.value as 'image' | 'video'})}
                        >
                            <option value="image">Image Asset</option>
                            <option value="video">Video Feed</option>
                        </select>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleSave} className="flex items-center gap-2 bg-alert text-black px-6 py-2 font-mono text-xs uppercase hover:bg-white">
                            <Save size={14} /> Commit
                        </button>
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2 font-mono text-xs uppercase text-gray-500 hover:text-white">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moments.map(moment => (
                    <div key={moment.id} className="bg-black border border-gray-800 hover:border-gray-600 transition-colors group relative">
                        <div className="aspect-video bg-gray-900 relative overflow-hidden">
                            {moment.mediaType === 'video' ? (
                                <video src={moment.image} className="w-full h-full object-cover opacity-50" />
                            ) : (
                                <img src={moment.image} alt={moment.title} className="w-full h-full object-cover opacity-50 grayscale" />
                            )}
                            <div className="absolute top-2 left-2 bg-black px-2 py-1 text-[10px] text-white font-mono">
                                {moment.mediaType === 'video' ? 'VID' : 'IMG'}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-bold text-sm uppercase truncate pr-4">{moment.title}</h4>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditForm(moment); setIsEditing(true); }} className="text-gray-500 hover:text-white"><Settings size={12} /></button>
                                    <button onClick={() => handleDelete(moment.id)} className="text-gray-500 hover:text-red-500"><Trash2 size={12} /></button>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 font-mono truncate">{moment.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MusicManager = () => {
    const [echoes, setEchoes] = useState<EchoSignal[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<EchoSignal>>({});

    useEffect(() => {
        getEchoes().then(data => {
            setEchoes(data);
            setLoading(false);
        });
    }, []);

    const handleDelete = (id: string) => {
        if(window.confirm('CONFIRM DELETION: This action cannot be undone.')) {
            const newEchoes = echoes.filter(e => e.id !== id);
            setEchoes(newEchoes);
            saveEchoes(newEchoes);
        }
    };

    const handleSave = () => {
        if (!editForm.title || !editForm.episode) return;
        
        let newEchoes = [...echoes];
        if (editForm.id) {
            newEchoes = newEchoes.map(e => e.id === editForm.id ? { ...e, ...editForm } as EchoSignal : e);
        } else {
            const newId = `e-${Date.now()}`;
            newEchoes.push({ ...editForm, id: newId, duration: editForm.duration || '0:00' } as EchoSignal);
        }
        setEchoes(newEchoes);
        saveEchoes(newEchoes);
        setIsEditing(false);
        setEditForm({});
    };

    if (loading) return <div className="text-alert font-mono animate-pulse">Scanning Frequencies...</div>;

    return (
        <div className="bg-void-dark border border-gray-800 p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white uppercase">Frequency Control</h2>
                <button 
                    onClick={() => { setIsEditing(true); setEditForm({}); }}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 font-mono text-xs uppercase hover:bg-alert transition-colors"
                >
                    <Plus size={16} /> Add Signal
                </button>
            </div>

            {isEditing && (
                <div className="mb-8 p-6 bg-gray-900 border border-gray-700 animate-fade-in">
                    <h3 className="font-mono text-alert text-xs mb-4 uppercase">Signal Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input 
                            placeholder="EPISODE ID (e.g. SIG-99)" 
                            className="bg-black border border-gray-700 p-3 text-white font-mono text-sm"
                            value={editForm.episode || ''}
                            onChange={e => setEditForm({...editForm, episode: e.target.value})}
                        />
                        <input 
                            placeholder="TRANSMISSION TITLE" 
                            className="bg-black border border-gray-700 p-3 text-white font-mono text-sm"
                            value={editForm.title || ''}
                            onChange={e => setEditForm({...editForm, title: e.target.value})}
                        />
                         <input 
                            placeholder="DURATION (MM:SS)" 
                            className="bg-black border border-gray-700 p-3 text-white font-mono text-sm"
                            value={editForm.duration || ''}
                            onChange={e => setEditForm({...editForm, duration: e.target.value})}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleSave} className="flex items-center gap-2 bg-alert text-black px-6 py-2 font-mono text-xs uppercase hover:bg-white">
                            <Save size={14} /> Commit
                        </button>
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2 font-mono text-xs uppercase text-gray-500 hover:text-white">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-2">
                {echoes.map(echo => (
                    <div key={echo.id} className="flex items-center justify-between p-4 bg-black border border-gray-800 hover:border-gray-600 transition-colors group">
                        <div className="flex items-center gap-4">
                            <span className="text-alert font-mono text-xs w-16">{echo.episode}</span>
                            <span className="text-gray-300 text-sm font-medium">{echo.title}</span>
                            <span className="text-gray-600 font-mono text-xs">[{echo.duration}]</span>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => { setEditForm(echo); setIsEditing(true); }}
                                className="p-2 hover:bg-white/10 text-gray-400 hover:text-white"
                            >
                                <Settings size={14} />
                            </button>
                            <button 
                                onClick={() => handleDelete(echo.id)}
                                className="p-2 hover:bg-red-900/30 text-gray-400 hover:text-red-500"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SeoManager = () => {
    const [config, setConfig] = useState<SiteConfig | null>(null);

    useEffect(() => {
        getSiteConfig().then(setConfig);
    }, []);

    const handleSave = () => {
        if(config) {
            saveSiteConfig(config);
            // Force reload to apply status changes immediately
            window.location.reload(); 
        }
    };

    if (!config) return null;

    return (
        <div className="bg-void-dark border border-gray-800 p-8">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white uppercase">Station Configuration</h2>
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-alert text-black px-4 py-2 font-mono text-xs uppercase hover:bg-white transition-colors"
                >
                    <Save size={16} /> Update Protocol
                </button>
            </div>
            
            <div className="space-y-8 max-w-3xl">
                {/* Visual Settings */}
                <div className="border border-gray-800 bg-void-gray p-6">
                    <h3 className="text-white font-mono text-sm uppercase mb-4 border-b border-gray-700 pb-2">Visual Modules</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white font-mono text-xs uppercase">Hero Branding Alert</div>
                                <div className="text-gray-500 font-mono text-[10px]">Sets main 'STATION' text to alert orange color.</div>
                            </div>
                            <button 
                                onClick={() => setConfig({...config, enableHeroAlertColor: !config.enableHeroAlertColor})}
                                className={`text-2xl transition-colors ${config.enableHeroAlertColor ? 'text-alert' : 'text-gray-700'}`}
                            >
                                {config.enableHeroAlertColor ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white font-mono text-xs uppercase">Footer Pulse Signal</div>
                                <div className="text-gray-500 font-mono text-[10px]">Enables gradient pulse animation on footer logo.</div>
                            </div>
                            <button 
                                onClick={() => setConfig({...config, enableFooterPulse: !config.enableFooterPulse})}
                                className={`text-2xl transition-colors ${config.enableFooterPulse ? 'text-alert' : 'text-gray-700'}`}
                            >
                                {config.enableFooterPulse ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="border border-gray-800 bg-void-gray p-6">
                    <h3 className="text-white font-mono text-sm uppercase mb-4 border-b border-gray-700 pb-2">Broadcast Metadata (SEO)</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-500 font-mono text-xs uppercase mb-2">Global Frequency Name (Site Title)</label>
                            <input 
                                className="w-full bg-black border border-gray-700 p-3 text-white font-mono text-sm focus:border-alert focus:outline-none"
                                value={config.siteTitle}
                                onChange={(e) => setConfig({...config, siteTitle: e.target.value})}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-500 font-mono text-xs uppercase mb-2">Broadcast Description (Meta Desc)</label>
                            <textarea 
                                className="w-full bg-black border border-gray-700 p-3 text-white font-mono text-sm focus:border-alert focus:outline-none h-24"
                                value={config.siteDescription}
                                onChange={(e) => setConfig({...config, siteDescription: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                {/* System Settings */}
                <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label className="block text-gray-500 font-mono text-xs uppercase mb-2">Station Status</label>
                        <select 
                            className="w-full bg-black border border-gray-700 p-4 text-white font-mono text-sm focus:border-alert focus:outline-none"
                            value={config.stationStatus}
                            onChange={(e) => setConfig({...config, stationStatus: e.target.value as any})}
                        >
                            <option value="ONLINE">ONLINE</option>
                            <option value="OFFLINE">OFFLINE</option>
                            <option value="CRITICAL">CRITICAL</option>
                            <option value="SILENT">SILENT</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-gray-500 font-mono text-xs uppercase mb-2">Admin Contact</label>
                        <input 
                            className="w-full bg-black border border-gray-700 p-4 text-white font-mono text-sm focus:border-alert focus:outline-none"
                            value={config.adminContact}
                            onChange={(e) => setConfig({...config, adminContact: e.target.value})}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN LAYOUT ---

const AdminPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'visuals' | 'music' | 'seo'>('dashboard');
    const [config, setConfig] = useState<SiteConfig | null>(null);

    // Initial load check
    useEffect(() => {
        const auth = sessionStorage.getItem('station_auth');
        if (auth === 'granted') setIsAuthenticated(true);
        getSiteConfig().then(setConfig);
    }, []);

    const handleLogin = () => {
        sessionStorage.setItem('station_auth', 'granted');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('station_auth');
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) return <AdminLogin onLogin={handleLogin} />;
    if (!config) return <div className="bg-void h-screen"></div>;

    const renderContent = () => {
        switch(activeTab) {
            case 'visuals': return <VisualsManager />;
            case 'music': return <MusicManager />;
            case 'seo': return <SeoManager />;
            default: return (
                <>
                    <DashboardStats config={config} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Interactive Terminal (Replaces Fake Logs) */}
                        <InteractiveTerminal />

                        {/* Quick Actions */}
                        <div className="space-y-6">
                            <div className="bg-void-gray border border-gray-800 p-6">
                                <h3 className="text-white font-bold mb-4 uppercase">Quick Protocols</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="border border-gray-600 p-4 text-left hover:bg-white hover:text-black transition-colors group">
                                        <Shield className="mb-2 text-gray-400 group-hover:text-black" />
                                        <span className="font-mono text-xs uppercase">Lockdown</span>
                                    </button>
                                    <button className="border border-gray-600 p-4 text-left hover:bg-white hover:text-black transition-colors group">
                                        <TerminalIcon className="mb-2 text-gray-400 group-hover:text-black" />
                                        <span className="font-mono text-xs uppercase">Clear Cache</span>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-alert/5 border border-alert/20 p-6">
                                <h3 className="text-alert font-bold mb-2 uppercase">System Notice</h3>
                                <p className="text-xs font-mono text-gray-400">
                                    Remember to commit all frequency changes before terminating the uplink session. Unsaved data will be lost in the void.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <div className="min-h-screen bg-void flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-black border-r border-gray-800 md:h-screen sticky top-0 flex flex-col z-20">
                <div className="p-6 border-b border-gray-800">
                     <h1 className="text-xl font-black text-white uppercase tracking-tighter">Station<span className="text-gray-700">445</span></h1>
                     <div className="text-[10px] font-mono text-alert mt-1">ADMIN_CONSOLE_V2.0</div>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wide transition-colors ${activeTab === 'dashboard' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <LayoutDashboard size={16} /> Command Deck
                    </button>
                    <button 
                        onClick={() => setActiveTab('visuals')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wide transition-colors ${activeTab === 'visuals' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Eye size={16} /> Visual Archives
                    </button>
                    <button 
                        onClick={() => setActiveTab('music')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wide transition-colors ${activeTab === 'music' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Music size={16} /> Frequency Control
                    </button>
                    <button 
                        onClick={() => setActiveTab('seo')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wide transition-colors ${activeTab === 'seo' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Settings size={16} /> Station Config
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase text-red-500 hover:bg-red-900/20 transition-colors">
                        <LogOut size={16} /> Terminate Link
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto relative">
                <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none fixed"></div>
                
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="mb-10 flex justify-between items-end">
                        <div>
                             <div className="text-[10px] font-mono text-gray-500 mb-1">CURRENT_USER: SYS_ADMIN</div>
                             <h2 className="text-4xl font-black text-white uppercase tracking-tight">
                                {activeTab === 'dashboard' && 'System Overview'}
                                {activeTab === 'visuals' && 'Visual Archives'}
                                {activeTab === 'music' && 'Frequency Database'}
                                {activeTab === 'seo' && 'Protocol Settings'}
                             </h2>
                        </div>
                        <div className="hidden md:block text-right">
                            <div className="text-xs font-mono text-alert animate-pulse">LIVE FEED ACTIVE</div>
                            <div className="text-[10px] text-gray-600 font-mono">ENCRYPTION: AES-256</div>
                        </div>
                    </div>
                    
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
