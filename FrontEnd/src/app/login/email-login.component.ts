import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailLoginService } from './email-login.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css'],
  providers: [EmailLoginService] 
})
export class EmailLoginComponent implements OnInit {
  
  errorMessage: string;
  myForm: FormGroup;
  post:any;
  private _UserEmail : string;
  private _UserName :string;
  showMessage : boolean;
  errMessage : string;


  constructor(private _router: Router ,private _form: FormBuilder ,
    private _emailLoginService : EmailLoginService , 
    private toastr: ToastrService) {

 
    this.myForm = _form.group({

      'email' : [null, Validators.required],
      'password' : [null, Validators.required]

    });
  }

  ngOnInit() {

  }

  openSignup() : void{
    this._router.navigate(['/email-signup']);
  }

  login(post): void {
    this._emailLoginService.Login(post).subscribe(result => {
      if(result['message']=='Valid User'){
        this._UserEmail = result['data'][0]['email'];
        this._UserName = result['data'][0]['name'];
        this._router.navigate(['/email',this._UserName,this._UserEmail]);
      }
      else{
        this.errMessage = result['message'];
        this.showMessage =true;
      }
     },
      error => this.errorMessage = <any>error);
  }
  
  
  }


