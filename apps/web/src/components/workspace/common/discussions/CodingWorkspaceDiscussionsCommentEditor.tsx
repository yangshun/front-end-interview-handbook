import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { useIntl } from '~/components/intl';
import RichTextEditor from '~/components/ui/RichTextEditor';

import { getDiscussionsCommentBodyAttributes } from './CodingWorkspaceDiscussionsComentBodySchema';

type Props = Readonly<{
  control: Control<{ body: string }>;
  editorRerenderKey?: number;
  isLoading: boolean;
}>;

const fieldName = 'body';

export default function CodingWorkspaceDiscussionsCommentEditor({
  control,
  editorRerenderKey,
  isLoading,
}: Props) {
  const intl = useIntl();
  const attrs = getDiscussionsCommentBodyAttributes(intl);

  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <RichTextEditor
      key={editorRerenderKey}
      disabled={isLoading}
      errorMessage={
        formState.dirtyFields.body || formState.submitCount > 0
          ? formState.errors.body?.message
          : undefined
      }
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Discussion post comment',
        description: 'Label for discussion post input textarea',
        id: 'NA1S3Z',
      })}
      maxLength={attrs.validation.maxLength}
      minHeight="100px"
      placeholder={attrs.placeholder}
      {...field}
      required={true}
    />
  );
}
