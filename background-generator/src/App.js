import React, { useState } from 'react';
import './App.css';
import ColorPicker from './components/ColorPicker';
import GradientTypeSelector from './components/GradientTypeSelector';
import BackgroundPreview from './components/BackgroundPreview';

function App() {
  const [color1, setColor1] = useState('#ff7f50');
  const [color2, setColor2] = useState('#00bfff');
  const [gradientType, setGradientType] = useState('linear');

  const generateBackground = () =>
    `${gradientType}-gradient(${gradientType === 'linear' ? 'to right' : 'circle'}, ${color1}, ${color2})`;

  return (
    <div className="App" style={{ background: generateBackground(), height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
      <h1 className="text-white">Background Generator</h1>
      <div className="container text-white">
        <ColorPicker label="First Color" color={color1} setColor={setColor1} />
        <ColorPicker label="Second Color" color={color2} setColor={setColor2} />
        <GradientTypeSelector gradientType={gradientType} setGradientType={setGradientType} />
        <BackgroundPreview background={generateBackground()} />
      </div>
    </div>
  );
}

export default App;
