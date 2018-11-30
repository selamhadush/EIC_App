import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

// setup simple regex for white listed characters
const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;

// create your class that extends the angular validator class
export class CustomValidators extends Validators {
  // create a static method for your validation
  static validateCharacters(control: FormControl) {
    // first check if the control has a value
    if (control.value && control.value.length > 0) {
      // match the control value against the regular expression
      const matches = control.value.match(validCharacters);

      // if there are matches return an object, else return null.
      return matches && matches.length ? {invalid_characters: matches} : null;
    } else {
      return null;
    }
  }

  static equityFinance(control: FormControl) {
    // first check if the control has a value
    if (control.value && control.value.length > 0) {
      // match the control value against the regular expression
      const matches = control.value.match(validCharacters);

      // if there are matches return an object, else return null.
      return matches && matches.length ? {invalid_characters: matches} : null;
    } else {
      return null;
    }
  }


  static sumOfSourceFinanceValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const loanFinance = control.get('LoanFinance');
    const equityFinance = control.get('EquityFinance');
    const otherSourceFinance = control.get('OtherSourceFinance');
    const total = control.get('Total');
    const sourceTotal = loanFinance.value + equityFinance.value + otherSourceFinance.value;
    console.log(total.value);
    console.log(sourceTotal.value);
    return total.value !== sourceTotal ? {'sumIsNotEqual': true} : null;
  };
}
