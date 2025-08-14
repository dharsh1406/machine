import React, { useState } from 'react';
import { X } from 'lucide-react';

function App() {
  const [settings, setSettings] = useState({
    speed: '15.0',
    acc: '150',
    dec: '150',
    singleStep: '7.0',
    lastStep: '106.0'
  });

  const [productCount, setProductCount] = useState({
    pieces: '7784',
    user: '1356'
  });

  const [coilNumber, setCoilNumber] = useState(4);

  const handleSettingChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductCountChange = (field: string, value: string) => {
    setProductCount(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetProductCount = (field: string) => {
    setProductCount(prev => ({
      ...prev,
      [field]: '0'
    }));
  };

  const resetQuantities = () => {
    setProductCount({
      pieces: '0',
      user: '0'
    });
  };

  const adjustCoilNumber = (increment: boolean) => {
    setCoilNumber(prev => increment ? prev + 1 : Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="relative bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg shadow-2xl border-2 border-gray-300 w-full max-w-4xl">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-purple-400 to-blue-400 rounded-t-lg px-4 py-2 flex items-center justify-between border-b border-gray-300">
          <h1 className="text-white text-xl font-bold tracking-wide">Auto Setting</h1>
          <button className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded flex items-center justify-center transition-colors duration-200">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Auto S1 Parameters */}
            <div className="col-span-7 space-y-4">
              <div className="flex items-center">
                <label className="text-white text-lg font-medium w-64">Auto S1 Speed</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={settings.speed}
                    onChange={(e) => handleSettingChange('speed', e.target.value)}
                    className="bg-white border-2 border-gray-400 rounded px-3 py-2 w-32 text-center font-bold text-lg shadow-inner"
                  />
                  <span className="text-white font-medium">mm/s</span>
                </div>
              </div>

              <div className="flex items-center">
                <label className="text-white text-lg font-medium w-64">Auto S1 Acc</label>
                <input
                  type="text"
                  value={settings.acc}
                  onChange={(e) => handleSettingChange('acc', e.target.value)}
                  className="bg-white border-2 border-gray-400 rounded px-3 py-2 w-32 text-center font-bold text-lg shadow-inner"
                />
              </div>

              <div className="flex items-center">
                <label className="text-white text-lg font-medium w-64">Auto S1 Dec</label>
                <input
                  type="text"
                  value={settings.dec}
                  onChange={(e) => handleSettingChange('dec', e.target.value)}
                  className="bg-white border-2 border-gray-400 rounded px-3 py-2 w-32 text-center font-bold text-lg shadow-inner"
                />
              </div>

              <div className="flex items-center">
                <label className="text-white text-lg font-medium w-64">Auto S1 Single Step mm</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={settings.singleStep}
                    onChange={(e) => handleSettingChange('singleStep', e.target.value)}
                    className="bg-white border-2 border-gray-400 rounded px-3 py-2 w-32 text-center font-bold text-lg shadow-inner"
                  />
                  <span className="text-white font-medium">mm</span>
                </div>
              </div>

              <div className="flex items-center">
                <label className="text-white text-lg font-medium w-64">Auto S1 Last Step mm</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={settings.lastStep}
                    onChange={(e) => handleSettingChange('lastStep', e.target.value)}
                    className="bg-white border-2 border-gray-400 rounded px-3 py-2 w-32 text-center font-bold text-lg shadow-inner"
                  />
                  <span className="text-white font-medium">mm</span>
                </div>
              </div>
            </div>

            {/* Right Column - No of Coil */}
            <div className="col-span-5 flex flex-col items-end">
              <div className="text-right mb-4">
                <label className="text-white text-lg font-medium block mb-2">No of Coil</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={coilNumber}
                    readOnly
                    className="bg-white border-2 border-gray-400 rounded px-3 py-2 w-16 text-center font-bold text-xl shadow-inner"
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => adjustCoilNumber(true)}
                      className="bg-gray-600 hover:bg-gray-700 text-white w-8 h-6 rounded text-sm font-bold transition-colors duration-200"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => adjustCoilNumber(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white w-8 h-6 rounded text-sm font-bold transition-colors duration-200"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Count Section */}
          <div className="mt-8 grid grid-cols-12 gap-6">
            <div className="col-span-8 space-y-4">
              <div className="flex items-center">
                <label className="text-white text-lg font-medium w-64">
                  Product Count<br />
                  <span className="text-sm">Pieces</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={productCount.pieces}
                    onChange={(e) => handleProductCountChange('pieces', e.target.value)}
                    className="bg-white border-2 border-gray-400 rounded px-3 py-2 w-32 text-center font-bold text-lg shadow-inner"
                  />
                  <button
                    onClick={() => resetProductCount('pieces')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-bold border-2 border-green-700 shadow-lg transition-colors duration-200"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <label className="text-white text-lg font-medium w-64">
                  Product Count<br />
                  <span className="text-sm">User</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={productCount.user}
                    onChange={(e) => handleProductCountChange('user', e.target.value)}
                    className="bg-white border-2 border-gray-400 rounded px-3 py-2 w-32 text-center font-bold text-lg shadow-inner"
                  />
                  <button
                    onClick={() => resetProductCount('user')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-bold border-2 border-green-700 shadow-lg transition-colors duration-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Reset All Button */}
            <div className="col-span-4 flex items-center justify-end">
              <button
                onClick={resetQuantities}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-8 rounded-lg font-bold text-lg border-2 border-blue-800 shadow-lg transition-colors duration-200"
              >
                Reset the<br />quantities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;