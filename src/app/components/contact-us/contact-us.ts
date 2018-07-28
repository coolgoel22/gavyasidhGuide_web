import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { ContactUs } from '../../model/contact.interface';

import { DataService } from '../../service/data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.less']
})
export class ContactUsComponent implements OnInit {
  public contact:ContactUs; 
  public allQueries: Array<ContactUs>;
  private subscription: Subscription;
  public isLoggedIn:string = 'false';
  public isAdmin: string = 'false';
  @ViewChild("contactForm") queryForm: any;

  public response:any = {
      res:''
  }
  constructor(private dataService: DataService, 
      private router: Router,
      private route: ActivatedRoute,
      private zone: NgZone) { 
        this.subscription = this.router.events.subscribe((e)=>{
          if(e instanceof NavigationEnd && e.url.indexOf("/contactUs") != -1){
            this.ngOnInit();
            this.fetchData();
          }
        });
    }

  ngOnInit() {
    // this.allQueries = [{"name":"Vikram Goel","email":"goelvick@dfg.mn","mobileNo":"8397980987","query":"Qw","date":"Mon Jul 02 15:01:50 GMT+05:30 2018"},
    // {"name":"Vikram Goel1","email":"goelvick@dfg.mn","mobileNo":"8397071674","query":"6yhh","date":"Mon Jul 02 15:03:09 GMT+05:30 2018"},
    // {"name":"Vikram Goel2","email":"goelvick@dfg.mn","mobileNo":"8397980987","query":"This is  a long text to check if query if short query of two line only is working fine or not","date":"Mon Jul 02 17:32:33 GMT+05:30 2018"}];
    
    this.isLoggedIn = this.route.snapshot.queryParams.isLoggedIn;
    this.isAdmin = this.route.snapshot.queryParams.isAdmin;
  }

  fetchData(){
    this.dataService.getAllQueries();
    this.dataService.getAllQueriesObservable().subscribe(data=>{
      if(data){
        this.zone.run(()=>{
          this.allQueries = data;
        });
      }
    });
    this.zone.run(()=>{
      this.contact = { 
        name: '',
        mobileNo: '',
        email: '',
        query: ''
      };
    });
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onSubmit($event, {value, valid}: {value:any, valid: boolean}){
    $event.preventDefault();
    if(valid){
      this.allQueries.unshift(value);
      this.dataService.saveQuery(JSON.stringify(value));
      this.queryForm.reset();
    }
  }

  onReply($event, record:any, {value, valid}: {value:any, valid: boolean}){
    $event.preventDefault();
    if(valid){
      this.dataService.saveResponse(record.date, value.response);
      record.reply = value.response;

    }
  }
}
