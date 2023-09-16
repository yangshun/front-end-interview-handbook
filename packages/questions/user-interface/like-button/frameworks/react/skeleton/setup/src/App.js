import { HeartIcon, SpinnerIcon } from './icons';

import './styles.css';

export default function App() {
  return (
    <div>
      <button>
        <HeartIcon /> Like
      </button>
      <button>
        <SpinnerIcon /> Like
      </button>
    </div>
  );
}
