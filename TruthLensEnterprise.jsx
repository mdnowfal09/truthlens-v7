import React, { useState } from 'react';
import { Upload, Shield, AlertTriangle, CheckCircle, Camera, Clock, FileText, TrendingUp, Zap, Settings, Users, Bell, Download, Search, Eye, BarChart3, Brain, Lock, DollarSign } from 'lucide-react';

export default function TruthLensEnterprise() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setLoading(true);
    setTimeout(() => {
      const riskScore = Math.random();
      setAnalysisResult({
        riskScore: (riskScore * 100).toFixed(1),
        recommendation: riskScore > 0.6 ? 'REJECT' : riskScore > 0.4 ? 'MANUAL REVIEW' : 'APPROVE',
        timestamp: new Date().toLocaleString(),
      });
      setLoading(false);
    }, 2000);
  };

  const enterpriseMetrics = [
    { label: 'Total Claims Processed', value: '12,847', change: '+24%' },
    { label: 'Fraud Detection Rate', value: '94.2%', change: '+8.3%' },
    { label: 'Amount Protected', value: '$2.4M', change: '+156%' },
    { label: 'Response Time', value: '2.1s', change: '-15%' },
    { label: 'False Positive Rate', value: '2.1%', change: '-0.5%' },
    { label: 'Customer Satisfaction', value: '98.7%', change: '+2.2%' },
  ];

  const fraudPatterns = [
    { pattern: 'AI-Generated Images (Midjourney/DALL-E)', frequency: 34, severity: 'critical' },
    { pattern: 'Metadata Manipulation', frequency: 28, severity: 'high' },
    { pattern: 'Photo Collage Fraud', frequency: 19, severity: 'high' },
    { pattern: 'Same Customer Multiple Claims', frequency: 12, severity: 'critical' },
    { pattern: 'Temporal Timestamp Spoofing', frequency: 8, severity: 'medium' },
  ];

  const alerts = [
    { id: 1, type: 'critical', message: 'Customer C8921 flagged: 6 rejected claims in 30 days', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'AI artifact detection accuracy dropped 2.1% - model retraining needed', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Daily report ready: $45.2K fraud prevented', time: '1 hour ago' },
  ];

  const apiEndpoints = [
    { method: 'POST', path: '/api/v1/analyze', rateLimit: '1000/min' },
    { method: 'GET', path: '/api/v1/claim/{id}', rateLimit: '10000/min' },
    { method: 'POST', path: '/api/v1/webhook/register', rateLimit: '100/min' },
    { method: 'GET', path: '/api/v1/analytics/summary', rateLimit: '500/min' },
    { method: 'POST', path: '/api/v1/rules/custom', rateLimit: '100/min' },
  ];

  const complianceFeatures = [
    { name: 'GDPR Compliance', status: 'certified' },
    { name: 'SOC 2 Type II', status: 'certified' },
    { name: 'PCI-DSS 3.2.1', status: 'certified' },
    { name: 'ISO 27001', status: 'in-progress' },
    { name: 'HIPAA Ready', status: 'available' },
  ];

  const roiData = {
    monthlyFraudPrevented: 353250,
    yearlyTotal: 4237000,
    detectionRate: 94.2,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-2xl p-8 mb-8 border border-indigo-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-12 h-12 text-white" />
              <div>
                <h1 className="text-4xl font-bold text-white">TruthLens Enterprise</h1>
                <p className="text-indigo-100">Next-Gen Fraud Detection & Prevention</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">94.2%</div>
              <p className="text-indigo-100">Detection Accuracy</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-slate-800 rounded-lg shadow-lg mb-6 border border-slate-700">
          <div className="flex border-b border-slate-700 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'analysis', label: 'Analysis' },
              { id: 'patterns', label: 'Fraud Patterns' },
              { id: 'api', label: 'API Portal' },
              { id: 'rules', label: 'Custom Rules' },
              { id: 'compliance', label: 'Compliance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition border-b-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-400 bg-slate-700'
                    : 'border-transparent text-slate-300 hover:text-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enterpriseMetrics.map((metric, idx) => (
                <div key={idx} className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700 hover:border-indigo-500 transition">
                  <div className="text-slate-300 text-sm font-medium mb-4">{metric.label}</div>
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm text-green-400">{metric.change} this month</div>
                </div>
              ))}
            </div>

            {/* Alerts & ROI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-red-400" />
                  Live Alerts
                </h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'critical'
                          ? 'bg-red-900 bg-opacity-20 border-red-500 text-red-100'
                          : alert.type === 'warning'
                          ? 'bg-yellow-900 bg-opacity-20 border-yellow-500 text-yellow-100'
                          : 'bg-blue-900 bg-opacity-20 border-blue-500 text-blue-100'
                      }`}
                    >
                      <div className="mb-2">{alert.message}</div>
                      <div className="text-xs opacity-70">{alert.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-lg shadow-lg p-6 border border-green-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Annual ROI & Savings
                </h3>
                <div className="space-y-4">
                  <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                    <div className="text-sm text-green-200 mb-1">Yearly Fraud Prevention</div>
                    <div className="text-3xl font-bold text-green-300">${(roiData.yearlyTotal / 1000000).toFixed(1)}M+</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-black bg-opacity-30 p-3 rounded">
                      <div className="text-green-200">Detection Rate</div>
                      <div className="text-xl font-bold text-white">{roiData.detectionRate}%</div>
                    </div>
                    <div className="bg-black bg-opacity-30 p-3 rounded">
                      <div className="text-green-200">Monthly Saved</div>
                      <div className="text-xl font-bold text-white">${(roiData.monthlyFraudPrevented / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Upload & Analyze</h2>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                {!uploadedImage ? (
                  <div>
                    <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300 mb-4">Upload image for fraud analysis</p>
                    <label className="bg-indigo-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 inline-block">
                      Choose Image
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <div>
                    <img src={uploadedImage} alt="Preview" className="max-w-full h-64 object-contain mx-auto mb-4 rounded" />
                    <button
                      onClick={analyzeImage}
                      disabled={loading}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600"
                    >
                      {loading ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Analysis Results</h2>
              {!analysisResult ? (
                <div className="text-center py-16 text-slate-400">
                  <FileText className="w-16 h-16 mx-auto mb-4" />
                  <p>Upload image to see results</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    analysisResult.riskScore > 60 ? 'bg-red-900 bg-opacity-30 border border-red-700' :
                    analysisResult.riskScore > 40 ? 'bg-yellow-900 bg-opacity-30 border border-yellow-700' :
                    'bg-green-900 bg-opacity-30 border border-green-700'
                  }`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-semibold">Risk Score</span>
                      <span className={`text-3xl font-bold ${
                        analysisResult.riskScore > 60 ? 'text-red-400' :
                        analysisResult.riskScore > 40 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {analysisResult.riskScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          analysisResult.riskScore > 60 ? 'bg-red-500' :
                          analysisResult.riskScore > 40 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: analysisResult.riskScore + '%' }}
                      />
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg font-semibold border ${
                    analysisResult.recommendation === 'REJECT' ? 'bg-red-900 bg-opacity-30 border-red-700 text-red-300' :
                    analysisResult.recommendation === 'MANUAL REVIEW' ? 'bg-yellow-900 bg-opacity-30 border-yellow-700 text-yellow-300' :
                    'bg-green-900 bg-opacity-30 border-green-700 text-green-300'
                  }`}>
                    {analysisResult.recommendation}
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">Approve</button>
                    <button className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">Reject</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fraud Patterns Tab */}
        {activeTab === 'patterns' && (
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              Active Fraud Pattern Intelligence
            </h2>
            <div className="space-y-3">
              {fraudPatterns.map((pattern, idx) => (
                <div key={idx} className="bg-slate-700 rounded-lg p-5 border border-slate-600 hover:border-purple-500 transition">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white text-lg">{pattern.pattern}</h3>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      pattern.severity === 'critical' ? 'bg-red-900 text-red-200' :
                      'bg-orange-900 text-orange-200'
                    }`}>
                      {pattern.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Detected Cases</span>
                      <div className="text-2xl font-bold text-white">{pattern.frequency}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Detection Rate</span>
                      <div className="text-xl font-bold text-green-400">{Math.round(pattern.frequency * 0.94)}/100</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Portal Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                REST API Documentation
              </h2>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-green-400 mb-6 overflow-x-auto">
                <div>const response = await fetch('https://api.truthlens.io/v1/analyze', {'{'}' </div>
                <div>&nbsp;&nbsp;method: 'POST',</div>
                <div>&nbsp;&nbsp;headers: {'{'}Authorization: 'Bearer YOUR_API_KEY'{'}'},</div>
                <div>&nbsp;&nbsp;body: JSON.stringify({'{'}image, orderId, customerEmail{'}'})</div>
                <div>{'}'});
</div>
              </div>
            </div>

            <div className="space-y-4">
              {apiEndpoints.map((endpoint, idx) => (
                <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-indigo-500 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded text-sm font-bold text-white ${
                        endpoint.method === 'GET' ? 'bg-blue-600' : 'bg-green-600'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="text-white font-mono text-sm">{endpoint.path}</span>
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">Rate Limit: {endpoint.rateLimit}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Rules Tab */}
        {activeTab === 'rules' && (
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              Custom Rule Engine
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
                <h3 className="text-white font-bold mb-4">Rule Templates</h3>
                <div className="space-y-3">
                  <div className="bg-slate-800 p-4 rounded cursor-pointer hover:bg-slate-700 transition border border-slate-600">
                    <div className="font-semibold text-white">High-Value Claim Detection</div>
                    <div className="text-xs text-slate-400">Trigger if claim is over $500</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded cursor-pointer hover:bg-slate-700 transition border border-slate-600">
                    <div className="font-semibold text-white">Rapid-Fire Claims</div>
                    <div className="text-xs text-slate-400">Alert on 3+ claims in 24 hours</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded cursor-pointer hover:bg-slate-700 transition border border-slate-600">
                    <div className="font-semibold text-white">Geo-Velocity Fraud</div>
                    <div className="text-xs text-slate-400">Detect impossible location shifts</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
                <h3 className="text-white font-bold mb-4">Active Rules (23)</h3>
                <div className="space-y-2">
                  {['AI Image Detection', 'Metadata Analysis', 'Time-Based Verification', 'Pattern Matching', 'Customer Risk Score'].map((rule, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded border border-slate-600">
                      <span className="text-slate-300 text-sm">{rule}</span>
                      <span className="text-green-400 text-xs font-bold">ACTIVE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-green-400" />
                Certifications & Compliance
              </h2>
              <div className="space-y-3">
                {complianceFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600">
                    <span className="text-white font-medium">{feature.name}</span>
                    <span className={`px-3 py-1 rounded text-sm font-bold text-white ${
                      feature.status === 'certified' ? 'bg-green-600' :
                      feature.status === 'in-progress' ? 'bg-yellow-600' :
                      'bg-blue-600'
                    }`}>
                      {feature.status === 'certified' ? 'Certified' :
                       feature.status === 'in-progress' ? 'In Progress' :
                       'Available'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Security Features</h2>
              <div className="space-y-4">
                <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="font-semibold text-white mb-1">End-to-End Encryption</div>
                  <div className="text-sm text-slate-400">All data encrypted at rest and in transit</div>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="font-semibold text-white mb-1">24/7 Security Monitoring</div>
                  <div className="text-sm text-slate-400">Real-time threat detection</div>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="font-semibold text-white mb-1">Audit Logging</div>
                  <div className="text-sm text-slate-400">Complete audit trail for all operations</div>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-yellow-500">
                  <div className="font-semibold text-white mb-1">DDoS Protection</div>
                  <div className="text-sm text-slate-400">Enterprise-grade DDoS mitigation</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}