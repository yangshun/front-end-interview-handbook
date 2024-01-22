import clsx from 'clsx';
import { useState } from 'react';
import { RiAddLine, RiImageLine, RiSubtractLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsChallengeSubmissionImageComparisonSlider from '~/components/projects/submissions/ProjectsChallengeSubmissionImageComparisonSlider';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderElementColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  deploymentUrls: Array<
    Readonly<{
      href: string;
      label: string;
    }>
  >;
}>;

export default function ProjectsChallengeSubmissionComparison({
  deploymentUrls,
}: Props) {
  const intl = useIntl();
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const images = deploymentUrls.map((item) => ({
    deployed: `https://source.unsplash.com/random/1080x900?random=${item.label}`,
    label: item.label,
    original: `https://source.unsplash.com/random/1080x700?random=${item.label}`,
  }));

  return (
    <Section>
      <div
        className={clsx(
          'border rounded-lg flex flex-col',
          themeBorderElementColor,
          themeBackgroundColor,
        )}>
        {/* Header */}
        <div className="flex md:px-6 px-4 py-4 justify-between md:flex-row flex-col gap-4">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Solution vs Design comparison"
              description="Solution vs design comparison title"
              id="3ffp8N"
            />
          </Heading>
          <div className="flex gap-2 items-center">
            <Button
              addonPosition="start"
              className="flex-1 md:flex-auto"
              icon={RiImageLine}
              label={intl.formatMessage({
                defaultMessage: 'Retake screenshot',
                description: 'Retake screenshot button label',
                id: 'e0C2cj',
              })}
              variant="secondary"
            />
            <Button
              icon={RiSubtractLine}
              isLabelHidden={true}
              label="Zoom out"
              variant="secondary"
            />
            <Text size="body3">100%</Text>
            <Button
              icon={RiAddLine}
              isLabelHidden={true}
              label="Zoom in"
              variant="secondary"
            />
          </div>
        </div>

        {/* Image Comparison Slider */}
        <div className="flex-1">
          <ProjectsChallengeSubmissionImageComparisonSlider
            image={images[selectedScreenIndex]}
          />
        </div>

        {/* Footer */}
        <div className="grid md:grid-cols-8 grid-col-2 md:px-6 px-4 py-4 w-full">
          <Text
            className={clsx(
              'md:col-span-2 col-span-1 flex items-center',
              themeTextSecondaryColor,
            )}>
            {deploymentUrls[selectedScreenIndex].label}
          </Text>
          <div className="md:col-span-2 col-span-1 md:order-last"></div>
          <div className="flex justify-center md:col-span-4 col-span-2 gap-2">
            {images.map((image, index) => (
              <button
                key={image.label}
                className={clsx(
                  'w-12 h-12 rounded border',
                  index === selectedScreenIndex
                    ? 'border-brand-dark dark:border-brand'
                    : themeBorderElementColor,
                )}
                type="button"
                onClick={() => setSelectedScreenIndex(index)}>
                <img
                  alt="deployed image preview"
                  className="object-cover w-full h-full"
                  src={image.deployed}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
