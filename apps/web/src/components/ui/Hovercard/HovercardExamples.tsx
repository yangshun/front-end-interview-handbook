import { RiEyeLine, RiHome2Line, RiSunLine } from 'react-icons/ri';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import Text from '../Text';
import {
  Hovercard,
  HovercardContent,
  HovercardPortal,
  HovercardTrigger,
} from './Hovercard';

const items = [
  {
    description: 'Measure actions your users take',
    href: '##',
    icon: RiEyeLine,
    name: 'Insights',
  },
  {
    description: 'Create your own targeted content',
    href: '##',
    icon: RiSunLine,
    name: 'Automations',
  },
  {
    description: 'Keep track of your growth',
    href: '##',
    icon: RiHome2Line,
    name: 'Reports',
  },
];

export default function HoverCardExamples() {
  return (
    <UIExamplesGroup title="Hovercard">
      <div className="flex gap-x-32">
        <Hovercard>
          <HovercardTrigger>
            <Text size="body1">Hover</Text>
          </HovercardTrigger>
          <HovercardPortal>
            <HovercardContent>
              <div className="relative grid gap-8 p-7">
                {items.map((item) => (
                  <a
                    key={item.name}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    href={item.href}>
                    <div className="flex size-10 shrink-0 items-center justify-center text-white sm:size-12">
                      <item.icon aria-hidden="true" color="black" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-neutral-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="bg-neutral-50 p-4">
                <a
                  className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  href="##">
                  <span className="flex items-center">
                    <span className="text-sm font-medium text-neutral-900">
                      Documentation
                    </span>
                  </span>
                  <span className="block text-sm text-neutral-500">
                    Start integrating products and tools
                  </span>
                </a>
              </div>
            </HovercardContent>
          </HovercardPortal>
        </Hovercard>
        <Hovercard>
          <HovercardTrigger>
            <Text size="body1">Hover</Text>
          </HovercardTrigger>
          <HovercardPortal>
            <HovercardContent className="border-none">
              <div className="relative grid gap-8 rounded-t-md bg-neutral-800 p-7">
                {items.map((item) => (
                  <a
                    key={item.name}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    href={item.href}>
                    <div className="flex size-10 shrink-0 items-center justify-center text-white sm:size-12">
                      <item.icon aria-hidden="true" color="white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-white">
                        {item.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="rounded-b-md bg-neutral-900 p-4">
                <a
                  className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  href="##">
                  <span className="flex items-center">
                    <span className="text-sm font-medium text-white">
                      Documentation
                    </span>
                  </span>
                  <span className="block text-sm text-neutral-500">
                    Start integrating products and tools
                  </span>
                </a>
              </div>
            </HovercardContent>
          </HovercardPortal>
        </Hovercard>
      </div>
    </UIExamplesGroup>
  );
}
