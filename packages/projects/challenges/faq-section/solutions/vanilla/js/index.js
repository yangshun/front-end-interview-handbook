const accordions = document.getElementsByClassName('faq__accordion__label');

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
