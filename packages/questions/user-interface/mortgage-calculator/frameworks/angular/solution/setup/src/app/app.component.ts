import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormState } from './models/form-state.model';
import { Mortgage } from './models/mortgage.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  mortgage!: Mortgage;

  formSubmit(mortgageData: FormState): void {
    const loanAmount = mortgageData.loanAmount;
    const monthlyInterestRate =
      mortgageData.interestRate / 100 / 12;
    const loanTermInMonths = mortgageData.loanTerm * 12;

    const monthlyPaymentAmount =
      (loanAmount * monthlyInterestRate) /
      (1 -
        Math.pow(
          1 + monthlyInterestRate,
          -loanTermInMonths,
        ));

    const totalPayment =
      monthlyPaymentAmount * loanTermInMonths;

    const currencyFormatter = new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
      },
    );

    this.mortgage = {
      monthlyPayment: currencyFormatter.format(
        monthlyPaymentAmount,
      ),
      totalPayment: currencyFormatter.format(totalPayment),
      totalInterest: currencyFormatter.format(
        totalPayment - loanAmount,
      ),
    };
  }
}
