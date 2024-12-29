import React from 'react';

function ColorPicker({ label, color, setColor }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="form-control"
      />
    </div>
  );
}

export default ColorPicker;
