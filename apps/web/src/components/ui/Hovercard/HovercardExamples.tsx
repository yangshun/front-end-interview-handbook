import { Hovercard, HovercardContent, HovercardTrigger } from './Hovercard';
import UIExamplesGroup from '../misc/UIExamplesGroup';

import { EyeIcon, HomeIcon, SunIcon } from '@heroicons/react/24/outline';

const items = [
  {
    description: 'Measure actions your users take',
    href: '##',
    icon: EyeIcon,
    name: 'Insights',
  },
  {
    description: 'Create your own targeted content',
    href: '##',
    icon: SunIcon,
    name: 'Automations',
  },
  {
    description: 'Keep track of your growth',
    href: '##',
    icon: HomeIcon,
    name: 'Reports',
  },
];

export default function HoverCardExamples() {
  return (
    <UIExamplesGroup title="Hovercard">
      <div className="flex gap-x-32">
        <Hovercard>
          <HovercardTrigger>Hover</HovercardTrigger>
          <HovercardContent>
            <div className="relative grid gap-8 p-7">
              {items.map((item) => (
                <a
                  key={item.name}
                  className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  href={item.href}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                    <item.icon aria-hidden="true" color="black" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="bg-gray-50 p-4">
              <a
                className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                href="##">
                <span className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    Documentation
                  </span>
                </span>
                <span className="block text-sm text-gray-500">
                  Start integrating products and tools
                </span>
              </a>
            </div>
          </HovercardContent>
        </Hovercard>
        <Hovercard>
          <HovercardTrigger>Hover</HovercardTrigger>
          <HovercardContent className="border-none">
            <div className="relative grid gap-8 rounded-t-md bg-slate-800 p-7">
              {items.map((item) => (
                <a
                  key={item.name}
                  className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  href={item.href}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                    <item.icon aria-hidden="true" color="white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="rounded-b-md bg-slate-900 p-4">
              <a
                className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-slate-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                href="##">
                <span className="flex items-center">
                  <span className="text-sm font-medium text-white">
                    Documentation
                  </span>
                </span>
                <span className="block text-sm text-gray-500">
                  Start integrating products and tools
                </span>
              </a>
            </div>
          </HovercardContent>
        </Hovercard>
      </div>
    </UIExamplesGroup>
  );
}
