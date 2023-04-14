import './styles.css';

(() => {
  // Save a reference to form inputs.
  const $formEl = document.querySelector(
    '.mortgage-calculator-form',
  );
  const $monthlyPaymentEl = document.querySelector(
    '#monthly-payment',
  );
  const $totalPaymentEl = document.querySelector(
    '#total-payment',
  );
  const $totalInterestEl = document.querySelector(
    '#total-interest',
  );

  // Listen to form submission.
  $formEl.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload on form submission.

    const data = new FormData(event.target);

    // Get and convert input values.
    const loanAmount = parseFloat(data.get('loan-amount'));
    const monthlyInterestRate =
      parseFloat(data.get('interest-rate')) / 100 / 12;
    const loanTermInMonths =
      parseFloat(data.get('loan-term')) * 12;

    // Calculate monthly mortgage payment.
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 -
        1 /
          Math.pow(
            1 + monthlyInterestRate,
            loanTermInMonths,
          ));

    // Calculate total payment amount.
    const totalPayment = monthlyPayment * loanTermInMonths;

    // Calculate total interest paid.
    const totalInterest = totalPayment - loanAmount;

    const currencyFormatter = new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
      },
    );

    // Set output values.
    $monthlyPaymentEl.textContent =
      currencyFormatter.format(monthlyPayment);
    $totalPaymentEl.textContent =
      currencyFormatter.format(totalPayment);
    $totalInterestEl.textContent =
      currencyFormatter.format(totalInterest);
  });
})();
