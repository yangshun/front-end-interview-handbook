import SystemDesignLayoutSidebar from '~/components/questions/content/system-design/SystemDesignLayoutSidebar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function SystemDesignContentLayout({ children }: Props) {
  return <SystemDesignLayoutSidebar>{children}</SystemDesignLayoutSidebar>;
}
