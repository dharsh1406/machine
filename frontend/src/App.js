import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [settings, setSettings] = useState({
    speed: '15.0',
    acceleration: '150',
    deceleration: '150',
    single_step: '7.0',
    last_step: '106.0',
    coil_number: 4
  });

  const [productCount, setProductCount] = useState({
    pieces: '7784',
    user_count: '1356'
  });

  // Load initial data
  useEffect(() => {
    loadSettings();
    loadProductCount();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await axios.get('/api/settings/1/');
      setSettings({
        speed: response.data.speed.toString(),
        acceleration: response.data.acceleration.toString(),
        deceleration: response.data.deceleration.toString(),
        single_step: response.data.single_step.toString(),
        last_step: response.data.last_step.toString(),
        coil_number: response.data.coil_number
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadProductCount = async () => {
    try {
      const response = await axios.get('/api/product-count/1/');
      setProductCount({
        pieces: response.data.pieces.toString(),
        user_count: response.data.user_count.toString()
      });
    } catch (error) {
      console.error('Error loading product count:', error);
    }
  };

  const updateSettings = async (field, value) => {
    try {
      const updatedSettings = { ...settings, [field]: value };
      await axios.patch('/api/settings/1/', {
        [field]: field === 'coil_number' ? parseInt(value) : 
                 field === 'acceleration' || field === 'deceleration' ? parseInt(value) :
                 parseFloat(value)
      });
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const updateProductCount = async (field, value) => {
    try {
      const updatedCount = { ...productCount, [field]: value };
      await axios.patch('/api/product-count/1/', {
        [field]: parseInt(value)
      });
      setProductCount(updatedCount);
    } catch (error) {
      console.error('Error updating product count:', error);
    }
  };

  const adjustCoilNumber = async (increment) => {
    try {
      const response = await axios.post('/api/settings/update_coil_number/', {
        action: increment ? 'increment' : 'decrement'
      });
      setSettings(prev => ({
        ...prev,
        coil_number: response.data.coil_number
      }));
    } catch (error) {
      console.error('Error adjusting coil number:', error);
    }
  };

  const resetProductCount = async (field) => {
    try {
      if (field === 'pieces') {
        const response = await axios.post('/api/product-count/reset_pieces/');
        setProductCount(prev => ({ ...prev, pieces: '0' }));
      } else if (field === 'user_count') {
        const response = await axios.post('/api/product-count/reset_user_count/');
        setProductCount(prev => ({ ...prev, user_count: '0' }));
      }
    } catch (error) {
      console.error('Error resetting product count:', error);
    }
  };

  const resetAllQuantities = async () => {
    try {
      await axios.post('/api/product-count/reset_all/');
      setProductCount({ pieces: '0', user_count: '0' });
    } catch (error) {
      console.error('Error resetting all quantities:', error);
    }
  };

  return (
    <div className="machine-control-app">
      <div className="control-panel">
        {/* Title Bar */}
        <div className="title-bar">
          <h1>Auto Setting</h1>
          <button className="close-btn">×</button>
        </div>

        <div className="panel-content">
          <div className="row">
            {/* Left Column - Auto S1 Parameters */}
            <div className="col-8">
              <div className="parameter-row">
                <label>Auto S1 Speed</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={settings.speed}
                    onChange={(e) => updateSettings('speed', e.target.value)}
                    className="parameter-input"
                  />
                  <span className="unit">mm/s</span>
                </div>
              </div>

              <div className="parameter-row">
                <label>Auto S1 Acc</label>
                <input
                  type="text"
                  value={settings.acceleration}
                  onChange={(e) => updateSettings('acceleration', e.target.value)}
                  className="parameter-input"
                />
              </div>

              <div className="parameter-row">
                <label>Auto S1 Dec</label>
                <input
                  type="text"
                  value={settings.deceleration}
                  onChange={(e) => updateSettings('deceleration', e.target.value)}
                  className="parameter-input"
                />
              </div>

              <div className="parameter-row">
                <label>Auto S1 Single Step mm</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={settings.single_step}
                    onChange={(e) => updateSettings('single_step', e.target.value)}
                    className="parameter-input"
                  />
                  <span className="unit">mm</span>
                </div>
              </div>

              <div className="parameter-row">
                <label>Auto S1 Last Step mm</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={settings.last_step}
                    onChange={(e) => updateSettings('last_step', e.target.value)}
                    className="parameter-input"
                  />
                  <span className="unit">mm</span>
                </div>
              </div>
            </div>

            {/* Right Column - No of Coil */}
            <div className="col-4">
              <div className="coil-section">
                <label>No of Coil</label>
                <div className="coil-control">
                  <input
                    type="text"
                    value={settings.coil_number}
                    readOnly
                    className="coil-input"
                  />
                  <div className="coil-buttons">
                    <button 
                      onClick={() => adjustCoilNumber(true)}
                      className="coil-btn coil-up"
                    >
                      ▲
                    </button>
                    <button 
                      onClick={() => adjustCoilNumber(false)}
                      className="coil-btn coil-down"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Count Section */}
          <div className="row product-section">
            <div className="col-8">
              <div className="product-row">
                <label>
                  Product Count<br />
                  <small>Pieces</small>
                </label>
                <div className="product-control">
                  <input
                    type="text"
                    value={productCount.pieces}
                    onChange={(e) => updateProductCount('pieces', e.target.value)}
                    className="product-input"
                  />
                  <button
                    onClick={() => resetProductCount('pieces')}
                    className="reset-btn"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="product-row">
                <label>
                  Product Count<br />
                  <small>User</small>
                </label>
                <div className="product-control">
                  <input
                    type="text"
                    value={productCount.user_count}
                    onChange={(e) => updateProductCount('user_count', e.target.value)}
                    className="product-input"
                  />
                  <button
                    onClick={() => resetProductCount('user_count')}
                    className="reset-btn"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Reset All Button */}
            <div className="col-4">
              <button
                onClick={resetAllQuantities}
                className="reset-all-btn"
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