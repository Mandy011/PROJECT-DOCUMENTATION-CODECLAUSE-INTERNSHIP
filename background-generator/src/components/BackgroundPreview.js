import React from 'react';

function BackgroundPreview({ background }) {
  return (
    <div className="mb-3">
      <p>Preview:</p>
      <div
        style={{
          background: background,
          width: '100%',
          height: '200px',
          borderRadius: '8px',
        }}
      ></div>
    </div>
  );
}

export default BackgroundPreview;
