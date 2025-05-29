import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function confirmPasswordValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirm_password = control.get('confirm_password');

        if(password && confirm_password && password?.value != confirm_password?.value){
            confirm_password.setErrors({ invalidConfirmPassword: true });
            return {invalidConfirmPassword: true}
        }

        return null;
    }
}