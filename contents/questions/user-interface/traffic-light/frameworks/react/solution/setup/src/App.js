import TrafficLight from './TrafficLight';

const config = {
  red: {
    backgroundColor: 'red',
    duration: 4000,
    next: 'green',
  },
  yellow: {
    backgroundColor: 'yellow',
    duration: 500,
    next: 'red',
  },
  green: {
    backgroundColor: 'green',
    duration: 3000,
    next: 'yellow',
  },
};

export default function App() {
  return (
    <div className="wrapper">
      <TrafficLight config={config} />
      <TrafficLight config={config} layout="horizontal" />
    </div>
  );
}
