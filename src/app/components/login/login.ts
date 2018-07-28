import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { DataService } from '../../service/data.service';

import { Router, NavigationExtras, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';

// Login Interface
import { LoginInterface } from '../../model/login.interface';
import { WebAppInterface  } from '../../model/android.interface';

declare var Android: WebAppInterface;
declare var afterLogin:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  
  public newUser: LoginInterface = {
    userName: '',
    password: ''
  };
  public errorMessage: string;
  private isLoginRequestInitiated:boolean = false;
  public ifShowTnC: boolean = true;
  public isShowHowToUse:boolean = false;
  @ViewChild('loginForm') form:any;

  constructor(private data:DataService,
    private router:Router,
    private route: ActivatedRoute,
    private zone: NgZone) {
      this.ngOnInit();
      this.createPage();
  }


  ngOnInit() {}
  createPage(){
    if(localStorage && localStorage.getItem("tncSaved") != "true"){
      this.zone.run(()=>{
        this.ifShowTnC = true;
      });
    }else{
      this.zone.run(()=>{
        this.ifShowTnC = false;
      });
      this.checkIfLoggedIn();
    }
  }
  checkIfLoggedIn(){
      this.data.showLoader();
  
      this.zone.runOutsideAngular(()=>{
        this.logginObservable();
        if(!this.isLoginRequestInitiated){
          this.data.verifyLogin();
          this.isLoginRequestInitiated = true;
        }
      });
  }
  logginObservable(){
    this.data.getVerifyLoginObservable().subscribe(data=>{
      if(data){
        this.data.hideLoader();
        // If login is fail, data.isError should be true and data.msg should be populated...
        if(data.isSuccess){
          this.errorMessage = "";
          this.redirectToHomePage();
        }else{
          if(data.msg){
            Android.showToast(data.msg);
            this.zone.run(()=>{
              this.errorMessage = data.msg;
              this.newUser.password = "";
            });
          }
        }
      }
    });
  }

  submit($event, {value, valid}:{value:any, valid:boolean}){
    $event.stopPropagation();
    $event.preventDefault();

    if(valid){
      this.data.showLoader();
      this.zone.runOutsideAngular(()=>{
        Android.login(this.newUser.userName, this.newUser.password);
        this.isLoginRequestInitiated = true;
      });
    }else{
      Android.showToast("Username or password is not valid");
    }
  }
  redirectToHomePage(){
    this.router.navigate(["/home"], { replaceUrl: true });
  }
  register(){
    this.redirectToRegistrationPage(true);
  }
  redirectToRegistrationPage(isNewReg: boolean){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        source: JSON.stringify({isNewReg: isNewReg})
      }
    };
    this.router.navigate(["/registration"], navigationExtras);
  }
  // signInWithGoogle(){
  //   this.data.showLoader();

  //   this.zone.runOutsideAngular(()=>{
  //     Android.signInWithGoogle();
  //     this.data.showToast("Sign in with google");
  //   });
  // }

  guestLogin(){
    this.data.showLoader();
    this.data.guestLogin();
  }
  acceptTnC(){
    if(localStorage){
      localStorage.setItem('tncSaved', 'true');
    }
    this.zone.run(()=>{
      this.ifShowTnC = false;
    });
    this.checkIfLoggedIn();
  }
}
