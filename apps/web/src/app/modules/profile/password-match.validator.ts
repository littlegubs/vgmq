import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')
    const confirmNewPassword = control.get('confirmNewPassword')

    return newPassword && confirmNewPassword && newPassword.value !== confirmNewPassword.value
      ? { passwordMismatch: true }
      : null
  }
}
