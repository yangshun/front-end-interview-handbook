const domainsConfig = Object.freeze({
  allowlist: [
    'cuni.cz', // Charles University
    'eur.nl', // Erasmus University Rotterdam
    'ethz.ch', // ETH Zurich
    'helsinki.fi', // University of Helsinki
    'hi.is', // University of Iceland
    'hku.hk', // University of Hong Kong
    'kuleuven.be', // KU Leuven
    'ku.dk', // University of Copenhagen
    'lu.se', // Lund University
    'lmu.de', // University of Munich (LMU)
    'mephi.ru', // Moscow Engineering Physics Institute
    'mcgill.ca', // McGill University
    'mcmaster.ca', // McMaster University
    'queensu.ca', // Queen’s University
    'ru.nl', // Radboud University
    'sdu.dk', // University of Southern Denmark
    'sorbonne-universite.fr', // Sorbonne University
    'tcd.ie', // Trinity College Dublin
    'uab.cat', // Universitat Autónoma de Barcelona
    'ualberta.ca', // University of Alberta
    'uantwerpen.be', // University of Antwerp
    'uba.ar', // University of Buenos Aires
    'ubc.ca', // University of British Columbia (UBC)
    'uib.no', // University of Bergen
    'uio.no', // University of Oslo
    'uni-freiburg.de', // University of Freiburg
    'uni-goettingen.de', // University of Göttingen
    'uni-lj.si', // University of Ljubljana
    'unibas.ch', // University of Basel
    'unibuc.ro', // University of Bucharest
    'unimi.it', // University of Milan
    'uniroma1.it', // Sapienza University of Rome
    'uni-sofia.bg', // University of Sofia
    'unizg.hr', // University of Zagreb
    'up.pt', // University of Porto
    'usp.br', // University of São Paulo
    'utoronto.ca', // University of Toronto
    'uu.se', // Uppsala University
    'uva.nl', // University of Amsterdam
    'vu.nl', // Vrije Universiteit Amsterdam
  ],
  alumniSubstrings: ['former', 'alum'],
  blocklist: [
    'edu.pl', // Too many disposable domains end with edu.pl and too few real ones. We block all of them and tell them to email us if they believe it is a mistake
  ],
  disposableDomains: [
    '50sale.edu.vn',
    'dse.edu.pl',
    'dwse.edu.pl',
    'edupolska.edu.pl',
    'email.edu.pl',
    'fast.edu.pl',
    'mailers.edu.pl',
    'mjj.edu.ge',
    'munik.edu.pl',
    'nullsto.edu.pl',
    'omail.edu.pl',
    'outlook.edu.pl',
    'ozel.edu.pl',
    'pbl.edu.pl',
    'privmail.edu.pl',
    'promail.edu.pl',
    'umail.edu.pl',
    'yomail.edu.pl',
    'zod.edu.pl',
  ],
  prefixes: ['edu.'],
  substring: ['.edu.', '.ac.'],
  suffixes: [
    // Institution suffixes
    '.edu',
    '.ac',
    // Country suffixes – these countries tend to have school emails without .edu/.ac
    '.br',
    '.ca',
    '.ch',
    '.de',
    '.fi',
    '.hk',
    '.in',
    '.it',
    '.kr',
    '.nl',
    '.no',
  ],
});

export function isValidStudentEmail(
  email: string,
): Readonly<{ reason?: string; valid: boolean }> {
  const parts = email.split('@');
  const domain = parts[1];

  if (parts.length < 2 || !domain) {
    return {
      reason: 'Invalid email address.',
      valid: false,
    };
  }

  const alumniEmail = domainsConfig.alumniSubstrings.some((alumniSubstring) =>
    domain.includes(alumniSubstring),
  );

  if (alumniEmail) {
    return {
      reason:
        'Alumni email addresses are not eligible. Send us an email if you believe your email address should qualify.',
      valid: false,
    };
  }

  const isDisposableDomain = domainsConfig.disposableDomains.some(
    (validDomain) => domain.toLowerCase().endsWith(validDomain),
  );

  if (isDisposableDomain) {
    return {
      reason:
        "Wow, a disposable email! Where's your integrity? We've notified the cops 🚨",
      valid: false,
    };
  }

  const blockedDomain = domainsConfig.blocklist.some((blocklistedDomain) =>
    domain.toLowerCase().includes(blocklistedDomain),
  );

  if (blockedDomain) {
    return {
      reason:
        'The email domain is not allowed due to abuse. Send us an email if you believe your email address should qualify.',
      valid: false,
    };
  }

  const containsPrefix = domainsConfig.prefixes.some((prefix) =>
    domain.toLowerCase().startsWith(prefix),
  );
  const containsSubstring = domainsConfig.substring.some((substring) =>
    domain.includes(substring),
  );
  const containsSuffix = domainsConfig.suffixes.some((suffix) =>
    domain.toLowerCase().endsWith(suffix),
  );
  const allowedDomain = domainsConfig.allowlist.some((allowlistedDomain) =>
    domain.toLowerCase().includes(allowlistedDomain),
  );

  if (
    !allowedDomain &&
    !containsPrefix &&
    !containsSubstring &&
    !containsSuffix
  ) {
    return {
      reason:
        'Email address does not seem to belong to an accredited educational institution. Send us an email if you believe your email address should qualify.',
      valid: false,
    };
  }

  return {
    valid: true,
  };
}
