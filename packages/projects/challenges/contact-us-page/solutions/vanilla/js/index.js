// Write custom JavaScript here.
// You may ignore this file and delete if if JavaScript is not required for your challenge.

// Navbar
document.getElementById('mobile-menu-button').addEventListener('click', () => {
  document.getElementById('slideout-menu').classList.toggle('open');
});

document
  .getElementById('mobile-close-menu-button')
  .addEventListener('click', () => {
    document.getElementById('slideout-menu').classList.toggle('open');
  });

// FAQ
const accordions = document.getElementsByClassName("faq__accordion__label");

for (let i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener("click", function () {
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

const toast = document.getElementById('toaster');

contactMessageField.addEventListener('input', function () {
  const valueLength = contactMessageField.value.length;

  contactMessageCharCountValue.innerHTML = valueLength;

  if (valueLength > 500) {
    contactMessageCharCountLabel.classList.add('input__char-count--exceed');
    contactMessageField.classList.add('input__field--error');
  } else {
    contactMessageCharCountLabel.classList.remove('input__char-count--exceed');
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
    contactEmailError.textContent = 'Please enter valid email address';
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

// Footer
const year = new Date().getFullYear();
const copyrightYearElement = document.getElementById("copyrightYear");

copyrightYearElement.innerText = year;
