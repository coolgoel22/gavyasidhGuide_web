import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Constants } from '../../app-constants';

import { GavySidhRecords } from '../../model/gavySidh.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrls: ['./registration.less']
})
export class RegistrationComponent implements OnInit {

  public gavySidh: GavySidhRecords = {
    address: {
      city: '0',
      state: '0'
    }
  };

  public states: string[];
  public cities: string[];
  public isNewReg:boolean = false;
  public email:string= "";
  public isGavyasidh: boolean = false;
  private eventSubscription: Subscription;
  private querySubscription: Subscription;

  @ViewChild("saveGavySidh") regForm: any;

  constructor(private data: DataService, public router: Router, 
            private route: ActivatedRoute,
            private zone: NgZone) { 

      this.eventSubscription = this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd && e.url.indexOf('/registration') != -1) {
            this.ngOnInit();
            this.onNgInit();
        }
      });
      this.querySubscription = this.route.queryParams.subscribe(params=>{
        // Parse list of selected gavysidh and create a page.
        let source = params["source"];
        if(source){
          this.zone.run(()=>{
            this.isNewReg = JSON.parse(source).isNewReg;
            this.email = JSON.parse(source).email;
          });
          
          if(this.email){
            this.isGavyasidh = true;
            this.data.showLoader();
            this.data.getUserProfiles(this.email);
            this.data.getAllItemsObservable().subscribe((data:any)=>{
              if(data){
                this.gavySidh = data[0];
                this.zone.run(()=>{
                  this.cities= Constants.getCitiesOfAState(this.gavySidh.address.state);
                });
                this.data.hideLoader();
              }
            });
          }
        }
      });
  }

  ngOnInit() {}
  ngOnDestroy(){
    this.querySubscription.unsubscribe();
    this.eventSubscription.unsubscribe();
  }
  onNgInit(){
    this.data.getCreateNewProfileObservable().subscribe(res=>{
      if(res){
        this.data.hideLoader();
        if(res.isSuccess){
          this.data.showToast("Profile created successfully");
          this.router.navigate(["/home"], { replaceUrl: true });
        }else{
          this.data.showToast(res.msg);
          this.zone.run(()=>{
            this.gavySidh.email="";
          });
        }
      }
    });
    this.zone.run(()=>{
      this.states = Constants.getStates();
    });
  }
  onSubmit({value, valid}){
    if(valid){
      // Because checkbox is not a html imput element
      if(this.isGavyasidh && (value.state=='0' || value.city == '0')){
        this.data.showToast("Please select valid state and city");
        return false;
      }
      this.data.showLoader();
      if(this.isNewReg){
        value.isGavyasidh = this.isGavyasidh;
        this.data.createNewProfile(JSON.stringify(value));
      }else{
        this.data.updateProfile(JSON.stringify(value));
        this.data.getUpdateProfileObservable().subscribe((res:any)=>{
          if(res){
            if(res.isSuccess){
              this.data.showToast("Profile Updated successfully");
              this.router.navigate(["home"], { replaceUrl: true});
            }else{
              this.data.showToast("Error while updating your profile");
            }
            this.zone.run(()=>{
              this.data.hideLoader();
            });
          }
        });
      }
      
    }else{
      this.data.showToast("Please enter requried fields");
    }
  }
  getCities(state){
    this.zone.run(()=>{
      this.cities= Constants.getCitiesOfAState(state);
      this.gavySidh.address.city = '0';
    });
  } 
  iAmAGavyasidh(){
    this.zone.run(()=>{
      this.isGavyasidh = !this.isGavyasidh;
    });
  }
  scrollTo(id){
    document.getElementById(id).scrollIntoView();
  }

}
