import { AbstractControl, ValidatorFn } from "@angular/forms";


export function forbiddenNameValidator(forbiddenName: RegExp) : ValidatorFn{
   return (control: AbstractControl) : {[key:string]:any} | null => {
    const forbiden = forbiddenName.test(control.value);
    return forbiden ? {'forbiddenName': {value: control.value}} : null;
    }
}