'use client';

import clsx from 'clsx';
import { startCase } from 'lodash-es';
import { RiArrowRightUpLine } from 'react-icons/ri';

import type { BadgeVariant } from '~/components/ui/Badge';
import Badge from '~/components/ui/Badge';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import type { TeamCategory, TeamUser } from './TeamUsers';

const categoryToVariant: Record<TeamCategory, BadgeVariant> = {
  alumni: 'success',
  community: 'success',
  expert: 'info',
  team: 'special',
};

export default function TeamPage({
  users,
}: Readonly<{
  users: ReadonlyArray<TeamUser>;
}>) {
  return (
    <Container>
      <div className="flex flex-col gap-y-12 py-12 lg:gap-y-16 lg:py-16">
        <div className="flex flex-col gap-y-4">
          <Heading level="heading3">Our team</Heading>
          <Text className="text-xl" display="block" size="custom">
            Our diverse network of team members, contributors, industry experts,
            and community leaders spans across the globe.
          </Text>
        </div>
        <Section>
          <CardContainer>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {users.map((user) => (
                <Card
                  key={user.name}
                  className="flex flex-col gap-4 rounded-md p-4"
                  padding={false}>
                  <div className="relative">
                    <img
                      alt={user.name}
                      className="aspect-[4/3] w-full rounded-md object-cover"
                      src={user.image}
                    />
                    {user.companyLogos.length > 0 && (
                      <div className="absolute bottom-2 right-2 flex flex-row-reverse pr-4">
                        {user.companyLogos.map((logo) => (
                          <div
                            key={logo}
                            className="-mr-4 flex h-12 w-12 items-center justify-center overflow-clip rounded-full bg-white shadow">
                            <img
                              alt=""
                              className={clsx(
                                'h-8 w-8',
                                user.roundedCompanyLogo && 'rounded-full',
                              )}
                              src={logo}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <a
                          className="inline-flex items-center gap-x-1"
                          href={user.href}
                          target="_blank">
                          <Text display="block" size="body" weight="bold">
                            {user.name}
                          </Text>
                          <span className="absolute inset-0" />
                          <RiArrowRightUpLine className="h-5 w-5 shrink-0" />
                        </a>
                        <div>
                          <Badge
                            label={startCase(user.category)}
                            size="sm"
                            variant={categoryToVariant[user.category]}
                          />
                        </div>
                      </div>
                      <Text color="secondary" display="block" size="body2">
                        {user.title}
                      </Text>
                    </div>
                    <Text color="subtitle" display="block" size="body2">
                      {user.description}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          </CardContainer>
        </Section>
      </div>
    </Container>
  );
}
