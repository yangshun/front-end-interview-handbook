import { useState } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import { Color, Mode } from './colors';

export default function App() {
  const [mode, setMode] = useState<Mode>('draw');
  const [selectedColor, setColor] =
    useState<Color>('black');

  return (
    <div className="app">
      <Canvas selectedColor={selectedColor} mode={mode} />
      <Toolbar
        selectedColor={selectedColor}
        onColorChange={setColor}
        mode={mode}
        onModeChange={setMode}
      />
    </div>
  );
}
