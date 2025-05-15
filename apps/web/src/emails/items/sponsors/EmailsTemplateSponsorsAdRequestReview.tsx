import {
  Body,
  Container,
  Html,
  Preview,
  Section,
} from '@react-email/components';
import { lowerCase, startCase } from 'lodash-es';
import React from 'react';

import type { SponsorsAdFormatFormItem } from '~/components/sponsors/request/types';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import {
  sponsorsDateFormatterWithDayAndYear,
  sponsorsWeekDateRange,
} from '~/components/sponsors/SponsorsDatesUtils';

import {
  EmailsButton,
  EmailsFooter,
  EmailsHeader,
  EmailsParagraph,
  EmailsStrong,
} from '~/emails/components/EmailsComponents';
import { containerStyle, mainStyle } from '~/emails/components/EmailsStyles';

type Props = Readonly<{
  ads: Array<SponsorsAdFormatFormItem>;
  legalName: string;
  requestUrl: string;
  signatoryName: string;
  signatoryTitle: string;
}>;

export default function EmailsTemplateSponsorsAdRequestReview({
  ads,
  legalName,
  requestUrl,
  signatoryName,
  signatoryTitle,
}: Props) {
  const totalAmount = ads.reduce(
    (acc, curr) =>
      acc +
      curr.weeks.length * SponsorAdFormatConfigs[curr.format].pricePerWeekUSD,
    0,
  );

  return (
    <Html lang="en">
      <Preview>An advertising request has been received</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <EmailsHeader />
          <Section style={{ marginTop: 40 }}>
            <EmailsParagraph defaultMargins={true}>
              An advertising request has been submitted with the following
              details:
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              <div style={{ marginBottom: 10, marginTop: 10 }}>
                <EmailsStrong>Name</EmailsStrong>: {signatoryName}
              </div>
              <div style={{ marginBottom: 10, marginTop: 10 }}>
                <EmailsStrong>Role</EmailsStrong>: {signatoryTitle}
              </div>
              <div style={{ marginBottom: 10, marginTop: 10 }}>
                <EmailsStrong>Company</EmailsStrong>: {legalName}
              </div>
              <div style={{ marginBottom: 10, marginTop: 10 }}>
                <EmailsStrong>Signatory name</EmailsStrong>: {signatoryName}
              </div>
              <div style={{ marginBottom: 10, marginTop: 10 }}>
                <EmailsStrong>Ad slot(s)</EmailsStrong>:
                <ol style={{ paddingLeft: 30 }}>
                  {ads.map((ad) => (
                    <li key={ad.id} style={{ marginBottom: 10, marginTop: 10 }}>
                      {startCase(lowerCase(ad.format))} &times;{' '}
                      {ad.weeks.length} week(s)
                      <ul>
                        {ad.weeks.map((week) => {
                          const parts = week.split('/').map(Number);

                          const { end, start } = sponsorsWeekDateRange(
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
                            <li
                              key={week}
                              style={{ marginBottom: 5, marginTop: 5 }}>
                              {startDate} - {endDate}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <EmailsStrong>Total amount</EmailsStrong>: ${totalAmount}
              </div>
            </EmailsParagraph>
            <EmailsParagraph defaultMargins={true}>
              <EmailsButton href={requestUrl} variant="primary">
                Review request
              </EmailsButton>
            </EmailsParagraph>
          </Section>
          <EmailsFooter />
        </Container>
      </Body>
    </Html>
  );
}
