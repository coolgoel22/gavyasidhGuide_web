import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';

import { DataService } from '../../service/data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  public askConfirmation: boolean = false;
  public isAdmin: boolean = false;
  public isSuperAdmin: boolean = false;
  public isGauChikitshak: boolean = false;
  public isGavyasidh: boolean = false;
  public email: string;
  
  constructor(private router: Router,
      private dataService: DataService,
      private zone: NgZone) {
        this.router.events.subscribe((e)=>{
          if(e instanceof NavigationEnd && e.url.indexOf("/home") != -1){
            this.ngOnInit();
            this.onNavigationEnd();
          }
        });
  }

  ngOnInit() {}

  onNavigationEnd(){
    this.dataService.getVerifyLoginObservable().subscribe(data=>{
      if(data && data.isSuccess){
        if(data.user){
          let profile = JSON.parse(data.user);
            this.zone.run(()=>{
              this.isAdmin = profile.isAdmin;
              this.isGavyasidh = profile.isGavyasidh;
              this.isGauChikitshak = profile.isGauChikitshak;
              this.isSuperAdmin = profile.isSuperAdmin;
              this.email = profile.email;
            });
        }else{
          this.isAdmin =false;
          this.isGauChikitshak = false;
          this.isGavyasidh = false;
          this.email = null;
        }
      }
    });
  }

  redirectTo(page){
    this.router.navigate([page], {replaceUrl: false});
  }
  showMyProducts(page:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        source: JSON.stringify({isMyProducts: true})
      }
    };
    this.router.navigate([page], navigationExtras);
  }
  showRegistration(page: string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        source: JSON.stringify({email: this.email})
      }
    };
    this.router.navigate([page], navigationExtras);
  }
  contactUs(page:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        isAdmin: this.isAdmin? 'true':'false', 
        isLoggedIn: this.isGavyasidh? 'true': 'false'
      }
    };
    this.router.navigate([page], navigationExtras);
  }
  signOut(){
    this.zone.run(()=>{
      this.askConfirmation = true; 
    });
  }
  onConfirmation(response:boolean){
    if(response){
      this.dataService.signOut();
      this.router.navigate(["/login"], { replaceUrl: true });
    }
    this.zone.run(()=>{
      this.askConfirmation = false;
    });
  }
}
