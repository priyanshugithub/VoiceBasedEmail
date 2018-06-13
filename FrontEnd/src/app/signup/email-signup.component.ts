import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  Router } from '@angular/router';
import { EmailSignupService } from './email-signup.service';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.component.html',
  styleUrls: ['./email-signup.component.css'],
  providers: [EmailSignupService ]  
})

export class EmailSignupComponent implements OnInit {
  
  errorMessage: string;
  myForm: FormGroup;
  post:any;                     // A property for our submitted form
 
  constructor(private _router: Router ,private _form: FormBuilder ,
              private _emailSignupService : EmailSignupService) {

    this.myForm = _form.group({

      'name' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(35)])],
      'email' : [null, Validators.required],
      'mobileNo' : [null, Validators.required],

    });
  }

  ngOnInit() {

   
  }
   
  goToLogin() :void{
      this._router.navigate(['/email-login']);
    }
  
  onSubmit(post) : void {
      this._emailSignupService.registration(post).subscribe(result => {
        console.log(result)
       },
        error => this.errorMessage = <any>error);
    }  
  
   
}
