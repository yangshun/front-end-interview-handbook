// Navbar
document.getElementById('mobile-menu-button').addEventListener('click', () => {
  document.getElementById('slideout-menu').classList.toggle('open');
});

document
  .getElementById('mobile-close-menu-button')
  .addEventListener('click', () => {
    document.getElementById('slideout-menu').classList.toggle('open');
  });


// Get stats data
if(document.getElementById('stats-section')){
  fetch(
    'https://www.greatfrontend.com/api/projects/challenges/statistics-metrics'
  ).then(async response => {
    if (response.ok) {
      const { data } = await response.json();
      document.getElementById('downloads-stats').innerText =
        data[0].value.toLocaleString();
      document.getElementById('paid-users-stats').innerText =
        data[1].value.toLocaleString();
      document.getElementById('images-stats').innerText =
        data[2].value.toLocaleString();
    }
  });
}

// Pricing tiers
const monthlyPlanBtn = document.getElementById('monthlyPlanBtn');
const annualPlanBtn = document.getElementById('annualPlanBtn');

const basicPlanPrice = document.getElementById('basicPlanPrice');
const basicPlanLabel = document.getElementById('basicPlanLabel');

const standardPlanPrice = document.getElementById('standardPlanPrice');
const standardPlanLabel = document.getElementById('standardPlanLabel');

const premiumPlanPrice = document.getElementById('premiumPlanPrice');
const premiumPlanLabel = document.getElementById('premiumPlanLabel');

if (
  monthlyPlanBtn &&
  annualPlanBtn &&
  basicPlanPrice &&
  basicPlanLabel &&
  standardPlanPrice &&
  standardPlanLabel &&
  premiumPlanPrice &&
  premiumPlanLabel
) {
  annualPlanBtn.addEventListener('click', function () {
    annualPlanBtn.classList.add('btn', 'btn--secondary');
    monthlyPlanBtn.classList.remove('btn', 'btn--secondary');
    annualPlanBtn.setAttribute('aria-pressed', 'true');
    monthlyPlanBtn.setAttribute('aria-pressed', 'false');

    basicPlanPrice.innerText = '$6.99';
    basicPlanLabel.innerText = 'Billed annually ($84)';

    standardPlanPrice.innerText = '$15.99';
    standardPlanLabel.innerText = 'Billed annually ($192)';

    premiumPlanPrice.innerText = '$25.99';
    premiumPlanLabel.innerText = 'Billed annually ($312)';
  });

  monthlyPlanBtn.addEventListener('click', function () {
    annualPlanBtn.classList.remove('btn', 'btn--secondary');
    monthlyPlanBtn.classList.add('btn', 'btn--secondary');
    annualPlanBtn.setAttribute('aria-pressed', 'false');
    monthlyPlanBtn.setAttribute('aria-pressed', 'true');

    basicPlanPrice.innerText = '$9.99';
    basicPlanLabel.innerText = 'Billed monthly';

    standardPlanPrice.innerText = '$19.99';
    standardPlanLabel.innerText = 'Billed monthly';

    premiumPlanPrice.innerText = '$29.99';
    premiumPlanLabel.innerText = 'Billed monthly';
  });
}

// FAQ
const accordions = document.getElementsByClassName('faq__accordion__label');
if (accordions.length > 0) {
  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', function () {
      let ariaExpandedValue = accordions[i].getAttribute('aria-expanded');
      if (ariaExpandedValue == 'true') {
        ariaExpandedValue = 'false';
      } else {
        ariaExpandedValue = 'true';
      }
      accordions[i].setAttribute('aria-expanded', ariaExpandedValue);
      
      const faqContent = this.nextElementSibling;
      const activeIcon = this.lastElementChild.firstElementChild;
      const inactiveIcon = this.lastElementChild.lastElementChild;
      faqContent.classList.toggle('open');
      activeIcon.classList.toggle('open');
      inactiveIcon.classList.toggle('open');
    });
  }
}

// Newsletter
const newsletterEmailField = document.getElementById('newsletter-email');
const newsletterEmailError = document.getElementById('newsletter-email-error');
const newsletterForm = document.getElementById('newsletter-form');
const toast = document.getElementById('toaster');

if (newsletterEmailField && newsletterEmailError && newsletterForm && toast) {
  newsletterEmailField.addEventListener('input', function () {
    if (this.validity.valid) {
      newsletterEmailError.style.display = 'none';
      newsletterEmailField.classList.remove('input__field--error');
    } else if (this.validity.typeMismatch) {
      newsletterEmailError.style.display = 'block';
      newsletterEmailError.textContent = 'Please enter a valid email address.';
      newsletterEmailField.classList.add('input__field--error');
    } else if (this.validity.valueMissing) {
      newsletterEmailError.style.display = 'block';
      newsletterEmailError.textContent = 'Email address is required';
      newsletterEmailField.classList.add('input__field--error');
    }
  });

  newsletterForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: newsletterEmailField.value,
      }), // Send the data in JSON format
    };

    // Make the request
    const response = await fetch(
      'https://www.greatfrontend.com/api/projects/challenges/newsletter',
      requestOptions
    );
    const result = await response.json();

    const toastContent = toast.firstElementChild;
    const toastContentBadge = toastContent.firstElementChild;
    const toastContentMessage = toastContent.lastElementChild;

    // Display toast
    toast.style.display = 'block';
    if (response.ok) {
      toastContent.classList.add('toast__content--success');
      toastContentBadge.innerText = 'Success';
      toastContentMessage.innerText = result.message;

      //clear all the values after submit
      emailField.value = '';
    } else {
      toastContent.classList.add('toast__content--error');
      toastContentBadge.classList.add('toast__content__badge--error');
      toastContentBadge.innerText = 'Error';
      toastContentMessage.innerText = result.error;
    }
  });
}

// Contact
const contactNameField = document.getElementById('contact-name');
const contactNameError = document.getElementById('contact-name-error');

const contactEmailField = document.getElementById('contact-email');
const contactEmailError = document.getElementById('contact-email-error');

const contactMessageField = document.getElementById('contact-message');
const contactMessageError = document.getElementById('contact-message-error');

const contactMessageCharCountValue = document.getElementById(
  'contact-message-char-count-value'
);
const contactMessageCharCountLabel = document.getElementById(
  'contact-message-char-count-label'
);
const contactForm = document.getElementById('contact-form');
const contactConfirmation = document.getElementById('contact-confirmation');

if (
  contactNameField &&
  contactNameError &&
  contactEmailField &&
  contactEmailError &&
  contactMessageField &&
  contactMessageError &&
  contactMessageCharCountValue &&
  contactMessageCharCountLabel &&
  contactForm &&
  contactConfirmation
) {
  contactMessageField.addEventListener('input', function () {
    const valueLength = contactMessageField.value.length;

    contactMessageCharCountValue.innerHTML = valueLength;

    if (valueLength > 500) {
      contactMessageCharCountLabel.classList.add('input__char-count--exceed');
      contactMessageField.classList.add('input__field--error');
    } else {
      contactMessageCharCountLabel.classList.remove(
        'input__char-count--exceed'
      );
      contactMessageField.classList.remove('input__field--error');
    }
  });

  // Name validation
  contactNameField.addEventListener('invalid', function () {
    contactNameError.style.display = 'block';
  });

  contactNameField.addEventListener('input', function () {
    if (this.validity.valid) {
      contactNameError.style.display = 'none';
    }
  });

  // Email validation
  contactEmailField.addEventListener('invalid', function () {
    contactEmailError.style.display = 'block';
    if (this.validity.valueMissing) {
      contactEmailError.textContent = 'Email address is required';
    } else if (this.validity.typeMismatch) {
      contactEmailError.textContent = 'Please enter a valid email address';
    }
  });
  contactEmailField.addEventListener('input', function () {
    if (this.validity.valid) {
      contactEmailError.style.display = 'none';
    }
  });

  // Message validation
  contactMessageField.addEventListener('invalid', function () {
    contactMessageError.style.display = 'block';
  });
  contactMessageField.addEventListener('input', function () {
    if (this.validity.valid) {
      contactMessageError.style.display = 'none';
    }
  });

  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: contactEmailField.value,
        name: contactNameField.value,
        message: contactMessageField.value,
      }), // Send the data in JSON format
    };

    // Make the request
    const response = await fetch(
      'https://www.greatfrontend.com/api/projects/challenges/contact',
      requestOptions
    );
    const result = await response.json();

    if (response.ok) {
      contactForm.style.display = 'none';
      contactConfirmation.style.display = 'flex';

      //clear all the values after submit
      contactNameField.value = '';
      contactEmailField.value = '';
      contactMessageField.value = '';
      contactMessageCharCountValue.textContent = 0;
    } else {
      // Display toast
      const toastContent = toast.firstElementChild;
      const toastContentBadge = toastContent.firstElementChild;
      const toastContentMessage = toastContent.lastElementChild;

      toastContent.classList.add('toast__content--error');
      toastContentBadge.classList.add('toast__content__badge--error');
      toastContentBadge.innerText = 'Error';
      toast.style.display = 'block';
      toastContentMessage.innerText = result.error;
    }
  });

  document
    .getElementById('send-another-message')
    .addEventListener('click', function () {
      contactForm.style.display = 'flex';
      contactConfirmation.style.display = 'none';
    });
}

// Footer
const copyrightYearElement = document.getElementById('copyrightYear');
if (copyrightYearElement) {
  const year = new Date().getFullYear();
  copyrightYearElement.innerText = year;
}

// Cookie consent
const popupElement = document.getElementById('popup-overlay');
const cookieConsentBanner = document.getElementById('cookie-consent-banner');

const analyticsConsent = document.getElementById('analytics-consent');
const marketingConsent = document.getElementById('marketing-consent');

if (
  popupElement &&
  cookieConsentBanner &&
  analyticsConsent &&
  marketingConsent
) {
  // Open manage cookie modal
  document
    .getElementById('manage-cookies')
    .addEventListener('click', function () {
      popupElement.style.display = 'block';
    });

  popupElement.addEventListener('click', function (event) {
    if (event.target === popupElement) {
      popupElement.style.display = 'none';
    }
  });

  function setCookieConsent(marketing, analytics) {
    // Calculate expiration time (1 year from now in seconds)
    const expirationTime = 365 * 24 * 60 * 60; // 1 year in seconds

    // Store the consent status in cookies with max-age
    document.cookie = `essential=${true}; max-age=${expirationTime}; path=/`;
    document.cookie = `marketing=${marketing}; max-age=${expirationTime}; path=/`;
    document.cookie = `analytics=${analytics}; max-age=${expirationTime}; path=/`;

    // Hide the cookie consent banner after setting the consent
    popupElement.style.display = 'none';
    cookieConsentBanner.style.display = 'none';
  }

  // Accept all cookies
  document
    .getElementById('accept-all-cookies')
    .addEventListener('click', function () {
      setCookieConsent(true, true);
    });

  // Reject all cookies
  document
    .getElementById('reject-all-cookies')
    .addEventListener('click', function () {
      setCookieConsent(false, false);
    });

  // Save cookies
  document
    .getElementById('save-cookies')
    .addEventListener('click', function () {
      setCookieConsent(marketingConsent.checked, analyticsConsent.checked);
    });

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Check if there's a previous consent
  const previousEssentialConsent = getCookie('essential');
  const previousMarketingConsent = getCookie('marketing');
  const previousAnalyticsConsent = getCookie('analytics');

  if (
    previousEssentialConsent &&
    previousMarketingConsent &&
    previousAnalyticsConsent
  ) {
    // Hide the cookie consent banner if all consents are previously given
    cookieConsentBanner.style.display = 'none';
  }
}
