import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { GavySidhRecords } from '../../model/gavySidh.interface';

import { DataService } from '../../service/data.service';


@Component({
  selector: 'approve-gavyasidh',
  templateUrl: './approveGS.html',
  styleUrls: ['./approveGS.less']
})

export class ApproveGSComponent implements OnInit {
  public allRecords: GavySidhRecords[] = [];
  
  constructor(private dataService: DataService, 
        private router: Router, 
        private zone: NgZone) {
  
    this.router.events.subscribe((e)=>{
      if(e instanceof NavigationEnd){
        if(e.url.indexOf('/approveGS') != -1){
          this.ngOnInit();
          this.fetchData();
        }
      }
    });
  }

  ngOnInit() {
    // this.allRecords = [{"name":"Vikas arrora", "mobileNo":"8768909812", "email": "vikas@arrora.com","isAdmin":false,"isProfileComplete":true,"address":{"pincode":"110098","locality":"Railway colony","city":"Bhiwani","state":"Haryana"}},{"name":"Vikram Goel","email":"goel.vicky@gmail.com","mobile":"0987654321","isAdmin":false,"isProfileComplete":true,"address":{"pincode":"123456","locality":"Road","city":"Sadar Bazaar","state":"Delhi"}},{"name":"Rajni gupta","mobile":"7404248149","isAdmin":false,"isProfileComplete":true,"address":{"pincode":"131001","locality":"Katm mandi","city":"Sonipat","state":"Haryana"}},{"name":"Vikram Goel","email":"goelvicky@gmail.com","mobile":"8397071674","isAdmin":false,"isProfileComplete":true,"address":{"pincode":"121001","locality":"Railway colony","city":"Ambala","state":"Haryana"}}];
  }

  fetchData(){
    this.dataService.showLoader();

    this.dataService.getAllRegistrationsObservable().subscribe(data =>{
      if(data){
        this.dataService.hideLoader();
        this.zone.run(()=>{
          this.allRecords = data;
        });
      }
    });
    
    this.dataService.getAllRegistrations();
  }

  approve(index: number, record:any, isApproved: boolean){
    this.dataService.approveGS(isApproved, record.email);
    this.zone.run(()=>{
      this.allRecords.splice(index, 1);
    });
  }
}

