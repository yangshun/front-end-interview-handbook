import './styles.css';
import clsx from 'clsx';
import ProfileCard from './ProfileCard';

function App() {
  return (
    <div
      className={clsx(
        'bg-gradient min-h-screen',
        'flex items-start justify-center',
        'px-[17.5px] pt-[200px]',
      )}>
      <ProfileCard />
    </div>
  );
}

export default App;
