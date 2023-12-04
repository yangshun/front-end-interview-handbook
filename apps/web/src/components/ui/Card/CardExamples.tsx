import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiFlowChart,
  RiQuestionFill,
  RiUserSmileFill,
} from 'react-icons/ri';

import QuestionLanguages from '~/components/interviews/questions/metadata/QuestionLanguages';
import QuestionUsersCompletedLabel from '~/components/interviews/questions/metadata/QuestionUsersCompletedLabel';

import Card from './Card';
import CardContainer from './CardContainer';
import Anchor from '../Anchor';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import Text from '../Text';
import {
  themeLineBackgroundColor,
  themeTextFaintColor,
  themeTextSubtleColor,
} from '../theme';

export default function CardExamples() {
  return (
    <CardContainer>
      <UIExamplesGroup darkMode="horizontal" title="Card">
        <div className="grid gap-8">
          <Card className="grid gap-y-3">
            <div className="flex justify-between">
              <span
                className={clsx(
                  'inline-flex h-10 w-10 items-center justify-center rounded-md',
                  themeLineBackgroundColor,
                  'text-neutral-400',
                  'dark:border-brand dark:text-brand dark:border',
                )}>
                <RiFlowChart aria-hidden={true} className="h-6 w-6" />
              </span>
              <RiQuestionFill
                aria-hidden={true}
                className={clsx(
                  'h-6 w-6 text-neutral-300 dark:text-neutral-700',
                )}
              />
            </div>
            <Text display="block" weight="bold">
              Data Structures & Algorithms
            </Text>
          </Card>
          <Card className="group grid gap-y-3">
            <div className="flex justify-between">
              <span
                className={clsx(
                  'inline-flex h-10 w-10 items-center justify-center rounded-md',
                  themeLineBackgroundColor,
                  'text-neutral-400',
                  'border border-transparent transition',
                  'dark:group-hover:border-brand dark:group-hover:text-brand',
                )}>
                <RiFlowChart aria-hidden={true} className="h-6 w-6" />
              </span>
              <RiQuestionFill
                aria-hidden={true}
                className={clsx(
                  'h-6 w-6 text-neutral-300 dark:text-neutral-700',
                )}
              />
            </div>
            <Anchor href="#" variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Text display="block" weight="bold">
                Data Structures & Algorithms
              </Text>
            </Anchor>
          </Card>
          <Card className="grid gap-y-4">
            <Text display="block" size="body2">
              “One morning, when Gregor Samsa woke from troubled dreams, he
              found himself transformed in his bed into a horrible vermin.”
            </Text>
            <div className="flex items-center gap-x-4">
              <RiUserSmileFill
                aria-hidden={true}
                className={clsx('h-8 w-8 shrink-0', themeTextSubtleColor)}
              />
              <div>
                <Text display="block" size="body2">
                  John Doe
                </Text>
                <Text color="secondary" display="block" size="body3">
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
                  <Text display="block" weight="medium">
                    Custom Padding
                  </Text>
                </Anchor>
                <Text color="secondary" display="block" size="body2">
                  Implement a stack data structure containing the common stack
                  methods
                </Text>
              </div>
              <div className="flex gap-x-8">
                <QuestionLanguages languages={['js', 'ts']} />
                <QuestionUsersCompletedLabel count={910} showIcon={true} />
              </div>
            </div>
            <RiArrowRightLine
              aria-hidden={true}
              className={clsx(
                'h-6 w-6 shrink-0',
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