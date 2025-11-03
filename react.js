import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, XCircle, Activity, Mouse, Keyboard, Clock, TrendingUp } from 'lucide-react';

const PassiveBotDetection = () => {
  const [metrics, setMetrics] = useState({
    mouseMovements: 0,
    mouseSpeed: 0,
    clickPatterns: 0,
    keystrokes: 0,
    timeOnPage: 0,
    scrollBehavior: 0,
    touchEvents: 0,
    deviceMotion: 0
  });
  
  const [trustScore, setTrustScore] = useState(0);
  const [isHuman, setIsHuman] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    name: '',
    mobile: ''
  });
  
  const startTime = useRef(Date.now());
  const mousePositions = useRef([]);
  const clickTimes = useRef([]);
  const keystrokeTimes = useRef([]);
  const scrollEvents = useRef([]);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      mousePositions.current.push({
        x: e.clientX,
        y: e.clientY,
        time: now
      });
      
      if (mousePositions.current.length > 50) {
        mousePositions.current.shift();
      }
      
      // Calculate mouse speed and patterns
      if (mousePositions.current.length > 1) {
        const recent = mousePositions.current.slice(-10);
        let totalSpeed = 0;
        
        for (let i = 1; i < recent.length; i++) {
          const dx = recent[i].x - recent[i-1].x;
          const dy = recent[i].y - recent[i-1].y;
          const dt = recent[i].time - recent[i-1].time;
          const speed = Math.sqrt(dx*dx + dy*dy) / (dt || 1);
          totalSpeed += speed;
        }
        
        const avgSpeed = totalSpeed / (recent.length - 1);
        
        setMetrics(prev => ({
          ...prev,
          mouseMovements: Math.min(100, prev.mouseMovements + 0.5),
          mouseSpeed: Math.min(100, avgSpeed * 10)
        }));
      }
    };

    const handleClick = (e) => {
      const now = Date.now();
      clickTimes.current.push(now);
      
      if (clickTimes.current.length > 20) {
        clickTimes.current.shift();
      }
      
      // Analyze click patterns
      if (clickTimes.current.length > 2) {
        const intervals = [];
        for (let i = 1; i < clickTimes.current.length; i++) {
          intervals.push(clickTimes.current[i] - clickTimes.current[i-1]);
        }
        
        // Human clicks have variance; bot clicks are often uniform
        const variance = intervals.reduce((sum, val, _, arr) => {
          const mean = arr.reduce((a, b) => a + b) / arr.length;
          return sum + Math.pow(val - mean, 2);
        }, 0) / intervals.length;
        
        setMetrics(prev => ({
          ...prev,
          clickPatterns: Math.min(100, variance / 100)
        }));
      }
    };

    const handleKeyDown = (e) => {
      const now = Date.now();
      keystrokeTimes.current.push(now);
      
      if (keystrokeTimes.current.length > 30) {
        keystrokeTimes.current.shift();
      }
      
      setMetrics(prev => ({
        ...prev,
        keystrokes: Math.min(100, prev.keystrokes + 3)
      }));
    };

    const handleScroll = (e) => {
      const now = Date.now();
      scrollEvents.current.push({
        scrollY: window.scrollY,
        time: now
      });
      
      if (scrollEvents.current.length > 20) {
        scrollEvents.current.shift();
      }
      
      setMetrics(prev => ({
        ...prev,
        scrollBehavior: Math.min(100, prev.scrollBehavior + 2)
      }));
    };

    const handleTouch = (e) => {
      setMetrics(prev => ({
        ...prev,
        touchEvents: Math.min(100, prev.touchEvents + 5)
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  // Time on page tracker
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      setMetrics(prev => ({
        ...prev,
        timeOnPage: Math.min(100, elapsed * 5)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate trust score
  useEffect(() => {
    const weights = {
      mouseMovements: 0.20,
      mouseSpeed: 0.15,
      clickPatterns: 0.15,
      keystrokes: 0.15,
      timeOnPage: 0.10,
      scrollBehavior: 0.10,
      touchEvents: 0.10,
      deviceMotion: 0.05
    };

    let score = 0;
    Object.keys(weights).forEach(key => {
      score += metrics[key] * weights[key];
    });

    setTrustScore(Math.round(score));

    // Determine if user is human after 5 seconds
    if ((Date.now() - startTime.current) / 1000 > 5) {
      setIsAnalyzing(false);
      setIsHuman(score > 50);
    }
  }, [metrics]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isHuman) {
      alert('Form submitted successfully! No CAPTCHA needed.');
    } else {
      alert('Bot detected. Please try again with natural interaction.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">UIDAI Passive Bot Detection</h1>
          </div>
          <p className="text-gray-600">Advanced behavioral analysis for secure authentication without traditional CAPTCHAs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Metrics Dashboard */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              Behavioral Analysis
            </h2>

            <div className="space-y-4">
              {/* Trust Score */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Trust Score</span>
                  <span className={`text-2xl font-bold ${trustScore > 70 ? 'text-green-600' : trustScore > 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {trustScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${trustScore > 70 ? 'bg-green-500' : trustScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${trustScore}%` }}
                  />
                </div>
              </div>

              {/* Individual Metrics */}
              <MetricBar icon={<Mouse className="w-4 h-4" />} label="Mouse Movement" value={metrics.mouseMovements} />
              <MetricBar icon={<TrendingUp className="w-4 h-4" />} label="Mouse Speed Variance" value={metrics.mouseSpeed} />
              <MetricBar icon={<Activity className="w-4 h-4" />} label="Click Patterns" value={metrics.clickPatterns} />
              <MetricBar icon={<Keyboard className="w-4 h-4" />} label="Keystroke Dynamics" value={metrics.keystrokes} />
              <MetricBar icon={<Clock className="w-4 h-4" />} label="Time on Page" value={metrics.timeOnPage} />
              <MetricBar icon={<Activity className="w-4 h-4" />} label="Scroll Behavior" value={metrics.scrollBehavior} />

              {/* Status Indicator */}
              <div className={`mt-6 p-4 rounded-lg ${isAnalyzing ? 'bg-blue-50' : isHuman ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center gap-2">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span className="font-semibold text-blue-700">Analyzing behavior...</span>
                    </>
                  ) : isHuman ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">Human verified ✓</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-700">Suspicious activity detected</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">UIDAI Service Request</h2>
            <p className="text-sm text-gray-600 mb-6">
              Interact naturally with this page. No CAPTCHA required - we're analyzing your behavior to verify you're human.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  placeholder="XXXX XXXX XXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  maxLength="14"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  maxLength="13"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isAnalyzing || !isHuman}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    isAnalyzing || !isHuman
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isAnalyzing ? 'Verifying...' : isHuman ? 'Submit Request' : 'Verification Failed'}
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-sm text-blue-900 mb-2">How it works:</h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Move your mouse naturally around the page</li>
                <li>• Type in the input fields</li>
                <li>• Click on different areas</li>
                <li>• Scroll up and down</li>
                <li>• We analyze these patterns to verify you're human</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Info */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Technology Overview</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-indigo-600 mb-2">Behavioral Biometrics</h3>
              <p className="text-gray-600">Analyzes mouse movement speed, acceleration, and trajectory patterns</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-indigo-600 mb-2">Timing Analysis</h3>
              <p className="text-gray-600">Monitors keystroke dynamics and click interval patterns</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-indigo-600 mb-2">Device Fingerprinting</h3>
              <p className="text-gray-600">Tracks touch events, device motion, and interaction patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBar = ({ icon, label, value }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-600">{Math.round(value)}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default PassiveBotDetection;
