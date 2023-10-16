import { useState } from 'react';
import Board from './Board';
import ColorPicker from './ColorPicker';

import './styles.css';

const COLORS = [
  'white',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'beige',
];

export default function App() {
  const [selectedColor, setColor] = useState(COLORS[0]);
  const [isDrawing, setIsDrawing] = useState(true);
  return (
    <div>
      <Board selectedColor={selectedColor} isDrawing={isDrawing} />
      <ColorPicker
        colors={COLORS}
        selectedColor={selectedColor}
        setColor={setColor}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
      />
    </div>
  );
}
