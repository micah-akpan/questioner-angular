import { FormControl } from '@angular/forms';

export default {
  validateCustomPassword(password: string) {
    return (control: FormControl) => {
      if (control.value !== password) {
        return {
          confirmPassword: {
            message: 'Passwords do not match',
          }
        };
      }
      return null;
    };
  }
};
