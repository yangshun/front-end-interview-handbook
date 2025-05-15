import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiFlowChart,
  RiQuestionFill,
  RiUserSmileFill,
} from 'react-icons/ri';

import QuestionLanguages from '~/components/interviews/questions/metadata/QuestionLanguages';
import QuestionUsersCompletedLabel from '~/components/interviews/questions/metadata/QuestionUsersCompletedLabel';

import Anchor from '../Anchor';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import Text from '../Text';
import {
  themeBackgroundChipColor,
  themeTextFaintColor,
  themeTextSubtleColor,
} from '../theme';
import Card from './Card';
import CardContainer from './CardContainer';

export default function CardExamples() {
  return (
    <CardContainer>
      <UIExamplesGroup darkMode="horizontal" title="Card">
        <div className="grid gap-8">
          <Card className="grid gap-y-3">
            <div className="flex justify-between">
              <span
                className={clsx(
                  'size-10 inline-flex items-center justify-center rounded-md',
                  themeBackgroundChipColor,
                  'text-neutral-400',
                  'dark:border-brand dark:text-brand dark:border',
                )}>
                <RiFlowChart aria-hidden={true} className="size-6" />
              </span>
              <RiQuestionFill
                aria-hidden={true}
                className={clsx(
                  'size-6 text-neutral-300 dark:text-neutral-700',
                )}
              />
            </div>
            <Text className="block" size="body1" weight="bold">
              Data Structures & Algorithms
            </Text>
          </Card>
          <Card className="group grid gap-y-3">
            <div className="flex justify-between">
              <span
                className={clsx(
                  'size-10 inline-flex items-center justify-center rounded-md',
                  themeBackgroundChipColor,
                  'text-neutral-400',
                  'border border-transparent transition',
                  'dark:group-hover:border-brand dark:group-hover:text-brand',
                )}>
                <RiFlowChart aria-hidden={true} className="size-6" />
              </span>
              <RiQuestionFill
                aria-hidden={true}
                className={clsx(
                  'size-6 text-neutral-300 dark:text-neutral-700',
                )}
              />
            </div>
            <Anchor href="#" variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Text className="block" size="body1" weight="bold">
                Data Structures & Algorithms
              </Text>
            </Anchor>
          </Card>
          <Card className="grid gap-y-4">
            <Text className="block" size="body2">
              “One morning, when Gregor Samsa woke from troubled dreams, he
              found himself transformed in his bed into a horrible vermin.”
            </Text>
            <div className="flex items-center gap-x-4">
              <RiUserSmileFill
                aria-hidden={true}
                className={clsx('size-8 shrink-0', themeTextSubtleColor)}
              />
              <div>
                <Text className="block" size="body2">
                  John Doe
                </Text>
                <Text className="block" color="secondary" size="body3">
                  Software Engineer
                </Text>
              </div>
            </div>
          </Card>
          <Card
            className="group flex items-center justify-between gap-x-4 p-4"
            padding={false}>
            <div className="grid gap-y-3">
              <div>
                <Anchor href="#" variant="unstyled">
                  <span aria-hidden={true} className="absolute inset-0" />
                  <Text className="block" size="body1" weight="medium">
                    Custom Padding
                  </Text>
                </Anchor>
                <Text className="block" color="secondary" size="body2">
                  Implement a stack data structure containing the common stack
                  methods
                </Text>
              </div>
              <div className="z-10 flex gap-x-8">
                <QuestionLanguages languages={['js', 'ts']} />
                <QuestionUsersCompletedLabel count={910} showIcon={true} />
              </div>
            </div>
            <RiArrowRightLine
              aria-hidden={true}
              className={clsx(
                'size-6 shrink-0',
                themeTextFaintColor,
                'group-hover:text-brand dark:group-hover:text-brand',
              )}
            />
          </Card>
        </div>
      </UIExamplesGroup>
    </CardContainer>
  );
}
