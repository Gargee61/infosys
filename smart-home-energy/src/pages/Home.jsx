import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Zap, Home as HomeIcon, DollarSign, Activity, Power, Lightbulb, Wind, Thermometer, ShieldCheck, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import './Home.css';
import livingRoomLogo from '../assets/living_room_light_3d_logo.png';
import acLogo from '../assets/smart_ac_3d_logo.png';
import fanLogo from '../assets/ceiling_fan_3d_logo.png';
import heaterLogo from '../assets/main_heater_3d_logo.png';
import cameraLogo from '../assets/outdoor_camera_3d_logo.png';



const Home = () => {
    // Mock Data
    const energyData = [
        { time: '00:00', usage: 0.5, cost: 0.1 },
        { time: '04:00', usage: 0.3, cost: 0.05 },
        { time: '08:00', usage: 1.2, cost: 0.4 },
        { time: '12:00', usage: 1.8, cost: 0.6 },
        { time: '16:00', usage: 1.5, cost: 0.5 },
        { time: '20:00', usage: 2.1, cost: 0.8 },
        { time: '23:59', usage: 0.9, cost: 0.3 },
    ];

    const weeklyData = [
        { time: 'Mon', usage: 45, cost: 12 },
        { time: 'Tue', usage: 52, cost: 15 },
        { time: 'Wed', usage: 48, cost: 13 },
        { time: 'Thu', usage: 61, cost: 18 },
        { time: 'Fri', usage: 55, cost: 16 },
        { time: 'Sat', usage: 67, cost: 20 },
        { time: 'Sun', usage: 42, cost: 11 },
    ];

    const deviceData = [
        { name: 'HVAC', value: 45, color: '#6366f1' },
        { name: 'Lights', value: 15, color: '#f59e0b' },
        { name: 'Appliances', value: 25, color: '#10b981' },
        { name: 'Electronics', value: 15, color: '#ef4444' },
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
        <div className="dashboard-wrapper">
            <div className="dashboard-container container fade-in">
                <header className="dashboard-header-modern">
                    <div className="header-left">
                        <div className="welcome-badge">
                            <Activity size={14} className="pulse" />
                            <span>System Active</span>
                        </div>
                        <h1>Energy Dashboard</h1>
                        <p>Welcome back! Your home energy efficiency is <span className="highlight-text">up by 12%</span> today.</p>
                    </div>
                    <div className="header-right">
                        <div className="current-status-card">
                            <Clock size={16} />
                            <span>Last Update: 2 mins ago</span>
                        </div>
                    </div>
                </header>

                {/* Stats Cards Modern */}
                <div className="stats-grid-modern">
                    <div className="stat-card-modern">
                        <div className="stat-icon-wrap zap">
                            <Zap size={24} />
                        </div>
                        <div className="stat-info-modern">
                            <p>Total Consumption</p>
                            <h3>450.5 <span>kWh</span></h3>
                            <div className="stat-trend positive">
                                <TrendingUp size={12} />
                                <span>-2.4% vs last mo.</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card-modern">
                        <div className="stat-icon-wrap activity">
                            <Activity size={24} />
                        </div>
                        <div className="stat-info-modern">
                            <p>Today's Usage</p>
                            <h3>12.8 <span>kWh</span></h3>
                            <div className="stat-trend negative">
                                <TrendingUp size={12} />
                                <span>+0.8% vs yesterday</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card-modern">
                        <div className="stat-icon-wrap dollar">
                            <DollarSign size={24} />
                        </div>
                        <div className="stat-info-modern">
                            <p>Est. Monthly Bill</p>
                            <h3>$85.20</h3>
                            <div className="bill-progress">
                                <div className="progress-bar" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card-modern">
                        <div className="stat-icon-wrap home">
                            <HomeIcon size={24} />
                        </div>
                        <div className="stat-info-modern">
                            <p>Active Devices</p>
                            <h3>{devices.filter(d => d.isOn).length} / {devices.length}</h3>
                            <p className="tiny-info">3 devices on standby</p>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="dashboard-layout-main">
                    {/* Left Column - Charts */}
                    <div className="dashboard-column-left">
                        <div className="chart-card-modern">
                            <div className="card-header-modern">
                                <h3>Power Analysis</h3>
                                <div className="card-actions">
                                    <button 
                                        className={`btn-small ${chartView === 'daily' ? 'active' : ''}`}
                                        onClick={() => setChartView('daily')}
                                    >
                                        Daily
                                    </button>
                                    <button 
                                        className={`btn-small ${chartView === 'weekly' ? 'active' : ''}`}
                                        onClick={() => setChartView('weekly')}
                                    >
                                        Weekly
                                    </button>
                                </div>
                            </div>
                            <div className="chart-container-modern">
                                <ResponsiveContainer width="100%" height={320}>
                                    <AreaChart data={chartView === 'daily' ? energyData : weeklyData}>
                                        <defs>
                                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="usage" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="insights-card-modern">
                            {isResolved ? (
                                <div className="insight-item resolved fade-in">
                                    <div className="insight-icon success">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div className="insight-content">
                                        <h4>Issue Resolved</h4>
                                        <p>Great! Your HVAC efficiency has been restored. Maintenance logs have been updated.</p>
                                    </div>
                                    <button className="btn-insight secondary" onClick={() => setIsResolved(false)}>Undo</button>
                                </div>
                            ) : (
                                <div className="insight-item">
                                    <div className="insight-icon alert">
                                        <AlertTriangle size={18} />
                                    </div>
                                    <div className="insight-content">
                                        <h4>High Leakage Detected</h4>
                                        <p>Your AC unit is consuming 15% more power than its average. Check for filter maintenance.</p>
                                    </div>
                                    <button className="btn-insight" onClick={() => setIsResolved(true)}>Resolve</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Controls & Distribution */}
                    <div className="dashboard-column-right">
                        <div className="chart-card-modern">
                            <div className="card-header-modern">
                                <h3>Load Distribution</h3>
                            </div>
                            <div className="chart-container-modern mini">
                                <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <Pie
                                            data={deviceData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={8}
                                            dataKey="value"
                                        >
                                            {deviceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="pie-legend-custom">
                                    {deviceData.map((d, i) => (
                                        <div key={i} className="legend-item-custom">
                                            <span className="dot" style={{ backgroundColor: d.color }}></span>
                                            <span className="name">{d.name}</span>
                                            <span className="val">{d.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="control-panel-modern">
                            <div className="card-header-modern">
                                <h3>Quick Control</h3>
                                <button className="btn-link">All Rooms</button>
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

            {/* Device Detail Modal */}
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
                                    <Activity size={20} />
                                    <div className="stat-label-wrap">
                                        <p>Total Consumption</p>
                                        <h3>{selectedDevice.consumption}</h3>
                                    </div>
                                </div>
                                <div className="modal-stat-item">
                                    <Zap size={20} />
                                    <div className="stat-label-wrap">
                                        <p>Status</p>
                                        <h3 className={selectedDevice.isOn ? 'status-on' : 'status-off'}>
                                            {selectedDevice.isOn ? 'ACTIVE' : 'OFF'}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="btn-primary-modern" onClick={() => setSelectedDeviceId(null)}>Close Details</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
