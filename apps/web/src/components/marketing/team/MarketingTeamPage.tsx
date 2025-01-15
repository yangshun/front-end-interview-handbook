'use client';

import clsx from 'clsx';
import { startCase } from 'lodash-es';
import { RiArrowRightUpLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import type { BadgeVariant } from '~/components/ui/Badge';
import Badge from '~/components/ui/Badge';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import type { TeamCategory, TeamUser } from './MarketingTeamUsers';

const categoryToVariant: Record<TeamCategory, BadgeVariant> = {
  alumni: 'success',
  community: 'warning',
  expert: 'info',
  team: 'special',
};

export default function MarketingTeamPage({
  users,
}: Readonly<{
  users: ReadonlyArray<TeamUser>;
}>) {
  return (
    <Container width="marketing">
      <div className="flex flex-col gap-y-12 py-12 lg:gap-y-16 lg:py-16">
        <div className="flex flex-col gap-y-4">
          <Heading level="heading3">Our team</Heading>
          <Text className="block text-xl" size="inherit">
            Our diverse network of team members, contributors, industry experts,
            and community leaders spans across the globe.
          </Text>
        </div>
        <Section>
          <CardContainer>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                            className="size-12 -mr-4 flex items-center justify-center overflow-clip rounded-full bg-white shadow">
                            <img
                              alt=""
                              className={clsx(
                                'size-8',
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
                        <Anchor
                          className="inline-flex items-center gap-x-0.5"
                          href={user.href}
                          target="_blank"
                          variant="flat">
                          <Text className="block" size="body1" weight="bold">
                            {user.name}
                          </Text>
                          <RiArrowRightUpLine
                            aria-hidden={true}
                            className="size-5 shrink-0"
                          />
                        </Anchor>
                        <div>
                          <Badge
                            label={startCase(user.category)}
                            size="sm"
                            variant={categoryToVariant[user.category]}
                          />
                        </div>
                      </div>
                      <Text className="block" color="secondary" size="body2">
                        {user.title}
                      </Text>
                    </div>
                    <Text className="block" color="subtitle" size="body2">
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
