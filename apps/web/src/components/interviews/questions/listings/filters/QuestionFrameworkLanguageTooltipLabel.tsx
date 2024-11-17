import { FormattedMessage } from '~/components/intl';

export default function QuestionFrameworkLanguageTooltipLabel() {
  return (
    <p className="flex flex-col gap-2">
      <FormattedMessage
        defaultMessage="You may complete questions in any language or framework within our coding workspace."
        description="Framework/language filter tooltip content"
        id="5nqh7s"
      />
      <br />
      <br />
      <FormattedMessage
        defaultMessage="This filter helps you to find questions with official
                  solutions in these Frameworks or Languages."
        description="Framework/language filter tooltip content"
        id="rzk8kt"
      />
    </p>
  );
}
