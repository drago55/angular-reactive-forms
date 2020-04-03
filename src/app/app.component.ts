import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder , Validators, FormArray} from '@angular/forms';
import { forbiddenNameValidator } from './user-name.validator';
import { PasswordValidator } from "./password.validator";
import { RegistrationService } from './service/registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  registrationForm : FormGroup;

/*
  registrationForm =  new FormGroup({
    userName: new FormControl('Viswas'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  });
*/  
  constructor(private fb: FormBuilder, private registrationService: RegistrationService){
      
  }

  ngOnInit(){
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/) ] ],
      email: [''],
      subscribe: [false],
      password: ['', Validators.required],
      confirmPassword: ['' ,Validators.required],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    } , {validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges
          .subscribe(checkedValue => {

            const email = this.registrationForm.get('email');
            if(checkedValue){
              email.setValidators(Validators.required);
            }else{
              email.clearValidators();
            }
            email.updateValueAndValidity();
          });
  }

  get userName(){
    return this.registrationForm.get('userName');
  }
  get email(){
    return this.registrationForm.get('email');
  }

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternatedEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value).subscribe(
        response => console.log('Success', response),
        error => console.error('Error' ,error)  
    );
  }
  
  
  loadApiData(){
    this.registrationForm.setValue({
      userName: 'Bruse',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'City',
        state: 'State',
        postalCode: '123456'
      }

    });
  }

}
