import React from 'react';

const GradientTypeSelector = ({ gradientType, setGradientType }) => (
  <div className="mb-3">
    <label className="form-label">Gradient Type</label>
    <select
      value={gradientType}
      onChange={(e) => setGradientType(e.target.value)}
      className="form-select"
    >
      <option value="linear">Linear</option>
      <option value="radial">Radial</option>
    </select>
  </div>
);

export default GradientTypeSelector;
