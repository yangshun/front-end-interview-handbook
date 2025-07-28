import { Axiom } from '@axiomhq/js';
import { startOfDay, subDays } from 'date-fns';
import type { NextRequest } from 'next/server';
import { Pool } from 'pg';

const daysBefore = 30;

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

function aplQuery({
  countryExclude,
  countryInclude,
}: {
  countryExclude?: string | null;
  countryInclude?: string | null;
}) {
  return `
events
| extend shifted_time = _time + 8h
${countryInclude ? `| where ['request.country'] == '${countryInclude}'` : ''}
${countryExclude ? `| where ['request.country'] != '${countryExclude}'` : ''}
| summarize
    CheckoutSuccess = countif(['event.name'] == 'checkout.success' and ['event.payload.namespace'] == 'interviews'),
    CheckoutInitiate = dcountif(['user.fingerprint'], ['event.name'] == 'checkout.attempt' and ['event.payload.namespace'] == 'interviews'),
    NumVisits = dcountif(
        ['user.fingerprint'],
        (['event.name'] == 'pageview'
            and ['request.pathname'] !startswith '/projects'
    )),
    NumFirstVisits = dcountif(
        ['user.fingerprint'],
        (['event.name'] == 'pageview'
            and ['request.pathname'] !startswith '/projects'
            and todatetime(['user.firstVisit']) > (_time - 24h)
    )),
    CheckoutSuccessSameDay = dcountif(['user.email'], ['event.name'] == 'checkout.success' and ['event.payload.namespace'] == 'interviews' and todatetime(['user.firstVisit']) > (_time - 24h)),
    CheckoutInitiateSameDay = dcountif(['user.email'], ['event.name'] == 'checkout.attempt' and ['event.payload.namespace'] == 'interviews' and todatetime(['user.firstVisit']) > (_time - 24h)),
    SignUps = dcountif(
        ['user.fingerprint'],
        (['event.name'] == 'auth.sign_up'
    ))
    by ['time'] = startofday(shifted_time)
| extend CheckoutInitiateRate = round(100.0 * CheckoutInitiate / NumVisits, 2)
| extend CheckoutSuccessRate = round(100.0 * CheckoutSuccess / NumVisits, 2)
| extend CheckoutInitiateToCheckoutSuccessRate = round(100.0 * CheckoutSuccess / CheckoutInitiate, 2)
| extend CheckoutInitiateSameDayRate = round(100.0 * CheckoutInitiateSameDay / NumFirstVisits, 2)
| extend CheckoutSuccessSameDayRate = round(100.0 * CheckoutSuccessSameDay / NumFirstVisits, 2)
| extend CheckoutInitiateToCheckoutSuccessSameDayRate = round(100.0 * CheckoutSuccessSameDay / CheckoutInitiateSameDay, 2)
| order by _time desc
`;
}

const pgQuerySignUps = `SELECT
  date_trunc('day', created_at AT TIME ZONE 'Asia/Singapore') AS date,
  count(*) AS "signUps"
FROM
  auth.users
WHERE
  created_at >= NOW() - INTERVAL '${daysBefore} days'
GROUP BY
  date
ORDER BY date DESC;`;

const pgQueryEmailSignUps = `SELECT
  date_trunc('day', created_at AT TIME ZONE 'Asia/Singapore') AS date,
  count(*) AS "emailSignUps",
  count(email_confirmed_at) AS "confirmedEmailSignUps"
FROM
  auth.users
WHERE
  confirmation_sent_at IS NOT NULL AND
  created_at >= NOW() - INTERVAL '${daysBefore} days'
GROUP BY
  date
ORDER BY
  date DESC;`;

const axiom = new Axiom({
  orgId: process.env.AXIOM_ORG_ID!,
  token: process.env.AXIOM_TOKEN!,
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const countryInclude = searchParams.get('country_include');
  const countryExclude = searchParams.get('country_exclude');

  try {
    await pgPool.connect();
  } catch (error) {
    // Ignore
  }

  const [axiomRes, pgResSignUps, pgResEmailSignUps] = await Promise.all([
    axiom.query(aplQuery({ countryExclude, countryInclude }), {
      startTime: startOfDay(subDays(new Date(), daysBefore)).toISOString(),
    }),
    pgPool.query(pgQuerySignUps),
    pgPool.query(pgQueryEmailSignUps),
  ]);

  return Response.json({
    conversions: axiomRes.matches,
    emailSignUps: pgResEmailSignUps.rows,
    signUps: pgResSignUps.rows,
  });
}
