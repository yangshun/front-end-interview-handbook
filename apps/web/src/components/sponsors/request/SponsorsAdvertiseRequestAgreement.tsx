import clsx from 'clsx';

import { useSponsorsAdFormatData } from '~/components/sponsors/SponsorsAdFormatConfigs';
import {
  sponsorsDateFormatterWithDayAndYear,
  sponsorsWeekDateRange,
} from '~/components/sponsors/SponsorsDatesUtils';
import Heading from '~/components/ui/Heading';
import { textVariants } from '~/components/ui/Text';

import type { SponsorsAdFormatFormItem } from './types';
import { sponsorsDateFormatterFull } from '../SponsorsDatesUtils';

type Props = Readonly<{
  address: string;
  ads: Array<SponsorsAdFormatFormItem>;
  advertiserFullLegalName: string;
  authorizedSignatoryName: string;
  authorizedSignatoryTitle: string;
  contactEmails: ReadonlyArray<string>;
  totalAmount: number;
}>;

const adNameMaxLengthToDisplay = 40;
const cpmInUSD = 12;
const advertiserResolutionDays = 2;
const publisherApprovalDays = 5;
const forceMajeureDays = 7;
const paymentDueDays = 5;

export default function SponsorsAdvertiseRequestAgreement({
  contactEmails,
  advertiserFullLegalName,
  authorizedSignatoryName,
  address,
  ads,
  totalAmount,
  authorizedSignatoryTitle,
}: Props) {
  const adsFormatData = useSponsorsAdFormatData();

  return (
    <div
      className={clsx(
        'prose dark:prose-invert',
        textVariants({
          color: 'secondary',
          size: 'body2',
        }),
      )}>
      <Heading level="heading5">ADVERTISING AGREEMENT</Heading>
      <p>
        This Advertising Agreement (the "Agreement") is entered into by and
        between:{' '}
      </p>
      <ul>
        <li>
          1. <strong>Codeney Pte. Ltd.</strong> ("Publisher"), a company
          incorporated in Singapore with <strong>UEN 202304973W</strong> and
          registered address at{' '}
          <strong>
            30 Cecil Street, #19-08 Prudential Tower, Singapore (049712)
          </strong>
          , represented by <strong>Ms. Gina Ng</strong>, an authorized
          signatory; and
        </li>
        <li>
          2. <strong>{advertiserFullLegalName}</strong> ("Advertiser"), with a
          registered address at <strong>{address}</strong> and represented by{' '}
          <strong>
            {authorizedSignatoryName}, {authorizedSignatoryTitle}
          </strong>
          , an authorized signatory.
        </li>
      </ul>
      <p>
        Publisher and Advertiser are collectively referred to as the "Parties"
        and individually as a "Party."
      </p>
      <h3>
        <strong>1. Purpose and Scope</strong>
      </h3>
      <p>
        <strong>1.1 Ad Slot Booking</strong>
        <br />
        This Agreement governs the specific advertising slot(s) ("Ad Slot(s)")
        that Advertiser has selected via the <strong>Booking Form</strong> on
        Publisher's platform <strong>greatfrontend.com</strong> ("Website"),
        including any details about the advertisement format, start date, end
        date, fees, and creative specifications.
      </p>
      <p>
        <strong>1.2 No Master Agreement</strong>
        <br />
        Each Ad Slot booking is treated as a standalone arrangement under this
        Agreement. Advertiser may book multiple slots in a single submission,
        but a new Agreement will be generated for any separate future bookings.
      </p>
      <p>
        <strong>1.3 Definitions.</strong> For purposes of this Agreement:
      </p>
      <ul>
        <li>
          <strong>"Business Days"</strong> means Monday through Friday,
          excluding official public holidays in Singapore.
        </li>

        <li>
          Any reference to "days" without the qualifier "Business" refers to
          calendar days.
        </li>
      </ul>
      <h3>2. Advertising Details</h3>
      <p>
        <strong>2.1 Ad Formats and Placement</strong>
      </p>
      <ul>
        <li>
          Advertiser selects from among the available ad formats (e.g., banners,
          native ads) and the specific weekly or monthly slot(s) via the Booking
          Form.
        </li>
        <li>
          Placement will be on the Website pages or sections specified in the
          Booking Form.
        </li>
        <li>
          Publisher reserves the right to modify placement if necessary for
          technical or layout reasons, provided the impact on Advertiser is
          minimal.
        </li>
      </ul>
      <p>
        <strong>2.2 Campaign Schedule</strong>
      </p>
      <p>
        The following ads will be displayed continuously during the agreed-upon
        period, subject to the terms herein:
      </p>
      <ol>
        {ads.map((ad) => (
          <li key={ad.id}>
            <strong>{adsFormatData[ad.format].name}:</strong> "
            {ad.text.slice(0, adNameMaxLengthToDisplay)}
            {ad.text.length > adNameMaxLengthToDisplay && '...'}"
            <ul>
              {ad.weeks.map((week) => {
                const parts = week.split('/').map(Number);

                const { start, end } = sponsorsWeekDateRange(
                  parts[0],
                  parts[1],
                );

                const startDate = sponsorsDateFormatterWithDayAndYear.format(
                  new Date(start),
                );
                const endDate = sponsorsDateFormatterWithDayAndYear.format(
                  new Date(end),
                );

                return <li key={week}>{[startDate, endDate].join(' – ')}</li>;
              })}
            </ul>
          </li>
        ))}
      </ol>
      <p>
        <strong>2.3 Creative Submission and Revisions</strong>
      </p>
      <ul>
        <li>
          Advertiser shall upload creative assets (banners, text, images) via
          the Booking Form.
        </li>
        <li>
          Publisher allows <strong>one (1) revision</strong> of submitted
          creatives after payment (e.g., to adjust design or correct errors).
          Any additional revisions may incur extra fees.
        </li>
        <li>
          Publisher shall approve or reject submitted creatives within{' '}
          <strong>{publisherApprovalDays}</strong>{' '}
          <strong>Business Days</strong> of receipt. If the ad is rejected for
          non-compliance, Advertiser may either revise once (within the scope
          above) or forfeit the slot without refund.
        </li>
      </ul>
      <h3>3. Prohibited Content and Compliance</h3>
      <p>
        <strong>3.1 Prohibited Content</strong>
        <br />
        Advertiser shall not submit ads containing:
      </p>
      <ul>
        <li>Adult, obscene, or defamatory material</li>
        <li>Gambling, tobacco, illicit drugs, or weapons</li>
        <li>Discriminatory or hateful content</li>
        <li>Unlawful or fraudulent offerings</li>
        <li>
          Any material otherwise deemed inappropriate at the sole discretion of
          Publisher
        </li>
      </ul>
      <p>
        <strong>3.2 Legal and Regulatory Compliance</strong>
      </p>
      <ul>
        <li>
          Advertiser ensures that all ad content complies with all applicable
          laws and regulations, including but not limited to the{' '}
          <strong>Personal Data Protection Act (PDPA)</strong> in Singapore, the{' '}
          <strong>General Data Protection Regulation (GDPR)</strong> for EU
          users, and any other relevant privacy or advertising standards.
        </li>
        <li>
          Publisher will not be responsible if the Advertiser's content violates
          any third-party rights or regulations.
        </li>
      </ul>
      <p>
        <strong>3.3 Right to Reject or Remove</strong>
      </p>
      <ul>
        <li>
          Publisher reserves the right, at its sole discretion, to reject,
          pause, or remove any ad that it deems violates these Prohibited
          Content rules or any applicable law, without refund.
        </li>
      </ul>
      <h3>4. Fees and Payment</h3>
      <p>
        <strong>4.1 Payment Amount and Structure</strong>
      </p>
      <ul>
        <li>
          The fee for all Ad Slots selected is{' '}
          <strong>USD {totalAmount}</strong>, determined by a{' '}
          <strong>flat-fee</strong> model, updated monthly based on an average
          impression count (at a rate of USD {cpmInUSD} CPM).
        </li>
        <li>
          Although the rate references an average impression count,{' '}
          <strong>
            no specific impression count or minimum engagement level is
            guaranteed
          </strong>
          .
        </li>
        <li>
          The exact amount for this booking is specified in the Booking Form and
          is <strong>payable upfront</strong>.
        </li>
      </ul>
      <p>
        <strong>4.2 Payment Method and Deadline</strong>
      </p>
      <ul>
        <li>
          Advertiser shall pay via <strong>Stripe</strong> (credit card or other
          payment methods supported by Stripe).
        </li>
        <li>
          <strong>Payment Window</strong>. Advertiser shall pay the invoice{' '}
          <strong>in full within {paymentDueDays} day(s)</strong> from the date
          of the invoice ("Payment Due Date").
        </li>
        <li>
          If payment is not received by the Payment Due Date, the Ad Slot is not
          confirmed, and Publisher reserves the right to offer the slot to
          another advertiser.
        </li>
        <li>
          Any applicable taxes, if not already included, shall be borne by the
          Advertiser.
        </li>
      </ul>
      <p>
        <strong>4.3 Late or Failed Payments</strong>
      </p>
      <ul>
        <li>
          If payment fails or there is a chargeback after the Ad Slot has gone
          live, Section 5.2 applies.
        </li>
        <li>
          If the Advertiser resolves the payment issue after the Payment Due
          Date but before the ad slot is taken by another advertiser, Publisher
          may (at its sole discretion) still confirm the slot, subject to
          availability.
        </li>
        <li>
          If there is a chargeback or other payment issue after the Ad Slot has
          gone live, Publisher may terminate the ad immediately unless
          Advertiser resolves the payment issue{' '}
          <strong>within {advertiserResolutionDays} day(s)</strong>. No
          guarantees of slot availability will be made in the interim.
        </li>
      </ul>
      <h3>5. Termination</h3>
      <p>
        <strong>5.1 No Refunds</strong>
      </p>
      <ul>
        <li>
          Once the booking is made and payment is confirmed, Advertiser is not
          entitled to any refund for early termination or cancellation,{' '}
          <strong>unless otherwise specified</strong> in this Agreement (e.g.,
          pro-rated refunds due to significant downtime).
        </li>
      </ul>
      <p>
        <strong>5.2 Termination for Breach</strong>
      </p>
      <ul>
        <li>
          Publisher may terminate this Agreement immediately if Advertiser's ad
          content breaches Section 3 (Prohibited Content), or if payment is
          invalidated (e.g., chargebacks) and is not remedied{' '}
          <strong>within {advertiserResolutionDays} day(s)</strong>.
        </li>
      </ul>
      <p>
        <strong>5.3 Effect of Termination</strong>
      </p>
      <ul>
        <li>
          Upon termination, any display of the Advertiser's ad may be removed
          from the Website without further notice.
        </li>
        <li>
          Advertiser remains liable for any amounts due up to the effective date
          of termination.
        </li>
      </ul>
      <h3>6. Site Downtime or Interruptions</h3>
      <p>6.1 Downtime Disclaimer</p>
      <ul>
        <li>
          Publisher strives for continuous Website availability but disclaims
          liability for minimal or short-term downtime.
        </li>
        <li>
          In the event of <strong>significant downtime</strong> (as reasonably
          determined by industry standards), Publisher may provide a{' '}
          <strong>pro-rated refund or credit</strong> corresponding to the lost
          advertising time.
        </li>
        <li>
          Publisher's maximum liability for downtime (see Section 8) remains
          capped at the fees paid for the affected ad slot.
        </li>
      </ul>
      <h3>7. Reporting and Performance Metrics</h3>
      <p>7.1 No Detailed Reports</p>
      <ul>
        <li>
          Publisher does not provide real-time or detailed performance reports,
          nor grant direct access to its Google Analytics.
        </li>
        <li>
          Any publicly stated impressions or traffic data for the Website is
          provided for <strong>informational purposes only</strong>.
        </li>
      </ul>
      <p>
        <strong>7.2 No Responsibility for Third-Party Data</strong>
      </p>
      <ul>
        <li>
          If Advertiser independently tracks clicks, conversions, or other
          metrics, Publisher disclaims responsibility for any discrepancies
          between Publisher's data and Advertiser's third-party data.
        </li>
      </ul>
      <p>
        <strong>7.3 No Guarantee of Results</strong>
      </p>
      <ul>
        <li>
          Publisher makes <strong>no representation or warranty</strong>{' '}
          regarding the volume of impressions, clicks, or engagement that
          Advertiser's ads will receive.
        </li>
      </ul>
      <h3>8. Limitation of Liability and Indemnification</h3>
      <p>
        <strong>8.1 Limitation of Liability</strong>
      </p>
      <ul>
        <li>
          <strong>Publisher's maximum liability</strong> under this Agreement
          shall not exceed the <strong>total fees paid by Advertiser</strong>{' '}
          for the specific Ad Slot(s) at issue.
        </li>
        <li>
          Under no circumstances will Publisher be liable for any indirect,
          incidental, special, or consequential damages (including loss of
          revenue, profits, or data).
        </li>
      </ul>
      <p>
        <strong>8.2 Indemnification by Advertiser</strong>
      </p>
      <ul>
        <li>
          Advertiser shall indemnify and hold harmless Publisher, its officers,
          and employees from any claims, damages, or liabilities (including
          reasonable legal fees) arising out of or related to:
          <br /> (i) The content of Advertiser's ad;
          <br /> (ii) Any violation of third-party rights, including
          intellectual property;
          <br /> (iii) Any breach of this Agreement by Advertiser.
        </li>
      </ul>
      <p>
        <strong>8.3 Disclaimer of Warranties</strong>
      </p>
      <ul>
        <li>
          Except as expressly stated, Publisher disclaims all warranties,
          whether express or implied, including any implied warranties of
          merchantability, fitness for a particular purpose, or
          non-infringement.
        </li>
      </ul>
      <h3>9. Intellectual Property Rights</h3>
      <p>
        <strong>9.1 Advertiser's Content</strong>
      </p>
      <ul>
        <li>
          Advertiser retains all rights, title, and interest to its ads, logos,
          and trademarks ("Advertiser IP"). Publisher is granted a
          non-exclusive, worldwide, royalty-free license to display Advertiser
          IP solely for the duration and purposes of this Agreement.
        </li>
      </ul>
      <p>
        <strong>9.2 Publisher's IP</strong>
      </p>
      <ul>
        <li>
          Publisher retains all rights, title, and interest to its logos,
          trademarks, Website design, and content. Advertiser may not use or
          modify Publisher's IP without prior written consent.
        </li>
      </ul>
      <h3>10. Confidentiality</h3>
      <p>
        <strong>10.1 Scope</strong>
      </p>
      <ul>
        <li>
          The Parties shall keep confidential any{' '}
          <strong>non-public information</strong> disclosed in connection with
          the ad booking (e.g., custom pricing, special arrangements, contact
          details).
        </li>

        <li>
          Publicly known information (including standard pricing published on
          the Website) is not considered confidential.
        </li>
      </ul>
      <p>
        <strong>10.2 Duration</strong>
      </p>
      <ul>
        <li>
          The confidentiality obligations survive any termination or expiration
          of this Agreement.
        </li>
      </ul>
      <h3>11. Governing Law and Dispute Resolution</h3>
      <p>
        <strong>11.1 Governing Law</strong>
      </p>
      <ul>
        <li>
          This Agreement shall be governed by and construed in accordance with
          the <strong>laws of Singapore</strong>, without regard to its
          conflict-of-law provisions.
        </li>
      </ul>
      <p>
        <strong>11.2 Dispute Resolution</strong>
      </p>
      <ul>
        <li>
          Any dispute arising out of or related to this Agreement shall be
          subject to the <strong>exclusive jurisdiction</strong> of the{' '}
          <strong>courts of Singapore</strong>.
        </li>
      </ul>
      <h3>12. Data Privacy and Compliance</h3>
      <p>
        <strong>12.1 Mutual Compliance</strong>
      </p>
      <ul>
        <li>
          The Parties agree to comply with all applicable data protection and
          privacy regulations, including the{' '}
          <strong>Personal Data Protection Act (PDPA)</strong> of Singapore, the{' '}
          <strong>GDPR</strong> (if applicable), and any other relevant laws or
          regulations.
        </li>
      </ul>
      <p>
        <strong>12.2 Use of Personal Data</strong>
      </p>
      <ul>
        <li>
          If any personal data is exchanged (e.g., billing details), each Party
          ensures it has the right to share and process such data, in accordance
          with relevant privacy legislation.
        </li>
      </ul>
      <h3>13. Force Majeure</h3>
      <ul>
        <li>
          Neither Party shall be liable for delays or failures in performance
          resulting from acts beyond their reasonable control, including natural
          disasters, governmental actions, or widespread internet outages.{' '}
          <strong>
            If such an event persists for more than {forceMajeureDays} day(s)
          </strong>
          , either Party may terminate this Agreement without further liability
          (except for amounts due before the force majeure event).
        </li>
      </ul>
      <h3>14. Entire Agreement and Amendments</h3>
      <p>
        <strong>14.1 Entire Agreement</strong>
      </p>
      <ul>
        <li>
          This Agreement, together with the Booking Form, constitutes the entire
          understanding between the Parties and supersedes all prior proposals
          or agreements, oral or written, related to its subject matter.
        </li>
      </ul>
      <p>
        <strong>14.2 Amendments</strong>
      </p>
      <ul>
        <li>
          Any changes to this Agreement must be made in writing and signed by
          both Parties (including via electronic signatures or acceptance
          through the booking platform if clearly documented).
        </li>
      </ul>
      <h3>15. Notices</h3>
      <p>
        <strong>15.1 Method of Notice</strong>
      </p>
      <ul>
        <li>
          Any formal notice under this Agreement shall be sent via email to:
        </li>
        <ul>
          <li>
            <strong>Publisher</strong>: sponsor@greatfrontend.com
          </li>
          <li>
            <strong>Advertiser</strong>: {contactEmails.join('; ')}
          </li>
        </ul>
        <li>
          Notice is deemed received upon successful email transmission, provided
          no bounce or error message is returned.
        </li>
      </ul>
      <h3>16. Execution</h3>
      <p>
        By confirming the Ad Slot(s) via the Booking Form{' '}
        <strong>and/or</strong> by signing this Agreement,{' '}
        <strong>Advertiser acknowledges</strong> that it has read, understood,
        and agrees to be bound by the above terms. Upon Publisher's acceptance
        of the booking <strong>and</strong> payment, this Agreement shall be
        considered fully executed and <strong>legally binding</strong>.
      </p>
      <p>
        <strong style={{ textDecoration: 'underline' }}>For Publisher</strong>
        <br />
        <strong>Codeney Pte. Ltd.</strong>
        <br />
        Name:{' '}
        <strong style={{ textDecoration: 'underline' }}>Ms. Gina Ng</strong>
        <br />
        Title:{' '}
        <strong style={{ textDecoration: 'underline' }}>Head of Product</strong>
        <br />
        Date:{' '}
        <strong style={{ textDecoration: 'underline' }}>
          {sponsorsDateFormatterFull.format(new Date())}
        </strong>
      </p>
      <p>
        <strong style={{ textDecoration: 'underline' }}>For Advertiser</strong>
        <br />
        <strong>{advertiserFullLegalName}</strong>
        <br />
        Name:{' '}
        <strong style={{ textDecoration: 'underline' }}>
          {authorizedSignatoryName}
        </strong>
        <br />
        Title:{' '}
        <strong style={{ textDecoration: 'underline' }}>
          {authorizedSignatoryTitle}
        </strong>
        <br />
        Date:{' '}
        <strong style={{ textDecoration: 'underline' }}>
          {sponsorsDateFormatterFull.format(new Date())}
        </strong>
      </p>
    </div>
  );
}
