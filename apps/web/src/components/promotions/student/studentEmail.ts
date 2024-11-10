const validDomains = Object.freeze({
  allowlisted: [
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

  if (email.includes('alumn')) {
    return {
      reason: 'Alumni email addresses are not eligible.',
      valid: false,
    };
  }

  const containsPrefix = validDomains.prefixes.some((prefix) =>
    domain.toLowerCase().startsWith(prefix),
  );
  const containsSubstring = validDomains.substring.some((substring) =>
    domain.includes(substring),
  );
  const containsSuffix = validDomains.suffixes.some((suffix) =>
    domain.toLowerCase().endsWith(suffix),
  );
  const allowedDomain = validDomains.allowlisted.some((validDomain) =>
    domain.toLowerCase().includes(validDomain),
  );

  if (
    !containsPrefix &&
    !containsSubstring &&
    !containsSuffix &&
    !allowedDomain
  ) {
    return {
      reason:
        'Email address does not seem to belong to an accredited educational institution. Send us an email if you believe your school should qualify.',
      valid: false,
    };
  }

  return {
    valid: true,
  };
}
