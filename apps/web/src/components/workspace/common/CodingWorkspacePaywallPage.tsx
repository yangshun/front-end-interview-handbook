'use client';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import PromoBanner from '~/components/global/banners/PromoBanner';
import NavbarImpl from '~/components/global/navbar/NavbarImpl';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';

export default function CodingWorkspacePaywallPage() {
  return (
    <>
      <PromoBanner />
      <NavbarImpl />
      <div
        className="flex items-center justify-center"
        style={{
          height: FooterlessContainerHeight,
        }}>
        <QuestionPaywall />
      </div>
    </>
  );
}
