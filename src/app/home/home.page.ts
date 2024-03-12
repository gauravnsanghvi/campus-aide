import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular'; // Import ModalController
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  token:string="";
  ionicForm: FormGroup;
  isSubmitClicked: boolean = false;
  isEmailInvalid: boolean = false;
  ispasswordInvalid:boolean = false;
  @ViewChild('modal') modal: any;
  message: string | undefined;
  language: string = 'language';
  isModalOpen = false;
  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$])[a-zA-Z0-9!@#$]+$')
      ])] 
    });
  
    this.ionicForm.controls['email'].valueChanges.subscribe(() => {
      this.isEmailInvalid = false;
    });
  
    this.ionicForm.controls['password'].valueChanges.subscribe(() => {
      this.ispasswordInvalid = false;
    });
  }
  onSubmit(formData: any) {
    this.isSubmitClicked = true; 
    const emailControl = this.ionicForm.controls['email'];
    const passwordControl = this.ionicForm.controls['password'];

    if (emailControl.errors) {
      if (emailControl.errors['required']) {
        this.isEmailInvalid = true;
        console.log('Email is required');
        this.setOpen(false);
      } else if (emailControl.errors['email']) {
        this.isEmailInvalid = true;
        this.setOpen(false);
      }
    } else {
      console.log('Form submitted successfully');
      console.log(formData);
    }

    if (passwordControl.errors) {
      if (passwordControl.errors['required']) {
        this.ispasswordInvalid = true;
        console.log('Password is required');
        this.setOpen(false);
      } else if (passwordControl.errors['pattern']) {
        this.ispasswordInvalid = true;
        console.log('Password is invalid');
        this.setOpen(false);
      }
    } else {
      console.log('Form submitted successfully');
      console.log(formData);
      
    }
    
  }
  setOpen(isOpen: boolean) {
    console.log(isOpen);
    this.isModalOpen = isOpen;
  }
}
