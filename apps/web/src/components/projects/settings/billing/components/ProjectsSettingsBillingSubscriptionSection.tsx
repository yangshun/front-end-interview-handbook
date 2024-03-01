'use client';

import { FormattedMessage } from 'react-intl';

import { ProjectsPricingConfig } from '~/components/projects/purchase/ProjectsPricingConfig';
import ProjectsPricingTable from '~/components/projects/purchase/ProjectsPricingTable';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function ProjectsSettingsBillingSubscriptionSection() {
  return (
    <Section>
      <div className="flex flex-col gap-6">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Manage your subscription"
            description="Title for manage your subscription section"
            id="PowG3S"
          />
        </Heading>
        <ProjectsPricingTable plans={ProjectsPricingConfig} />
      </div>
    </Section>
  );
}
