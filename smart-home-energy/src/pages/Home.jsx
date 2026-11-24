import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Zap, Home as HomeIcon, DollarSign, Activity, Power, Lightbulb, Wind, Thermometer, ShieldCheck, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { GLSLHills } from '../components/ui/glsl-hills';
import './Home.css';
import livingRoomLogo from '../assets/living_room_light_3d_logo.png';
import acLogo from '../assets/smart_ac_3d_logo.png';
import fanLogo from '../assets/ceiling_fan_3d_logo.png';
import heaterLogo from '../assets/main_heater_3d_logo.png';
import cameraLogo from '../assets/outdoor_camera_3d_logo.png';

const Home = () => {
    // Design Tokens (Matching index.css)
    const COLORS = {
        primary: '#00DBFF', // Cyan
        secondary: '#9D00FF', // Purple
        success: '#00FF94',
        warning: '#FFB800',
        textMuted: '#94A3B8'
    };

    // Mock Data
    const energyData = [
        { time: '00:00', usage: 0.5 },
        { time: '04:00', usage: 0.3 },
        { time: '08:00', usage: 1.2 },
        { time: '12:00', usage: 1.8 },
        { time: '16:00', usage: 1.5 },
        { time: '20:00', usage: 2.1 },
        { time: '23:59', usage: 0.9 },
    ];

    const weeklyData = [
        { time: 'Mon', usage: 45 },
        { time: 'Tue', usage: 52 },
        { time: 'Wed', usage: 48 },
        { time: 'Thu', usage: 61 },
        { time: 'Fri', usage: 55 },
        { time: 'Sat', usage: 67 },
        { time: 'Sun', usage: 42 },
    ];

    const deviceData = [
        { name: 'HVAC', value: 45, color: COLORS.primary },
        { name: 'Lights', value: 15, color: COLORS.secondary },
        { name: 'Kitchen', value: 25, color: COLORS.success },
        { name: 'Other', value: 15, color: COLORS.warning },
    ];

    // State for devices (Toggle ON/OFF)
    const [devices, setDevices] = useState([
        { id: 1, name: 'Living Room Lights', type: 'light', isOn: true, icon: <img src={livingRoomLogo} alt="Living Room Light" className="device-icon-img-cover" />, room: 'Living Room', consumption: '12.5 kWh' },
        { id: 2, name: 'Smart AC', type: 'ac', isOn: false, icon: <img src={acLogo} alt="Smart AC" className="device-icon-img-cover" />, room: 'Bedroom', consumption: '85.2 kWh' },
        { id: 3, name: 'Ceiling Fan', type: 'fan', isOn: true, icon: <img src={fanLogo} alt="Ceiling Fan" className="device-icon-img-cover" />, room: 'Kitchen', consumption: '8.4 kWh' },
        { id: 4, name: 'Main Heater', type: 'heater', isOn: false, icon: <img src={heaterLogo} alt="Main Heater" className="device-icon-img-cover" />, room: 'Bathroom', consumption: '142.6 kWh' },
        { id: 5, name: 'Outdoor Camera', type: 'security', isOn: true, icon: <img src={cameraLogo} alt="Outdoor Camera" className="device-icon-img-cover" />, room: 'Entrance', consumption: '2.1 kWh' },
    ]);

    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const selectedDevice = devices.find(d => d.id === selectedDeviceId);
    const [chartView, setChartView] = useState('daily');
    const [isResolved, setIsResolved] = useState(false);

    const toggleDevice = (id) => {
        setDevices(devices.map(dev =>
            dev.id === id ? { ...dev, isOn: !dev.isOn } : dev
        ));
    };

    return (
        <div className="dashboard-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                <GLSLHills speed={0.4} />
             </div>
             <div className="bg-glow bg-glow-1" style={{ zIndex: 1 }}></div>
             <div className="bg-glow bg-glow-2" style={{ zIndex: 1 }}></div>
             
            <div className="dashboard-container" style={{ position: 'relative', zIndex: 10 }}>
                <header className="dashboard-header-modern fade-in">
                    <div className="header-left">
                        <div className="welcome-badge">
                            <Activity size={14} className="pulse" />
                            <span>Neural-Link Active</span>
                        </div>
                        <h1>Command Center</h1>
                        <p>Real-time energy optimization <span className="text-primary">+12.4%</span></p>
                    </div>
                    <div className="header-right">
                        <div className="current-status-card">
                            <Clock size={16} />
                            <span>Refreshed 10s ago</span>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="stats-grid-modern">
                    <div className="glass-card stat-card-modern fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="stat-icon-wrap zap">
                            <Zap size={24} />
                        </div>
                        <div className="stat-info-modern">
                            <p>Monthly Total</p>
                            <h3>450.5 <span>kWh</span></h3>
                            <div className="stat-trend positive" style={{ color: COLORS.success, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '10px' }}>
                                <TrendingUp size={14} />
                                <span>2.4% saving</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card stat-card-modern fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="stat-icon-wrap activity">
                            <Activity size={24} />
                        </div>
                        <div className="stat-info-modern">
                            <p>Peak Load</p>
                            <h3>1.8 <span>kW</span></h3>
                            <div className="stat-trend negative" style={{ color: COLORS.warning, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '10px' }}>
                                <AlertTriangle size={14} />
                                <span>High Demand</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card stat-card-modern fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="stat-icon-wrap dollar">
                            <DollarSign size={24} />
                        </div>
                        <div className="stat-info-modern">
                            <p>Est. Bill</p>
                            <h3>$85.20</h3>
                            <div className="bill-progress">
                                <div className="progress-bar" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card stat-card-modern fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="stat-icon-wrap home">
                            <HomeIcon size={24} />
                        </div>
                        <div className="stat-info-modern">
                            <p>Connected</p>
                            <h3>{devices.filter(d => d.isOn).length}<span>/ {devices.length}</span></h3>
                            <p style={{ color: COLORS.textMuted, fontSize: '0.75rem', marginTop: '10px' }}>System fully operational</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="dashboard-layout-main">
                    {/* Charts Section */}
                    <div className="dashboard-column-left">
                        <div className="chart-card-modern fade-in" style={{ animationDelay: '0.5s' }}>
                            <div className="card-header-modern">
                                <h3>Efficiency Analysis</h3>
                                <div className="card-actions">
                                    <button 
                                        className={`btn-small ${chartView === 'daily' ? 'active' : ''}`}
                                        onClick={() => setChartView('daily')}
                                    >
                                        24h
                                    </button>
                                    <button 
                                        className={`btn-small ${chartView === 'weekly' ? 'active' : ''}`}
                                        onClick={() => setChartView('weekly')}
                                    >
                                        7 Days
                                    </button>
                                </div>
                            </div>
                            <div className="chart-container-modern">
                                <ResponsiveContainer width="100%" height={320}>
                                    <AreaChart data={chartView === 'daily' ? energyData : weeklyData}>
                                        <defs>
                                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                                                <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
                                        <Tooltip
                                            contentStyle={{ 
                                                borderRadius: '16px', 
                                                border: '1px solid rgba(255,255,255,0.1)', 
                                                background: 'rgba(11, 14, 20, 0.9)',
                                                backdropFilter: 'blur(10px)',
                                                color: '#fff'
                                            }}
                                            itemStyle={{ color: COLORS.primary }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="usage" 
                                            stroke={COLORS.primary} 
                                            strokeWidth={3} 
                                            fillOpacity={1} 
                                            fill="url(#colorUsage)" 
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="insights-card-modern fade-in" style={{ animationDelay: '0.6s' }}>
                            {isResolved ? (
                                <div className="insight-item resolved">
                                    <div className="insight-icon success">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div className="insight-content">
                                        <h4>AI Optimization Optimized</h4>
                                        <p>Dynamic load balancing successful. Saved <span className="text-secondary">0.5 kWh</span> in the last hour.</p>
                                    </div>
                                    <button className="btn btn-secondary btn-small" onClick={() => setIsResolved(false)}>Reset</button>
                                </div>
                            ) : (
                                <div className="insight-item">
                                    <div className="insight-icon alert">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <div className="insight-content">
                                        <h4>High Leakage Warning</h4>
                                        <p>Bedroom AC efficiency dropped below threshold (72%). Maintenance recommended.</p>
                                    </div>
                                    <button className="btn btn-primary btn-small" onClick={() => setIsResolved(true)}>Tune-Up</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="dashboard-column-right">
                        <div className="chart-card-modern fade-in" style={{ animationDelay: '0.7s' }}>
                            <div className="card-header-modern">
                                <h3>Load Distribution</h3>
                            </div>
                            <div className="chart-container-modern mini">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={deviceData}
                                            innerRadius={65}
                                            outerRadius={85}
                                            paddingAngle={10}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {deviceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                             contentStyle={{ 
                                                borderRadius: '16px', 
                                                border: '1px solid rgba(255,255,255,0.1)', 
                                                background: 'rgba(11, 14, 20, 0.9)',
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="pie-legend-custom">
                                    {deviceData.map((d, i) => (
                                        <div key={i} className="legend-item-custom">
                                            <span className="dot" style={{ backgroundColor: d.color }}></span>
                                            <span className="name" style={{ color: COLORS.textMuted }}>{d.name}</span>
                                            <span className="val" style={{ color: '#fff' }}>{d.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="control-panel-modern fade-in" style={{ animationDelay: '0.8s' }}>
                            <div className="card-header-modern">
                                <h3>Quick Access</h3>
                            </div>
                            <div className="device-list-modern">
                                {devices.map(device => (
                                    <div 
                                        key={device.id} 
                                        className={`device-row-modern ${device.isOn ? 'on' : 'off'}`}
                                        onClick={() => setSelectedDeviceId(device.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="device-icon-modern">
                                            {device.icon}
                                        </div>
                                        <div className="device-name-wrap">
                                            <h4>{device.name}</h4>
                                            <p>{device.room}</p>
                                        </div>
                                        <label className="switch" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={device.isOn}
                                                onChange={() => toggleDevice(device.id)}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedDevice && (
                <div className="modal-overlay" onClick={() => setSelectedDeviceId(null)}>
                    <div className="modal-content fade-in-up" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <button className="close-btn" onClick={() => setSelectedDeviceId(null)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-device-icon-large">
                                {selectedDevice.icon}
                            </div>
                            <h2 className="modal-device-name">{selectedDevice.name}</h2>
                            <p className="modal-device-room">{selectedDevice.room}</p>
                            
                            <div className="modal-stats">
                                <div className="modal-stat-item">
                                    <Activity size={20} color={COLORS.primary} />
                                    <div className="stat-label-wrap">
                                        <p>Power Consumed</p>
                                        <h3>{selectedDevice.consumption}</h3>
                                    </div>
                                </div>
                                <div className="modal-stat-item">
                                    <Zap size={20} color={selectedDevice.isOn ? COLORS.success : COLORS.warning} />
                                    <div className="stat-label-wrap">
                                        <p>Status</p>
                                        <h3 style={{ color: selectedDevice.isOn ? COLORS.success : COLORS.warning }}>
                                            {selectedDevice.isOn ? 'OPERATIONAL' : 'STANDBY'}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="btn-primary-modern" onClick={() => setSelectedDeviceId(null)}>CONFIRM</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
