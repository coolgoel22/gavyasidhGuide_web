import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute, NavigationEnd } from '@angular/router';

// Interface
import { GavySidhRecords } from '../../model/gavySidh.interface';

import { DataService } from '../../service/data.service';
import { Constants } from '../../app-constants';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-gavya-sidh-list',
  templateUrl: './gavya-sidh-list.component.html',
  styleUrls: ['./gavya-sidh-list.component.less']
})
export class GavyaSidhListComponent implements OnInit {
  public allRecords: GavySidhRecords[] = null;
  public checkedBoxes: Array<Object> = [];
  public showModify: boolean = false;
  
  // Variables to suport sorting in list...
  public key: string = 'name';
  public searchText:string = "";
  public reqState:string = "";
  public reqCity:string = "";

  public cities: Array<string>;
  public states: Array<string>;

  private isAllProfileRequestInitiated: boolean = false;
  private subscription:Subscription;

  constructor(private data: DataService, 
        private router: Router, 
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private zone: NgZone) {
    
    this.subscription = this.router.events.subscribe((e)=>{
      if(e instanceof NavigationEnd && e.url.indexOf("/gavyaSidhList") != -1 ){
        this.ngOnInit();
        this.fetchGavyaSidhList();
      }
    });
  }

  ngOnInit() {}
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  fetchGavyaSidhList(){
    this.data.getAllItemsObservable().subscribe(data =>{
      if(data){
        this.data.hideLoader();
        this.zone.run(()=>{
          this.allRecords = data;
        });
        this.isAllProfileRequestInitiated = false;
      }
    });
    
    // this.allRecords = [{"name":"Vikas arrora","mobileNo":"8768909812", "email": "vikas@arrora.com","isAdmin":false,"isProfileComplete":true,"address":{"pincode":"110098","locality":"Railway colony","city":"Bhiwani","state":"Haryana"}},{"name":"Vikram Goel","email":"goel.vicky@gmail.com","mobileNo":"0987654321","isAdmin":false,"isProfileComplete":true,"address":{"pincode":"123456","locality":"Road","city":"Sadar Bazaar","state":"Delhi"}},{"name":"Rajni gupta","mobileNo":"7404248149","isAdmin":false,"isProfileComplete":true,"address":{"pincode":"131001","locality":"Katm mandi","city":"Sonipat","state":"Haryana"}},{"name":"Vikram Goel","email":"goelvicky@gmail.com","mobileNo":"8397071674","isAdmin":false,"isProfileComplete":true,"address":{"pincode":"121001","locality":"Railway colony","city":"Ambala","state":"Haryana"}}];
    
    this.data.showLoader();
    this.data.getUserProfiles("");
    this.zone.run(()=>{
      this.states = Constants.getStates();
    });
  }
 
  whatsAppRecords(){
    let message = "";
    for(let i=0; i<this.allRecords.length; i++){
      let record = this.allRecords[i];
      if(record.isChecked){
        message = message + record.name + " - " + record.mobileNo + " - " + record.address.city + "%0A";
      }
    }
    if(message){
      let url = "https://api.whatsapp.com/send?text=" + message;
      window.location.href= url;
    }else{
      this.data.showToast("Please select any checkbox to share record");
    }
  }

  checkboxClicked(record:GavySidhRecords){
    this.zone.run(()=>{
      record.isChecked = !record.isChecked;
    });
  }
  getCities(selectedState){
    this.zone.run(()=>{
      this.cities = Constants.getCitiesOfAState(selectedState);
      this.reqCity = "";
    });
  }
}

