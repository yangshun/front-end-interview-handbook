import FrontEndSystemDesignPlaybookSidebar from '~/components/guides/books/front-end-system-design/FrontEndSystemDesignPlaybookSidebar';

import { fetchQuestionsList } from '~/db/QuestionsListReader';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale } = params;
  const { questions } = await fetchQuestionsList(
    { type: 'format', value: 'system-design' },
    locale,
  );

  return (
    <FrontEndSystemDesignPlaybookSidebar questions={questions}>
      {children}
    </FrontEndSystemDesignPlaybookSidebar>
  );
}
