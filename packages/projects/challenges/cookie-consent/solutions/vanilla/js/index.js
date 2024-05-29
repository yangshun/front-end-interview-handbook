// Write custom JavaScript here.
// You may ignore this file and delete if if JavaScript is not required for your challenge.
const popupElement = document.getElementById('popup-overlay');
const cookieConsentBanner = document.getElementById('cookie-consent-banner');

const analyticsConsent = document.getElementById('analytics-consent');
const marketingConsent = document.getElementById('marketing-consent');

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
document.getElementById('save-cookies').addEventListener('click', function () {
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
