import React from 'react';

import type { SponsorsAdFormatFormItem } from '~/components/sponsors/request/types';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import {
  sponsorsDateFormatterWithDayAndYear,
  sponsorsWeekDateRange,
} from '~/components/sponsors/SponsorsDatesUtils';

import {
  EmailsFooter,
  EmailsHeader,
  EmailsLink,
  EmailsParagraph,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';

import {
  Body,
  Container,
  Html,
  Preview,
  Section,
} from '@react-email/components';

type Props = Readonly<{
  ads: Array<SponsorsAdFormatFormItem>;
  legalName: string;
  requestUrl: string;
  signatoryName: string;
  signatoryTitle: string;
}>;

export default function EmailsTemplateSponsorsAdRequestSubmissionReview({
  requestUrl,
  legalName,
  signatoryName,
  signatoryTitle,
  ads,
}: Props) {
  let totalSlot = 0;
  const totalAmount = ads.reduce(
    (acc, curr) =>
      acc +
      curr.weeks.length * SponsorAdFormatConfigs[curr.format].pricePerWeekUSD,
    0,
  );

  return (
    <Html lang="en">
      <Preview>
        Thanks for considering GreatFrontEnd for your advertising needs. We're
        reviewing your details and will respond within the next 24 - 48 hours.
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailsHeader />
          <Section style={{ marginTop: 40 }}>
            <EmailsParagraph defaultMargins={true}>
              An advertising inquiry has been received with the following
              details:
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              <ul>
                <li>Name: {signatoryName}</li>
                <li>Role: {signatoryTitle}</li>
                <li>Company: {legalName}</li>
                <li>Signatory Name: {signatoryName}</li>
                <li>
                  Slot chosen:
                  <ul>
                    {ads.map((ad) => (
                      <div key={ad.id}>
                        {ad.weeks.map((week) => {
                          totalSlot += 1;

                          const parts = week.split('/').map(Number);

                          const { start, end } = sponsorsWeekDateRange(
                            parts[0],
                            parts[1],
                          );
                          const startDate =
                            sponsorsDateFormatterWithDayAndYear.format(
                              new Date(start),
                            );
                          const endDate =
                            sponsorsDateFormatterWithDayAndYear.format(
                              new Date(end),
                            );

                          return (
                            <li key={week}>
                              Slot {totalSlot}:{' '}
                              {ad.format === 'GLOBAL_BANNER'
                                ? 'Global Banner'
                                : ad.format === 'IN_CONTENT'
                                  ? 'In-Content Display Ad'
                                  : 'Spotlight Ad'}
                              <ul>
                                <li>Start Date: {startDate}</li>
                                <li>End Date: {endDate}</li>
                              </ul>
                            </li>
                          );
                        })}
                      </div>
                    ))}
                  </ul>
                </li>
                <li>Total amount to be paid: ${totalAmount}</li>
              </ul>
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              Approve or reject this inquiry through this link:{' '}
              <EmailsLink href={requestUrl}>View request</EmailsLink>
            </EmailsParagraph>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}
