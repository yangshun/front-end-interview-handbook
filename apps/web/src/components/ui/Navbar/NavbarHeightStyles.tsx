type Props = Readonly<{
  borderHeight?: number;
  hideOnDesktop?: boolean;
  navbarHeight?: number;
}>;

export default function NavbarHeightStyles({
  borderHeight = 1,
  hideOnDesktop = false,
  navbarHeight = 48,
}: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root { --navbar-height: ${navbarHeight}px; --navbar-border: ${borderHeight}px; }`,
        }}
      />
      {hideOnDesktop && (
        <style
          dangerouslySetInnerHTML={{
            __html: `@media (min-width: 1024px) { :root { --navbar-height: 0px; --navbar-border: 0px; } }`,
          }}
        />
      )}
    </>
  );
}
