import React from 'react';

import GrayedOutLogoMark from '~/components/global/logos/GrayedOutLogoMark';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

function CountdownContainer({ children }: Props) {
  return (
    <Container className="pb-8 pt-20">
      <div className="relative flex flex-col items-center gap-12">
        <div className="-z-1 absolute bottom-[70%]">
          <GrayedOutLogoMark height={240} width={313} />
        </div>
        {children}
      </div>
    </Container>
  );
}

export default CountdownContainer;
