import clsx from 'clsx';
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiTwitterXFill,
} from '@remixicon/react';

const socials = [
  {
    icon: RiGithubFill,
    url: 'https://github.com',
    name: 'Link to Github profile',
  },
  {
    icon: RiLinkedinBoxFill,
    url: 'https://linkedin.com',
    name: 'Link to Linkedin profile',
  },
  {
    icon: RiInstagramFill,
    url: 'https://instagram.com',
    name: 'Link to Instagram profile',
  },
  {
    icon: RiTwitterXFill,
    url: 'https://twitter.com',
    name: 'Link to Twitter profile',
  },
];

const ProfileCard = () => {
  return (
    <div
      className={clsx(
        'w-[340px] bg-white px-4 py-6',
        'flex flex-col items-center gap-10',
        'rounded-lg shadow',
      )}>
      <div className="flex flex-col items-center gap-6">
        <img
          src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/projects-images/profile-card/starter/img/profile-thumbnail.jpg"
          alt="Sarah Dole's profile pic"
          className="w-16 rounded-full"
        />
        <div
          className={clsx('flex flex-col items-center gap-[3px]', 'mt-[1px]')}>
          <div className="text-xl font-medium text-neutral-900">Sarah Dole</div>
          <div className="text-center text-sm text-neutral-600">
            Front End Engineer @ Microsoft
          </div>
        </div>
        <p class="text-center text-neutral-600">
          I turn coffee into bugs which are fixed by someone else. Certified
          Stack Overflow and ChatGPT developer.
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-6">
        <button
          className={clsx(
            'rounded bg-indigo-700 shadow',
            'cursor-pointer font-medium text-white',
            'h-11 w-full px-3.5',
            'hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
            'disabled:pointer-events-none disabled:bg-neutral-100 disabled:text-neutral-400 disabled:shadow-none',
          )}>
          Contact me
        </button>

        <div className="flex space-x-4">
          {socials.map(({ icon: Icon, url, name }) => (
            <a
              key={url}
              href={url}
              aria-label={name}
              target="_blank"
              rel="noreferrer"
              tabIndex={0}
              className={clsx(
                'cursor-pointer rounded p-2',
                'hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
              )}>
              <Icon className="fill-indigo-700" size={20} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
