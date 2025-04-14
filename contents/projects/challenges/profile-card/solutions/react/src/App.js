import './styles.css';
import clsx from 'clsx';
import ProfileCard from './ProfileCard';

function App() {
  return (
    <div
      className={clsx(
        'bg-gradient min-h-[812px] md:min-h-[1024px] lg:min-h-[768px]',
        'flex items-start justify-center',
        'px-[17.5px] pt-[200px]',
      )}>
      <ProfileCard />
    </div>
  );
}

export default App;
