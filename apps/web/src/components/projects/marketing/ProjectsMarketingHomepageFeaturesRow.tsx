'use client';

// TODO: Remove unused

import { useIntl } from 'react-intl';

import type { Feature } from './ProjectsMarketingFeaturesRow';
import MarketingFeaturesRow from './ProjectsMarketingFeaturesRow';
import Container from '../../ui/Container';

function useFeatures(): ReadonlyArray<Feature> {
  const intl = useIntl();

  const features: ReadonlyArray<Feature> = [
    {
      description: intl.formatMessage(
        {
          defaultMessage:
            'Select a project by skill or component out of {projectCount}+ projects.',
          description:
            "Description of 'Start a project' feature in Projects marketing page",
          id: 'RmL0wL',
        },
        {
          projectCount: 50,
        },
      ),
      key: 'start-a-project',
      name: intl.formatMessage({
        defaultMessage: 'Start a project',
        description:
          "Title of 'Start a project' feature in Projects marketing page",
        id: 'lUACcQ',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          "We'll provide starter code, production-grade Figma assets and even APIs as relevant.",
        description:
          "Description of 'Download assets' feature in Projects marketing page",
        id: 'gv/ty5',
      }),
      key: 'download-assets',
      name: intl.formatMessage({
        defaultMessage: 'Download assets',
        description:
          "Title of 'Download assets' feature in Projects marketing page",
        id: 'F95lg1',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Reference official guides for practical software development, code from top submissions and clarify doubts in the community.',
        description:
          "Description of 'Learn while building' feature in Projects marketing page",
        id: 'IXY4CG',
      }),
      key: 'learn-while-building',
      name: intl.formatMessage({
        defaultMessage: 'Learn while building',
        description:
          "Title of 'Learn while building' feature in Projects marketing page",
        id: 'u1BtZ5',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Submit your solution on the platform for code reviews from a large community of engineers.',
        description:
          "Description of 'Submit your solution for feedback' feature in Projects marketing page",
        id: '7meg5a',
      }),
      key: 'submit-your-solution-for-feedback',
      name: intl.formatMessage({
        defaultMessage: 'Submit your solution for feedback',
        description:
          "Title of 'Submit your solution for feedback' feature in Projects marketing page",
        id: 'BnHLZU',
      }),
    },
  ];

  return features;
}

export default function MarketingHomepageFeaturesRow() {
  const intl = useIntl();
  const features = useFeatures();

  return (
    <Container className="py-16">
      <MarketingFeaturesRow
        features={features}
        title={intl.formatMessage({
          defaultMessage: 'Key features',
          description: 'Key features of the product',
          id: '97HVxk',
        })}
      />
    </Container>
  );
}
