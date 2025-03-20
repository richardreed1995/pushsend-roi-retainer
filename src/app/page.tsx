'use client';
import { useState } from 'react';

const ROICalculator = () => {
  const prospectTiers = [
    { 
      prospects: 2000, 
      cost: 2000, 
      label: '£2,000/month',
      description: '2,000 prospects',
      costPerProspect: (2000 / 2200).toFixed(2)
    },
    { 
      prospects: 3500, 
      cost: 3000, 
      label: '£3,000/month',
      description: '7,000 prospects',
      costPerProspect: (3000 / 3500).toFixed(2)
    },
    { 
      prospects: 7000, 
      cost: 4000, 
      label: '£4,000/month',
      description: '15,000 prospects',
      costPerProspect: (4000 / 7000).toFixed(2)
    }
  ];

  const offerStrengths = [
    { label: 'Good', rate: 1/500 },
    { label: 'Great', rate: 1/350 },
    { label: 'Exceptional', rate: 1/200 },
    { label: 'Outstanding', rate: 1/100 }
  ];

  const [selectedTier, setSelectedTier] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [retentionMonths, setRetentionMonths] = useState('');
  const [closeRate, setCloseRate] = useState('33');
  const [offerStrength, setOfferStrength] = useState(0);
  const [grossProfitMargin, setGrossProfitMargin] = useState('70');

  const calculateMetrics = () => {
    const monthlyRev = parseFloat(monthlyRevenue) || 0;
    const retention = parseFloat(retentionMonths) || 0;
    const close = parseFloat(closeRate) || 0;
    const grossProfit = parseFloat(grossProfitMargin) || 0;
    
    // Calculate leads from prospects using selected offer strength
    const monthlyMeetings = Math.round(prospectTiers[selectedTier].prospects * offerStrengths[offerStrength].rate);
    
    // Calculate new customers (based on leads and close rate)
    const newCustomers = Math.round(monthlyMeetings * (close / 100));
    
    // Calculate new monthly revenue
    const newMonthlyRevenue = Math.round(newCustomers * monthlyRev);
    
    // Calculate LTV (monthly revenue * retention months)
    const ltv = Math.round(monthlyRev * retention);
    
    // Calculate LTGP (LTV * gross profit margin)
    const ltgp = Math.round(ltv * (grossProfit / 100));
    
    // Calculate CAC (total cost divided by new customers)
    const cac = newCustomers > 0 ? Math.round(prospectTiers[selectedTier].cost / newCustomers) : 0;
    
    // Calculate ROI based on LTV:CAC
    const roi = cac > 0 ? Math.round(((ltv - cac) / cac) * 100) : 0;
    
    return {
      monthlyMeetings,
      newCustomers,
      newMonthlyRevenue,
      ltv,
      ltgp,
      cac,
      roi,
      ltvCacRatio: Math.round(ltv / cac),
      ltgpCacRatio: Math.round(ltgp / cac)
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="w-full bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">PushSend Retainer ROI Calculator</h2>
          <div className="h-1 w-24 bg-orange-500 mb-6"></div>
          
          {/* Pricing Tiers */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {prospectTiers.map((tier, index) => (
              <button
                key={index}
                onClick={() => setSelectedTier(index)}
                className={`p-6 rounded-lg transition-all text-center ${
                  selectedTier === index 
                    ? 'bg-orange-50 border border-orange-500' 
                    : 'bg-white border border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="text-xl font-semibold mb-2 text-gray-800">{tier.description}</div>
                <div className="text-base text-gray-700">{tier.label}</div>
                <div className="text-sm text-gray-500 mt-1">£{tier.costPerProspect}/prospect</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Metrics */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Your Business Metrics</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Monthly Revenue per Customer
                </label>
                <input
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-orange-200 focus:border-orange-500 text-gray-800"
                  placeholder="£0"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Average Customer Retention (months)
                </label>
                <input
                  type="number"
                  value={retentionMonths}
                  onChange={(e) => setRetentionMonths(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-orange-200 focus:border-orange-500 text-gray-800"
                  placeholder="Enter months"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Expected Close Rate (%)
                </label>
                <input
                  type="number"
                  value={closeRate}
                  onChange={(e) => setCloseRate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-orange-200 focus:border-orange-500 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Gross Profit Margin (%)
                </label>
                <input
                  type="number"
                  value={grossProfitMargin}
                  onChange={(e) => setGrossProfitMargin(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-orange-200 focus:border-orange-500 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Offer Strength
                </label>
                <select
                  value={offerStrength}
                  onChange={(e) => setOfferStrength(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-orange-200 focus:border-orange-500 text-gray-800"
                >
                  {offerStrengths.map((strength, index) => (
                    <option key={index} value={index}>
                      {strength.label} (1 lead per {1/strength.rate} prospects)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ROI Analysis */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">ROI Analysis</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded flex justify-between items-center">
                <span className="text-gray-700 font-medium">Meetings per Month</span>
                <span className="font-semibold text-gray-900">{metrics.monthlyMeetings}</span>
              </div>

              <div className="bg-gray-50 p-4 rounded flex justify-between items-center">
                <span className="text-gray-700 font-medium">New Customers per Month</span>
                <span className="font-semibold text-gray-900">{metrics.newCustomers}</span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded flex justify-between items-center">
                <span className="text-gray-700 font-medium">New Monthly Revenue</span>
                <span className="font-semibold text-gray-900">£{metrics.newMonthlyRevenue.toLocaleString()}</span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded flex justify-between items-center">
                <span className="text-gray-700 font-medium">LTV</span>
                <span className="font-semibold text-gray-900">£{metrics.ltv.toLocaleString()}</span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded flex justify-between items-center">
                <span className="text-gray-700 font-medium">CAC</span>
                <span className="font-semibold text-gray-900">£{metrics.cac.toLocaleString()}</span>
              </div>
              
              <div className={`p-4 rounded flex justify-between items-center ${
                metrics.roi >= 0 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <span className={`font-medium ${metrics.roi >= 0 ? 'text-green-700' : 'text-red-700'}`}>ROI</span>
                <span className={`font-semibold ${metrics.roi >= 0 ? 'text-green-700' : 'text-red-700'}`}>{metrics.roi}%</span>
              </div>
              
              <div className={`p-4 rounded flex justify-between items-center ${
                metrics.ltvCacRatio >= 1 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <span className={`font-medium ${metrics.ltvCacRatio >= 1 ? 'text-green-700' : 'text-red-700'}`}>LTV:CAC Ratio</span>
                <span className={`font-semibold ${metrics.ltvCacRatio >= 1 ? 'text-green-700' : 'text-red-700'}`}>{metrics.ltvCacRatio}:1</span>
              </div>

              <div className={`p-4 rounded flex justify-between items-center ${
                metrics.ltgpCacRatio >= 1 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <span className={`font-medium ${metrics.ltgpCacRatio >= 1 ? 'text-green-700' : 'text-red-700'}`}>LTGP:CAC Ratio</span>
                <span className={`font-semibold ${metrics.ltgpCacRatio >= 1 ? 'text-green-700' : 'text-red-700'}`}>{metrics.ltgpCacRatio}:1</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-600 p-4 bg-white rounded-lg shadow-sm">
          Note: This calculator provides estimates for educational purposes only. Actual results may vary depending on various factors including market conditions, industry, target audience, and campaign execution.
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;