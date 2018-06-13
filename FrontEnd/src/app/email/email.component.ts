import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoiceConversionService } from './voice-conversion.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { EmailService  } from './email.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  providers: [EmailService , VoiceConversionService] 
})
export class EmailComponent implements OnInit {
 
  private userName : string;
  private userEmail : string;
  composeBoxShow : boolean;
  @ViewChild('f') form: NgForm;
  errorMessage: string;
  myForm: FormGroup;
  post:any; 
  speechData: string;

  public emailTo : string;
  public emailSubject : string;
  public emailMessage : string;
  

  constructor(private _form: FormBuilder ,private _route : ActivatedRoute ,
              private _emailService : EmailService ,
              private speechRecognitionService: VoiceConversionService ) {

    this.myForm = _form.group({

      'emailTo' : [null, Validators.required],
      'emailSubject' : [null, Validators.required],
      'emailContent' : [null, Validators.required]

    });

    this.speechData = "";
   }

  ngOnInit() {

    this.userName =  this._route.snapshot.paramMap.get('name'),
    this.userEmail = this._route.snapshot.paramMap.get('email');
   
  }

  sentMail(post) : void {
    
    this._emailService.sentMailToServer(post).subscribe(result => {
      console.log(result)
     },
      error => this.errorMessage = <any>error );
     
    this.composeBoxShow =false;
  }  


  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
}

activateSpeech(): void {
    this.composeBoxShow =true
    this.speechRecognitionService.record()
        .subscribe(
        //listener
        (value) => {
            this.speechData = value;
            this.voiceDictionry(value);
        },
        //errror
        (err) => {
            console.log(err);
            if (err.error == "no-speech") {
                console.log("--restatring service--");
                this.activateSpeech();
            }
        },
        //completion
        () => {
            
            console.log("--complete--");
            this.activateSpeech();
        });
}


voiceDictionry(VoiceData) : void {
  console.log(VoiceData);
  if(VoiceData =='email to'){
    this.speechRecognitionService.record()
        .subscribe(
        (value) => {
            this.emailTo = value.trim();
            this.activateSpeech();
        })

  }
  if(VoiceData == 'email subject'){
    this.speechRecognitionService.record()
        .subscribe(
        (value) => {
          this.emailSubject  = value;
          this.activateSpeech();
        })
    
  }
  if(VoiceData == 'email message'){
    this.speechRecognitionService.record()
        .subscribe(
        (value) => {
          this.emailMessage  =  value;
          this.activateSpeech();
        })
     
  }
  if(VoiceData == 'send this mail'){
          this.form.ngSubmit.emit();
  }
}

}


