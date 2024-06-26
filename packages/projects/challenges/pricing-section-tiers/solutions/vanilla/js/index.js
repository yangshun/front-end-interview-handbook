const monthlyPlanBtn = document.getElementById('monthlyPlanBtn');
const annualPlanBtn = document.getElementById('annualPlanBtn');

const basicPlanPrice = document.getElementById('basicPlanPrice');
const basicPlanLabel = document.getElementById('basicPlanLabel');

const standardPlanPrice = document.getElementById('standardPlanPrice');
const standardPlanLabel = document.getElementById('standardPlanLabel');

const premiumPlanPrice = document.getElementById('premiumPlanPrice');
const premiumPlanLabel = document.getElementById('premiumPlanLabel');

annualPlanBtn.addEventListener('click', function () {
  annualPlanBtn.classList.remove('button--toggle-inactive');
  monthlyPlanBtn.classList.add('button--toggle-inactive');
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
  annualPlanBtn.classList.add('button--toggle-inactive');
  monthlyPlanBtn.classList.remove('button--toggle-inactive');
  annualPlanBtn.setAttribute('aria-pressed', 'false');
  monthlyPlanBtn.setAttribute('aria-pressed', 'true');

  basicPlanPrice.innerText = '$9.99';
  basicPlanLabel.innerText = 'Billed monthly';

  standardPlanPrice.innerText = '$19.99';
  standardPlanLabel.innerText = 'Billed monthly';

  premiumPlanPrice.innerText = '$29.99';
  premiumPlanLabel.innerText = 'Billed monthly';
});
